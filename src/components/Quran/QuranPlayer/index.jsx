import QuranPlayerHeader from './QuranPlayerHeader'
import QuranPlayerBody from './QuranPlayerBody'
import QuranPlayerFooter from './QuranPlayerFooter';
import { v4 as uuid } from 'uuid';
import { useImmerReducer } from 'use-immer';
import { reducer, initalState } from '../../../reducers/QuranPlayerReducer';
import QuranPlayerContext from './QuranPlayerContext';
import { useCallback, useMemo, useState } from 'react';
import Tafsir from './Tafsir';
import { Box, Container } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Khatma from '../../Khatma/index';

// import QuranSurahsList from './QuranPlayerHeader/QuranPlayerDrawer/QuranSurahsList';
import './index.css'
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import QuranRecitationItem from './QuranPlayerHeader/QuranPlayerDrawer/QuranRecitationsList/QuranRecitationItem';
import recitations from '../../../data/recitations';
import quranSurahs from '../../../data/surahs'
import QuranSurahItem from './QuranPlayerHeader/QuranPlayerDrawer/QuranSurahsList/QuranSurahItem';
import { setCurrentPage, setCurrentSurahNumber } from '../../../reducers/QuranPlayerReducer';
import './QuranPlayerHeader/QuranPlayerDrawer/QuranSurahsList/QuranSurahItem.css'
import QuranPlayerDrawer from './QuranPlayerHeader/QuranPlayerDrawer';
import { changeQuranPlayerLocalStorage } from '../../../data/localStorage';
export default function QuranPlayer({fontSize}) {
  let localQuorData=localStorage.getItem('quranPlayer');
  let quranData=localQuorData&&JSON.parse(localQuorData);
    const [quranPlayerState, dispatchQuranPlayerState] = useImmerReducer(reducer, initalState);
    const contextValue = useMemo(() => ([quranPlayerState, dispatchQuranPlayerState]), [quranPlayerState]);
    console.log("quranPlayerState",quranPlayerState)
    const containerMaxWidth = useMemo(() => 'xl', []);
    const [surahNumber, setSurahNumber] = useState(1);
    const [settingsOpened, setSettingsOpend] = useState(false);
    const toggleDrawer = useCallback((open) => {
      setSettingsOpend(open);
    }, []);
    // console.log(toggleDrawer)
    const handleSurahChange = useCallback((surahIndex) => {
      localStorage.setItem("activePage",JSON.stringify(0))
      const page = quranSurahs[surahIndex].page;
      dispatchQuranPlayerState(setCurrentSurahNumber(surahIndex + 1));
      dispatchQuranPlayerState(setCurrentPage(page));
      // changeQuranPlayerLocalStorage("currentNumberInSurah",1);
      changeQuranPlayerLocalStorage("currentSurahNumber",surahIndex + 1);
  }, []);

    const items = useMemo(() => {
      try {

      return Object.entries(recitations).map(([recitationId, value], index) => {
          return (
              <>
                  <QuranRecitationItem
                      key={uuid()}
                      recitationId={recitationId}
                      value={value}
                      recitationNumber={index + 1} />
                  <Divider light />
              </>
          )
      })

    } catch (error) {

    }
  }, []);
  const surahsItems = useMemo(() => {
    return quranSurahs.map((surah, index) => {

        return (
            <>
              <QuranSurahItem
                className="surah"
                itemNumber={index + 1}
                isActive={quranData&&quranData?.currentSurahNumber=== index + 1  }
                handleSurahChange={() => handleSurahChange(index)}
                surah={surah}
              />

              <Divider light />
            </>
        )
    })
}, [quranPlayerState.currentSurahNumber,quranPlayerState, quranData]);
    console.log(quranPlayerState.currentSurahNumber)
    return (
        <QuranPlayerContext.Provider  value={contextValue}>
            <Box component='main' className='quoran_surah_reader'>
              <div className='readers'>
                  <h5>القراء</h5>
                  <Collapse in={true} timeout={0}>
                    <List component="div" disablePadding>
                        {items}
                    </List>
                </Collapse>
              </div>
              <div className='sura_content'>
                <Container maxWidth={containerMaxWidth}>
                  {/* <QuranPlayerHeader toggleDrawer={toggleDrawer} settingsOpened={settingsOpened} containerMaxWidth={containerMaxWidth} /> */}
                  <QuranPlayerBody fontSize={fontSize} containerMaxWidth={containerMaxWidth} />
                  <QuranPlayerFooter containerMaxWidth={containerMaxWidth} />
                </Container>
                  <Tafsir containerMaxWidth={containerMaxWidth} />
              </div>
              <div className="suars">
              <Collapse in={true} timeout={0}>
                <List component="div" disablePadding>
                    {surahsItems}
                </List>
            </Collapse>
              </div>
                {/* <QuranSurahsList surahNumber={surahNumber} setSurahNumber={setSurahNumber} /> */}
            </Box>
            <SettingsIcon
              className='setting'
              fontSize='large'
              onClick={() => toggleDrawer(true)}
              sx={{
                  color: 'quranPlayer.contrastText',
                  cursor: 'pointer',
              }} />
              <QuranPlayerDrawer
              settingsOpened={settingsOpened}
              toggleDrawer={toggleDrawer} />

           <Khatma />
        </QuranPlayerContext.Provider>
    )
}

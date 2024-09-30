import { useCallback, useContext, useMemo } from 'react'
import { setActiveAyah } from '../../../../../reducers/QuranPlayerReducer';
import QuranPlayerContext from '../../QuranPlayerContext';
import { Typography } from '@mui/material';
import AyahNumber from './AyahNumber';
import { changeQuranPlayerLocalStorage } from '../../../../../data/localStorage';


function Ayah({ text, ayahNumber, ayahNumberInSurah , fontSize }) {
   console.log(text,ayahNumber , ayahNumberInSurah);
   console.log(fontSize);
   
  let localQuorData=localStorage.getItem('quranPlayer');
  let quranData=localQuorData&&JSON.parse(localQuorData);
    let localAya=localStorage.getItem('activePage');
    let AyaAcDa=JSON.parse(localAya)
    const [quranPlayerState, dispatchQuranPlayerState] = useContext(QuranPlayerContext);
    const handleClick = useCallback(() => {
      localStorage.setItem('activePage',JSON.stringify(ayahNumberInSurah));
        if (!ayahNumber) return;
        dispatchQuranPlayerState(setActiveAyah(ayahNumber));
    }, []);

    const isActive = useMemo(() => {
      if(quranPlayerState.activeAyah!=0&&quranPlayerState.activeAyah!=null){
        // console.log(quranPlayerState.activeAyah)
        // console.log('ewwe')

        // localStorage.setItem('activePage',JSON.stringify(quranPlayerState.activeAyah-7));
      }

      // console.log()
        return quranPlayerState.activeAyah === ayahNumber;
    }, [quranPlayerState.activeAyah]);

    return (
        // <div style={{display:"flex"}}>
           <Typography  variant='h6' sx={{
            fontWeight: '400',
            fontSize : `${fontSize?.quraanSize}px !important`,
            py: 1,
            px: 2,
            display: 'inline-flex',
            alignItems:"center",
            textAlign: 'justify',
            padding: '15px 5px 15px 0',
            lineHeight: '61px',
            '&:hover': {
                backgroundColor: 'quranPlayer.light',
                color: 'quranPlayer.main',
                cursor: 'pointer',
                '*': {
                    filter: 'invert(0)',
                }
            },
            backgroundColor: AyaAcDa==ayahNumberInSurah ? '#c7c7c7' : 'transparent',//quranData?.currentNumberInSurah==ayahNumberInSurah
            color:  AyaAcDa==ayahNumberInSurah ? '#222' : 'text.primary',//quranData?.currentNumberInSurah==ayahNumberInSurah
        }}
            // ayahNumber can be null because the tafsir section uses this component and we don't want to trigger any event in this tafsir section
            onClick={()=>{
              console.log(ayahNumber-7)
              if(ayahNumber){
                handleClick(ayahNumber-7)
              }
              handleClick(ayahNumber)
              // ayahNumber ? handleClick : null
            }}>
            {text}
            <AyahNumber isActived={quranData?.currentSurahNumber==ayahNumberInSurah||isActive} number={ayahNumberInSurah} />
        </Typography>
        // </div>
    )
}

export default Ayah

import { useCallback, useContext } from 'react'
import { previousPage } from '../../../../../reducers/QuranPlayerReducer';
import QuranPlayerContext from '../../QuranPlayerContext';
import { Box } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { changeQuranPlayerLocalStorage } from '../../../../../data/localStorage';

export default function PreviousPageButton() {
  let localQuorData=localStorage.getItem('quranPlayer');
  let quranData=localQuorData&&JSON.parse(localQuorData);
    const [, dispatchQuranPlayerState] = useContext(QuranPlayerContext);

    const handlePreviousPage = useCallback(() => {

      changeQuranPlayerLocalStorage('currentPage',quranData?.currentPage-1);
        // changeQuranPlayerLocalStorage('currentNumberInSurah',ayahNumberInSurah);
        dispatchQuranPlayerState(previousPage());
    }, [dispatchQuranPlayerState]);

    return (
        <Box sx={{
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            border: '2px solid',
            borderColor: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <KeyboardArrowRightRoundedIcon fontSize='medium' onClick={handlePreviousPage} sx={{
                cursor: 'pointer',
            }} />
        </Box>
    )
}

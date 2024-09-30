import { useCallback, useContext } from 'react'
import { nextPage } from '../../../../../reducers/QuranPlayerReducer';
import QuranPlayerContext from '../../QuranPlayerContext';
import { Box } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { changeQuranPlayerLocalStorage } from '../../../../../data/localStorage';

export default function NextPageButton() {
  let localQuorData=localStorage.getItem('quranPlayer');
  let quranData=localQuorData&&JSON.parse(localQuorData);
    const [, dispatchQuranPlayerState] = useContext(QuranPlayerContext);

    const handleNextPage = useCallback(() => {
      changeQuranPlayerLocalStorage('currentPage',quranData?.currentPage-1);
        dispatchQuranPlayerState(nextPage());
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
            <KeyboardArrowLeftRoundedIcon fontSize='medium' onClick={handleNextPage} sx={{
                cursor: 'pointer',
            }} />
        </Box>
    )
}

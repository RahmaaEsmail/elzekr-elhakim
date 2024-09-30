import { useContext, useMemo } from 'react'
import QuranPlayerContext from '../../QuranPlayerContext';
import { Typography } from '@mui/material';

export default function PageNumber() {
    const [quranPlayerState,] = useContext(QuranPlayerContext);
    // console.log(quranPlayerState.endAyahPage)

    const pageText = useMemo(() => {
        return `صفحة ${quranPlayerState.currentPage}`;
    }, [quranPlayerState.currentPage]);
    return (
        <Typography variant='h6' sx={{
            textAlign: 'center',
        }}>
            {pageText}
        </Typography>
    )
}

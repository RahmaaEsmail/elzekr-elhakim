import { memo, useCallback } from 'react'
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';


function AdhkarCard({ cardData, isChosen, setChosenAdhkar }) {
    const handleClick = useCallback(() => {
        setChosenAdhkar(cardData);
    }, []);

    return (
        <Paper onClick={handleClick} sx={{
            cursor: 'pointer',
            p: 2,
            textAlign: 'center',
            minHeight: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isChosen ? 'quranPlayer.main' : 'primary.light',
            color: isChosen ? 'white' : 'text.secondary',
            '&:hover': {
                backgroundColor: 'quranPlayer.main',
                color: 'white',
            },
        }} >
            <Typography style={{display:'flex',margin:'auto',marginTop:'-4px'}} className='typo' variant="h6" component="div">
                {cardData}
            </Typography>
        </Paper>
    )
}

export default memo(AdhkarCard)

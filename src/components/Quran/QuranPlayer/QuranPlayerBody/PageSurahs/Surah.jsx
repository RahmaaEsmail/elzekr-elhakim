import { Typography } from "@mui/material"

function Surah({ text }) {
    console.log(text);
    return (
        <Typography variant='body1' sx={{
            color: '#9B102C',
            fontSize: '1.1rem',
        }}>
            {text}
        </Typography>
    )
}  

export default Surah

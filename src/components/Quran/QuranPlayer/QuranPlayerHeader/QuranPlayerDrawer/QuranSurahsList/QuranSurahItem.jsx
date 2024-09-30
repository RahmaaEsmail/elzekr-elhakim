import { v4 as uuid } from 'uuid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { memo } from 'react';
import './QuranSurahItem.css'
function QuranSurahItem({ itemNumber, isActive, handleSurahChange, surah }) {
  // console.log(surah)
    return (
        <ListItemButton
            key={uuid()}
            sx={{
                pl: 4,
                backgroundColor: isActive ? 'primary.main' : 'transparent',
            }}
            onClick={handleSurahChange}>
            <ListItemIcon className={isActive?'surah_name active':'surah_name'}>
                {`${(itemNumber).toString().padStart(2, '0')}- ${surah.arabicName}`}
            </ListItemIcon>
            <ListItemText
              className={isActive?'other_info active':'other_info'}
                primary={`عدد اياتها ${surah.numberOfAyahs}`}
                secondary={`فى صفحة ${surah.page}`} />
        </ListItemButton>
    )
}

export default memo(QuranSurahItem);

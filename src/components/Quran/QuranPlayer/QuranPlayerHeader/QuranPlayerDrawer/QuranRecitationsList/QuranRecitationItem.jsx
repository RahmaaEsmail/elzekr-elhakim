import { useCallback, useContext } from 'react'
import QuranPlayerContext from '../../../QuranPlayerContext';
import { setRecitation } from '../../../../../../reducers/QuranPlayerActions';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { v4 as uuid } from 'uuid';
import '../QuranSurahsList/QuranSurahItem.css'
export default function QuranRecitationItem({ recitationId, value, recitationNumber }) {
    const [quranPlayerState, dispatchQuranPlayerState] = useContext(QuranPlayerContext);

    const handleChange = useCallback((name) => {
        dispatchQuranPlayerState(setRecitation(name));
    }, []);

    return (
        <ListItemButton
            key={uuid()}s
            sx={{
                pl: 4,
                backgroundColor: quranPlayerState.recitation === recitationId ? '#9B102C' : 'transparent',
            }}
            onClick={() => handleChange(recitationId)}>

            <ListItemIcon className='reader_number'>
                {recitationNumber}
            </ListItemIcon>

            <ListItemText
              className={quranPlayerState.recitation === recitationId?'name active':"name"}
                primary={value.name}
                style={{
                  display:'flex',
                  justifyContent:'space-between'
                 }}
                secondary={value.style ? ` (${value.style})` : ''} 
                />
        </ListItemButton>
    )
}

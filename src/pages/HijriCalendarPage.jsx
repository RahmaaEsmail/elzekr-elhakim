import HijriCalendarHeaderSection from '../components/Hijri-Calendar/HijriCalendarHeaderSection'
import HijriCalendarBody from '../components/Hijri-Calendar/HijriCalendarBody'
import { Box } from '@mui/material';
import HijriCalendarHeaderImage from '../components/Hijri-Calendar/HijriCalendarHeaderImage';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

export default function HijriCalendarPage({higriDate , setHigriDate}) {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  },[])
    return (
        <>
            <Helmet>
                <title>Hijri Calendar</title>
            </Helmet>
            <Box sx={{
                pt: 6,
                pb: 4
            }}>
                <HijriCalendarHeaderImage />
                <HijriCalendarHeaderSection />
                <HijriCalendarBody higriDate={higriDate} setHigriDate={setHigriDate} />
            </Box>
        </>
    )
}

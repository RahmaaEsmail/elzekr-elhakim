import HijriCalendarHeaderSection from '../components/Hijri-Calendar/HijriCalendarHeaderSection'
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import HijriCalendarByDateBody from '../components/Hijri-Calendar/HijriCalendarByDateBody';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { parseDateParam } from '../components/Hijri-Calendar/util';
import './HijriCalendarByDatePage.css'
import FullDate from '../components/Hijri-Calendar/HijriCalendarHeaderSection/FullDate';
import {
  parsePrayerTimes,
  parseGregorianDate,
  parseHijriDate,
  currentDate
} from '../components/Hijri-Calendar/util';
import { useFetch } from '../custom-hooks';
import { getDatesAndTimes } from '../apis';
export default function HijriCalendarByDatePage() {
    const { date:da } = useParams();
    const [dateObject, setDateObject] = useState(null);
    const [datesAndTimesURL, setDatesAndTimesURL] = useState(null);
    const { data, status } = useFetch({ url: datesAndTimesURL }, [datesAndTimesURL]);

    const hijriDate = useMemo(() => {
        if (!data) return null;
        return parseHijriDate(data.data.date.hijri);
    }, [data]);
    const gregorianDate = useMemo(() => {
      console.log(dateObject,"dateObjectdateObject")
        if (!data) return null;
        return parseGregorianDate(data.data.date.gregorian);
    }, [data]);

    const prayerTimes = useMemo(() => {
        if (!data) return null;
        return parsePrayerTimes(data.data.timings)
    }, [data]);
    useEffect(() => {
        setDateObject(parseDateParam(da));
    }, []);
    useEffect(() => {
      getDatesAndTimes(dateObject).then((res) => {
          setDatesAndTimesURL(res);
      });
  }, [dateObject]);

    return (
        <div className='cal_pray_page'>
            <Helmet>
                <title>Hijri Calendar by Day</title>
            </Helmet>
            {dateObject && (
                <div className=''>
                    <div className='pray_timings_calender'>
                      <div style={{width:'100%',marginBottom:'20px'}}>
                      <FullDate
                    hijriDate={hijriDate}
                    gregorianDate={gregorianDate} />
                      </div>
                      <HijriCalendarHeaderSection pageDate={dateObject} />
                        <HijriCalendarByDateBody setDateObject={setDateObject} />
                    </div>
                    {/* <Box sx={{
                        pt: 6,
                    }}>
                        <HijriCalendarHeaderSection pageDate={dateObject} />
                        <HijriCalendarByDateBody setDateObject={setDateObject} />
                    </Box> */}
                </div>
            )}
        </div>
    )
}

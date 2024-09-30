import DateForm from './DateForm'
import { Box } from '@mui/material'
import HijriCalendar from './HijriCalendar'
import { useEffect, useState } from 'react'

// x = new Date("2024-02-29")
// y = x.getTime() + (86400*1000)
// x = new Date(x.getTime() + (86400*1000))

export default function HijriCalendarBody({higriDate , setHigriDate}) {
    // const [higriDate , setHigriDate] = useState(localStorage.getItem("higri_date") ? JSON.parse(localStorage.getItem("higri_date")) : 0);
    const [date, setDate] = useState({
        month: Number(new Date().getMonth()) + 1,
        year: new Date().getFullYear()
    })

    // useEffect(() => {
    //     localStorage.setItem("higri_date" , JSON.stringify(higriDate));
    // } , [higriDate])

    useEffect(() => {
        console.log(new Date().getMonth() + 1)
        console.log(date?.month)
        console.log(date);
    } , [date])

    return (
        <Box component='main'>
            <DateForm setDate={setDate} higriDate={higriDate} setHigriDate={setHigriDate}/>
            <HijriCalendar date={date} setDate={setDate} higriDate={higriDate}/>
        </Box>
    )
}

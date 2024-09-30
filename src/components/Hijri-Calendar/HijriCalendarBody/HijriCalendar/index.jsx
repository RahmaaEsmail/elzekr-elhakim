import DateCards from "./DateCards";
import MonthDate from "./MonthDate";
import { Box, Container } from "@mui/material";
import { getHijriMonthDays } from "../../../../apis";
import {
  useFetch,
  isError,
  isLoading,
  isSuccess,
} from "../../../../custom-hooks";
import SpinnerLoading from "../../../SpinnerLoading";
import ErrorAlert from "../../../ErrorAlert";
import { useEffect, useState } from "react";

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const higriMonths =  [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الاخر",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة"
]
const days = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعه",
  "السبت",
];

export default function HijriCalendar({ date , setDate , higriDate}) {
    const { data, status } = useFetch(
      { url: getHijriMonthDays({ month: date.month, year: date.year }) },
      [date]
    );
    
    const [adjustedData, setAdjustedData] = useState([]);
   
    useEffect(() => {
      if (isSuccess(status) && data?.data) {
        const newData = data?.data?.map((day) => {
          const hijriDateStr = day?.hijri?.date;
          const gregorianDateStr = day?.gregorian?.date;
          
          const [dayGreg, monthGreg, yearGreg] = gregorianDateStr.split("-");
          const [dayHijri, monthHijri, yearHijri] = hijriDateStr.split("-");
  
          const formattedGregorianDate = `${yearGreg}-${monthGreg}-${dayGreg}`;
          const formattedHijriDate = `${yearHijri}-${monthHijri}-${dayHijri}`;
          
          const newGregorianDate = new Date(formattedGregorianDate);
          const newHijriDate = new Date(formattedHijriDate);
  
          const updatedGregorianDate = new Date(
            newGregorianDate.getTime() + 86400 * 1000 * higriDate
          );
  
          const updatedHijriDate = new Date(
            newHijriDate.getTime() + 86400 * 1000 * higriDate
          );
  
          const hijriDayStr = updatedHijriDate.getDay();
          const hijriMonthStr = updatedHijriDate.getMonth() + 1;
  
          const hijriDay2 = updatedHijriDate.getDate().toString().padStart(2, "0");
          const hijriMonth2 = (updatedHijriDate.getMonth() + 1).toString().padStart(2, "0");
          const hijriYear2 = updatedHijriDate.getFullYear();
  
          const gregorianDayStr = updatedGregorianDate.getDay();
          const gregorianMonthStr = updatedGregorianDate.getMonth() + 1;
  
          const gregorianDay2 = updatedGregorianDate
            .getDate()
            .toString()
            .padStart(2, "0");
          const gregorianMonth2 = (updatedGregorianDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const gregorianYear2 = updatedGregorianDate.getFullYear();
          // setDate({...date , year : gregorianYear2  , month : gregorianMonth2});

          return {
            ...day,
            gregorian: {
              ...day.gregorian,
              date: `${gregorianDay2}-${gregorianMonth2}-${gregorianYear2}`,
              day: gregorianDay2,
              format: "DD-MM-YYYY",
              year: gregorianYear2.toString(),
              weekday: { en: days[gregorianDayStr] },
              month: { number: gregorianMonth2, en: months[gregorianMonthStr] },
            },
            hijri: {
              ...day.hijri,
              date: `${hijriDay2}-${hijriMonth2}-${hijriYear2}`,
              day: hijriDay2,
              format: "DD-MM-YYYY",
              year: hijriYear2.toString(),
              weekday: { en: days[hijriDayStr] },
              month: { number: hijriMonth2, en: higriMonths[hijriMonthStr] },
            },
          };
        });

        setAdjustedData(newData);
      }
    }, [data, status , higriDate]);
  
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("calendar_date")))
    } , [])

    return (
      <Box component="main">
        <Container maxWidth="lg">
          {isLoading(status) && <SpinnerLoading />}
          {isError(status) && <ErrorAlert />}
          {isSuccess(status) && (
            <>
              <MonthDate date={date} />
              <DateCards higriDate={higriDate} data={adjustedData} />
            </>
          )}
        </Container>
      </Box>
    );
}

// export default function HijriCalendar({ date, higriDate }) {
//   console.log(date);
//   const { data, status } = useFetch(
//     { url: getHijriMonthDays({ month: date.month, year: date.year }) },
//     [date]
//   );
//   const [adjustedData, setAdjustedData] = useState( localStorage.getItem("calendar_date") ? JSON.parse(localStorage.getItem("calendar_date")) :  []);

//   useEffect(() => {
//     if (isSuccess(status) && data?.data) {
//       const newData = data?.data?.map((day) => {
//         const higriDatee = day?.hijri?.date;
//         const gregorianDatee = day?.gregorian?.date;
//         const [daay, month, year] = gregorianDatee.split("-");
//         const [higriDay , higriMonth , higriYear] = higriDatee.split("-");
//         const formattedGregorianDate = `${year}-${month}-${daay}`;
//         const formattedHigriDatee = `${higriYear}-${higriMonth}-${higriDay}`;
//         const newGreorianDate = new Date(formattedGregorianDate);
//         const newHigriDate = new Date(formattedHigriDatee);
//         // const gregorianDateAfter = newGreorianDate.getTime() + (86400 *  1000 * higriDate);
//         const formattedGregorianDateResult = new Date(
//           newGreorianDate.getTime() + 86400 * 1000 * higriDate
//         );
//         const formattedHigriDateeResult = new Date(
//             newHigriDate.getTime() + 86400 * 1000 * higriDate
//         )
        
//         const higirDayStr = formattedHigriDateeResult.getDay();
//         const higriMonthStr = formattedHigriDateeResult.getMonth() + 1;
//         const higriDay2 = formattedHigriDateeResult.getDate().toString().padStart(2,"0");
//         const higriMonth2 = (formattedHigriDateeResult.getMonth() + 1)
//         .toString()
//         .padStart(2, "0");
//         const higriYear2 = formattedHigriDateeResult.getFullYear();

//         const gregorianDayStr = formattedGregorianDateResult.getDay();
//         const gregorianMonthStr = formattedGregorianDateResult.getMonth() + 1;
//         const gregorianDay = formattedGregorianDateResult
//           .getDate()
//           .toString()
//           .padStart(2, "0"); // إضافة 0 عند الحاجة
//         const gregorianMonth = (formattedGregorianDateResult.getMonth() + 1)
//           .toString()
//           .padStart(2, "0"); // الأشهر تبدأ من 0، لذلك نضيف 1
//         const gregorianYear = formattedGregorianDateResult.getFullYear();

//         return {
//           ...day,
//           gregorian: {
//             ...day.gregorian,
//             date: `${gregorianDay}-${gregorianMonth}-${gregorianYear}`,
//             day: gregorianDay,
//             format: "DD-MM-YYYY",
//             year: gregorianYear.toString(),
//             weekday: { en: days[gregorianDayStr] },
//             month: { number: gregorianMonth, en: months[gregorianMonthStr] },
//           },
//           hijri : {
//             ...day.higri,
//             date: `${higriDay2}-${higriMonth2}-${higriYear2}`,
//             day: higriDay,
//             format: "DD-MM-YYYY",
//             year: higriYear2.toString(),
//             weekday: { en: days[higirDayStr] },
//             month: { number: higriMonth2, en: higriMonths[higriMonthStr] }, 
//           }
//         };
//       });
     
//       console.log(newData);
//       localStorage.setItem("calendar_date" , JSON.stringify(newData))
//       setAdjustedData(newData);
//     }
//   }, [data, status, higriDate]);
 
//   return (
//     <Box component="main">
//       <Container maxWidth="lg">
//         {isLoading(status) && <SpinnerLoading />}
//         {isError(status) && <ErrorAlert />}
//         {isSuccess(status) && (
//           <>
//             <MonthDate date={date} />
//             <DateCards higriDate={higriDate} data={adjustedData} />
//           </>
//         )}
//       </Container>
//     </Box>
//   );
// }

import QuranPlayer from '../components/Quran/QuranPlayer'
import QuranPageHeader from '../components/Quran/QuranPageHeader'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'

export default function QuranPage({fontSize}) {
  console.log(fontSize)
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])
    return (
      <>
        <Helmet>
          <title>Quran Player</title>
        </Helmet>
        <QuranPageHeader />
        <QuranPlayer fontSize={fontSize}/>
      </>
    )
}

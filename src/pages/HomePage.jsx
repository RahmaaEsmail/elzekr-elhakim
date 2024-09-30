import HomeHeader from '../components/Home/HomeHeader'
import HomeBody from '../components/Home/HomeBody'
import { Box } from '@mui/material';
import { useEffect } from 'react';

export default function HomePage() {
  // const lat = position.coords.latitude;
  // const lng = position.coords.longitude;
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])
    return (
        <Box>
          <HomeHeader />
          <HomeBody />
        </Box>
    )
}

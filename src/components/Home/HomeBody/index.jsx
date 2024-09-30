import HomeBodySections from './HomeBodySections'
import { Box } from '@mui/material'
import HijriCalendarSection from './HijriCalendarSection'
import DescriptionSection from './DescriptionSection'
import homeSections from '../../../data/homeSections'
import { Link, useNavigate } from "react-router-dom";
import './descriptionsection.css'
export default function index() {
  // const history = useNavigate();
      return (
        <Box style={{overflow:'hidden'}} component='main'>
            <HijriCalendarSection />
            <DescriptionSection/>
              <div className="quoran_sec">
                <div className="content">
                  <h5>أيه</h5>
                  <p>{homeSections[0].description}</p>
                  <Link
                    to={"/quran"}
                  >القرءان الكريم</Link>
                </div>
              </div>
              <div className="azkar_sec quoran_sec">
                <div className="content">
                  <h5>أذكار</h5>
                  <p>{homeSections[1].description}</p>
                  <Link
                    to={"/azkar"}
                  >أذكار</Link>
                </div>
              </div>
            {/* <HomeBodySections /> */}
        </Box>
    )
}

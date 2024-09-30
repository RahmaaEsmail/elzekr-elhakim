import { Container, Typography, Box } from '@mui/material';
import './index.css'
import { useNavigate } from 'react-router-dom';
export default function HomeHeader() {
  const navigate=useNavigate()
    return (
        <Box component='header'
            sx={{
                width: '100%',
                // height: '60vh',
                paddingTop:'30px'
            }}
        >
            <Box

                sx={{
                    // position: 'absolute',
                    width: '100%',
                    // height: '100%',
                    maxHeight:'100%',
                    paddingTop:'100px',
                    height:'100vh',
                    backgroundImage: 'url(images/banner.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // filter: 'blur(2px) brightness(0.7) contrast(1.2) sepia(0.8) hue-rotate(10deg)',
                }}
            />
            <Container style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                height:'100%'
            }} maxWidth="lg" sx={{ zIndex: 1 }}>
                {/* <Box component='img'
                    src="svg/basmala.svg"
                    alt="بسم الله الرحمن الرحيم"
                    sx ={{
                        width: '100%',
                        maxWidth: '500px',
                        display: 'block',
                        margin: 'auto',
                        filter: 'brightness(0) invert(1)',
                    }}
                /> */}
                {/* <Typography
                    className='ayah-font'
                    variant='h4'
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        mt: 3
                    }}>
                    كِتَٰبٌ أَنزَلۡنَٰهُ إِلَيۡكَ مُبَٰرَكٞ لِّيَدَّبَّرُوٓاْ ءَايَٰتِهِۦ وَلِيَتَذَكَّرَ أُوْلُواْ ٱلۡأَلۡبَٰبِ
                </Typography> */}
            {/* <div
              className='banner_content'
              style={{zIndex:'9999',position:'relative'}}
            >
              <h2>إسلامنا</h2>
              <h4>بالتفكير الإيجابي والاستماع بتأنٍ، وبالتواضع والعطاء، نبني جسور الثقة والتسامح، ونملأ حياتنا بالسعادة والمعنى، مؤثرين بأفعالنا الطيبة في حياة الآخرين</h4>
            </div> */}
            </Container>
            <div className="links_texts">
              <div className="page page_know" style={{padding:'10px',display:'block',backgroundColor:'transparent'}}>
                <h4 style={{color:'black',textAlign:'start',fontSize:'22px',margin:'0px'}}>تعلم منا</h4>
                <p style={{margin:'0px'}}>يهدف موقعنا لتعليم كل المسلميين تعاليم دينهم والقرءان الكريم والحديث النبوى الشريف</p>
              </div>
              <div className='pages_links'>
              <div className='page'>
                <img src="/images/icon.png" alt="" />
                <div
                  onClick={()=>{
                    navigate("/quran")
                  }}
                >
                  <h4>القرأن الكريم</h4>
                </div>
                <div className="icon">
                  <div className="icon_container">
                    <img src="/images/quran.png" alt="" />
                  </div>
                </div>
              </div>
              <div className='page'>
              <img src="/images/icon.png" alt="" />
                <div
                  onClick={()=>{
                    navigate("/hadith")
                  }}
                >
                  <h4>الأحاديث</h4>
                </div>
                <div className="icon">
                  <div className="icon_container">
                    <img src="/images/hadees.png" alt="" />
                  </div>
                </div>
              </div>
              <div className='page'>
              <img src="/images/icon.png" alt="" />
                <div
                  onClick={()=>{
                    navigate("/hijri-calendar")
                  }}>
                  <h4>التقويم الهجرى</h4>
                </div>
                <div className="icon">
                  <div className="icon_container">
                    <img src="/images/calender.png" alt="" />
                  </div>
                </div>
              </div>
              <div className='page'>
              <img src="/images/icon.png" alt="" />
                <div
                  onClick={()=>{
                    navigate("/azkar")
                  }}>
                  <h4>الأذكار</h4>
                </div>
                <div className="icon">
                  <div className="icon_container">
                    <img src="/images/azkar.png" alt="" />
                  </div>
                </div>
              </div>
              </div>
              <div className="page page_know" style={{padding:'10px',display:'block',backgroundColor:'transparent'}}>
                <h4 style={{color:'black',textAlign:'start',fontSize:'22px',margin:'0px'}}>تعلم منا</h4>
                <p style={{margin:'0px'}}>يهدف موقعنا لتعليم كل المسلميين تعاليم دينهم والقرءان الكريم والحديث النبوى الشريف</p>
              </div>
            </div>
        </Box>
    )
}

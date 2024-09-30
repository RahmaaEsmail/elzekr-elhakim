import React from 'react'
import './hajomar.css'
const HajOmraBanner = () => {
  return (
    <div className='haj_omra_banner'>
        <div className="video-background">
      <video autoPlay muted loop className="video">
        <source src="https://www.haj.gov.sa/assets/images/haj-v3.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div>
          <h5>الحج والعمره</h5>
          <p>تقبل الله منا ومنكم وجعلنا ممن ينظر إليهم الرحمن فيقول اذهبوا مغفور لكم. الحمد لله حمدً كثيرًا وهدانا للإسلام وجعلنا مسلمين، الحمد لله على فرض الحج في حياتنا، ورتب على هذا الركن الكثير من الأجر والإنعام، وأشهد أن لا إله إلا الله وأشهد أن محمد عبده ورسوله</p>
        </div>
      </div>
      <div className="content_2">
        <div>
          <a href="#videos">
          <h4>الفديوهات</h4>
          <div style={{ left:'50%' }}>
            <span></span>
            <span></span>
          </div>
          </a>
        </div>
        <div>
          <a href="#images">
            <h4>صور</h4>
            <div  style={{ left:'50%' }}>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
        <div>
          <a href="#sounds">
            <h4>التعليق الصوتى</h4>
            <div  style={{ left:'50%' }}>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
        <div>
          <a href="#infos">
            <h4>معلومات شامله</h4>
            <div  style={{ left:'50%' }}>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default HajOmraBanner

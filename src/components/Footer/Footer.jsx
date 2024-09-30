import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../../constants';
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
const Footer = () => {
  const [message,setMessage]=useState('');
  const [messLoading,setMessLoading]=useState(false);
  const handleSend=()=>{
    setMessLoading(true)
    const data_send={
      message
    }
    axios.post(BASE_URL+'messages/add_message',data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        setMessage('')
        toast.success(res.data.message)
      }
      else if(res.data.status=='faild'){
        toast.error(res.data.message)
      }
      else {
        toast.error('حدث خطأ ما')
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setMessLoading(false)
    })
  }
  return (
    <footer class="footer-section">
      <div class="container">
        <div class="footer-cta pt-5 pb-5">
          <div class="row">
            {/* <div class="col-xl-4 col-md-4 mb-30">
              <div class="single-cta">
                <i class="fas fa-map-marker-alt"></i>
                <div class="cta-text">
                  <h4>تجدنا فى</h4>
                  <span>الإمارات</span>
                </div>
              </div>
            </div> */}
            <div class="col-xl-4 col-md-4 mb-30">
              <div class="single-cta">
                <i class="fas fa-phone"></i>
                <div class="cta-text">
                  <h4>تواصل معنا</h4>
                  <span>9876543210 0</span>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-30">
              <div class="single-cta">
                <i class="far fa-envelope-open"></i>
                <div class="cta-text">
                  <h4>البريد الإلكترونى</h4>
                  <span>mail@info.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-content pt-5 pb-5">
          <div class="row">
            <div class="col-xl-4 col-lg-4 mb-50">
              <div class="footer-widget">
                <div class="footer-logo">
                  <Link to="/">
                    <img src="/images/logo2 (2).png" class="img-fluid" alt="logo" />
                  </Link>
                </div>
                <div class="footer-text">
                  <p>نتمنى لك تصفح رائع ومفيد</p>
                </div>
                <div class="footer-social-icon">
                  <span>تابعنا</span>
                  <a href="#">
                    <i class="fab fa-facebook-f facebook-bg"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-twitter twitter-bg"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-google-plus-g google-bg"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div class="footer-widget">
                <div class="footer-widget-heading">
                  <h3>لينكات</h3>
                </div>
                <ul>
                  <li>
                    <Link to="/">الرئيسيه</Link>
                  </li>
                  <li>
                    <Link to="/quran">القرءان</Link>
                  </li>
                  <li>
                    <Link to="/azkar">الأذكار</Link>
                  </li>
                  <li>
                    <Link to="/library">المكتبه</Link>
                  </li>
                  <li>
                    <Link to="/my_books">مكتبتى</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div class="footer-widget">
                <div class="subscribe-form">
                  <textarea value={message} onChange={(e)=>{
                    setMessage(e.target.value)
                  }} className="form-control" name="" placeholder="إكتب رأيك" id=""></textarea>
                </div>
                  {
                    messLoading?
                    (
                      <div className="spinner_message">
                        <Spinner/>
                      </div>
                    )
                    :
                    (
                      <button onClick={()=>{
                        handleSend()
                      }} className="my-2 btn" style={{backgroundColor:"#9B102C", color:"white"}}>إرسال</button>
                    )
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright-area">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 text-center text-lg-left">
              <div class="copyright-text">
                <p>
                  Copyright &copy; 2024, جميع الحقوق محفوظة لدي الذكر الحكيم
                </p>
              </div>
            </div>
            {/* <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                        <div class="footer-menu">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Policy</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

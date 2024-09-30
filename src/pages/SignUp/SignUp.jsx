import React, { useState } from 'react'
import './signup.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { useSelector } from 'react-redux';
import FacebookLoginSocial from './facebooklogin';
import GoogleLoginSocial from './googlelogin';

// import { toast } from 'react-toastify';
const SignUp = () => {
  const {language}=useSelector(s=>s.language);
  const navigate=useNavigate()
  const [showPass,setShowPass]=useState(false);
  const [provider, setProvider] = useState();
  const [type, setType] = useState("custom");
  const [response, setResponse] = useState();
  const [signData,setSignData]=useState({
    name:'',
    email:'',
    password:'',
  });
  const [signLoading,setSignLoading]=useState(false)
  const handleSign=()=>{
    if(signData.name==''){
      toast.warn("قم بإدخال الإسم")
      return
    }
    if(signData.email==''){
      toast.warn("قم بإدخال البريد الإلكترونى")
      return
    }
    if(signData.password==''){
      toast.warn("قم بإدخال كلمة السر")
      return
    }
    setSignLoading(true)
    const data_send={
      ...signData
    }

    axios.post(BASE_URL+"user/sign_up",data_send,{
      headers:{
        lang:language
      }
    })
    .then((res)=>{
      console.log(res.data.status)
      if(res.data.status=='success'){
        // console.log(res.data.result)
        localStorage.setItem('elzekr_data',JSON.stringify(res.data.result));
        toast.success(res.data.message)
        navigate("/",{replace:true})
        // window.location.reload()
      }
      else if(res.data.status=='faild'){
        toast.error(res.data.message)
        // console.log(res.data)
        // console.log(res.data.message)
      }
      else {
        toast.error('حدث خطأ ما')
      }
    }).catch(e=>{
      console.log(e.response);
      if(e.response.status==422){
      console.log(e.response.data);
      }
    }).finally(()=>{
    setSignLoading(false)
    })
  }
  return (
    <div className='sign_up'>
      <div className="sign_up_content">
        <div className="right">
          <h5>الذكر الحكيم</h5>
          <h6>نعلمك من أمور دينك حتى ترقى</h6>
          <p>لا يصلح المؤمن دينه حتى يصلح قلبه</p>
          <img src="/images/signimg.jpg" alt="" />
        </div>
        <div className="left">
          <h5>إنشاء حساب</h5>
          <form onSubmit={(e)=>{
            e.preventDefault()
            handleSign()
          }} action="">
            <div>
              <label htmlFor="name">الإسم بالكامل</label>
              <input onChange={(e)=>{
                setSignData({...signData,name:e.target.value})
              }} id='name' type="text" placeholder='الإسم كاملا' />
            </div>
            <div>
              <label htmlFor="email">البريد الإلكترونى</label>
              <input onChange={(e)=>{
                setSignData({...signData,email:e.target.value})
              }} id='email' type="text" placeholder='البريد الإلكترونى' />
            </div>
            <div>
              <label htmlFor="pass">كلمة السر</label>
              <div>

                <input onChange={(e)=>{
                setSignData({...signData,password:e.target.value})
              }} id='pass' type={showPass?"text":"password"} placeholder='كلمة السر' />
                {
                  showPass?
                  (
                    <FaEye
                      onClick={()=>{
                        setShowPass(!showPass)
                      }}
                    />
                  )
                  :
                  (
                    <FaEyeSlash onClick={()=>{
                      setShowPass(!showPass)
                    }} />
                  )
                }
              </div>
            </div>
            {
              signLoading?
              (
                <div className='sign_loading'>
                  <ThreeDots height={10}/>
                </div>
              )
              :
              (
                <button>تسجيل</button>
              )
            }




            <div className='have_account'>
              <span>إذا كنت تمتلك حساب</span>
              <span
                onClick={()=>{
                  navigate('/login')
                }}
              >سجل الدخول</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp

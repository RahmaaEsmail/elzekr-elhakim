import React, { useEffect, useState } from 'react'
// import './signup.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';

// import { toast } from 'react-toastify';
const SendCode = () => {
  const navigate=useNavigate()
  const [showPass,setShowPass]=useState(false);
  const [loginData,setLoginData]=useState({
    email:'',
    password:'',
  });
  const [message,setMessage]=useState('');
  const [signLoading,setSignLoading]=useState(false)
  const handleSign=()=>{
    // console.log(loginData)
    if(loginData.email==''){
      toast.warn("قم بإدخال البريد الإلكترونى")
      return
    }
    setSignLoading(true)
    const data_send={
      ...loginData
    }
    axios.post(BASE_URL+"user/send_code",data_send,{
      headers:{
        lang:'ar'
      }
    })
    .then((res)=>{
      // console.log(res)
      console.log(res.data)
      if(res.data.status=='success'){
        toast.success(res.data.message);
        navigate("/change_password",{replace:true,state:{email:loginData.email}});
      }
      else if(res.data.status=='failed'){
        toast.error(res.data.message)
      }
      else {
        toast.error('حدث خطأ ما')
      }
    }).catch(e=>{
      console.log(e);
    }).finally(()=>{
    setSignLoading(false)
    })
  }
  useEffect(()=>{
    setTimeout(() => {
      setMessage('')
    }, 2000);
  },[message])
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
          <h5>نسيت كلمة المرور</h5>
          <form  className='check_code' onSubmit={(e)=>{
            e.preventDefault()
            handleSign()
          }} action="">
            <div>
              <label htmlFor="email">البريد الإلكترونى</label>
              <input onChange={(e)=>{
                setLoginData({...loginData,email:e.target.value})
              }} id='email' type="text" placeholder='البريد الإلكترونى' />
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
                <button>إرسال الكود</button>
              )
            }
            <p>{message&&message}</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendCode

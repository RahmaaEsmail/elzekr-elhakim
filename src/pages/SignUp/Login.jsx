import React, { useEffect, useState } from 'react'
import './signup.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import FacebookLoginSocial from './facebooklogin';
import GoogleLoginSocial from './googlelogin';

// import { toast } from 'react-toastify';
const Login = () => {
  const navigate=useNavigate()
  const [showPass,setShowPass]=useState(false);
  const [provider, setProvider] = useState();
  const [type, setType] = useState("custom");
  const [response, setResponse] = useState();
  const [loginData,setLoginData]=useState({
    email:'',
    password:'',
  });
  const [message,setMessage]=useState('');
  const [signLoading,setSignLoading]=useState(false)
  const handleSign=()=>{
    // console.log(loginData)
    if(loginData.email==''&&type!='social'){
      toast.warn("قم بإدخال البريد الإلكترونى")
      return
    }
    if(loginData.password==''&&type!='social'){
      toast.warn("قم بإدخال كلمة السر")
      return
    }
    // setSignLoading(true)
    const data_send={
      ...loginData,
      type
    }
    if(type=='social'){
      data_send['provider']=provider
      data_send['name']=response?.name
      data_send['email']=response?.email
      data_send['id']=response?.id
      data_send['provider']=provider
    }
    // console.log(data_send);
    // return ;

    axios.post(BASE_URL+"user/login",data_send,{
      headers:{
        lang:'ar'
      }
    })
    .then((res)=>{
      // console.log(res)
      console.log(res.data)
      if(res.data.status=='success'){
        setMessage(res.data.message)
        localStorage.setItem('elzekr_data',JSON.stringify(res.data.result));
        toast.success(res.data.message)
        // alert(res.data.message)
        navigate("/",{replace:true})
        window.location.reload()
      }
      else if(res.data.status=='failed'){
        toast.error(res.data.message)
        setMessage(res.data.message)
        // alert(res.data.message)
        // console.log(res.data.message,"qwweq")
        // console.log(res.data.message)
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

  useEffect(() => {
    if (
      (provider == "Google" || provider == "Facebook") &&
      response &&
      type == "social"
    ) {
      handleSign();
    } else {
      setType("custom");
    }
    // alert("f");
  }, [provider, response, type]);

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
          <h5>تسجيل دخول</h5>
          <form onSubmit={(e)=>{
            e.preventDefault()
            handleSign()
          }} action="">
            <div>
              <label htmlFor="email">البريد الإلكترونى</label>
              <input onChange={(e)=>{
                setLoginData({...loginData,email:e.target.value})
              }} id='email' type="text" placeholder='البريد الإلكترونى' />
            </div>
            <div>
              <label htmlFor="pass">كلمة السر</label>
              <div>

                <input onChange={(e)=>{
                setLoginData({...loginData,password:e.target.value})
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
            <p>{message&&message}</p>


            <div className='have_account'>
              <span>إذا كنت لا تمتلك حساب</span>
              <span
                onClick={()=>{
                  navigate('/sign_up')
                }}
              >سجل حساب جديد</span>
            </div>
            <div className="socialsLogin">
              <FacebookLoginSocial
                language={"ar"}
                setProvider={setProvider}
                setType={setType}
                setResponse={setResponse}
              />
              <GoogleLoginSocial
                language={"ar"}
                setProvider={setProvider}
                setResponse={setResponse}
                setType={setType}
              />
            </div>
            <div>
              <span onClick={()=>{
                navigate('/send_code');
              }} className='forget_pass'>هل نسيت كلمة المرور</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

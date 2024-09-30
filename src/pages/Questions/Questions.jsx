import React, { useEffect, useState } from 'react'
import './Questions.css'
import axios from 'axios';
import { BASE_URL } from '../../constants';
import ContentLoader from 'react-content-loader';
import { MdDone } from "react-icons/md";
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchInfoData } from '../../store/userinfo';
import { useNavigate } from 'react-router-dom';
const Questions = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const localData=localStorage.getItem("elzekr_data");
  const userData=localData&&JSON.parse(localData);
  const [questions,setQuestions]=useState([]);
  const [pageLoading,setPageLoading]=useState(false)
  const [ansLoading,setAnsLoading]=useState(false)
  const [actNext,setActNext]=useState(false)
  const [showAnswer,setShowAnswer]=useState(false);
  const [showedMessage,setShowedMessage]=useState('');
  const [currentQuestion,setCurrentQuestion]=useState(0);
  const getQuestions=()=>{
    setPageLoading(true)
    axios.get(BASE_URL+`questions/get_for_user/${userData?.id}`)
    .then((res)=>{
      // console.log(res.data.result)
      if(Array.isArray(res.data.result)){
        let pushedData=[];
        let questions=[...res.data?.result];
        for(let i=0;i<questions.length;i++){
          let answers=[...questions[i].answers];
          for(let k=0;k<answers.length;k++){
            answers[k]['selected']=false;
          }
          let obj={
            selected:false,
            ...questions[i],
          }
          pushedData.push(obj);
        }
        setQuestions(pushedData);
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }
  const handleCheck=(item)=>{
    if(userData?.id==null){
      setShowedMessage('سجل أولا')
      toast.warn('سجل أولا')
      navigate("/sign_up")
      return
    }
    setAnsLoading(true)
    const data_send={
      user_id:userData?.id,
      question_id:item.id,
      answer_id:item.answers.filter((it)=>it.selected)[0].id
    }
    axios.post(BASE_URL+'question_answers/answe_question',data_send,{
      headers:{
        lang:'ar'
      }
    })
    .then((res)=>{
      // console.log(res)
      if(res.data.status=='success'){
        setActNext(true)
        if(res.data.statusCode==202){
          toast.error(res.data.message)
        }
        else {
          dispatch(fetchInfoData())
          toast.success(res.data.message);
        }
        setShowAnswer(true)
      }
      else {
        toast.error(res.data.message);
      }
      // setShowedMessage(res.data.message)
      // getQuestions();

      // setCurrentQuestion(currentQuestion+1)
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setAnsLoading(false)
    })
  }
  useEffect(()=>{
    setTimeout(() => {
      // setShowedMessage(res.data.message)
      // getQuestions();
      setShowAnswer(false)
      setShowedMessage('')
    }, 2000);
  },[showedMessage])
  useEffect(()=>{
    getQuestions()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  },[])
  return (
    <div className='questions_page'>
      {
        pageLoading?
        (
          <div style={{height:"80vh",display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ContentLoader
            viewBox="0 0 380 100"
            speed={1}
            // backgroundColor={'green'}
            >
              <rect x="10" y="10" rx="10" ry="10" width="100" height="80" />
              <rect x="120" y="10" rx="10" ry="10" width="100" height="80" />
              <rect x="230" y="10" rx="10" ry="10" width="100" height="80" />
            </ContentLoader>
          </div>
        )
        :
        (
          questions.length>0?(
            <div className="questions_content">
          {
            questions?.map((item,index)=>{
              if(currentQuestion==index){
                return(
                  <div className="question">
                    <div className='text-center mb-2'>
                      <img style={{width:'150px'}} src="/images/question-mark.png" alt="" />
                    </div>
                    <div className="question_title">
                      <h4>
                        <span>{item.question_ar}: </span>
                      </h4>
                    </div>
                      <div className="answers">
                        {
                          item?.answers&&item?.answers.length>0&&item?.answers.map((ans,indAns)=>{
                            return(
                              <h4
                                className={
                                  showAnswer?
                                  ans.status==1?
                                  'ans true'
                                  :
                                  'ans not_true'
                                  :
                                  'ans'
                                }
                                onClick={()=>{
                                  let ques=[...questions];
                                  let ansses=[...questions[currentQuestion]['answers']];
                                  for(let i=0;i<ansses.length;i++){
                                    if(i==indAns){
                                      ansses[i]['selected']=true
                                    }
                                    else {
                                      ansses[i]['selected']=false;
                                    }
                                  }
                                  ques[currentQuestion]['answers']=ansses;
                                  setQuestions(ques);
                                  setQuestions(questions.map((it)=>{
                                    return {...it,selected:it.id==item.id?true:it.selected}
                                  }))
                                }}
                              >
                                <span className='sel_ans'>
                                  {
                                    ans?.selected&&
                                    <>
                                      <MdDone />
                                    </>
                                  }
                                </span>
                                <span>{ans.answer_ar}</span>
                              </h4>
                            )
                          })
                        }
                      </div>
                      <div  className='text-center'>
                        <div>
                          {
                            ansLoading?
                            <div className='text-center'>
                              <Spinner/>
                            </div>
                            :
                            (
                              <div className='d-flex gap-2 justify-content-center'>
                                <button onClick={()=>{
                                handleCheck(item)
                              }} style={{cursor:item.selected?'pointer':'no-drop'}} disabled={!item.selected} className='btn btn-success mr-2'>إجابه</button>
                              <button
                                disabled={!actNext}
                                onClick={()=>{
                                  setShowAnswer(false)
                                  getQuestions();
                                }}
                                className='btn btn-primary'
                              >التالى</button>
                              </div>
                            )
                          }
                        </div>
                        {/* <p>{showedMessage!=''&&showedMessage}</p> */}
                      </div>
                  </div>
                )
              }
              else return null
            })
          }
        </div>
          )
          :
          (
            <div style={{height:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <h5>لا يوجد أسئله الأن</h5>
            </div>
          )
        )
      }
    </div>
  )
}

export default Questions

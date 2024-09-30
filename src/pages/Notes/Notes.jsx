import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { DeleteOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import './notes.css';
import { FaXmark } from "react-icons/fa6";
import ReactQuill from "react-quill";
import axios from "axios";
import { BASE_URL } from '../../constants';
import ContentLoader from "react-content-loader";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
// import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
const Notes = () => {
  const {language}=useSelector(s=>s.language)
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData)
  // console.log(userData)

  // const editor = useCreateBlockNote();
  const [addLoading,setAddLoading]=useState(false)
  const [delLoading,setDelLoading]=useState(false);
  const colors=['#45a2c4','#154a74','#151414','#bb8fce',' #c0392b']
  const [notes,setNotes]=useState([
  ]);
  const [newNote,setNewNote]=useState({
      title:'',
      content:'',
  });
  const [pageLoading,setPageLoading]=useState(false);
  const handleChangeVal=(val,index,name)=>{
    let list =[...notes];
    list[index][name]=val;
    setNotes(list)
  }
  const getMyNotes=()=>{

    setPageLoading(true)
    axios.get(BASE_URL+`notes/get_my_notes/${userData?.id||0}`,{
      headers:{
        lang:language
      }
    })
    .then((res)=>{
      console.log(res.data)
      if(Array.isArray(res.data.result)){
        console.log(res.data.result)
        setNotes(res.data.result.map((item,index)=>{
          return {...item,loading:false,delLoading:false}
        }));
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }

  const handleEditOne=(id)=>{
    let filteredItem=notes.filter(it=>it.id==id)[0];
    let data_send={
      ...filteredItem,
      user_id:userData?.id||0
    }
    setNotes(notes.map((item)=>{
      return {...item,loading:item.id==id?true:item.loading}
    }))
    console.log(data_send)
    // return
    axios.post(BASE_URL+`notes/update_one/${id}`,data_send,{
      headers:{
        lang:language
      }
    })
    .then((res)=>{
      console.log(res)
      if(res.data.status=='success'){
        toast.success(res.data.message)
        getMyNotes()
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
    setNotes(notes.map((item)=>{
      return {...item,loading:item.id==id?false:item.loading}
    }))
    })
  }
  const handleAdd=()=>{
    if(userData?.id==null){
      alert('سجل أولا')
      return
    }
    if(newNote.title==''){
      toast.warn("أدخل العنوان");
      return;
    }
    if(newNote.content==''){
      toast.warn("أدخل محتوى");
      return;
    }
    setAddLoading(true)
    const data_send={
      ...newNote,
      bg_color:colors[Math.floor(Math.random()*colors.length)],
      user_id:userData?.id||0
    }
    axios.post(BASE_URL+`notes/add_new`,data_send,{
      headers:{
        lang:language
      }
    })
    .then((res)=>{
      console.log(res)
      if(res.data.status=='success'){
        getMyNotes();
        setNewNote({
          title:'',
          content:'',
          user_id:'',
        })
      }
    }).catch(e=>console.log(e))
    .finally(()=>{
      setAddLoading(false)
    })
  }
  const handleDelete=(id)=>{
    // setDelLoading(true)

    setNotes(notes.map((item,index)=>{
      return {...item,loading:false,delLoading:item.id==id?true:item.delLoading}
    }));
    axios(BASE_URL+`notes/delete_one/${id}`,{
      headers:{
        lang:language
      }
    })
    .then((res)=>{
      console.log(res)
      if(res.data.status=='success'){
        getMyNotes();
        toast.success(res.data.message);
      }
    }).catch(e=>console.log(e))
    .finally(()=>{
      setDelLoading(false)
      setNotes(notes.map((item,index)=>{
        return {...item,loading:false,delLoading:item.id==id?false:item.delLoading}
      }));
    })
  }
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
    getMyNotes()
  },[])
  return (

      pageLoading?
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
      :
      (
        <div className='notes_page'>
      <div className="right">
        <div className="notes">

        <div className='note' >

        <div style={{backgroundColor:'#000'}} className="color_top">
        <div style={{paddingRight:'10px'}} className="close">

          <div
           style={{padding:'10px'}}
            className="add_new_note"
                  onClick={()=>{
                    if(addLoading){
                      return
                    }
                    handleAdd()
                    // if(item)
                    // handleEditOne(item.id)
                  }}
                  >
                    {
                      addLoading?
                      <Spinner/>
                      :
                      <button
                    >حفظ </button>
                    }
                  </div>
        </div>
        </div>
        <div className='bottom'>
          <div className="title">
            <textarea value={newNote.title} placeholder="العنوان" onChange={(e)=>{
              // handleChangeVal(e.target.value,index,e.target.name)
              setNewNote({...newNote,title:e.target.value})
            }} name="title" id="" cols="1" rows="2"></textarea>
            {/* <input type="text" placeholder="العنوان" /> */}
          </div>
            <ReactQuill

              placeholder="...."
              theme="snow"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote"],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ direction: "rtl" }],
                  [{ size: ["small", true, "large", "huge"] }],
                  [{ color: [] }],
                  [{ align: [] }],
                ],
              }}
              value={
                newNote.content
              }
              onChange={(e) => {
                setNewNote({...newNote,content:e})
              }}
              style={{  color: 'black',maxWidth:'100%',width:'100%' }}
            />
        </div>
        </div>

          {
            notes.map((item,index)=>{
              return<div className='note' >

                <div style={{backgroundColor:item.bg_color}} className="color_top">
                <div className="close">
                 {
                  item.delLoading?
                  (
                    <div>
                    <Spinner/>
                    </div>
                  )
                  :
                  (
                    <FaXmark  onClick={()=>{
                      handleDelete(item.id);
                      // setNotes(notes.filter(it=>it.id!=item.id))
                    }}/>
                  )
                 }
                  <div
                  onClick={()=>{
                    if(item.loading){
                      return
                    }
                    handleEditOne(item.id)
                  }}
                  >
                    {
                      item.loading?
                      <Spinner/>
                      :
                      <button

                    >تحديث التعديلات</button>
                    }
                  </div>
                </div>
                </div>
                <div className='bottom'>
                  <div className="title">
                    <textarea value={item.title} placeholder="العنوان" onChange={(e)=>{
                      handleChangeVal(e.target.value,index,e.target.name)
                    }} name="title" id="" cols="1" rows="2"></textarea>
                    {/* <input type="text" placeholder="العنوان" /> */}
                  </div>
                    <ReactQuill

                      placeholder="...."
                      theme="snow"
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline", "strike"],
                          ["blockquote"],
                          [{ header: 1 }, { header: 2 }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ indent: "-1" }, { indent: "+1" }],
                          [{ direction: "rtl" }],
                          [{ size: ["small", true, "large", "huge"] }],
                          [{ color: [] }],
                          [{ align: [] }],
                        ],
                      }}
                      value={
                        item.content
                      }
                      onChange={(e) => {
                        handleChangeVal(e,index,'content')
                      }}
                      style={{  color: 'black',maxWidth:'100%',width:'100%' }}
                    />
                    {console.log(item)}
                </div>
              </div>
            })
          }


        </div>
      </div>

    </div>
      )

  )
}

export default Notes

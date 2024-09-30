import React, { useEffect, useState } from 'react'
import './ElectronicRosary.css'
// import { tasbih } from '../../data/tasbih'
import { IoRefreshSharp } from 'react-icons/io5'
import { FaEye, FaMinus, FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import PopUp from '../popup'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import ContentLoader from "react-content-loader";
import { roRO } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
const ElectronicRosary = () => {
  const [showRefresh , setShowRefresh] = useState(false);
  const [addTasbih , setAddTasbih] = useState(false);
  const [isCompletedCount , setIsCompletedCount] = useState(null)
  const [showDelModal , setShowDelModal] = useState(false);
  const [showEditModal , setShowEditModal] = useState(false);
  const [moreTasbihData , setMoreTasbihData] = useState({
    conent_ar:"",
    content_en:"",
    goal:"بلا نهاية",
    daily_goal:"بلا نهاية",
    count:0,
    completed_count : 0,
    daily_count:0, 
    total_count :  0,
    showRefresh : false,
  })
  const [showData , setShowData] = useState({});
  const [allData , setAllData] = useState( localStorage.getItem("Tasbih_data") ? JSON.parse(localStorage.getItem("Tasbih_data") ) :  []);
  const [data,setData]=useState([])
  const [pageLoading,setPageLoading]=useState(false);
  const [showMore,setShowMore]=useState(false)
  const [rowData,setRowData]=useState({})

  const eqData=()=>{
    setPageLoading(true)
    axios.get(BASE_URL+'rosary/get_for_user')
    .then((res)=>{
      if(Array.isArray(res.data.result)){
        let tasbih=[...res.data.result]
        let pushedData=[];
        for(let i=0;i<tasbih.length;i++){
          let obj={
            ...tasbih[i],
            count:0,
          }
          pushedData.push(obj)
        }
        setData(pushedData)
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
    
  }

  // const handleInc=(id)=>{
  //   const updatedTasbihData = allData.map(tasbih => 
  //     tasbih.id === id ? { ...tasbih, count: tasbih.count + 1 } : tasbih
  //   );
  //   setIsCompletedCount((prevState) => rowData?.count == rowData?.daily_goal ? prevState+1 : prevState)
  //   setAllData(updatedTasbihData);
  //   localStorage.setItem('Tasbih_data', JSON.stringify(updatedTasbihData));
    
  // }
  
  const handleInc = (id) => {
    const updatedTasbihData = allData.map((tasbih) => {
      if (tasbih.id === id) {
        let newCount = tasbih.count + 1;
        let newDailyCount = tasbih.daily_count + 1;
        let newTotalCount =  newDailyCount ;
        console.log(newTotalCount);
        // Check if the current count has reached the daily goal
        if (newCount === Number(tasbih.daily_goal)) {
          setIsCompletedCount((prevState) => prevState + 1);
           // Increment isCompletedCount
          return { 
            ...tasbih, 
            count: 0, // Reset count to zero
            daily_count: newDailyCount ,// Keep daily count
            completed_count : isCompletedCount + 1,
            total_count : newTotalCount 
          };
        }
  
        return { 
          ...tasbih, 
          count: newCount, // Increment the count
          daily_count: newDailyCount ,// Update the daily count
          total_count : newTotalCount
        };
      }
      return tasbih;
    });
  
    setAllData(updatedTasbihData);
    localStorage.setItem('Tasbih_data', JSON.stringify(updatedTasbihData));
  };
  
  // const handleDec = (id) => {
  //   const updatedTasbihData = allData.map((tasbih) => {
  //     if (tasbih.id === id) {
  //       let newCount = tasbih.count > 0 ? tasbih.count - 1 : 0;
  //       let newDailyCount = tasbih.daily_count > 0 ? tasbih.daily_count - 1 : 0;
        
  //       // Check if the current count has fallen below the daily goal
  //       if (newCount < Number(tasbih.daily_goal) && tasbih.count === Number(tasbih.daily_goal)) {
  //         // Decrement completed_count only if it was previously incremented
  //         setIsCompletedCount(prevState => {
  //           const newCompletedCount = prevState - 1;
  //           return newDailyCount === 0 && newCount === 0 ? 0 : newCompletedCount;
  //         });
  
  //         return {
  //           ...tasbih,
  //           count: newCount,
  //           daily_count: newDailyCount,
  //           completed_count: newDailyCount == 0 && newCount == 0 ? 0 : tasbih.completed_count - 1
  //         };
  //       }
  
  //       return {
  //         ...tasbih,
  //         count: newCount,
  //         daily_count: newDailyCount
  //       };
  //     }
  //     return tasbih;
  //   });
  
  //   setAllData(updatedTasbihData);
  //   localStorage.setItem('Tasbih_data', JSON.stringify(updatedTasbihData));
  // };
  
  const handleDec = (id) => {
    const updatedTasbihData = allData.map((tasbih) => {
      if (tasbih.id === id) {
        let newCount = tasbih.count > 0 ? tasbih.count - 1 : 0;
        let newDailyCount = tasbih.daily_count > 0 ? tasbih.daily_count - 1 : 0;
        
        if (newCount < Number(tasbih.daily_goal)) {
         
          return {
            ...tasbih,
            count: newCount,
            daily_count: newDailyCount,
          };
        }
        return {
          ...tasbih,
          count: newCount,
          daily_count: newDailyCount,
        };
      }
      return tasbih;
    });
  
    setAllData(updatedTasbihData);
    localStorage.setItem('Tasbih_data', JSON.stringify(updatedTasbihData));
  };
  

  const handleRefItem = (id) => {
    const updatedTasbihData = allData.map(data => 
      data.id === id ? { ...data, count: 0  , completed_count : 0 , daily_count : 0 } : data
    );
    setIsCompletedCount(0);
    setAllData(updatedTasbihData);
    localStorage.setItem("Tasbih_data", JSON.stringify(updatedTasbihData));
  };
  

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  },[])

  function handleAddTasbih() {
   if(moreTasbihData?.conent_ar == "") {
    toast.warn("ادخل اسم الذكر بالعربي أولا!");
    return;
   }

    const newMoreTasbihData = { ...moreTasbihData, id: allData.length + 1 };
    const updatedAllData = [...allData, newMoreTasbihData];
    setAllData(updatedAllData);
    localStorage.setItem("Tasbih_data", JSON.stringify(updatedAllData));
    setAddTasbih(false);
  }

  function handleEditTasbih() {
    const updatedTasbihData = allData.map(tasbih => 
      tasbih.id === rowData?.id ? rowData : tasbih
    );
    setAllData(updatedTasbihData);
    localStorage.setItem('Tasbih_data', JSON.stringify(updatedTasbihData));
    setShowEditModal(false);
  } 
  
  function handleDeleteTasbih() {
    const updatedAllData = allData.filter(item => item?.id !== rowData?.id);
    setAllData(updatedAllData);
    localStorage.setItem("Tasbih_data" , JSON.stringify(updatedAllData));
    setShowDelModal(false);
  }


  function handleRefreshTotalCount(id) {
    const updatedTasbihData = allData.map(data => 
      data.id === id ? { ...data, count: 0  , total_count : 0 , daily_count : 0 , completed_count: 0 } : data
    );
    setIsCompletedCount(0);
    setShowRefresh(false);
    setAllData(updatedTasbihData);
    localStorage.setItem("Tasbih_data", JSON.stringify(updatedTasbihData));
  }


  function handleRefreshCounter(id) {
    const updatedTasbihData = allData.map(data => 
      data.id === id ? { ...data, count: 0  } : data
    );
    // setIsCompletedCount(0);
    setShowRefresh(false);
    setAllData(updatedTasbihData);
    localStorage.setItem("Tasbih_data", JSON.stringify(updatedTasbihData));
  }

  function handleRefreshDailyCount(id)  {
    const updatedTasbihData = allData.map(data => 
      data.id === id ? { ...data, daily_count : 0} : data
    );
    // setIsCompletedCount(0);
    setShowRefresh(false);
    setAllData(updatedTasbihData);
    localStorage.setItem("Tasbih_data", JSON.stringify(updatedTasbihData));
  } 

  function handleShowRefresh(id) {
    console.log(id);
  const updatedTasbihData = allData.map((data) =>
    data.id === id ? ({ ...data, showRefresh: !data.showRefresh }) : data
  );
  const choosenData = updatedTasbihData?.find(item => item?.id == id);
  setShowData(choosenData);
  setAllData(updatedTasbihData);
  localStorage.setItem("Tasbih_data", JSON.stringify(updatedTasbihData));
}

  useEffect(() => {
    console.log(isCompletedCount)
  } , [isCompletedCount])    

  return (
    <>
      {
        pageLoading?
        (
          <ContentLoader
          viewBox="0 0 380 100"
          speed={1}
          // backgroundColor={'green'}
          >
            <rect x="10" y="10" rx="10" ry="10" width="100" height="80" />
            <rect x="120" y="10" rx="10" ry="10" width="100" height="80" />
            <rect x="230" y="10" rx="10" ry="10" width="100" height="80" />
          </ContentLoader>
        )
        :
        (
          <div className='electronic_rosary'>
          <div className="texts">
            <h5>وَاذْكُرْ رَبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ</h5>
          </div>
          <div className="content">

            <div onClick={() => setAddTasbih(true)} style={{width:"40px",margin:"10px auto", cursor:"pointer", height:"40px" , display:"flex",border:"2px solid #9B102C", color:"#9B102C" ,alignItems:"center",justifyContent:"center", borderRadius :"50%"}}>
              <FaPlus  />
            </div>

           <div className='tasbih_data_content'>
  {allData && allData.map((item, index) => {
    return (
      <div>
         <div key={index} className="tasbih">
         <div>
          {/* <h4>{item.conent_ar}</h4> */}
          <div className="cont">
            <p>{item.conent_ar}</p>
            <p>{item.content_en}</p>
          </div>

          <div style={{display:"flex" , flexDirection:"column"}}>
            <p style={{display:"flex" , justifyContent:"space-between",alignItems:"center"}}><span>الهدف اليومي : </span> <span>{item?.daily_goal}</span></p>
            <p style={{display:"flex" , justifyContent:"space-between",alignItems:"center"}}><span>الهدف : </span> <span>{item?.goal}</span></p>
          </div>
        </div>
        <div className="count">
          <div style={{position:"relative"}}>
            
            <div 
            onClick={() => {
              handleShowRefresh(item?.id)
              // setShowRefresh(prevState => !prevState);
            }} 
            className="reload">
              <IoRefreshSharp />
            </div>

            {showData?.id == item?.id &&  showData?.showRefresh && 
            <div className='electronic_refresh_data'>
              <p onClick={() => handleRefreshCounter(item?.id)}><span>تصفير العداد</span>
               <span><IoRefreshSharp /></span></p>
              <p onClick={() => handleRefreshDailyCount(item?.id)}>
                <span>تصفير العداد (اليوم فقط)</span>
                <span><IoRefreshSharp /></span>
              </p>
              <p onClick={() => handleRefreshTotalCount(item?.id)}>
                 <span>تصفير العداد الكلي</span>
                 <IoRefreshSharp />
              </p>
            </div>}
            
            <div style={{display:"flex",alignItems:"center", gap:"5px"}}>
              <div>
                <button style={{backgroundColor:"#dc3545"}}>
                 <FaRegTrashAlt onClick={() => {
                  setShowDelModal(true)
                  setRowData(item)
                 }} />
                </button>
              </div>

             <div>
               <button style={{backgroundColor:"green"}} onClick={() => {
                setShowEditModal(true)
                setRowData(item)
               }}>
               <FaRegEdit />
               </button>
             </div>

            <div>
              <button className='show_ros' onClick={() => {
                setShowMore(true)
                setRowData(item)
              }}>
                <FaEye />
              </button>
            </div>
            </div>
          </div>

          <div style={{display:"flex" , alignItems:"center",justifyContent:'space-between',gap:"10px"}}>
            
            <div  onClick={() => {
            handleInc(item.id)
          }} style={{fontSize:"23px" , cursor:"pointer" , fontWeight:"bold", display:"flex",alignItems:"center", justifyContent:"center",borderRadius:"50%",width:"30px", height:"30px" , border:"2px solid #015792" , color:"#015792"}}>+</div>
          
          {/* <div onClick={() => {
            handleInc(item.id)
          }} className="number">
            {item.count}
          </div> */}

          <div class="progress-circle-2" onClick={() => {
            handleInc(item.id)
          }}>
              <div class="circle-2" style={{backgroundImage:`conic-gradient(#015792 0% ${(item.count/item?.daily_goal)*100}% , transparent 0%)`}}>
                          <div class="circle-inner-2">
                            <div class="circle-text-2">
                              {/* <span class="label-2">JOINERS</span> */}
                              <span class="number-2">{item?.count}</span>
                              {/* <span class="sub-label-2">OF</span> */}
                            </div>
                          </div>
              </div>
          </div>

           <div  onClick={() => {
            handleDec(item.id)
          }} style={{fontSize:"23px" , cursor:"pointer" , fontWeight:"bold", display:"flex",alignItems:"center", justifyContent:"center",borderRadius:"50%",width:"30px" ,height:"30px" , border:"2px solid #015792" , color:"#015792"}}>-</div>
          </div>
          
          {item?.completed_count > 0  && 
          <p style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>المرات المكتملة</span>
          <span>{item?.completed_count}</span>
          </p>
          }

          {item?.daily_count > 0 &&  
          <p style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span>العدد اليوم</span>
            <span>{item?.daily_count}</span>
          </p>
          }

          {item?.total_count > 0 && 
          <p style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>العدد الكلي</span>
          <span>{item?.total_count}</span>
        </p>
          }

        </div>
      </div>

      {/* {index == data.length -1 && <div className='tasbih_adding' onClick={() => setAddTasbih(true)}>+</div>} */}
      </div>
    )
  })}
           </div>
          </div>


          <PopUp
            open={showMore}
            setOpen={setShowMore}
            title={`عرض التسبيحه`}
          >
            <div className="tasbih tasbih_pop">
                <div>
                <div className="cont">
                  <p>{rowData.conent_ar}</p>
                  <p>{rowData.content_en}</p>
                  <p>الهدف : {rowData?.goal}</p>
                  <p>الهدف اليومي : {rowData?.daily_goal}</p>
                </div>
                </div>
                <div className="count">
                  {/* <div>
                  <div onClick={()=>{
                      handleRefItem(rowData.id)
                    }}  className="reload">
                    <IoRefreshSharp />
                  </div>
                  </div> */}
                  
                  <div style={{display:"flex" , alignItems:"center" , justifyContent:"center"}} 
                  // onClick={()=>{
                  //   handleInc(rowData.id)
                  // }} 
                  className="number">
                    {rowData.count}
                  </div>

                 
                </div>
            </div>
          </PopUp>

          <PopUp open={addTasbih} setOpen={setAddTasbih} title="إضافة ذكر">
             <div className='resoray_adding_form'>
               
               <div>
               <div>
                 <label>نص الذكر بالعربي</label>
                 <input required type="text" placeholder='اسم الذكر بالعربي' onChange={(e) => setMoreTasbihData({...moreTasbihData , conent_ar:e.target.value})}/>
               </div>

               {/* <div>
                 <label>نص الذكر بالانجليزي</label>
                 <input required type="text" placeholder='اسم الذكر بالانجليزي' onChange={(e) => setMoreTasbihData({...moreTasbihData , content_en:e.target.value})}/>
               </div> */}
               </div>

               <div>
                 <label>الهدف</label>
                 <select required onChange={(e) => setMoreTasbihData({...moreTasbihData , goal : e.target.value})}>
                   <option value="بلا نهاية">&infin;</option>
                   <option value="33">33</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   <option value="500">500</option>
                   <option value="1000">1000</option>
                 </select>
                 {/* <input type="number" onChange={(e) => setMoreTasbihData({...moreTasbihData , goal : Number(e.target.value)})}/> */}
               </div>

               <div>
                <label>الهدف اليومي</label>
                {/* <input type="number" onChange={(e) => setMoreTasbihData({...moreTasbihData , daily_goal:Number(e.target.value)})}/> */}
                <select required onChange={(e) => setMoreTasbihData({...moreTasbihData , daily_goal : e.target.value})}>
                   <option value="بلا نهاية">&infin;</option>
                   <option value="33">33</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   <option value="500">500</option>
                   <option value="1000">1000</option>
                </select>
               </div>

               <div style={{display:"flex",width:"fit-content",alignItems:"center",gap:"5px"}}>
               <button onClick={handleAddTasbih} style={{backgroundColor:"#015792" , color:"white" , fontSize:"18px !important" , padding:"4px 10px",borderRadius:"5px", width:"fit-content",marginLeft:"auto"}}>اضافة</button>
               <button onClick={() => setAddTasbih(false)} style={{border:"1px solid #015792" , color:"#015792" , fontSize:"18px !important" , padding:"4px 10px",borderRadius:"5px", width:"fit-content",marginLeft:"auto"}}>إلغاء</button>
               </div>
             </div>
          </PopUp>

          <PopUp open={showEditModal} setOpen={setShowEditModal} title="تعديل الذكر">
          <div className='resoray_adding_form'>
               
               <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
               <div>
                 <label>نص الذكر بالعربي</label>
                 <input required type="text" placeholder='اسم الذكر بالعربي' value={rowData?.conent_ar} onChange={(e) => setRowData({...rowData , conent_ar:e.target.value})}/>
               </div>

               <div>
                 <label>نص الذكر بالانجليزي</label>
                 <input required type="text" placeholder='اسم الذكر بالانجليزي' value={rowData?.content_en} onChange={(e) => setRowData({...rowData , content_en:e.target.value})}/>
               </div>
               </div>

               <div>
                 <label>الهدف</label>
                 <select required value={rowData?.goal} onChange={(e) => setRowData({...rowData , goal : e.target.value})}>
                   <option value="بلا نهاية">&infin;</option>
                   <option value="33">33</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   <option value="500">500</option>
                   <option value="1000">1000</option>
                 </select>
                 {/* <input type="number" onChange={(e) => setMoreTasbihData({...moreTasbihData , goal : Number(e.target.value)})}/> */}
               </div>

               <div>
                <label>الهدف اليومي</label>
                {/* <input type="number" onChange={(e) => setMoreTasbihData({...moreTasbihData , daily_goal:Number(e.target.value)})}/> */}
                <select required value={rowData?.daily_goal} onChange={(e) => setRowData({...rowData , daily_goal : e.target.value})}>
                   <option value="بلا نهاية">&infin;</option>
                   <option value="33">33</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   <option value="500">500</option>
                   <option value="1000">1000</option>
                </select>
               </div>

               <div style={{display:"flex",width:"fit-content",alignItems:"center",gap:"5px"}}>
               <button onClick={handleEditTasbih} style={{backgroundColor:"#015792" , color:"white" , fontSize:"18px !important" , padding:"4px 10px",borderRadius:"5px", width:"fit-content",marginLeft:"auto"}}>تعديل</button>
               <button onClick={() => setShowEditModal(false)} style={{border:"1px solid #015792" , color:"#015792" , fontSize:"18px !important" , padding:"4px 10px",borderRadius:"5px", width:"fit-content",marginLeft:"auto"}}>إلغاء</button>
               </div>
             </div>
          </PopUp>

          <PopUp open={showDelModal} setOpen={setShowDelModal}>
             <h2>هل تريد حذف هذا الذكر؟</h2>
             <div style={{display:"flex", alignItems:"center",gap:"10px" , width:"fit-content", margin:"10px 0px"}}>
               <button onClick={handleDeleteTasbih} style={{backgroundColor:"#015792"  , color:"white" , fontSize:"18px !important" , padding:"4px 10px",borderRadius:"5px", width:"fit-content",marginLeft:"auto"}}>حذف</button>
               <button onClick={() => setShowDelModal(false)} style={{border:"1px solid #015792" , color:"#015792"  , fontSize:"18px !important" , padding:"4px 10px",borderRadius:"5px", width:"fit-content",marginLeft:"auto"}}>إلغاء</button>
             </div>
          </PopUp>
        </div>
        )
      }
    </>
  )
}

export default ElectronicRosary

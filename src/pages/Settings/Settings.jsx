import { useEffect, useState } from 'react';
import './style.css';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';


export default function Settings({higriDate , manualPrayerTime , newPrayerTime , setManualPrayerTime , setFontSize , fontSize , setHigriDate , setPrayerTime , setNewPrayerTime }) {
    const navigate = useNavigate();
    const higri_date = localStorage.getItem("higri_date") ? JSON.parse(localStorage.getItem("higri_date")) :null;
     
    useEffect(() => {
      setHigriDate(higriDate)
    } , [higriDate])
   
    function handleSubmit(e) {
        e.preventDefault();
        window.location.reload();
    }

    function handleAddSize(e) {
      e.preventDefault();
      navigate("/")
      console.log(fontSize)
    }

    

   function handleAddPrayerTimeManually(e) {
    e.preventDefault();
    localStorage.setItem("Manually-prayerTime" , JSON.stringify(manualPrayerTime));
    navigate(`/prayer_time`)
   }

    return (
        <div className='setting_container'>
          <h2 style={{margin:"10px 0px" , fontSize:"26px", textAlign:"center"}}>الإعدادات</h2>
            <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>تعديل التاريخ الهجري يدويا</Accordion.Header>
            <Accordion.Body>
            <form onSubmit={handleSubmit}>
                 <div>
                     <div style={{display:"flex",flexDirection:'column', gap:"10px" , margin:"10px 0px"}}>
                        <div className="date_input">
                            <input name="date" type="radio" value="-2" onChange={(e) => setHigriDate(e.target.value )}/>
                            <label>-2</label>
                        </div>

                        <div className="date_input">
                            <input name="date" type="radio" value="-1" onChange={(e) => setHigriDate(e.target.value )}/>
                            <label>-1</label>
                        </div>

                        <div className="date_input">
                            <input name="date" type="radio" value="0" onChange={(e) => setHigriDate(e.target.value )}/>
                            <label>0</label>
                        </div>

                        <div className="date_input">
                            <input name="date" type="radio" value="1" onChange={(e) => setHigriDate(e.target.value )}/>
                            <label>1</label>
                        </div>

                        <div className="date_input">
                            <input name="date" type="radio" value="2" onChange={(e) => setHigriDate(e.target.value )}/>
                            <label>2</label>
                        </div>
                     </div>
                 </div>

                 {/* <button style={{backgroundColor:"#015792", color:"white",margin:"20px 0px 0px",padding:"10px",borderRadius:"6px"}}>تعديل</button> */}
               </form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>إعدادات أوقات الصلاه</Accordion.Header>
            <Accordion.Body>
              <form onSubmit={handleSubmit}>
              <div>
                     <div style={{display:"flex",flexDirection:'column', gap:"10px" , margin:"10px 0px"}}>
                        <div className="date_input">
                            <input name="date" type="radio" value="-1" onChange={(e) => setPrayerTime(e.target.value )}/>
                            <label>-1</label>
                        </div>

                        <div className="date_input">
                            <input name="date" type="radio" value="0" onChange={(e) => setPrayerTime(e.target.value )}/>
                            <label>0</label>
                        </div>

                        <div className="date_input">
                            <input name="date" type="radio" value="1" onChange={(e) => setPrayerTime(e.target.value )}/>
                            <label>1</label>
                        </div>
                     </div>
                 </div>
              </form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>حجم الخط</Accordion.Header>
            <Accordion.Body>
              <form onSubmit={handleAddSize}>
              <div>
                     <div style={{display:"flex",flexDirection:'column', gap:"10px" , margin:"10px 0px"}}>
                        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                          <label style={{fontSize:"20px"}}>حجم خط الهيدر</label>
                          <input type="number" value={fontSize.headerSize} onChange={(e) => setFontSize({...fontSize , headerSize : e.target.value})}/>
                        </div>

                        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                          <label style={{fontSize:"20px"}}>حجم خط القرآن</label>
                          <input type="number" value={fontSize.quraanSize} onChange={(e) => setFontSize({...fontSize , quraanSize : e.target.value})}/>
                        </div>

                        <button style={{backgroundColor:"#052c65" , width:"fit-content" , color:"white" , padding:"10px" , borderRadius:"10px"}}>اضافه</button>
              
                     </div>
                 </div>
              </form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
          <Accordion.Header>اعدادات وقت الصلاه يدويا</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleAddPrayerTimeManually}>
               <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  <label>الصلوات</label>
                  <select value={manualPrayerTime?.name} onChange={(e) => setManualPrayerTime({...manualPrayerTime , name:  e.target.value})}>
                  
                    {newPrayerTime.map(item => <option value={item?.name}>{item?.name}</option>)}
                   
                  </select>
               </div>

               <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <label>تاريخ الصلاه</label>
                <select value={manualPrayerTime?.time} onChange={(e) => setManualPrayerTime({...manualPrayerTime , time : e.target.value})}>
                  {newPrayerTime.map(item => <option value={item?.time}>{item?.time}</option>)}
                </select>
                
               </div>

               <button style={{backgroundColor:"#052c65" , marginTop:"10px" , width:"fit-content" , color:"white" , padding:"10px" , borderRadius:"10px"}}>إضافة</button>
            </form>
          </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>
      );
}

import { Box, Container, Paper, Typography } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { memo, useState } from "react";
import Modal from '../../modal/index';
import './style.css';

function DateForm({ setDate , setHigriDate , higriDate}) {
    const [showModal , setShowModal] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setShowModal(false);
        window.location.reload();
    }

    return (
        <Box sx={{
            backgroundColor: 'primary.light',
        }}>
           
           {/* <Modal open={showModal} toggle={setShowModal} onClose={()=>setShowModal(false)} headerTitle="تعديل التاريخ الهجري يدويا">
               <form onSubmit={handleSubmit}>
                 <div>
                     <label>تعديل التاريخ الهجري يدويا</label>
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

                 <button style={{backgroundColor:"#015792", color:"white",margin:"20px 0px 0px",padding:"10px",borderRadius:"6px"}}>تعديل</button>
               </form>
            </Modal>    */}
       
            <Container maxWidth="lg" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem',
                py: 2,
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: '#9B102C',
                    display:'flex',
                    alignItem:'center',
                    justifyContent:"center",
                    gap:'10px',
                    width:'900px',
                }}>
                    {/* <span style={{margin:"auto 0px"}}></span> */}
                      اختر شهراً لعرض التقويم الهجري
                    {/* <button onClick={() => setShowModal(true)} style={{border:"1px solid #015792" , padding:"10px",borderRadius:"10px"}}>تعديل</button> */}
                </Typography>
                
                <Paper sx={{
                    py: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '400px',
                    m: 'auto',
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            views={['month', 'year']}
                            openTo="month"
                            onChange={(date) => {
                                setDate({
                                    month : date.month() + 1,
                                    // month: date.month() + 1,
                                    year: date.year() 
                                }) 
                            }}
                        />
                    </LocalizationProvider>
                </Paper>
            </Container>
        </Box>
    )
}

export default memo(DateForm)

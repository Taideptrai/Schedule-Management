import  { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
function CreateUser() {
  const user = localStorage.getItem('user');
  const {userId} = useParams();
  const history = useHistory();
  const [notetitle,setNoteTitle] = useState("");
  const [message,setMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [radiobutton, setRadioButton] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({});
  const [buttonUpdateCheck,setButtonUpdateCheck] = useState(false)
  console.log('buttonUpdateCheck',buttonUpdateCheck);
  const daysLeft = calculateDaysLeft(startDate,endDate)
  console.log(startDate,endDate,radiobutton)
 
  const SubmitFormHandler = async(e) =>{
      e.preventDefault();
      if (notetitle!=="" && message !==""){
          setNoteTitle("");
          setMessage("");
          const userId = localStorage.getItem('userId')
          console.log('userId', userId)
          const {data} = await axios.post('/create',{notetitle,message,userId,startDate,endDate,radiobutton});
          console.log(data)
          history.push("/user")
        }
  }
 function calculateDaysLeft(startDate, endDate){
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return endDate.diff(startDate, "days");
 }
 const handleUpdate = async() =>{
  if (notetitle !="" && message!= "" && daysLeft>=0){
    const { data } = await axios.put(`/userupdate/${userId}`,{notetitle,message,startDate,endDate,radiobutton})
    console.log(data) ;
    history.push('/user')
  }
  else{
    alert('check Info again')
  }
 
}
 
 useEffect(()=>{
  setButtonUpdateCheck(true);
  const fetchData = async() =>{
        const {data} = await axios.get(`/messageInfo/${userId}`);
        setDataUpdate(data);
        setButtonUpdateCheck(false)
        setNoteTitle(data.noteTitle);
        setMessage(data.message);
        setRadioButton(data.autoDelete);
    }
    (userId) && fetchData() 
 },[userId])
 useEffect(()=>{
   if (!user){
     history.push('/')
   }
 })
  return (
    <div>
        <form onSubmit={SubmitFormHandler} className="mx-auto" style={{width:"500px"}}>
            <div className="form-group">
            <label htmlFor="notetitle">Note</label>
            <input 
            className="form-control" 
            id="notetitle" 
            placeholder="Enter Your Note Name"
            value={notetitle}
            onChange={(e)=>{setNoteTitle(e.target.value)}}
            />
            </div>
            
            <div className="form-group">
            <label htmlFor="message">Description</label>
            <textarea  
            className="form-control" 
            id="message" 
            placeholder="message"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            />
            </div>
            <p>Time complete</p>
            <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                <DatePicker selected={startDate} onChange={date=>{setStartDate(date)}} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                <DatePicker selected={endDate} onChange={date=>setEndDate(date)} className="form-control" />
                            </div>
                        </div>
                        {daysLeft < 0 && <p className="mx-auto" style={{color:"red"}}>Check your date again</p>}
              </div>

            <div>
              <label htmlFor="radiobutton"></label>
              <input
              type="radio"
              id="radiobutton" 
              checked={radiobutton} 
              onClick={()=>{setRadioButton(!radiobutton)}}
              /> Auto delete when day is expired
            </div><br/>


          {!userId 
          ? <button type="submit" disabled={daysLeft<0 && true} className="btn btn-primary">Submit</button>
          : <button type="button" onClick={handleUpdate} disabled={buttonUpdateCheck?"true":""} className="btn btn-primary">Update</button>
          } 
        </form>
    </div>
  );
}


export default CreateUser;

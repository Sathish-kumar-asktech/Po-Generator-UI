import React, { useState } from 'react'

import axios from '../axios'
import moment from 'moment';
import numeral from 'numeral';
import './Changepassword.css'
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap';
import Button1 from 'reactstrap/lib/Button'
import  { useHistory } from  'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';

function Changepassword() {
  const history = useHistory()

  const [usercode, setusercode] = useState('')
  const [newpassword, setnewpassword] = useState('')
  const [email, setemail] = useState('')
 const [erropassword, seterropassword] = useState('')
 const [erropassword1, seterropassword1] = useState('')
const [mailpassword, setmailpassword] = useState('')
const [mail, setmail] = useState('')
const [smptport, setsmptport] = useState('')
const [smptserveice, setsmptserveice] = useState('')
const [view, setview] = useState(true)
const [usercodeerrors, setusercodeerrors] = useState('')
const [view1, setview1] = useState(true)
const [view2, setview2] = useState(true)
const [view3, setview3] = useState(true)
const [open1, setopen1] = useState(false)
const [mailpassworderror, setmailpassworderror] = useState('')
const [usrcodeeeror, setusrcodeeeror] = useState('')
const [smptservereeeror, setsmptservereeeror] = useState('')
const [smptporrrterror, setsmptporrrterror] = useState('')
const [mssspasserror, setmssspasserror] = useState('')
  const changepasswordforuser = async() => {
 

   //console.log(newpassword)
  // console.log(mail)
   //console.log(mailpassword)
   //console.log(smptserveice)
  //console.log(smptport)
  //console.log(usercode)
   if ((newpassword.length!=0)&&(mail.length!=0)&&(mailpassword.length!=0)&&(smptport.length!=0)) {
     
  
   const tokent  =   localStorage.getItem('authtoken') 
   const change = await  axios.instance.put(`/changepassword/${usercode}`, {
     Password: newpassword,
     Emailid: mail,
     mailpassword: mailpassword,
     SMTPServer: smptserveice,
     SMTPPort: smptport
   }, {'Authorization': tokent
   , 'Content-Type': 'application/json'})
setopen1(true)
setTimeout(() => {
  setopen1(false)
  history.push('/')
}, 2000);
      
  
}else {
  // if () {
    
  // }
}
 
    
      
     
  }

 const getuserinfo =async(code) => {
  

   
     setusercode(code) 
     setmailpassword('')
     setsmptport('')
     setsmptserveice('')
     setmail('')
     setview(true)
     setview1(true)
     setview2(true)
     setview3(true)
  if(code.length !=0) {

  
   const tokent  =   localStorage.getItem('authtoken') 
   const change = await  axios.instance.get(`/Usercode/${code}`, {'Authorization': tokent
   , 'Content-Type': 'application/json'}).then((res) => {
       console.log(res.data)
       for(const data of res.data) {
           setmail(data.Emailid)
           setmailpassword(data.mailpassword)
           setsmptport(data.SMTPPort)
           setsmptserveice(data.SMTPServer)
       
       if (data.Emailid !=0) {
         setview(false)
         
       }
       if(data.mailpassword !=0) {
         setview1(false)
       }
       if(data.SMTPPort !=0) {
         setview2(false)
       }
       if(data.SMTPServer !=0) {
         setview3(false)
       }

     
      
       }
     
       
   })
 }
 }
 const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
}


 
  return (
    <Card className="card22">
    <div className='formssse'>
      <h4 style={{color:'#5269D9', alignItems:'center', textAlign:'center', justifyContent:'center'}}>Change password</h4>
 <div className='formssse'>
 <Input type="text" value={usercode}         onChange={(e) => getuserinfo(e.target.value )}
 placeholder=" Enter your Usercode" />
 </div>
 <div className='formssse'>
 <Input type="password"  value={newpassword}  onChange={(e) => setnewpassword(e.target.value )} placeholder="New password" />
 </div>
 <div className='formssse'>
 {view && <Input type="email" value={mail}  onChange={(e) => setmail(e.target.value )} placeholder="Enter Emailid" />}
 </div>
 <div className='formssse'>
  {view1 &&<Input type="password" value={mailpassword}  onChange={(e) => setmailpassword(e.target.value )} placeholder="Enter mailpassword" />}
 </div>
 <div className='formssse'>
 {view2 && <Input type="text"  value={smptserveice} onChange={(e) => setsmptserveice(e.target.value )} placeholder="Enter Your Smptserver" />}
 </div>
 <div className='formssse'>
  {view3 &&<Input type="text"  value={smptport} onChange={(e) => setsmptport(e.target.value )}  placeholder="Enter your Smptport" />}
 </div>
 {erropassword != '' &&<p style={{color:'red'}}>{erropassword}</p>}

 <div className='formssse1'>

 <Button1 onClick={changepasswordforuser}   color="primary"  >
   Change
</Button1>
 </div>
 
    </div>
    <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Password changed successfully"

          />
    </Card>
  )
}

export default Changepassword

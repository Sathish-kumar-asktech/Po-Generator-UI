import React, { useEffect, useState, useRef } from 'react'
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
import CardContent from '@material-ui/core/CardContent';

import { IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableContainer,TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import './User.css'
import axios from '../axios'
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Button1 from 'reactstrap/lib/Button'
import Snackbar from '@material-ui/core/Snackbar';
import Switch from '@material-ui/core/Switch';
function User() {
  
    const [uservalue, setuservalue] = useState([])
    const [logincode, setlogincode] = useState('')
    const [loginname, setloginname] = useState('')
    const [email, setemail] = useState('')
    const [active, setactive] = useState('yes')
    const [usertype, setusertype] = useState('ADMIN')
    const [password, setpassword] = useState('')
    const [open, setopen] = useState(false)
    const [open1, setopen1] = useState(false)
    const [open2, setopen2] = useState(false)
    const [getuservalue, setgetuservalue] = useState([])
    const [uplogincode, setuplogincode] = useState('')
    const [uploginname, setuploginname] = useState('')
    const [upemail, setupemail] = useState('')
    const [upactive, setupactive] = useState('yes')
    const [upusertype, setupusertype] = useState('')
    const [uppassword, setuppassword] = useState('')
    const logincoderef = useRef('')
    const loginnameref = useRef('')
    const  emailref = useRef('')
    const passwordref = useRef('')
    const activeref = useRef('')
    const usertyperef = useRef('')
    const [err1, seterr1] = useState(false)
    const [err2, seterr2] = useState(false)
    const [err3, seterr3] = useState(false)
    const [err4, seterr4] = useState(false)
    const [err5, seterr5] = useState(false)
    const [err6, seterr6] = useState(false)
    const status =  [{Active: "yes", Active: "No"}]
  useEffect(() => {
    const getuser = async () => {
       const getusers = await axios.instance.get('/users',  { headers: {'Authorization': localStorage.getItem('authtoken'),
       'Content-Type': 'application/json'
       }} )
       setuservalue(getusers.data)
    
    }
    getuser()
  }, [])

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setopen(false);
    setopen1(false);
    setopen2(false);
  };

  const getuser1 = async () => {
    const getusers = await axios.instance.get('/users',  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }} )
    setuservalue(getusers.data)
    
 
 }
 const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
 const [page, setpage] = useState(0)
const [rowsperpage, setrowsperpage] = useState(pages[page])

 const handleChangePage = (event, newPage) => {
   setpage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setrowsperpage(parseInt(event.target.value, 10));
   // setpage(0);
 };


 const changepage = () => {
   return uservalue.slice(page * rowsperpage, (page + 1) * rowsperpage)
 }


const adduser = async e => {
  document.getElementById('usefomup').style.display="none"
  document.getElementById('usefom').style.display ="inline"
  if((logincode.length !=0) && (loginname.length !=0) && (password.length !=0) && (email.length !=0) && (usertype.length !=0)) {

 
 const addusers = await axios.instance.post('/users', {
  LoginCode: logincode,
  LoginName: loginname,
  Password: password,
  EmailId: email,
  Active: active,
  UserType: usertype

 },  { headers: {'Authorization': localStorage.getItem('authtoken'),
 'Content-Type': 'application/json'
 }} )
 if(addusers.data.length === 1 ) {
  getuser1()
  setlogincode('')
  setloginname('')
  setpassword('')
  setemail('')
  
  setopen(true)
 
  document.getElementById('usefom').style.display ="none"
 } else {
   seterr6(true) 
   setTimeout(() => {
    seterr6(false)
   }, 2000);
 }
 
} else {
  if(logincode.length === 0 ) {
    seterr1(true)
  }
  if(loginname.length === 0) {
    seterr2(true)
  }
  if(password.length === 0) {
    seterr4(true)
  }
  if(email.length === 0){
    
    seterr3(true)
  }
  if(usertype.length === 0){
    seterr5(true)
  }
}
setTimeout(() => {
  seterr1(false)
  seterr2(false)
  seterr3(false)
  seterr4(false)
  seterr5(false)
}, 2000);
}



const deleteuser = async (userid , e) => {
  
    if (window.confirm('Are you sure delete this User?')){
    const deletesub =  await axios.instance.delete(`/users/${userid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }} )
    .then(res => {
      const deletedata = uservalue.filter(subdelete => subdelete.UserID)
    })
   
    getuser1()
    setopen2(true)
   }
   
  
}

const updatedata = async (uuid, e) => {
  document.getElementById('usefom').style.display ="none"
  document.getElementById('usefomup').style.display="inline"
  const valueuser = await axios.instance.get(`/users/${uuid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
  'Content-Type': 'application/json'
  }} )
  setgetuservalue(valueuser.data)
}

const userupdate = async (uuids, e) => {
 const updateuservalues =  await axios.instance.put(`/users/${uuids}`, {
  LoginCode: logincoderef.current.value,
  LoginName: loginnameref.current.value,
  Password: passwordref.current.value,
  EmailId: emailref.current.value,
  UserType: usertyperef.current.value,
  Active: activeref.current.value
 },
 { headers: {'Authorization': localStorage.getItem('authtoken'),
 'Content-Type': 'application/json'
 }} )

 document.getElementById('usefomup').style.display="none"
 document.getElementById('categeoryform').reset()
 
 getuser1()
 setopen1(true)
}

const closeupdatesccreen =  () => {
  document.getElementById('usefomup').style.display="none"
  document.getElementById('categeoryform').reset()
}

const adduserssform = () => {
  document.getElementById('usefomup').style.display="none"
document.getElementById('usefom').style.display = "inline"
}
 
const adduserformhide = () => {
  document.getElementById('usefom').style.display = "none"
}

    return (

        <div>
                <div>
        <Card className="titleuser22">
          <CardBody>
            <h5 className="usertitle">User</h5>
          </CardBody>
        </Card>
      </div>

                   <div  >
                     <div className="updausercard">
      <Card className="updatecards" >
      <div className="userformup" id="usefomup">
    <h5 style={{color: '#0069D9', textAlign:'center'}}> Update User</h5>
      <div className="closebutton" >
        <IconButton size="small" color="secondary" onClick={closeupdatesccreen}   >
      <CloseIcon fontSize="small" />
      </IconButton>
      </div>
     
        <CardBody>
          {getuservalue.map((data) => (
          <form id="categeoryform">
          <div className="categorys">
            <lable><b>Logincode</b></lable>
         <input ref={logincoderef} placeholder="Logincode" defaultValue={data.LoginCode}      />
         </div>
         <div className="categorys">
            <lable><b>LoginName</b></lable>
         <input placeholder="LoginName" ref={loginnameref} defaultValue={data.LoginName}    />
         </div>
         <div className="categorys">
            <lable><b>EmailId</b></lable>
         <input placeholder="EmailId" ref={emailref}  defaultValue={data.EmailId}  />
         </div>
         <div className="categorysselect">
            <lable><b>Active</b></lable>
            <select  ref={usertyperef} >
              <option selected value={data.UserType}>{data.UserType}</option>
             {
               data.UserType==="ADMIN" ? <option value="NONADMIN">NONADMIN</option> : <option value="ADMIN">ADMIN</option>
             }
              </select>  
          
         </div>
         <div className="categorys">
            <lable><b>Password</b></lable>
         <input placeholder="Password" ref={passwordref} defaultValue={data.Password}   />
         </div>
        
         <div className="categorysselect">
            <lable><b>Active</b></lable>
            <select  ref={activeref} >
              <option selected value={data.Active}>{data.Active}</option>
             {
               data.Active==="yes" ? <option value="No">No</option> : <option value="yes">yes</option>
             }
              </select>  
          
         </div>
         <Button1 style={{marginTop:'20px', backgroundColor:"#656BC2"}}  onClick={(e) => userupdate(data.UserID, e)} > Update</Button1>
         </form>
        ))}
        </CardBody>
        </div>
      </Card>
      </div>
      </div>
          <div >
            <div className="add_user">
      <Card className="addusercard" >
      <div className="userform" id="usefom">
    <h5 style={{color: '#656BC2', textAlign:'center'}}>User</h5>
      <div className="closebutton" >
        <IconButton size="small" color="secondary"  onClick={adduserformhide}   >
      <CloseIcon fontSize="small" />
      </IconButton>
      </div>
     
        <CardBody>
          <form id="categeoryformss">
          <div className="categorys">
            <lable><b>Logincode</b></lable>
         <input placeholder="Logincode" value={logincode}  onChange={e => setlogincode(e.target.value)}  />
         {err1 ? <p className="errors">please enter logincode</p> : ''}
         </div>
         <div className="categorys">
            <lable><b>LoginName</b></lable>
         <input placeholder="LoginName" value={loginname} onChange={e => setloginname(e.target.value)}   />
         {err2 ? <p className="errors">please enter loginName</p> : ''}
         {err6 ? <p className="errors"> Loginname already Exist</p> : ''}
         </div>
         <div className="categorys">
            <lable><b>EmailId</b></lable>
         <input placeholder="EmailId" value={email} onChange={e => setemail(e.target.value)} />
         {err3 ? <p className="errors">please enter email</p> : ''}
         </div>
           <div className="categorys">
            <lable><b>Password</b></lable>
         <input placeholder="Password" type="password" value={password} onChange={e => setpassword(e.target.value)} />
         {err4 ? <p className="errors">please enter password</p> : ''}
         </div>
         <div className="categorysselect">
            <lable><b>UserType</b></lable>
            <select value={usertype} onChange={e => setusertype(e.target.value)}>
              <option value="ADMIN"> ADMIN</option>
              <option value="NONADMIN"> NONADMIN</option>
            </select>
        
          {err5 ? <p className="errors">please select usertype</p> : ''}
         </div>
         <div className="categorysselect">
            <lable><b>Active</b></lable>
            <select  value={active} onChange={e => setactive(e.target.value)} >
               <option selected value={active === "yes"}>yes</option>
               <option value="No">No</option>
              </select>  
          
         </div>
         <Button1 color='primary' outline  onClick={adduser} style={{marginTop:'20px'}}   > Add</Button1>
         </form>
        </CardBody>
        </div>
      </Card>
      
      </div>
      </div>
       <div>
       <Card>
           <CardBody>
           <Paper>
               <TableContainer>
                     
      <Toolbar className="serchdiv">
           <div className="search" style={{display: 'none', marginTop:'5px'}}>
           <input className="inpusearch" placeholder="search"   width= "750px" />
           <SearchIcon />
           </div>
           <button onClick={adduserssform} className="addbutton">Add user  </button>
         </Toolbar>
         
           <Table className="usertable" aria-label="simple table">
        <TableHead>
         
          <TableRow>
        
            <TableCell className="tblsubc1"  > 
           
              LoginCode
          
              </TableCell>
            <TableCell >LoginName</TableCell>
            <TableCell>EmailId</TableCell>
            <TableCell >UserType</TableCell>
            <TableCell >Active</TableCell>
            <TableCell >Edit</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           

             
              {changepage().map((data) => (

               
            <TableRow >
              <TableCell style={{maringLeft: '10px'}}  align="left">
              {data.LoginCode}
              
              </TableCell>
              <TableCell >{data.LoginName}</TableCell>
              <TableCell>{data.EmailId}</TableCell>
              <TableCell >{data.UserType}</TableCell>
              <TableCell > {data.Active}</TableCell>
              <TableCell > 
                <IconButton size="small"  color="primaty" onClick={(e) => updatedata(data.UserID, e)}  >
                  <EditIcon  fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell >
                <IconButton size="small" color="secondary" onClick={(e) => deleteuser(data.UserID, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton  >
              </TableCell>
            </TableRow>
              ))}
      
        </TableBody>
      </Table>
 </TableContainer>
 </Paper>
    <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={uservalue.length}
        rowsPerPage={rowsperpage}
        page={page}
        onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
    />
           </CardBody>
          
       </Card>

       <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="User added successfully"

          />

          
       <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="User updated successfully"

          />
          
       <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open2}
            autoHideDuration={2000}
            onClose={handleClose}
            message="User deleted successfully"

          />

       </div>


        </div>
    )
}

export default User

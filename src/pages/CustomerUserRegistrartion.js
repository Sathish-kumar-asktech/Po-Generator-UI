import React from 'react'
import  { useEffect, useMemo, useState } from 'react'
//import './widgetpage.css'
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';
import Backdrop from '@material-ui/core/Backdrop';
import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';
import Select from 'react-select'

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';
import './InspectionEdit.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Button,
  Typography,
  CircularProgress,

} from '@material-ui/core';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardTitle,
} from 'reactstrap';
import numeral from 'numeral';
import moment from 'moment'

import Alert from '@material-ui/lab/Alert';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';
import ClearIcon from '@material-ui/icons/Clear';
import axios from '../axios'
import Button1 from 'reactstrap/lib/Button'
import  { useHistory } from  'react-router-dom'
import { useStateValue } from '../StateProvider';
import  Spinner  from 'react-spinkit'
// import FileSaver, {saveAs} from 'file-saver'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet
} from "react-device-detect";
import { Fragment } from 'react';
import * as Xl from 'excel4node'
import FileSaver from "file-saver";
import tableContainer from '../Common/TableContainer';
import SweetAlert from 'react-bootstrap-sweetalert';

function CustomerUserRegistrartion() {
const [cuscompname, setcuscompname] = useState('')
const [UserCodeFirstname, setUserCodeFirstname] = useState("")
const [duplicateerror, setduplicateerror] = useState(false)
    useEffect(() => {
        customerhelps()
        branchhelps()
        departmenthelps()
        designationhelps()
        getalldata()
      
        // var  company =localStorage.getItem("Suppliername")
        // console.log(company)
        // console.log(company.slice(0,3));
        // var companyslice=company.slice(0,3)
        // console.log(companyslice);
        // setUserCodeFirstname(companyslice)
        
        
    }, [])
    

    //customerhelp
    const [customerhelp, setcustomerhelp] = useState([])
    const [customervalue, setcustomervalue] = useState({label:"Select", value:""})
    //branchhelp
    const [branchhelp, setbranchhelp] = useState([])
    const [branchvalue, setbranchvalue] = useState({label:"Select", value:0})
    //departmenthelp
    const [departmenthelp, setdepartmenthelp] = useState([])
    const [departmentvalue, setdepartmentvalue] = useState({label:"Select", value:""})
    //designationhelp
    const [designationhelp, setdesignationhelp] = useState([])
    const [designationvalue, setdesignationvalue] = useState({label:"Select", value:""})

    const [usercode, setusercode] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [emailid, setemailid] = useState('')
    const [useractive, setuseractive] = useState(true)
    const [createdby, setcreatedby] = useState('')
    const [Finallevel, setFinallevel] = useState(false)
    const [mailpassword, setmailpassword] = useState('')
    const [smtpserver, setsmtpserver] = useState('')
    const [smtpport, setsmtpport] = useState('')
    // const [approval2, setapproval2] = useState('N')
    // const [approval3, setapproval3] = useState('N')
    const [ccmailid, setccmailid] = useState('')
   
        const [level1, setlevel1] = (localStorage.getItem("AdminUser")==='Y')? useState(true): useState(false)
    
   
   
    const [level2, setlevel2] = useState(false)
    const [sslrequired, setsslrequired] = useState(true)


    //sweetalert
    const [added, setadded] = useState(false)
    const [deletedconfirm, setdeletedconfirm] = useState(false)
    const[deleted,setdeleted]=useState(false)
    const [updated, setupdated] = useState(false)

    //tabledata
    const [tabledata, settabledata] = useState([])

    //pages
    const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
    const [page, setpage] = useState(0)
    const [rowsperpage, setrowsperpage] = useState(pages[page])

    //ternary
    const [isedit, setisedit] = useState(false)

    //Update and deleteid
    const [deleteid, setdeleteid] = useState('')

    //errmsg
    const [usercodeerr, setusercodeerr] = useState(false)
    const [usernameerr, setusernameerr] = useState(false)
    const [passworderr, setpassworderr] = useState(false)
    const [passworderr1, setpassworderr1] = useState(false)
    const [emailiderr, setemailiderr] = useState(false)
    // const [useractiveerr, setuseractiveerr] = useState(false)
    const [Finallevelerr, setFinallevelerr] = useState(false)
    const [mailpassworderr, setmailpassworderr] = useState(false)
    const [smtpservererr, setsmtpservererr] = useState(false)
    const [smtpporterr, setsmtpporterr] = useState(false)
    const [ccmailiderr, setccmailiderr] = useState(false)
    const [level1err, setlevel1err] = useState(false)
    const [level2err, setlevel2err] = useState(false)
    const [designationerr, setdesignationerr] = useState(false)
    const [departmenterr, setdepartmenterr] = useState(false)
    const [brancherr, setbrancherr] = useState(false)
    const [customererr, setcustomererr] = useState(false)
    // const [sslrequirederr, setsslrequirederr] = useState(false)

    //hohelp
    const [hohelp, sethohelp] = useState([])
    const [hovalue, sethovalue] = useState({label:"Select", value:0})

    const [initialValue, setInitialValue] = useState("");
    const [modified, setModified] = useState(false);
  

    
    const changepage = () => {
        return tabledata.slice(page * rowsperpage, (page + 1) * rowsperpage)
    }

    const handleChangePage = (event, newPage) => {
        setpage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setrowsperpage(parseInt(event.target.value, 10));
        // setpage(0);
    };



    const customerhelps=async()=>{
        await axios.instance.get(`CustomerHelp/${localStorage.getItem('customer_HO')}/${localStorage.getItem('AdminUser')==='Y'?1:0}/${localStorage.getItem('Customer_Log')}`)
        .then((res)=>{
            const data=res.data
            const options=data.map(row=>({
                "label":row.Customer_Name,
                "value":row.Customer_Id
            }))
            setcustomerhelp(options)
            console.log(options,"customerhelp")
        })
    }

    const branchhelps=async()=>{
        await axios.instance.get(`BranchHelp/${localStorage.getItem("Customer_Log")}`)
        .then((res)=>{
            const data=res.data
            const options=data.map(row=>({
                "label":row.Branch_Name,
                "value":row.Branch_Id
            }))
            options.push({label:"select",value:0})
            setbranchhelp(options)
            console.log(options,"BranchHelp")
        })
    }

    const departmenthelps=async()=>{
        await axios.instance.get(`DeparmentHelp`)
        .then((res)=>{
            const data=res.data
            const options=data.map(row=>({
                "label":row.DEPARTMENT_Description,
                "value":row.DEPARTMENT_Description
            }))
            setdepartmenthelp(options)
            console.log(options,"DeparmentHelp")
        })
    }

    const designationhelps=async()=>{
        await axios.instance.get(`DesignationHelp`)
        .then((res)=>{
            const data=res.data
            const options=data.map(row=>({
                "label":row.Designation_Description,
                "value":row.Designation_Description
            }))
            setdesignationhelp(options)
            console.log(options,"DesignationHelp")
        })
    }

    const HoHelp=async(id)=>{
        console.log(id);
        await axios.instance.get(`HoHelp/${id}`)
        .then((res)=>{
            const data=res.data
            const options=data.map(row=>({
                "label":row.CustomerHo_Name,
                "value":row.CustomerHo_id
            }))
            for (const dataq of res.data) {
                sethovalue({label:dataq.CustomerHo_Name, value:dataq.CustomerHo_id})
            }
            sethohelp(options)
         
            console.log(options,"HoHelp")
        })
    }


    
    const insertcustomeruser=async()=>{
        console.log(hovalue );
        if(localStorage.getItem("AdminUser")==='Y'){
            if(usercode.length!="" && username.length !="" && password.length !="" && departmentvalue.value.length !=0 &&
            designationvalue.value.length!=0 && emailid.length!="" &&  customervalue.value.length!=0 &&
            level1!="" && ccmailid.length!="" ){
                // && smtpserver.length!="" && smtpport.length!="" mailpassword.length!=""  &&
                await axios.instance.post(`InsertCutomerUserReg`,
                {
                
                    User_Code:usercode,
                    User_Name:username,
                    Password:password,
                    Department:departmentvalue.label,
                    Designation:designationvalue.label,
                    Emailid:emailid,
                    User_Active:useractive?"Y":"N",
                    Created_By:1,
                    Created_Date:new Date(),
                    Branch_Log:branchvalue.value,
                    Customer_Log:customervalue.value,
                    AdminUser:Finallevel?"Y":"N",
                    mailpassword:mailpassword,
                    SMTPServer:smtpserver,
                    SMTPPort:smtpport,
                    SSLRequired:sslrequired?1:0,
                    Approval2:level1?"Y":"N",
                    Approval3:level2?"Y":"N",
                    ccmailid:ccmailid,
                    CustomerHo_Name:hovalue.label,
                    CustomerHo_Id:parseInt(hovalue.value)


                })
                .then((res)=>{
                    console.log(res.data);
                    if(res.data.length ===1 ) {
                        setadded(true) 
                        setusercode("")
                        setusername("")
                        setpassword("")
                        setdepartmentvalue({label:"Select", value:""})
                        setdesignationvalue({label:"Select", value:""})
                        setemailid("")
                        setuseractive(true)
                        setFinallevel(false)
                        setmailpassword("")
                        setsmtpserver("")
                        setsmtpport("")
                        setsslrequired(true)
                        setlevel2(false)
                        // setlevel1(false)
                        setccmailid("")
                        setbranchvalue("")
                        setcustomervalue("")
                        getalldata()
                        sethovalue({label:"Select", value:""})
                    }else{
                        setduplicateerror(true)
                    }
                    
            
                })  
                
              
                
                
                
            }
            else{
                if(usercode.length===0){
                    setusercodeerr(true)
                }
                if(username.length===0){
                    setusernameerr(true)
                }
                if(emailid.length===0){
                    setemailiderr(true)
                }
                if( departmentvalue.value.length===0){
                    setdepartmenterr(true)
                }
                if(designationvalue.value.length===0){
                    setdesignationerr(true)
                }
                if(password.length===0){
                    setpassworderr(true)
                    // setpassworderr1(true)
                }
                
                // if(Finallevel.length===""){
                //     setFinallevelerr(true)
                //     setTimeout(() => {
                //         setFinallevelerr(false)
                //     }, 2000);
                // }
                if(mailpassword.length===0){
                    setmailpassworderr(true)
                }
                if(smtpserver.length===0){
                    setsmtpservererr(true)
                }
                if(smtpport.length===0 && !/^\d+$/.test(smtpport)){
                    setsmtpporterr(true)
                }
                // if(level2.length===0){
                //     setlevel2err(true)
                //     setTimeout(() => {
                //         setlevel2err(false)
                //     }, 2000);
                // }
                // if(level1.length===0){
                //     setlevel1err(true)
                //     setTimeout(() => {
                //         setlevel1err(false)
                //     }, 2000);
                // }
                if(ccmailid.length===0){
                    setccmailiderr(true)
                }
                if(customervalue.value.length===0){
                    setcustomererr(true)
                }
                // if(branchvalue.value.length===0){
                //     setbrancherr(true)
                // }
                if (!level1) {
                    setlevel1err(true);
                }
            
                setTimeout(() => {
                    setusercodeerr(false)
                    setusernameerr(false)
                    setemailiderr(false)
                    setdepartmenterr(false)
                    setdesignationerr(false)
                    setpassworderr(false)
                    setmailpassworderr(false)
                    setsmtpservererr(false)
                    setsmtpporterr(false)
                    setccmailiderr(false)
                    setcustomererr(false)
                    setbrancherr(false)
                    setlevel1err(false)
                }, 2000);
            }
        }
        else{
            
                if(usercode.length!="" && username.length !="" && password.length !="" && departmentvalue.value.length !=0 &&
                designationvalue.value.length!=0 && emailid.length!="" &&  customervalue.value.length!=0 
                && ccmailid.length!="" ){
                    // && smtpserver.length!="" && smtpport.length!="" mailpassword.length!=""  &&
                    await axios.instance.post(`InsertCutomerUserReg`,
                    {
                    
                        User_Code:usercode,
                        User_Name:username,
                        Password:password,
                        Department:departmentvalue.label,
                        Designation:designationvalue.label,
                        Emailid:emailid,
                        User_Active:useractive?"Y":"N",
                        Created_By:1,
                        Created_Date:new Date(),
                        Branch_Log:branchvalue.value,
                        Customer_Log:customervalue.value,
                        AdminUser:Finallevel?"Y":"N",
                        mailpassword:mailpassword,
                        SMTPServer:smtpserver,
                        SMTPPort:smtpport,
                        SSLRequired:sslrequired?1:0,
                        Approval2:level1?"Y":"N",
                        Approval3:level2?"Y":"N",
                        ccmailid:ccmailid,
                        CustomerHo_Name:hovalue.label,
                        CustomerHo_Id:parseInt(hovalue.value)
    
    
                    })
                    .then((res)=>{
                        console.log(res.data);
                        if(res.data.length ===1 ) {
                            setadded(true) 
                            setusercode("")
                            setusername("")
                            setpassword("")
                            setdepartmentvalue({label:"Select", value:""})
                            setdesignationvalue({label:"Select", value:""})
                            setemailid("")
                            setuseractive(true)
                            setFinallevel(false)
                            setmailpassword("")
                            setsmtpserver("")
                            setsmtpport("")
                            setsslrequired(true)
                            setlevel2(false)
                            setlevel1(false)
                            setccmailid("")
                            setbranchvalue("")
                            setcustomervalue("")
                           
                            sethovalue({label:"Select", value:""})
                        }else{
                            setduplicateerror(true)
                        }
                        
                
                    })  

                    getalldata()
                 
                    
                }
                else{
                    if(usercode.length===0){
                        setusercodeerr(true)
                    }
                    if(username.length===0){
                        setusernameerr(true)
                    }
                    if(emailid.length===0){
                        setemailiderr(true)
                    }
                    if( departmentvalue.value.length===0){
                        setdepartmenterr(true)
                    }
                    if(designationvalue.value.length===0){
                        setdesignationerr(true)
                    }
                    if(password.length===0){
                        setpassworderr(true)
                    }
                    // if(Finallevel.length===""){
                    //     setFinallevelerr(true)
                    //     setTimeout(() => {
                    //         setFinallevelerr(false)
                    //     }, 2000);
                    // }
                    if(mailpassword.length===0){
                        setmailpassworderr(true)
                    }
                    if(smtpserver.length===0){
                        setsmtpservererr(true)
                    }
                    if(smtpport.length===0 && !/^\d+$/.test(smtpport)){
                        setsmtpporterr(true)
                    }
                    // if(level2.length===0){
                    //     setlevel2err(true)
                    //     setTimeout(() => {
                    //         setlevel2err(false)
                    //     }, 2000);
                    // }
                    // if(level1.length===0){
                    //     setlevel1err(true)
                    //     setTimeout(() => {
                    //         setlevel1err(false)
                    //     }, 2000);
                    // }
                    if(ccmailid.length===0){
                        setccmailiderr(true)
                    }
                    if(customervalue.value.length===0){
                        setcustomererr(true)
                    }
                    // if(branchvalue.value.length===0){
                    //     setbrancherr(true)
                    // }
                    if (!level1) {
                        setlevel1err(true);
                    }
                
                    setTimeout(() => {
                        setusercodeerr(false)
                        setusernameerr(false)
                        setemailiderr(false)
                        setdepartmenterr(false)
                        setdesignationerr(false)
                        setpassworderr(false)
                        setmailpassworderr(false)
                        setsmtpservererr(false)
                        setsmtpporterr(false)
                        setccmailiderr(false)
                        setcustomererr(false)
                        setbrancherr(false)
                        setlevel1err(false)
                    }, 2000);
                }
            
        }
        
    }

    const getalldata=async()=>{
        await axios.instance.get(`GetCustomerUserReg/${localStorage.getItem("customer_HO")}/${(localStorage.getItem("AdminUser")==="Y"?1:0)}/${localStorage.getItem("Customer_Log")}/${localStorage.getItem("Branch_Log")}`)
        .then((res)=>{
            settabledata(res.data,"tabledata")
            console.log(res.data);
        })
    }

    const editdata = (data) => {
        // const data = ContractTableData.filter(d=>d.contract_ID == deleteid)
        console.log(data,'dataaa')
        setusercode(data.User_Code)
        setusername(data.User_Name)
        setpassword(data.Password)
        setdepartmentvalue({label:data.Department, value:data.Department})
        setdesignationvalue({label:data.Designation, value:data.Designation})
        setemailid(data.Emailid)
        // setuseractive(data.User_Active)
        setFinallevel(data.AdminUser==='N'?false:true)
        setmailpassword(data.mailpassword)
        setsmtpserver(data.SMTPServer)
        setsmtpport(data.SMTPPort)
        setlevel1(data.Approval2=="N"?false:true)
        setlevel2(data.Approval3==="N"?false:true)
        setccmailid(data.ccmailid)
        setbranchvalue({label:data.Branch_Name, value:data.Branch_Log})
        setcustomervalue({label:data.Customer_Name, value:data.Customer_Log})
        sethovalue({label:data.CustomerHo_Name, value:data.CustomerHo_Id})
        setuseractive(data.User_Active=='N'?false:true)
        setsslrequired(data.SSLRequired==0?false:true)
    }

    const UpdateCusUserReg=async()=>{
        await axios.instance.put(`UpdateCustomerUserReg/${deleteid}`,{

        User_Code:usercode,
        User_Name:username,
        Emailid:emailid,
        Department:departmentvalue.label,
        Designation:designationvalue.label,
        Password:password,
        AdminUser:Finallevel==true?'Y':'N',
        mailpassword:mailpassword,
        SMTPServer:smtpserver,
        SMTPPort:smtpport,
        SSLRequired:sslrequired?1:0,
        Approval2:level1==true?'Y':'N',
        Approval3:level2==true?'Y':'N',
        ccmailid:ccmailid,
        Branch_Log:branchvalue.value,
        Customer_Log:customervalue.value,
        Modify_By:1,
        Modify_Date:new Date(),
        User_Active:useractive==true?'Y':'N'
        })
        .then((res)=>{
            console.log(res.data,"updatedata")
            
        })
        getalldata()
        setusercode("")
        setusername("")
        setpassword("")
        setdepartmentvalue({label:"Select", value:""})
        setdesignationvalue({label:"Select", value:""})
        setemailid("")
        setuseractive(true)
        setFinallevel(false)
        setmailpassword("")
        setsmtpserver("")
        setsmtpport("")
        setsslrequired(true)
        setlevel2(false)
        setlevel1(false)
        setccmailid("")
        setbranchvalue("")
        setcustomervalue("")
        
        setupdated(true)
        sethovalue({label:"select",value:""})
    }

    const deletecususerreg=async()=>{
        await axios.instance.delete(`DeleteCustomerUserReg/${deleteid}`)
        .then((res)=>{
            getalldata()
            setdeleted(true)
        })
    }
    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     if (!modified && value !== initialValue) {
    //       setModified(true);
    //     }
    //     setusercode(value);
    //   };
    
    //   const handleKeyDown = (e) => {
    //     if (!modified && e.key === "Backspace") {
    //       e.preventDefault();
    //     }
    //   };
   

  return (
    <React.Fragment>
        <div>
            <Container fluid={true}>
            <h6 className="monthwisetitle">Customer User Registration</h6>
                <Card style={{backgroundColor:"white"}} >
                    {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                        Customer User Registration
                    </CardTitle> */}
                    <CardBody>
                        <Row>
                            <Col sm={12} lg={3} md={6}>
                                <div   style={{ width: '200px',marginTop:"2px" }}>
                                    <Label ><b>User Code</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="text"  value={usercode} onChange={(e)=>{{
                                        setusercode(e.target.value)
                                        
                                        
                                        }}}  ></Input>
                                    {
                                        usercodeerr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter User Code</p>:null
                                    }
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div  style={{ width: '200px',marginTop:"2px" }}>
                                    <Label><b>User Name</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="text"  
                                    onFocus ={()=> {
                                        const Filterdata  =tabledata.filter((data) => (data.User_Code).toLowerCase() === (usercode).toLowerCase())
                                        console.log(Filterdata)
                                        if(Filterdata.length >0){
                                            setduplicateerror(true)
                                        }
                                        else{

                                        }
                                    }}
                                    
                                    value={username} onChange={(e)=>setusername(e.target.value)}></Input>
                                    {
                                        usernameerr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter User Name</p>:null
                                    }
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }} > 
                                    <Label><b>Password</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="password"  value={password} onChange={(e)=>{
                                        setpassword(e.target.value)
                                        if(e.target.value.length <6)
                                        {
                                            setpassworderr1(true)
                                            setTimeout(() => {
                                                setpassworderr1(false)
                                            }, 2000);
                                        }
                                        else{
                                            
                                        }
                                        }} ></Input>
                                    {
                                        passworderr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter Password</p>:null
                                      

                                    }
                                    {
                                         passworderr1==true?<p style={{color:"red",fontSize:'12px'}}>Password must be six or more </p>:null
                                    }
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div  style={{ width: '200px',marginTop:"2px" }}>
                                    <Label style={{marginLeft:"5px"}}><b>Department</b> <span style={{color:'red'}}>*</span></Label>
                                        <Select 
                                            value={departmentvalue}   
                                            name='Department Help'
                                            options={departmenthelp}
                                            onChange={(value)=>{
                                                setdepartmentvalue(value)
                                                console.log(value,"values")
                                            }}   
                                        />
                                        {
                                            departmenterr==true?<p style={{color:"red",fontSize:'12px'}}>Please select department</p>:null
                                        }
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <Col sm={12} lg={3} md={6}>
                                <div  style={{ width: '200px',marginTop:"2px" }}>
                                    <Label style={{marginLeft:"5px"}}><b>Designation</b> <span style={{color:'red'}}>*</span></Label>
                                        <Select 
                                            value={designationvalue}   
                                            name='Department Help'
                                            options={designationhelp}
                                            onChange={(value)=>{
                                                setdesignationvalue(value)
                                                console.log(value,"values")
                                            }}
                                                
                                        />
                                        {
                                            designationerr==true?<p style={{color:"red",fontSize:'12px'}}>Please Select Designation</p>:null
                                        }
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }} > 
                                    <Label><b>Email Id</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="Mail"  value={emailid} onChange={(e)=>setemailid(e.target.value)}></Input>
                                    {
                                        emailiderr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter Email Id</p>:null
                                    }
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }} > 
                                    <Label><b>CC-Mail Id</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="Mail" value={ccmailid} onChange={(e)=>setccmailid(e.target.value)}></Input>
                                    {
                                        ccmailiderr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter CC-Mail Id</p>:null
                                    }
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div  style={{ width: '200px',marginTop:"2px" }}>
                                    <Label style={{marginLeft:"5px"}}><b>Customer</b> <span style={{color:'red'}}>*</span></Label>
                                        <Select 
                                            value={customervalue}   
                                            name='Customer Help'
                                            options={customerhelp}
                                            onChange={(value)=>{
                                                setcustomervalue(value)
                                                HoHelp(value.value)
                                                console.log(value,"values")
                                            }}
                                                
                                        />
                                        {
                                            customererr==true?<p style={{color:"red",fontSize:'12px'}}>Please Select Customer</p>:null
                                        }
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }}>
                                    <Label style={{marginLeft:"5px"}}><b>Head Office</b></Label>
                                        <Select 
                                            isDisabled
                                            value={hovalue}   
                                            name='HO Help'
                                            // options={branchhelp}
                                            // onChange={(value)=>{
                                            //     setbranchvalue(value)
                                            //     console.log(value,"values")

                                            // }}
                                                
                                        />
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }}>
                                    <Label style={{marginLeft:"5px"}}><b>Branch</b></Label>
                                        <Select 
                                            value={branchvalue}   
                                            name='Branch Help'
                                            options={branchhelp}
                                            onChange={(value)=>{
                                                setbranchvalue(value)
                                                console.log(value.value,"values")
                                            }}
                                                
                                        />
                                        {/* {
                                            brancherr==true?<p style={{color:"red",fontSize:'12px'}}>Please Select Branch</p>:null
                                        } */}
                                </div>
                            </Col>
                            {/* <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }} > 
                                    <Label><b>SMTP Server</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="Mail"  value={smtpserver} onChange={(e)=>setsmtpserver(e.target.value)}></Input>
                                    {
                                        smtpservererr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter SMTP Server</p>:null
                                    }
                                </div>
                            </Col> */}
                            {/* <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }} > 
                                    <Label><b>SMTP Port</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="number"  value={smtpport} onChange={(e)=>setsmtpport(e.target.value)}></Input>
                                    {
                                        smtpporterr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter SMTP Port</p>:null
                                    }
                                </div>
                            </Col> */}
                              <Col sm={12} lg={3} md={6} style={{marginTop:"7px"}}> 
                                <div >
                                    <p><b>User Role</b></p>
                                    {(localStorage.getItem("AdminUser")==='Y')?
                                            <div style={{border:"1px solid #CCCCCC",width:"200px"}} >
                                                <div style={{marginLeft:"25px"}}>
                                                    
                                                <Input type="checkbox" value={Finallevel} 
                                                name='id'
                                                checked={Finallevel} onChange={(e)=>setFinallevel((e.target.checked))} disabled></Input>
                                                <Label><b>Final Level</b></Label>
                                                </div>
                                                <div style={{marginLeft:"25px"}}>
                                                <Input type="checkbox" value={level2}  name='id'
                                                checked={level2} onChange={(e)=>setlevel2((e.target.checked))} disabled></Input>
                                                <Label><b> Level-2</b></Label>
                                                </div>
                                                <div style={{marginLeft:"25px"}}>
                                                <Input type="checkbox" value={level1}  name='id' 
                                                checked={level1} onChange={(e)=>setlevel1((e.target.checked))} />
                                                <Label><b>Level-1</b></Label>
                                                </div>
                                                {
                                                level1err===true?<p style={{color:"red",fontSize:'12px'}}>Please Select User Role</p>:null
                                                }
                                            </div>
                                             
                                        :
                                            <div style={{border:"1px solid #CCCCCC",width:"200px"}} >
                                                <div style={{marginLeft:"25px"}}>
                                                    
                                                <Input type="checkbox" value={Finallevel} 
                                                name='id'
                                                checked={Finallevel} onChange={(e)=>setFinallevel((e.target.checked))} disabled></Input>
                                                <Label><b>Final Level</b></Label>
                                                </div>
                                                <div style={{marginLeft:"25px"}}>
                                                <Input type="checkbox" value={level2}  name='id'
                                                checked={level2} onChange={(e)=>setlevel2((e.target.checked))} disabled></Input>
                                                <Label><b> Level-2</b></Label>
                                                </div>
                                                <div style={{marginLeft:"25px"}}>
                                                <Input type="checkbox" value={level1}  name='id'
                                                checked={level1} onChange={(e)=>setlevel1((e.target.checked))} disabled/>
                                                <Label><b>Level-1</b></Label>
                                                </div>

                                            </div>
                                    }   
                                    {/* {
                                        Finallevelerr==true || level1err==true || level2err==true?<p style={{color:"red",fontSize:'12px'}}>Please Select User Role</p>:null
                                    } */}
                                </div>
                            </Col>
                             <Col sm={12} lg={3} md={6} style={{marginTop:"7px"}}> 
                                <div  style={{gap:"30px",marginLeft:"20px"}}>
                                    <div>
                                    <Input type="checkbox" checked={useractive} value={useractive} onChange={(e)=>setuseractive((e.target.checked))}></Input>
                                    <Label><b>User Active</b></Label>
                                    </div>
                                    <div>
                                    <Input type="checkbox"  checked={sslrequired} value={sslrequired} onChange={(e)=>setsslrequired((e.target.checked))}></Input>
                                    <Label><b>SSL Required</b></Label>
                                    </div>
                                </div>
                                {isedit?(
                                    <div style={{marginTop:"10px"}}>
                                    <button type="button" class="btn btn-primary"
                                        onClick={()=>{
                                            UpdateCusUserReg() 
                                            setisedit(false)
                                        }} 
                                    >Update</button>
                                    </div>
                                    ):(
                                    <div style={{marginTop:"20px"}}>
                                        <button type="button" class="btn btn-primary" onClick={()=>insertcustomeruser()}>Add</button>
                                    </div>
                                )}
                            </Col>
                            <Col>
                                {/* {isedit?(
                                    <div style={{marginTop:"10px"}}>
                                    <button type="button" class="btn btn-primary"
                                        onClick={()=>{
                                            UpdateCusUserReg() 
                                            setisedit(false)
                                        }} 
                                    >Update</button>
                                    </div>
                                    ):(
                                    <div style={{marginTop:"20px"}}>
                                        <button type="button" class="btn btn-primary" onClick={()=>insertcustomeruser()}>Add</button>
                                    </div>
                                )} */}

                            </Col>
                            
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            {/* <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }} > 
                                    <Label><b>Mail Password</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="password"  value={mailpassword} onChange={(e)=>setmailpassword(e.target.value)}></Input>
                                    {
                                        mailpassworderr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter Mail Password</p>:null
                                    }
                                </div>
                            </Col> */}
                          
                            {/* <Col style={{marginTop:"7px"}}> 
                                <div className='d-flex ' style={{gap:"40px",marginLeft:"20px"}}>
                                    
                                    <div>
                                    <Input type="checkbox"></Input>
                                    <Label><b>is indent Approval</b></Label>
                                    </div>
                                </div>
                            </Col> */}
                            {/* <Col style={{marginTop:"7px"}}> 
                                <div className='d-flex ' style={{gap:"40px",marginLeft:"20px"}}>
                                    <div>
                                    <Input type="checkbox"></Input>
                                    <Label><b>Approval Not Required</b></Label>
                                    </div>
                                    <div>
                                    <Input type="checkbox" ></Input>
                                    <Label><b>SSL Required</b></Label>
                                    </div>
                                </div>
                            </Col> */}
                           
                        </Row>

                        <TableContainer style={{marginTop:'20px'}}>
                                        <Table className="InspectionTbl" responsive>
                                            <TableHead>
                                                <TableRow>
                                                    {/* <TableCell>Contract No</TableCell> */}
                                                    <TableCell>User Code</TableCell> 
                                                    <TableCell>User Name</TableCell>
                                                    <TableCell>Email Id</TableCell>
                                                    <TableCell>User Active</TableCell>
                                                    <TableCell>Edit</TableCell>
                                                    <TableCell>Delete</TableCell>
                                                    {/* <TableCell>Email Id</TableCell>
                                                    <TableCell>CC-Mail Id</TableCell>
                                                    <TableCell>Company Id</TableCell>
                                                    <TableCell>Customer Name</TableCell>
                                                    <TableCell>Edit</TableCell>
                                                    <TableCell>Delete</TableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tabledata.length !=0 ?(changepage().map((data)=>(
                                                <TableRow>
                                                    <TableCell>{data.User_Code}</TableCell>
                                                    <TableCell>{data.User_Name}</TableCell>
                                                    <TableCell>{data.Emailid}</TableCell>
                                                    <TableCell>{data.User_Active=="Y"?"Yes":"No"}</TableCell>
                                                    {/* <TableCell>{moment(data.Contract_from_date).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell>{moment(data.Contract_To_date).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell>{data.Contract_Value}</TableCell>
                                                    <TableCell>{data.company_id}</TableCell>
                                                    <TableCell>{data.Customer_Name}</TableCell> */}
                                                    <TableCell align="left">
                                                        <IconButton size="small"   >
                                                            {/* <VisibilityIcon fontSize="small"  */}
                                                               <EditIcon fontSize="small" 
                                                                    onClick={()=>{ 
                                                                    editdata(data)
                                                                    setdeleteid(data.User_Id)
                                                                    setisedit(true)
                                                                    }}
                                                                />      
                                                        </IconButton  >
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <IconButton size="small">
                                                            <DeleteIcon fontSize= "small"
                                                             onClick={()=>{setdeletedconfirm(true)
                                                                setdeleteid(data.User_Id)
                                                            }
                                                              
                                                                // ()=>deletedata(data.contract_ID)
                                                             } 
                                                            />
                                                        </IconButton  >
                                                    </TableCell>
                                                </TableRow>
                                                ))):
                                                (
                                                    <TableCell align="left">NO Data Found</TableCell>
                                                )}
                                            </TableBody>
                                       
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        component="div"
                                        rowsPerPageOptions={pages}
                                        count={tabledata.length}
                                        rowsPerPage={rowsperpage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                    </CardBody>
                </Card>
                

            </Container>
            {added?(
                <SweetAlert
                    title=" Added Successfully"
                    timeout={2000}
                    style={{
                    position: "absolute",
                    justifyContent:'center',
                    alignItems:'center'
                    }}
                    showCloseButton={false}
                    showConfirm={false}
                    success
                    onConfirm={() => {
                    setadded(false);
                    }}
                ></SweetAlert>
            ):null}
            {deleted?(
                <SweetAlert
                    title=" Data Deleted Successfully"
                    timeout={2000}
                    style={{
                    position: "absolute",
                    justifyContent:'center',
                    alignItems:'center'
                    }}
                    showCloseButton={false}
                    showConfirm={false}
                    success
                    onConfirm={() => {
                    setdeleted(false);
                    }}
                ></SweetAlert>
            ):null}
            {duplicateerror?(
                <SweetAlert
                    title=" User Code Already Exists"
                    timeout={2000}
                    style={{
                    position: "absolute",
                    justifyContent:'center',
                    alignItems:'center'
                    }}
                    showCloseButton={false}
                    showConfirm={false}
                    warning
                    onConfirm={() => {
                    setduplicateerror(false);
                    }}
                ></SweetAlert>
            ):null}

            {deletedconfirm?(
                <SweetAlert
                    title="Are You Sure?"
                    style={{
                    position: "absolute",
                    justifyContent:'center',
                    alignItems:'center'
                    }}
                    confirmBtnBsStyle="success"
                    
                    showConfirm={true}
                    cancelBtnBsStyle="danger"
                    cancelBtnText='Cancel'
                    confirmBtnText='Yes,delete it!'
                    showCancel={true}
                    warning
                    onConfirm={()=>{deletecususerreg()
                        setdeletedconfirm(false)
                    }}
                    onCancel={() => {
                        setdeletedconfirm(false);
                        setdeleted(false)
                    }}
                ><p style={{fontSize:'20px'}}>You Won't able to revert this!</p></SweetAlert>
            ):null}
            {updated?(
                <SweetAlert
                    title=" Updated Successfully"
                    timeout={2000}
                    style={{
                    position: "absolute",
                    justifyContent:'center',
                    alignItems:'center'
                    }}
                    showCloseButton={false}
                    showConfirm={false}
                    success
                    onConfirm={() => {
                    setupdated(false);
                    }}
                ></SweetAlert>
            ):null}
        </div>

    </React.Fragment>
  )
}

export default CustomerUserRegistrartion
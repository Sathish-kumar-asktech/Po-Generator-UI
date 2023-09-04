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
const [department, setdepartment] = useState("")
    useEffect(() => {
     
      customerhelps()
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
    const [level1, setlevel1] = useState(false)
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
    const [emailiderr, setemailiderr] = useState(false)
    const [departmenterror, setdepartmenterror] = useState(false)
    // const [useractiveerr, setuseractiveerr] = useState(false)
    
  
    // const [sslrequirederr, setsslrequirederr] = useState(false)

    //hohelp
    const [hohelp, sethohelp] = useState([])
    const [hovalue, sethovalue] = useState({label:"Select", value:0})

    const [customererr, setcustomererr] = useState(false)

    
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
   
            if(department.length!="" &&customervalue.value.length!=0 ){
                // && smtpserver.length!="" && smtpport.length!="" mailpassword.length!=""  &&
                await axios.instance.post(`insertDepartment`,
                {
                
                    DepartmentDesc: department,
                    Customer_Id:customervalue.value,
                    Headoffice_Id:hovalue.value,
                   
                
                    Created_By:localStorage.getItem('Userid'),
                    Created_Date:new Date(),
                  


                })
                .then((res)=>{
                    console.log(res.data);
                    if(res.data.length ===1 ) {
                        setadded(true) 
                    }else{
                        setduplicateerror(true)
                    }
                    
            
                })  
            
            
              setdepartment("")
                getalldata()
                sethovalue({label:"Select", value:""})
                setcustomervalue({label:"Select", value:""})
            }
            else{
                if(department.length===0){
                    setdepartmenterror(true)
                }
                if(customervalue.value.length===0){
                    setcustomererr(true)
                }
                setTimeout(() => {
                    setdepartmenterror(false)
                   setcustomererr(false)
                }, 2000);
            }
        }
      
        
    

    const getalldata=async()=>{
        await axios.instance.get(`GetllDepartment/${localStorage.getItem('Customer_Log')}`)
        .then((res)=>{
            settabledata(res.data,"tabledata")
            console.log(res.data);
        })
    }

    const editdata = (data) => {
 setdepartment(data.DepartmentDesc)
 setcustomervalue({label:data.Customer_Name,value:data.Customer_Id})
 sethovalue({label:data.CustomerHo_Name,value:data.Headoffice_Id})
     
    }

    const UpdateCusUserReg=async()=>{
        await axios.instance.put(`UpdateDepartment/${deleteid}`,{

            DepartmentDesc: department,
                    Customer_Id:customervalue.value,
                    Headoffice_Id:hovalue.value,
        Modify_By:localStorage.getItem('Userid'),
        Modify_Date:new Date(),
   
        })
        setupdated(true)
        getalldata()
      setdepartment("")
      sethovalue({label:"Select", value:""})
      setcustomervalue({label:"Select", value:""})
    }
    
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

    const deletecususerreg=async()=>{
        await axios.instance.delete(`DeleteDepartment/${deleteid}`)
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
            <h6 className="titledept">Department</h6>
                <Card >
                    {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                        Department 
                    </CardTitle> */}
                    <CardBody>
                        <Row>
                            <Col sm={12} lg={3} md={6}>
                                <div   style={{ width: '200px',marginTop:"2px" }}>
                                    <Label ><b>Department</b> <span style={{color:'red'}}>*</span></Label>
                                    <Input type="text"  value={department} onChange={(e)=>{setdepartment(e.target.value)}}  ></Input>
                                    {
                                        departmenterror==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter Department</p>:null
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
                                    <div style={{marginTop:"30px"}}>
                                        <button type="button" class="btn btn-primary" onClick={()=>insertcustomeruser()}>Add</button>
                                    </div>
                                )}
                              </Col>
                        </Row>
                     
                   
                        

                        <TableContainer style={{marginTop:'20px'}}>
                                        <Table className="InspectionTbl" responsive>
                                            <TableHead>
                                                <TableRow>
                                                    {/* <TableCell>Contract No</TableCell> */}
                                                    <TableCell>Department</TableCell> 
                                                    <TableCell>Customer</TableCell>
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
                                                    <TableCell>{data.DepartmentDesc}</TableCell>
                                                    <TableCell>{data.Customer_Name}</TableCell>
                                                    <TableCell align="left">
                                                        <IconButton size="small"   >
                                                            {/* <VisibilityIcon fontSize="small"  */}
                                                               <EditIcon fontSize="small" 
                                                                    onClick={()=>{ 
                                                                    editdata(data)
                                                                    setdeleteid(data.Departmentid)
                                                                    setisedit(true)
                                                                    }}
                                                                />      
                                                        </IconButton  >
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <IconButton size="small">
                                                            <DeleteIcon fontSize= "small"
                                                             onClick={()=>{setdeletedconfirm(true)
                                                                setdeleteid(data.Departmentid)
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
                    title="Department Name Already Exists"
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
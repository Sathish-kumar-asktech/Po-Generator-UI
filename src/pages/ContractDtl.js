import React from "react";
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



const Contract=()=>{

    const [fromdate, setfromdate] = useState('')
    
    const [todate, settodate] = useState('')
    const [todate1, settodate1] = useState('')

    //branchhelp
    const[branchvalue,setbranchvalue]=useState({label:"All", value:"0"})
    const [branchhelp, setbranchhelp] = useState([])

    const [ContractTableData, setContractTableData] = useState([])

    const [Contractvalue, setContractvalue] = useState('')
    const [Contractdetailno, setContractdetailno] = useState('')
    const [Contractvalerr, setContractvalerr] = useState(false)
    const [ContractDtlerr, setContractDtlerr] = useState(false)

    const[deleted,setdeleted]=useState(false)
    const [deletedconfirm, setdeletedconfirm] = useState(false)
    const [deleteid, setdeleteid] = useState('')

    const [isedit, setisedit] = useState(false)
    const [added, setadded] = useState(false)
    const [updated, setupdated] = useState(false)

    const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
    const [page, setpage] = useState(0)
    const [rowsperpage, setrowsperpage] = useState(pages[page])

    //customerhelp
    const [customerhelp, setcustomerhelp] = useState([])
    const [customervalue, setcustomervalue] = useState({label:"Select", value:"0"})

    // const [tableinitialize, settableinitialize] = useState({
      
    //    todate1:(moment(lastday).format('YYYY-MM-DD')),
    //   fromdate:(moment(firstday).format('YYYY-MM-DD')),
    //    todate:(moment(lastday).format('YYYY-MM-DD')),
    //     Contractvalue:"",
    //     Contractdetailno:'',

    // })

    const changepage = () => {
        return ContractTableData.slice(page * rowsperpage, (page + 1) * rowsperpage)
    }

    const handleChangePage = (event, newPage) => {
        setpage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setrowsperpage(parseInt(event.target.value, 10));
        // setpage(0);
    };

    const [duplicateerrorfordate, setduplicateerrorfordate] = useState(false)
    
const datereset =()=>{
    var date =  new Date()
          
    var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
   
    var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    setfromdate(moment(firstday).format('YYYY-MM-DD'))
    settodate1(moment(lastday).format('YYYY-MM-DD'))
    settodate(moment(lastday).format('YYYY-MM-DD'))
}

    const [notdelete, setnotdelete] = useState(false)
    useEffect(() => {
        var date =  new Date()
          
        var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
       
        var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        setfromdate(moment(firstday).format('YYYY-MM-DD'))
        settodate1(moment(lastday).format('YYYY-MM-DD'))
        settodate(moment(lastday).format('YYYY-MM-DD'))
        console.log(lastday,'dateto')

        BranchHelp()
        tabledata()
        customerhelps()
    
      
    }, [])
    
    const BranchHelp=async()=>{
        await axios.instance.get(`/BranchHelp/${localStorage.getItem("Customer_Log")}`)
        .then((res)=>{
            console.log(res.data,"BranchHelp")
            const data=res.data
            const option=data.map(row=>({
                "label":row.Branch_Name,
                "value":row.Branch_Id
        }))
             option.push({"label":"All","value":"0"})
            setbranchhelp(option,"branchhelp")
            console.log(option,"branchhelp");
        })
    }

    const tabledata=async()=>{
        await axios.instance.get(`/ContractDtl/${localStorage.getItem("customer_HO")}/${(localStorage.getItem("AdminUser")==='Y'?1:0)}/${localStorage.getItem("Customer_Log")}`)
        .then((res)=>{
            console.log(res.data,'contracttable')
            setContractTableData(res.data)
        })
    }

    const deletedata=async()=>{
        await axios.instance.delete(`ContractDelete/${deleteid}`)
        .then((res)=>{

            if(res.data.length===0){
                tabledata()
           
                setdeleted(true)
            }
            else{
                setnotdelete(true)
            }
            
        })
        
    }


    const updatedata=async()=>{
        await axios.instance.put(`/ContractUpdate/${deleteid}`,
        {
            Contract_date:todate1,
            Customer_id:localStorage.getItem("customer_HO")==="Y"?customervalue.value:localStorage.getItem("Customer_Log"),
            // Contract_No:"1",
            Contract_Detail_No:Contractdetailno,
            Contract_from_date:fromdate,
            Contract_To_date:todate,
            Contract_Value:Contractvalue,
            // PO_Value:,
            created_by:localStorage.getItem("Userid"),
            create_date:moment(new Date()).format("yyyy-MM-DD"),
            Active:'Y',
            company_id:localStorage.getItem("Companyid")
        },{ headers: {'Authorization': localStorage.getItem('authtoken') 
        , 'Content-Type': 'application/json'}}).then((res=>{
            console.log(res.data);
        }))
        setContractvalue("")
        setContractdetailno("")
        datereset()
        tabledata()
        setcustomervalue("")
    }

    const editdata = (data) => {
        // const data = ContractTableData.filter(d=>d.contract_ID == deleteid)
        console.log(data)
        setcustomervalue({label:data.Customer_Name, value:data.Customer_id})
        setContractdetailno(data.Contract_Detail_No)
        setContractvalue(data.Contract_Value)
        setfromdate(moment(data.Contract_from_date).format("YYYY-MM-DD"))
        settodate(moment(data.Contract_To_date).format("YYYY-MM-DD"))
        settodate1(moment(data.Contract_date).format("YYYY-MM-DD"))

        
        


        // setfromdate(moment(data[0].Contract_from_date).format('DD-MM-YYYY'))
        // settodate(moment(data.Contract_to_date).format("DD-MM-YYYY"))
        // settodate1(data[0].Contract_date)
    }

    const Insertdata=async()=>{
        if(Contractvalue.length !="" && Contractdetailno.length !="" ){
        await axios.instance.post(`/ContractInsert`,{
            Contract_date:todate1,
            Customer_id:localStorage.getItem("customer_HO")==="Y"?customervalue.value:localStorage.getItem("Customer_Log"),
            // Contract_No:,
            Contract_Detail_No:Contractdetailno,
            Contract_from_date:fromdate,
            Contract_To_date:todate,
            Contract_Value:Contractvalue,
            // PO_Value:,
            created_by:localStorage.getItem("Userid"),
            create_date:new Date(),
            Active:'Y',
            company_id:localStorage.getItem("Companyid")
        })
        .then((res)=>{
            console.log(res.data,"insertdate");
            console.log(res)
            if(res.data.length === 0){
                tabledata()
                setadded(true)
            }
            else{
                setduplicateerrorfordate(true)
            }
            // Error 50001, severity 16, state 3 was raised, but no message with that error number was found in sys.messages. If error is larger than 50000, make sure the user-defined message is added using sp_addmessage.

            
        })
        setContractvalue("")
        setContractdetailno("")
        datereset()
        setcustomervalue("")
    }
    else{
        // alert("]]")
      if(Contractvalue.length ===0){
        // console.log("yuki");
        setContractvalerr(true)
        setTimeout(() => {
            setContractvalerr(false) 
        }, 2000);
      }
      if(Contractdetailno.length ===0){
        // console.log("Hanol");
        setContractDtlerr(true)
        setTimeout(() => {
            setContractDtlerr(false) 
        }, 2000);
      }
        
    }
        
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

    return(
        <React.Fragment>
            <div>
                <Container fluid={true}>
                    <h6 className="monthwisetitle">Contract Detail</h6>
                    <Card style={{backgroundColor:"white"}} >
                        {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                           Contract Detail
                        </CardTitle> */}
                        <CardBody>
                            <Row>
                            {/* {localStorage.getItem('customer_HO')=='Y'? */}
                                <Col sm={12} lg={3} md={6}>
                                    <div  style={{ width: '200px',marginTop:"2px" }}>
                                        <Label style={{marginLeft:"5px"}}><b>Customer</b> <span style={{color:'red'}}>*</span></Label>
                                            <Select 
                                                value={customervalue}   
                                                name='Customer Help'
                                                options={customerhelp}
                                                onChange={(value)=>{
                                                    setcustomervalue(value)
                                                    // HoHelp(value.value)
                                                    console.log(value,"values")
                                                }}
                                                    
                                            />
                                            {/* {
                                                customererr==true?<p style={{color:"red",fontSize:'12px'}}>Please Select Customer</p>:null
                                            } */}
                                    </div>
                                </Col>
                                {/* :
                                <Col sm={12} lg={3} md={6}>
                                            
                                    <div className="DefectType" style={{ width: '200px',marginTop:"2px" }}>
                                        <Label style={{marginLeft:"5px"}}><b>Branch</b></Label>
                                            <Select 
                                                value={branchvalue}   
                                                name='Branch Help'
                                                options={branchhelp}
                                                onChange={(value)=>{
                                                    setbranchvalue(value)
                                                    console.log(value,"values")
                                                }}
                                                    
                                            />
                                    </div>
                                
                                </Col>
                            } */}
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }}>
                                    <Label><b>From Date</b></Label>
        
                                    <Input type='date' 
                                        value={fromdate} 
                                        id="fromdate" 
                                        onChange={(e) => setfromdate(e.target.value)} 
                                        min={"1900-01-01"} maxLength="4" max={ "9999-12-31" }
                                    /> 
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }}>
                                <Label><b>To Date</b></Label>
                                <Input type='date'
                                    value={todate}
                                    id="todate" 
                                    onChange={(e) => settodate(e.target.value)}  
                                    min={"1900-01-01"} maxLength="4" max={ "9999-12-31" }
                                />
                                </div>
                            </Col>
                            <Col sm={12} lg={3} md={6}>
                                <div style={{ width: '200px',marginTop:"2px" }}>
                                    <Label><b>Contract Date</b></Label>
        
                                    <Input type='date' 
                                        value={todate1} 
                                        id="fromdate" 
                                        onChange={(e) => settodate1(e.target.value)} 
                                        min={"1900-01-01"} maxLength="4" max={ "9999-12-31" }
                                    /> 
                                </div>
                            </Col>
                            </Row>
                            <Row style={{marginTop:'10px'}}>
                                <Col sm={12} lg={3} md={6}>
                                    <div style={{ width: '200px',marginTop:"2px",marginLeft:'8px' }}>
                                        <Label><b>Contract Value</b> <span style={{color:'red'}}>*</span></Label>
            
                                        <Input type='number' 
                                            value={Contractvalue} 
                                            id="Contract Value" 
                                            onChange={(e) => setContractvalue(e.target.value)} 
                                            
                                        /> 
                                        {
                                            Contractvalerr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter Contract Value</p>:null
                                        }
                                    </div>
                                </Col>
                                <Col sm={12} lg={3} md={6}>
                                    <div style={{ width: '200px',marginTop:"2px" }}>
                                        <Label><b>Contract Detail No</b> <span style={{color:'red'}}>*</span></Label>
            
                                        <Input type='number' 
                                            value={Contractdetailno} 
                                            id="Contract Value" 
                                            onChange={(e) => setContractdetailno(e.target.value)} 

                                            
                                        /> 

                                        {
                                            ContractDtlerr==true?<p style={{color:"red",fontSize:'12px'}}>Please Enter Contract Detail No</p>:null

                                        }
                                    </div>
                                </Col>
                                <Col sm={12} lg={3} md={6}>     
                                    <div style={{marginLeft:'10px',marginTop:'30px'}}>
                                        {isedit==false?(
                                        <Button1    color="primary" className="adbtn2 " onClick={()=>{
                                            Insertdata()
                                           
                                            } }>
                                            Add
                                        </Button1>
                                        ):(
                                    
                                        <Button1  style={{marginLeft:'8px'}}  color="primary" className="adbtn2 " onClick={()=>{
                                            updatedata()
                                            setisedit(false)
                                            setupdated(true)
                                            
                                            }}>
                                            Update
                                        </Button1>
                                        )
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <TableContainer style={{marginTop:'20px'}}>
                                        <Table className="InspectionTbl" responsive>
                                            <TableHead>
                                                <TableRow>
                                                    {/* <TableCell>Contract No</TableCell> */}
                                                    {/* <TableCell>Customer Id</TableCell>  */}
                                                    <TableCell>Contract Detail No</TableCell>
                                                    <TableCell>Contract Date</TableCell>
                                                    <TableCell>Contract From Date</TableCell>
                                                    <TableCell>Contract To Date</TableCell>
                                                    <TableCell>Contract Value</TableCell>
                                                    <TableCell>Company Id</TableCell>
                                                    <TableCell>Customer Name</TableCell>
                                                    <TableCell>Edit</TableCell>
                                                    <TableCell>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ContractTableData.length !=0 ?(changepage().map((data)=>(
                                                <TableRow>
                                                    {/* <TableCell>{data.Contract_No}</TableCell> */}
                                                    {/* <TableCell>{data.Customer_id}</TableCell> */}
                                                    <TableCell>{data.Contract_Detail_No}</TableCell>
                                                    <TableCell>{moment(data.Contract_date).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell>{moment(data.Contract_from_date).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell>{moment(data.Contract_To_date).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell>{data.Contract_Value}</TableCell>
                                                    <TableCell>{data.company_id}</TableCell>
                                                    <TableCell>{data.Customer_Name}</TableCell>
                                                    <TableCell align="left">
                                                        <IconButton size="small"   >
                                                            {/* <VisibilityIcon fontSize="small"  */}
                                                               <EditIcon fontSize="small" onClick={()=>{ 
                                                                editdata(data)
                                                                setdeleteid(data.contract_ID)
                                                                setisedit(true)
                                                            
                                                            }}/>      
                                                        </IconButton  >
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <IconButton size="small">
                                                            <DeleteIcon fontSize= "small"
                                                             onClick={()=>{setdeletedconfirm(true)
                                                                setdeleteid(data.contract_ID)
                                                            }
                                                              
                                                                // ()=>deletedata(data.contract_ID)
                                                             } />
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
                                        count={ContractTableData.length}
                                        rowsPerPage={rowsperpage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
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

                                    {notdelete?(
                                        <SweetAlert
                                            title=" PO Raise Against Of This Contract Dtl"
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
                                            setnotdelete(false);
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
                                        onConfirm={()=>{deletedata()
                                            setdeletedconfirm(false)
                                        }}
                                        onCancel={() => {
                                            setdeletedconfirm(false);
                                            setdeleted(false)
                                        }}
                                    ><p style={{fontSize:'20px'}}>You Won't able to revert this!</p></SweetAlert>
                                    ):null}
                                   
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
                                     {duplicateerrorfordate?(
                                        <SweetAlert
                                            title=" Please Update Alredy Exist Contract Value"
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
                                            setduplicateerrorfordate(false);
                                            }}
                                        ></SweetAlert>
                                    ):null}
                        </CardBody>
                    </Card>
                </Container>
            </div>
            
        </React.Fragment>
    );
}


export default Contract
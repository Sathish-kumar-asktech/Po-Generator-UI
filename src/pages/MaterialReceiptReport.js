
import React, { useEffect, useMemo, useState } from 'react'
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
import SweetAlert from "react-bootstrap-sweetalert";
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
import numeral, { options } from 'numeral';
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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const misreport1=()=>{
    const [dialogbox, setdialogbox] = useState(false)
    const classes = useStyles();
    const [buyerordererror, setbuyerordererror] = useState(false)
    const [fromdate, setfromdate] = useState('')
    const [todate, settodate] = useState('')
    const [usertype, setusertype] = useState('')
    const [createdby, setcreatedby] = useState('')
    const [tabledatas, settabledatas] = useState([])
    const [popupstatus, setpopupstatus] = useState([])
    const [modal, setModal] = useState(false);
    const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
    const [page, setpage] = useState(0)
    const [rowsperpage, setrowsperpage] = useState(pages[page])

    const[createdbyvalue,setcreatedbyvalue]=useState({label:"All", value:"0"})
    const [createdbyhelps, setcreatedbyhelps] = useState([])
    const [tokent, settokent] = useState('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudGxpc3QiOlt7IlVzZXJJRCI6IjEiLCJMb2dpbkNvZGUiOiIwMSIsIkxvZ2luTmFtZSI6IkFkbWluIiwiRW1haWxJZCI6ImFkbWluQGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiQURNSU4ifV0sImlhdCI6MTYzODM1NDczMX0.ZW6zEHIXTxfT-QWEzS6-GuY7bRupf2Jc_tp4fXIRabQ')

    //branchhelp
    const[branchvalue,setbranchvalue]=useState({label:"All", value:"0"})
    const [branchhelp, setbranchhelp] = useState([])

    //Total PO Count
    const [toatalpocount, settoatalpocount] = useState('')
    //TotalPoValue
    const [totalpovalue, settotalpovalue] = useState('')

    const [contractno, setcontractno] = useState('')

    // const [nodatafound,setnodatafound]= useState('false')

    const[approvedbyvalue,setapprovedbyvalue]=useState({label:"All", value:"0"})
    const [approvedbyhelp, setapprovedbyhelp] = useState([])

    //customerhelp
    const [customerhelp, setcustomerhelp] = useState([])
    const [customervalue, setcustomervalue] = useState({label:"All", value:"0"})
    const [materialissueentrycollection, setmaterialissueentrycollection] = useState([])
    const [departmentcollections, setdepartmentcollections] = useState([])
    const [departmentid, setdepartmentid] = useState('0')
    const [materialissuenocollection, setmaterialissuenocollection] = useState([])
    const [materialid, setmaterialid] = useState('0')
    const [productcollection, setproductcollection] = useState([])
    const [productid, setproductid] = useState('0')
    const [dccollections, setdccollections] = useState([])
    const [dcid, setdcid] = useState('0')
    const [mrnovalue, setmrnovalue] = useState('')
    const [dcvalue, setdcvalue] = useState('')
    const [productvalue, setproductvalue] = useState('')
    const toggle = () => setModal(!modal);

    const changepage = () => {
        return materialissueentrycollection.slice(page * rowsperpage, (page + 1) * rowsperpage)
    }

    const handleChangePage = (event, newPage) => {
        setpage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setrowsperpage(parseInt(event.target.value, 10));
        // setpage(0);
    };

    useEffect(() => {
        
        var date =  new Date()
          
        var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
       
        var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        setfromdate(moment(firstday).format('YYYY-MM-DD'))
        settodate(moment(lastday).format('YYYY-MM-DD'))

        const usertypes=localStorage.getItem("AdminUser")
        setusertype(usertypes)
        console.log(usertypes,"usertype")

        const createdbys=localStorage.getItem("Userid")
        setcreatedby(createdbys)
        console.log(createdbys,"createdby")

        const contractdtlno=localStorage.getItem("Contract_Detail_No")
        setcontractno(contractdtlno)

        console.log(localStorage.getItem("Customer_Log"),'Customer_Log');
        
        
     
        Getamaterilissueno()
        Getallproductsmaterialise()
        getalldccollection()
    }, [])
    
   


    const getalldccollection = async() => {
        const get= await axios.instance.get('/Getalldcnomaterialreceipt',{ headers: {'Authorization':tokent,'Content-Type': 'application/json', }}).then((res) => {
      
          // setallsuppliers(res.data)
      const data  =res.data
      const options = data.map(b => ( {
      'label' : b.Delivery_Chellan_No,
      'value' : b.POId
      }))
    //   for (const data of res.data) {
    //     setdcvalue(data.Delivery_Chellan_No)
    //   }
      setdccollections(options)
      options.push({'label' : 'All' , 'value' : '0'})
  
        })
        }


        const Getamaterilissueno = async() => {
            const get= await axios.instance.get(`/GetallMrno/${localStorage.getItem('Customer_Log')}/${localStorage.getItem('customer_HOID')}`,{ headers: {'Authorization':tokent,'Content-Type': 'application/json', }}).then((res) => {
          
              // setallsuppliers(res.data)
          const data  =res.data
          const options = data.map(b => ( {
          'label' : b.ReceiptNo
          ,
          'value' : b.ReceiptId
          }))
          setmaterialissuenocollection(options)
        
       
          options.push({'label' : 'All' , 'value' : '0'})
            })
            }


            const Getallproductsmaterialise = async() => {
                const get= await axios.instance.get('/Getallmaterialrecepitproduct',{ headers: {'Authorization':tokent,'Content-Type': 'application/json', }}).then((res) => {
              
                  // setallsuppliers(res.data)
              const data  =res.data
              const options = data.map(b => ( {
              'label' : b.Product_Details_Description
              ,
              'value' : b.ProductId
              }))
              setproductcollection(options)
              options.push({'label' : 'All' , 'value' : '0'})
             
                })
                }
    const GetReport = async() => {
        //console.log('st',statius )
   
     
    
     
      const dataa=  await axios.instance.post(`/GetMaterialReciptReport`,
      
      // ${statius}/${allbuyerss}/${buyerid}/${moment(fromdate).format('YYYYMMDD')}/${moment(todate).format('YYYYMMDD')}`, 
      {
  
        Allreceiptid:materialid,
        AllDcid:dcid,
        AllProductId:productid,
  FromDate:moment(fromdate).format('YYYYMMDD'),
  Todate:moment(todate).format('YYYYMMDD'),
  customerid:localStorage.getItem('Customer_Log'),
  CustomerHoId:localStorage.getItem('customer_HOID')
      },
      
      
      
    
      { headers: {'Authorization':tokent,
      'Content-Type': 'application/json',
      
      }}).then((res)=>{
let qtytotal=[]
  setmaterialissueentrycollection(res.data)
  for(const data of res.data){
    qtytotal.push(data.ReceivedQty)
}
let sumoftotalpovalue=0
for(var i=0;i<qtytotal.length;i++){
    sumoftotalpovalue +=qtytotal[i]
}
settotalpovalue(sumoftotalpovalue)
  setdialogbox(true)
        if(res.data.length === 0){
          setbuyerordererror(true)
          setdialogbox(true)
        } else{
          
        }
  
      
      })
      setTimeout(() => {
       setdialogbox(false)
      }, 2000);
    }
      
    const ExportToexcel1= () => {
            
        let misreport1=[]
        const columns=[
            "MR NO",
            "MR Date",
            "DC No",
            "DC Date",
            "PO NO",
            "Product",
            "UOM",
            "Received Qty"
        ]

        materialissueentrycollection.map((data)=>{
            console.log(data,'fdd')
            misreport1.push({
                "MR NO":data.ReceiptNo,
                "MR Date":moment(data.ReceiptDate).format('DD-MM-YYYY'),
                "DC No":data.Delivery_Chellan_No,
                "DC Date":moment(data.Delivery_Chellan_Date).format('DD-MM-YYYY'),
                "PO NO":data.PoNo,
                "Product":data.Product_Details_Description,
                "UOM":data.UOM_Description,
                "Received Qty":data.ReceivedQty.toString(),
            })
        })


        const wb = new Xl.Workbook();
        const ws = wb.addWorksheet('Material Receipt'); 

        var headings = wb.createStyle({
            font: {
                bold: true,
                size: 12,
                vertAlign: 'center',
                width:20
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            },
            border: {
                left: {
                    style: "thin"
                },
                right: {
                    style: "thin"
                },
                top: {
                    style: "thin"
                },
                bottom: {
                    style: "thin"
                }
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#ddd9c3'
            }
        });
console.log(materialid,'df')
        ws.cell(1, 1, 1, 15, true).string("Material Receipt Report").style(headings)
        ws.cell(3,1).string("MR NO").style(headings)
         ws.cell(3,2).string(materialid == '0' ? 'ALL':mrnovalue).style(headings)
         ws.cell(3,4).string("DC NO").style(headings)
         ws.cell(3,5).string(dcid == '0' ? 'ALL':dcvalue).style(headings)
        ws.cell(3,7).string("From Date").style(headings)
        ws.cell(3,8).string(moment(fromdate).format("DD-MM-yyyy")).style(headings)

        ws.cell(5,1).string("To Date").style(headings)
        ws.cell(5,2).string(moment(todate).format("DD-MM-yyyy")).style(headings)

        ws.cell(5,4).string("Product").style(headings)
        ws.cell(5,5).string(productid == '0' ? 'ALL':productvalue).style(headings)

        let headingColumnIndex = 1;
        columns.forEach(heading => {
        ws.column(headingColumnIndex).setWidth(30);
        ws.cell(8, headingColumnIndex++)
        .string(heading).style(headings)   
        }); 

        var heading1 = wb.createStyle({
            font: {
                bold: false,
                size: 12,
                vertAlign: 'center'
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
                
            },
            border: {
                left: {
                    style: "thin"
                },
                right: {
                    style: "thin"
                },
                top: {
                    style: "thin"
                },
                bottom: {
                    style: "thin"
                }
            }
        })

        var headingLeft = wb.createStyle({
            font: {
                bold: false,
                size: 12,
                vertAlign: 'center'
            },
            alignment: {
                horizontal: 'left',
                vertical: 'center',
                wrapText: true
                
            },
            border: {
                left: {
                    style: "thin"
                },
                right: {
                    style: "thin"
                },
                top: {
                    style: "thin"
                },
                bottom: {
                    style: "thin"
                }
            }
        })
        var headingRight = wb.createStyle({
        font: {
            bold: false,
            size: 12,
            vertAlign: 'center'
        },
        alignment: {
            horizontal: 'right',
            vertical: 'center',
            wrapText: true
            
        },
        border: {
            left: {
                style: "thin"
            },
            right: {
                style: "thin"
            },
            top: {
                style: "thin"
            },
            bottom: {
                style: "thin"
            }
        }
        })
        
        
        let rowIndex = 9;
        misreport1.forEach( record => {
        let columnIndex = 1;
        Object.keys(record ).forEach(columnName =>{
            console.log(columnName)
            ws.column(columnIndex).setWidth(30);
    
            columnIndex === 5 || columnIndex === 6 ?
            ws.cell(rowIndex,columnIndex).style(headingRight)  :
            ws.cell(rowIndex,columnIndex).style(headingLeft)
            
            ws.cell(rowIndex,columnIndex++)
                .string(record [columnName])
                // console.log(record[columnName],"")
        });
        rowIndex++;
        });
    

        
        


        wb.writeToBuffer().then(function(buffer) {
            //console.log(buffer)
            const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
            //console.log(datas)
            
        FileSaver.saveAs(data,  'Materil Recepit' + ".xlsx")
        });
    }
    
      

    return(
            <React.Fragment>
                    <div>
                        <Container fluid={true}>
                        <h6 className="monthwisetitle">Material Receipt Report</h6>

                            <Card style={{backgroundColor:"white"}} >
                                {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                                            Material Receipt Report
                                </CardTitle> */}
                                <CardBody>
                                    <Row>
                                <Col sm={12} lg={3} md={6}>
                                        
                                        <div className="DefectType" style={{ width: '200px',marginTop:"2px" }}>
                                            <Label style={{marginLeft:"5px"}}><b>MR  NO</b></Label>
                                                <Select 
                                                    options={materialissuenocollection}
                                                    onChange={(value)=> {
                                                        setmaterialid(value.value)
                                                        setmrnovalue(value.label)
                                                        }}
                                                        defaultValue={{'label' : 'All' , 'value' : '0'}}
                                                />
                                        </div>
                                  
                                    </Col>


                                    <Col sm={12} lg={3} md={6}>
                                        
                                        <div className="DefectType" style={{ width: '200px',marginTop:"2px" }}>
                                            <Label style={{marginLeft:"5px"}}><b>DC  NO</b></Label>
                                                <Select 
                                                    options={dccollections}
                                                    onChange={(value)=> {
                                                        setdcid(value.value)
                                                        setdcvalue(value.label)
                                                        }}
                                                        defaultValue={{'label' : 'All' , 'value' : '0'}}
                                                />
                                        </div>
                                  
                                    </Col>
                                    <Col sm={12} lg={3} md={6}>
                                        <div style={{ width: '200px',marginTop:"2px" }}>
                                            <Label><b>From Date</b></Label>
                
                                            <Input type='date' 
                                                value={fromdate} 
                                                id="fromdate" 
                                                onChange={(e)=> {
                                                    setfromdate(e.target.value)
                                                    }}
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
                                                onChange={(e)=> {
                                                    settodate(e.target.value)
                                                    }}
                                                min={"1900-01-01"} maxLength="4" max={ "9999-12-31" }
                                            />
                                            </div>
                                        </Col>
                                        <Col sm={12} lg={3} md={6}>
                                        
                                        <div className="DefectType" style={{ width: '200px',marginTop:"2px" }}>
                                            <Label style={{marginLeft:"5px"}}><b>Product</b></Label>
                                                <Select 
                                                      options={productcollection}
                                                      onChange={(value)=> {
                                                          setproductid(value.value)
                                                          setproductvalue(value.label)
                                                          }}
                                                        defaultValue={{'label' : 'All' , 'value' : '0'}}
                                                 
                                                />
                                        </div>
                                  
                                    </Col>
                                 
                                         {/* <Col sm={12} lg={2} md={6} style={{marginTop:"33px"}}> */}
                                            
                                           
                                                {/* <Button1    color="primary" className="adbtn2 " onClick={GetReport}  >
                                                    View
                                                </Button1> */}
                                            
                                           
                                   
                                        
                                        {/* </Col> */}
                                        <Col sm={12} lg={2} md={6} style={{marginTop:"33px",marginLeft:"10px"}}>
                                                <Button1    color="primary" className="adbtn2 " onClick={GetReport}  >
                                                    View
                                                </Button1>
                                        {materialissueentrycollection!=""?
                                        // <div > 
                                            
                                            <Button1  style={{marginLeft:'8px'}}  color="primary" className="adbtn2 "onClick={()=>{
                                              
                                               
                                                    ExportToexcel1()
                                            
                                              
                                            }}  >
                                                Export
                                            </Button1>
                                        // </div>
                                        :null
                                        }  
                                          </Col>
                                          {productid !='0' ? (

                                         
                                          <Col sm={12} lg={3} md={6} style={{marginTop:"33px"}}>
                                            <div>
                                                <p ><span className='text-primary'>Total Qty :</span><div>{(totalpovalue)}</div></p> 
                                            </div>
                                        </Col>
                                         ):null}
                                    </Row>
                                  
                                    
                                    <TableContainer style={{marginTop:'20px'}}>
                                        <Table className="InspectionTbl">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>MR NO - MR Date</TableCell>
                                                    {/* <TableCell>MR Date</TableCell>  */}
                                                    <TableCell>Product</TableCell>
                                                    <TableCell>UOM</TableCell>
                                                    <TableCell>Received Qty</TableCell>
                                                    <TableCell>PO No</TableCell>
                                                    <TableCell>DC NO - DC Date</TableCell>
                                                    {/* <TableCell>Dc Date</TableCell> */}
                                                    
                                                
                                                    
                                                    
                                                   
                                                   
                                                  
                                                   
                                                    
                                                    
                                                    
                                                </TableRow>
                                            </TableHead>
                                            
                                            <TableBody>
                                                {materialissueentrycollection.length !=0 ?(changepage().map((data)=>(
                                                <TableRow>
                                                    <TableCell style={{width:"100px"}}>{data.ReceiptNo} / {moment(data.ReceiptDate).format('DD-MM-YYYY')}</TableCell>
                                                    {/* <TableCell>{moment(data.ReceiptDate).format('DD-MM-YYYY')}</TableCell> */}
                                                    <TableCell style={{width:"300px"}}>{(data.Product_Details_Description)}</TableCell>
                                                    <TableCell style={{width:"75px"}}>{(data.UOM_Description)}</TableCell>
                                                    <TableCell style={{width:"100px"}}>{data.ReceivedQty}</TableCell>
                                                    <TableCell style={{width:"75px"}}>{data.PoNo}</TableCell>
                                                    <TableCell style={{width:"100px"}}>{data.Delivery_Chellan_No} / {moment(data.Delivery_Chellan_Date).format('DD-MM-YYYY')}</TableCell>
                                                    {/* <TableCell>{moment(data.Delivery_Chellan_Date).format('DD-MM-YYYY')}</TableCell> */}

                                                   
                                                   
                                                  
                                                 
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
                                        count={materialissueentrycollection.length}
                                        rowsPerPage={rowsperpage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </CardBody>
                            </Card>
                        </Container>
                    </div>
                    
      { buyerordererror ? (
                    <SweetAlert
                      title="No Data Found..."
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
                        setbuyerordererror(false);
                      }}
                    ></SweetAlert>
                  ) : null}
                        
      <Backdrop  open={dialogbox} className={classes.backdrop} >
      <Spinner name="ball-spin-fade-loader"  color='#fafafa' />

     </Backdrop>
            </React.Fragment>
    )

}

export default misreport1


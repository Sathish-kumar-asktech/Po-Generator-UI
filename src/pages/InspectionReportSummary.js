import React,{useState, useEffect} from 'react'
import './InspectionSummary.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select'

import  { useHistory } from  'react-router-dom'
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
    Button,
    
    TabContent, 
    TabPane,
     Nav,
      NavItem, 
      NavLink,  
    CardTitle,
     CardText, 
    Row, Col
  } from 'reactstrap';
  import Table from '@material-ui/core/Table';
  import axios from '../axios'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'
import Backdrop from '@material-ui/core/Backdrop';
import PrintIcon from '@material-ui/icons/Print';
 import {TablePagination }  from '@material-ui/core'; 
 import {saveAs} from 'file-saver'
 import { makeStyles } from '@material-ui/core/styles';
 import  Spinner  from 'react-spinkit'
 import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet
} from "react-device-detect";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    
  },
}));
function InspectionReportSummary() {
  const classes = useStyles();
  const history = useHistory()
    const [open, setOpen] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [imageurl, setimageurl] = useState('')
  const [open2, setopen2] = React.useState(false)
  const [opendialog2, setopendialog2] = useState(false)
    const handleClickOpen = (url, e) => {
      setimageurl(url)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
     
    };

    const handleClose3 = () => {
    
      setOpen3(false)
    };
    const handelclikopen2 = (url, e) => {
      setimageurl(url)
      setOpen(true);
    };
  
    const handleClose2 = () => {
      setopen2(false);
    };
    const [getfactory, setgetfactory] = useState('')
    const [garment, setgarment] = useState('')
   const [getfromdate, setfromdate] = useState('')
   const [gettodate, settodate] = useState('')
  
   const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
   const [page, setpage] = useState(0)
   const [rowsperpage, setrowsperpage] = useState(pages[page])
  const [garmentinfo, setgarmentinfo] = useState([]) 
  const [factoryinfo, setfactoryinfo] = useState([])
    const [Buyer, setBuyer] = useState([])
    const [factoryid, setfactoryid] = useState('0')
    const [inspection, setinspection] = useState('0')
    const [buyerId, setbuyerId] = useState('0')
    const [griddata, setgriddata] = useState([]) 
    const [getcritical, setgetcritical] = useState([])
   const [getmajor, setgetmajor] = useState('')
    const [defactdat, setdefactdat] = useState('')
    const [stauts, setstauts] = useState('0')
    const [insepctor, setinsepctor] = useState('')
  const [usertype, setusertype] = useState('')
  const [data, setdata] = useState(new Date().toDateString())
  const [fromdatee, setfromdatee] = useState('')
  const [toodate, settoodate] = useState('')
  const [Allbuyer, setAllbuyer] = useState('1')
  const [Allfactory, setAllfactory] = useState('1')
   const [Allinsepection, setAllinsepection] = useState('1')
  const [Allstatus, setAllstatus] = useState('1')
  const [garmentphoto, setgarmentphoto] = useState([])
  const [masurementimage, setmasurementimage] = useState([])
  const [Defactdescription, setDefactdescription] = useState([])
  const [buyeroption, setbuyeroption] = useState([])
  const [factoryoption, setfactoryoption] = useState([])
    var allfactory = [ 
      { All: '0' }
              
    ];
    var allbuyer = [
  {All: '0'}
    ];
     var allinspection = [
 {All: '0'}
     ];
     var allstatus = [
{All:'0'}
     ];

     const buyer =async e => {
      const buyers = await axios.instance.get('/Buyer',  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setBuyer(buyers.data)
      const data =  buyers.data
      const optionsbuy =  data.map(b => ({
        'label' : b.Buyer,
        'value' : b.BuyerId
      }))
      optionsbuy.push({'label': 'All', 'value' : '0'})
      setbuyeroption(optionsbuy)
    }



    const getfactorydata= async e => {
      const factory = await axios.instance.get('/gen',  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setfactoryinfo(factory.data) 
      const data =  factory.data
       const options =  data.map(f => ({
         'label' : f.AccName,
         'value' : f.AccId
       }))
       options.push({'label': 'All', 'value' : '0'})
       setfactoryoption(options)
    }



  useEffect(() => {
   

   
    getfactorydata()
   
   
      buyer()
    var date =  new Date()
    var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
    var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)
   
    var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

  
   setfromdatee(moment(firstday).format('YYYY-MM-DD'))
   settoodate(moment(lastday).format('YYYY-MM-DD'))
  }, [])

  
    const getReport = async e =>{
      if(factoryid === '0') {
       
        setAllfactory('1')
      }else {
        
       setAllfactory('0')
      }
      
      if(buyerId ==='0') {
       
       setAllbuyer('1')
      }else {
       
       setAllbuyer('0')
      }
      if((stauts.length!=0)){
     
    

     
       const getdata = await axios.instance.get(`/inspectionReport2/${Allfactory}/${factoryid}/${Allbuyer}/${buyerId}/${moment(fromdatee).format('YYYY-MM-DD')}/${moment(toodate).format('YYYY-MM-DD')}/${Allinsepection}/${inspection}/${Allstatus}/${stauts}/${localStorage.getItem('usertype')}/${localStorage.getItem('userid')}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
       'Content-Type': 'application/json'
       }})
   
    if(getdata.data) {
      setgriddata(getdata.data)  
    }
  
    
      }
      
  }
  
    const getgarmentphoto =  async (garmentid, e) => {
     const getphoto = await axios.instance.get(`/getgarmentimage/${garmentid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'
     }})
     setgarmentphoto(getphoto.data)

     setOpen(true);
    }
    const Getmasure = async(masurementid, e ) => {
      const getphoto = await axios.instance.get(`/getmasurementimage/${masurementid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setmasurementimage(getphoto.data)
     
      setopen2(true);
    } 
  
    const handleChangePage = (event, newPage) => {
      setpage(newPage);
    };
    
  
  
    const handleChangeRowsPerPage = (event) => {
      setrowsperpage(parseInt(event.target.value, 10));
    };
  
    const changepage = () => {
      if(griddata.length !=0){
        return griddata.slice(page * rowsperpage, (page + 1) * rowsperpage)
      }
     
    }
  
     
    const changebuyer = (buyerid, e) =>  {
     if(buyerid === '0') {
        setbuyerId(buyerid)
       setAllbuyer('1')
     }else  {
      setbuyerId(buyerid)
      setAllbuyer(0)
     }
      
    }

    const changefactory = (factoryid, e) => {
      if(factoryid === '0') {
         setfactoryid(factoryid)
        setAllfactory('1')
      }else  {
        setfactoryid(factoryid)
        setAllfactory('0')
      }
    }

    const changeinspection = (inspection, e) => {
      if(inspection === '0') {
        setinspection(inspection)
        setAllinsepection('1')
      }else  {
        setinspection(inspection)
        setAllinsepection('0')
      }
    }
    const changestatus = (stauts, e) => {
      if(stauts === '0') {
        setstauts(stauts)
        setAllstatus('1')
      }else  {
        setstauts(stauts)
        setAllstatus('0')
      }
    }


   const  downloadpdf = async(typeofin, inspectcode , e) => {
 
    setopendialog2(true)

    if(isBrowser) {
     
      axios.instance.get(`/Inspectionpdf/${typeofin}` , 
      ).then(() => axios.instance.get('/getinspectionsummaryinvoice', { responseType: 'blob'}))
             
             .then((res) => {
               const pdfBlob = new Blob([res.data] ,{type: 'application/pdf'})
               saveAs(pdfBlob , `Insepection  ${inspectcode}.pdf`)
             
             })
             setTimeout(() => {
              setopendialog2(false)
            }, 4000); 
    }
     if(isMobile  || isTablet) {
      axios.instance.get(`/Inspectionpdf/${typeofin}`)
      window.open('http://3.109.148.179/padmahandler/api/getinspectionsummaryinvoice')
      setTimeout(() => {
       setopendialog2(false)
     }, 4000);
     
    
    }

     
   }




   const tottaldefactcalll =  async (totaldeffctid , e) => {
   
      const getinspet = await axios.instance.get(`/GetInpsectionData/${totaldeffctid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setDefactdescription(getinspet.data)
      setOpen3(true)
 
   }


   

    return (
        <div>
         <Card>
        <CardBody>
          <div className="header">
            <h5>Inspection Report</h5>
          </div>
         <div className="InspectionReportForm1">
        <div className="Factory1">
            <lable><b>Factory</b></lable>
                   <Select   defaultValue={{'label' : 'ALL' , 'value' : '0'}} options={factoryoption} onChange={(value)  => changefactory(value.value)}   />
            {/* <select value={factoryid}   onChange={e => changefactory(e.target.value, e)}>
                
                {allfactory.map((data) => (
                   <option selected value={data.All}>All</option>
                ))}
 
             
                 {factoryinfo.map((data) => (
                <option value={data.AccId}   >{data.AccName}</option>
                
                ))}
            </select> */}
          
           
            </div>
            <div className="buyer1">
            <lable><b>Buyer</b></lable>
             <Select defaultValue={{'label' : 'ALL' , 'value' : '0'}}  options={buyeroption} onChange={(value)  => changebuyer(value.value)} />
               
            {/* <select value={buyerId}  id="16"    onChange={(e) => changebuyer(e.target.value, e)}  >
                  
                   {allbuyer.map((data) => (

                   <option selected value={data.All}  >All</option>
                   ))}
                   {Buyer.map((data) => (
                     <option  value={data.BuyerId} selected>{data.Buyer}</option>
                   ))}

            </select> */}

           
        </div>
        <div className="fromdate1">
        <lable><b>From Date</b></lable>
       


         <input type='date'  value={fromdatee} id="fromdate" onChange={e => setfromdatee(e.target.value)} /> 
       
        </div>
      
        <div className="Todate1">
        <lable><b>To Date</b></lable>
    
         <input type='date' id="todate" value={toodate} onChange={e => settoodate(e.target.value)} />
       
       
        </div>
       
      
        <div>
       
        </div>
     

       
        
        </div>
        <div className="InspectionReportForm2">
        <div className="insptectionType">
        <lable className="innnnns"><b>Inspestion type</b></lable>
            <select value={inspection} onChange={(e) => changeinspection(e.target.value, e)}>
            {allinspection.map((data) => (   
       <option selected value={data.All}  >All</option>
       ))}
             <option value="inline" selected>Inline</option>
                <option value="Prefinal">Prefinal</option>
                <option value="Final">Final</option>
          

            </select>
           
        </div>
        <div className="statuss">
        <lable className="stss"><b>Status</b></lable>
            <select value={stauts}   onChange= { (e) => changestatus(e.target.value) }>
            {allstatus.map((data) => (   
       <option selected value={data.All}  >All</option>
       ))}
                <option value="P">PASS</option>
                <option value="F">FAIL</option>
          

            </select>

        </div>
        <div className="inspectionrr">
        <lable className="use"><b>usertype</b></lable>

        <input type="text" value={localStorage.getItem('usertype')} onChange={ e => setinsepctor(e.target.value)}></input>
       
      
        </div>
        <div className="usertype">
        <lable className="inse"><b>Inspector</b></lable>

          <input type="text" value={localStorage.getItem('username')} onChange={ e => setinsepctor(e.target.value)}></input>
        </div>
        <div className="submitbutton">
        <Button size="small"onClick={getReport}  color="primary">
          view
        </Button>
        </div>
        </div>
      </CardBody>
        </Card>
       <Card>
           <CardBody>
           <TableContainer >
           {griddata.length !=0  ? (
      <Table  className="tbl1" >
        <TableHead>
          <TableRow className="table">
          <TableCell>Inspno</TableCell>
          <TableCell>Date</TableCell>
        <TableCell>Factory</TableCell> 
           <TableCell>Buyer</TableCell> 
             <TableCell >Style</TableCell> 
             <TableCell>Pono</TableCell>
             <TableCell>shipqty</TableCell>
             <TableCell>Inspection type</TableCell>
             <TableCell>Status</TableCell>
             <TableCell>Total Defect</TableCell>
             <TableCell>Garment Photo</TableCell>
             <TableCell>Measurment Photo</TableCell>
             <TableCell>approved By</TableCell>
             <TableCell>Print</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {changepage().map((data) => (
             
            <TableRow>
             <TableCell>{data.InspectionCode}</TableCell>
             <TableCell className="datecolum">{data.QAINSPECTIONDATE}</TableCell>
             <TableCell>{data.AccName}</TableCell>
             <TableCell>{data.BUYER}</TableCell>
             <TableCell>{data.STYLENO}</TableCell>
             <TableCell>{data.PONO}</TableCell>
             <TableCell className="shipqty">{data.SHIPQTY}</TableCell>
             <TableCell>{data.TypesofInspection}</TableCell>
             <TableCell>{data.OverallResult ==='P ' ? 'PASS' : 'FAIL'}</TableCell>
             <TableCell onClick={e =>  tottaldefactcalll(data.QAINSPECTIONID, e)} ><a style={{color: 'red',marginLeft:'10px'}}>{data.TOTALDEFECT}</a></TableCell>
 
            <TableCell className="imagecoloumn" onClick={e => getgarmentphoto(data.QAINSPECTIONID, e)}>
                      <AttachFileRoundedIcon />
            </TableCell>
            <TableCell onClick={e => Getmasure(data.QAINSPECTIONID, e)}>       
            <AttachFileRoundedIcon />
            
            </TableCell>
            <TableCell>{data.LoginName}</TableCell>
            <TableCell>
              <IconButton onClick={e => downloadpdf(data.QAINSPECTIONID, data.InspectionCode, e)}>
              <PrintIcon/>
              </IconButton>
              </TableCell>
            <TableCell onClick={handelclikopen2}></TableCell>
            </TableRow>
       
           ))}
        </TableBody>
      </Table>
           ) : 
           <Table  className="tbl1" >
           <TableHead>
             <TableRow className="table">
             <TableCell>Inspno</TableCell>
             <TableCell>Date</TableCell>
           <TableCell>Factory</TableCell> 
              <TableCell>Buyer</TableCell> 
                <TableCell >Style</TableCell> 
                <TableCell>Pono</TableCell>
                <TableCell>shipqty</TableCell>
                <TableCell>Inspection type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total Defect</TableCell>
                <TableCell>Garment Photo</TableCell>
                <TableCell>Measurment Photo</TableCell>
                <TableCell>approved By</TableCell>
                <TableCell>Print</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
           
               <TableRow>
                <TableCell>No Data found</TableCell>
               
               </TableRow>
        
           </TableBody>
         </Table>
           
           
           }     
           
         </TableContainer>
      
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
         
          <TableContainer >
          {garmentphoto.length !=0  ? (
      <Table  className="imagetble" >
        <TableHead>
          <TableRow>
         
         
        
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">IMAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            
       {garmentphoto.map((data) => ( 

     
            <TableRow>
                <TableCell align="center" >{data.Comments}</TableCell>
                <TableCell align="center" className='imagecellsum' >
          <img src={axios.baseURL+"GetCartonimage/" + data.ImageURL } />
              </TableCell>
            
            
              
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
   
    ):
    <Table  className="imagetble" >
        <TableHead>
          <TableRow>
         
         
          
            <TableCell align="left">Description</TableCell>
            <TableCell>IMAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            
     

     
            <TableRow>
                <TableCell className='imagecell' >
                No images found
              </TableCell>
              <TableCell className="taberro" ></TableCell>
            
              
            
            </TableRow>
        
        </TableBody>
      </Table>
          }
    </TableContainer>
    
                </DialogContentText>
       
        </DialogContent>
        <DialogActions>
          
        
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2} className="mesurement" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TableContainer >
          {masurementimage.length !=0  ? (
      <Table  className="imagetble" >
        <TableHead>
          <TableRow>
         
         
          
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">IMAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            
       {masurementimage.map((data) => ( 

     
            <TableRow>
               <TableCell align="center" >{data.Comments}</TableCell>
                <TableCell align="center" className='imagecellsum' >
          <img src={axios.baseURL+"GetCartonimage/" + data.ImageURL } />
              </TableCell>
             
            
              
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
   
    ):
    <Table  className="imagetble" >
        <TableHead>
          <TableRow>
         
         
         
            <TableCell align="left">Description</TableCell>
            <TableCell>IMAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            
     

     
            <TableRow>
                <TableCell className='imagecell' >
                No images found
              </TableCell>
              <TableCell className="taberro" ></TableCell>
            
              
            
            </TableRow>
        
        </TableBody>
      </Table>
          }
    </TableContainer>
      </DialogContentText>          
        </DialogContent>
        <DialogActions>
          
        
        </DialogActions>
      </Dialog>

        
     <Dialog open={open3} className="dailogsforimge" onClose={handleClose3} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
         
          <TableContainer >
          {Defactdescription.length !=0  ? (
   
         
   <Table  className="defactdescription" >
   <TableHead>
     <TableRow>
     <TableCell>Category</TableCell>
     <TableCell>Subcategory</TableCell>
     <TableCell align="left">Critical</TableCell>
     <TableCell align="left">Major</TableCell>
     <TableCell align="left">Minor</TableCell>
      
       <TableCell align="left">Image1</TableCell>
       <TableCell align="left">Image2</TableCell>
       <TableCell align="left">Image3</TableCell>
       <TableCell align="left">Image4</TableCell>
       
     </TableRow>
   </TableHead>
   <TableBody>

       
        {Defactdescription.map((data) => (

       
       <TableRow>
         <TableCell >{data.CategoryDescription}</TableCell>
       
       <TableCell >{data.SubCategoryDescription}</TableCell>
       <TableCell >{data.Critical}</TableCell>
       
         <TableCell >{data.Major}</TableCell>
         <TableCell >{data.Minor}</TableCell>
       
         <TableCell className='defactsimge1' >
         {data.ImageURL1 ===  'No Image Found' ? 'No Image found' : <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL1} />}
           </TableCell>
           <TableCell className='defactsimge2' >
             {data.ImageURL2 ===  'No Image Found' ? 'No Image found' :  <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL2} />  }
           
         </TableCell>
          <TableCell className='defactsimge3'  >    {data.ImageURL3 ===  'No Image Found' ? 'No Image found' :  <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL3} /> }
          </TableCell>
       
         <TableCell className='defactsimge4' >   {data.ImageURL4 ===  'No Image Found' ? 'No Image found' :    <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL4} /> }</TableCell>
       
       </TableRow>
        
       
       
       
        ))}
   </TableBody>
 </Table>

  
    ):
    <Table  className="imagetble" >
        <TableHead>
          <TableRow>
         
         
          
            <TableCell align="left">Description</TableCell>
            <TableCell>IMAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            
     

     
            <TableRow>
                <TableCell className='imagecell' >
                No images found
              </TableCell>
              <TableCell className="taberro" ></TableCell>
            
              
            
            </TableRow>
        
        </TableBody>
      </Table>
          }
    </TableContainer>
    
                </DialogContentText>
       
        </DialogContent>
        <DialogActions>
          
        
        </DialogActions>
      </Dialog>
      <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={griddata.length}
        rowsPerPage={rowsperpage}
        page={page}
        onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
    />
           </CardBody>
       </Card>
       <Backdrop  open={opendialog2} className={classes.backdrop} >

           
<Spinner name="ball-spin-fade-loader"  color='#fafafa' />
<p style={{marginTop: '50px'}}>downloading Pdf...</p>

</Backdrop>
       </div>     
       
    )

  }
export default InspectionReportSummary


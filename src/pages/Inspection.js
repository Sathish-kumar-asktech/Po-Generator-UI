import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import Select from 'react-select'

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
import './Inspection.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {useParams} from 'react-router-dom'
import axios from '../axios'
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from '../StateProvider';
import {TablePagination }  from '@material-ui/core'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'
import Backdrop from '@material-ui/core/Backdrop';
import Alert from '@material-ui/lab/Alert';

import  { useHistory } from  'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CircularProgress from '@material-ui/core/CircularProgress';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'; 
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import  Spinner  from 'react-spinkit'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function Inspection(props) {
  const classes = useStyles();
    const [factoryinfo, setfactoryinfo] = useState([])
    const [Buyer, setBuyer] = useState([])
    const [getfactoryid, setgetfactoryid] = useState('')
    const [getbuyerId, setgetbuyerId] = useState('')
    const [getipopoqt, setgetipopoqt] = useState([])
    const [valueoffacid, setvalueoffacid] = useState()
    const [valueofbuyid, setvalueofbuyid] = useState()
     const [style, setstyle] = useState([])
     const [getipono, setgetipono] = useState([])
     const [latqty, setlatqty] = useState('')
     const [sampleqty, setsampleqty] = useState('')
     const [shipqty, setshipqty] = useState('')
     const [plusminus, setplusminus] = useState(0)
      const [gdesp, setgdesp] = useState('')
      const [fdesp, setfdesp] = useState('')
      const [typeofinsepction, settypeofinsepction] = useState('inline')
      const [majoraql, setmajoraql] = useState('1')
      const [minoraql, setminoraql] = useState('1')
      const [uservalue, setuservalue] = useState([])
     const inputid = useRef('')
     const [{ user } , dispatch] = useStateValue();
     const [getfabgen, setgetfabgen] = useState([])
      const genref = useRef('')
      const feb = useRef('')
      const [data, setdata] = useState(new Date().toDateString())
      const [date, setdate] = useState('')
      const [valuess, setvaluess] = useState([])
      const [valuessofpono, setvaluessofpono] = useState([])
      const [valueofqty, setvalueofqty] = useState(0)
      const [getpononumber, setgetpononumber] = useState([])
     const [QAInspectionId, setQAInspectionId] = useState([])
     const [activeTab, setActiveTab] = useState('1');
     const [getpono, setgetpono] = useState('')
     const [getqavalue, setgetqavalue] = useState([])
     const getpoo = useRef('')
     const [error1, seterror1] = useState(false)
     const [error2, seterror2] = useState(false)
     const [error3, seterror3] = useState(false)
     const [error4, seterror4] = useState(false)
     const [error5, seterror5] = useState(false)
     const [error6, seterror6] = useState(false)
     const [error7, seterror7] = useState(false)
     const [error8, seterror8] = useState(false)
     const [error9, seterror9] = useState(false)
     const [errordefact, seterrordefact] = useState(false)
     const [error10, seterror10] = useState(false)
     const [error11, seterror11] = useState(false)
     const [error12, seterror12] = useState(false)
     const [error13, seterror13] = useState(false)
     const [error14, seterror14] = useState(false)
     const [error15, seterror15] = useState(false)
     const [error16, seterror16] = useState(false)
     const [error17, seterror17] = useState(false)
     const [error18, seterror18] = useState(false)
     const [error19, seterror19] = useState(false)
     const [error20, seterror20] = useState(false)
     const [error21, seterror21] = useState(false)
     const [error22, seterror22] = useState(false)
     const [error23, seterror23] = useState(false)
     const [error24, seterror24] = useState(false)
     const [error25, seterror25] = useState(false)
     const [error26, seterror26] = useState(false)
     const [error27, seterror27] = useState(false)
     const [error28, seterror28] = useState(false)
     const [error29, seterror29] = useState(false)
     const [error30, seterror30] = useState(false)
     const [error31, seterror31] = useState(false)
     const [error32, seterror32] = useState(false)
     const [error33, seterror33] = useState(false)
     const [error34, seterror34] = useState(false)
     const [error35, seterror35] = useState(false)
     const [error36, seterror36] = useState(false)
     const [error37, seterror37] = useState(false)
     const [error38, seterror38] = useState(false)
     const [error39, seterror39] = useState(false)
     const [error40, seterror40] = useState(false)
     const [error41, seterror41] = useState(false)
     const [error42, seterror42] = useState(false)
     const [error43, seterror43] = useState(false)
     const [error44, seterror44] = useState(false)
     const [error45, seterror45] = useState(false)
     const [error46, seterror46] = useState(false)
     const [error47, seterror47] = useState(false)
     const [error48, seterror48] = useState(false)
     const [error49, seterror49] = useState(false)
     const [error50, seterror50] = useState(false)
     const [error51, seterror51] = useState(false)
     const [error52, seterror52] = useState(false)
     const [error53, seterror53] = useState(false)
     const [error54, seterror54] = useState(false)
     const [error55, seterror55] = useState(false)
     const [error56, seterror56] = useState(false)
     const [error57, seterror57] = useState(false)
     const [error58, seterror58] = useState(false)
     const [error59, seterror59] = useState(false)
     const [error60, seterror60] = useState(false)
     const [error61, seterror61] = useState(false)
     const [error62, seterror62] = useState(false)
     const [error63, seterror63] = useState(false)
     const [error64, seterror64] = useState(false)
     //audit page
     const qainspid = useRef('')
     const [Auditget, setAuditget] = useState([])
     const [sampleaudit, setsampleaudit] = useState('NA')
     const [sampleauditcomment, setsampleauditcomment] = useState('')
     const [colorfabaric, setcolorfabaric] = useState('NA')
     const [colorfabariccomment, setcolorfabariccomment] = useState('')
     const [materailaudit, setmaterailaudit] = useState('NA')
     const [materailauditcomment, setmaterailauditcomment] = useState('')
     const [specialcountryaudit, setspecialcountryaudit] = useState('NA')
     const [specialcountryauditcomment, setspecialcountryauditcomment] = useState('')
     const [alltiecktingaudit, setalltiecktingaudit] = useState('NA')
     const [alltiecktingcomment, setalltiecktingcomment] = useState('')
     const [Cartonaudit, setCartonaudit] = useState('NA')
     const [Cartoncomment, setCartoncomment] = useState('')
     const [PcsPerCartonaudit, setPcsPerCartonaudit] = useState('NA')
     const [PcsPerCartoncommment, setPcsPerCartoncommment] = useState('')
     const [ProductSafetyaudit, setProductSafetyaudit] = useState('NA')
     const [ProductSafetycomment, setProductSafetycomment] = useState('')
     const [SizeAudit, setSizeAudit] = useState('NA')
     const [SizeAuditcomment, setSizeAuditcomment] = useState('')
     const [MainLabelAudit, setMainLabelAudit] = useState('NA')
     const [MainLabelAuditcomment, setMainLabelAuditcomment] = useState('')
     const [CareLabelAudit, setCareLabelAudit] = useState('NA')
     const [CareLabelAuditcomment, setCareLabelAuditcomment] = useState('')
     const [PrintAudit, setPrintAudit] = useState('NA')
     const [PrintAuditcomment, setPrintAuditcomment] = useState('')
     const [EmbAudit, setEmbAudit] = useState('NA')
     const [EmbAuditcomment, setEmbAuditcomment] = useState('')
     const [WashAudit, setWashAudit] = useState('NA')
     const [WashAuditcomment, setWashAuditcomment] = useState('')
     const [qinspid, setqinspid] = useState('')
     const samp = useRef('')
   //box and other usestate
   const [TotalNoCartonsComment, setTotalNoCartonsComment] = useState('')
   const [CompletedCartonsComment, setCompletedCartonsComment] = useState('')
   const [RoundedCartonsComment, setRoundedCartonsComment] = useState('')
   const [CountryofOrigin, setCountryofOrigin] = useState('Bangladesh')
   const [SizetoSize, setSizetoSize] = useState('')
   const [Measurement, setMeasurement] = useState('')
   const [ActualGSMCount, setActualGSMCount] = useState('')
   const [MeasurementAudit, setMeasurementAudit] = useState('F')
   const [PackingAudit, setPackingAudit] = useState('F')
   const [WorkmanshipAudit, setWorkmanshipAudit] = useState('F')
   const [OtherAudit, setOtherAudit] = useState('F')
   const [OverallResult, setOverallResult] = useState('P')
   const [Remarks1, setRemarks1] = useState('')
   const [Remarks2, setRemarks2] = useState('')
   const [Remarks3, setRemarks3] = useState('')

   const com1 = useRef('')
    const [ShippedCartonCount, setShippedCartonCount] = useState('')
    const [PulledCartonCount, setPulledCartonCount] = useState('')
    const [PassedCartonCount, setPassedCartonCount] = useState('')
    const [FailedCartonCount, setFailedCartonCount] = useState('')
      
    const [imagegerment, setimagegerment] = useState({})
    const [imagetype, setimagetype] = useState('G')
    const [imagetype1, setimagetype1] = useState('M')
    const [commetsforimg, setcommetsforimg] = useState('')
    const [ImageStatus, setImageStatus] = useState('y')
    const [imagecollection, setimagecollection] = useState([])
    const [imagecollection1, setimagecollection1] = useState([])
    const [imagecollectionbymasurement2, setimagecollectionbymasurement2] = useState([])
    const [imagecollectionbymasurement, setimagecollectionbymasurement] = useState([])
    const [Getdefactone, setGetdefactone] = useState([])
      const plusminusref = useRef('')
     const imageref1 = useRef('')
     const imageref2 = useRef('')
     const imageref3 = useRef('')
     const imageref4 = useRef('')
       const imageref5 = useRef('')
       const imageref6 = useRef('')
       const [imageloade, setimageloade] = useState(null)
     const [imageloade1, setimageloade1] = useState(null)
     const [masurmentcommet, setmasurmentcommet] = useState('')
     const [imagemasurement, setimagemasurement] = useState({cartonimage:''})
     const img = "http://localhost:8081/api/"
     const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
     const pagesd = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
     const pages1 = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
     const pages2 = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
     const pages3 = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
     const [page, setpage] = useState(0)
     const [paged, setpaged] = useState(0)
     const [page1, setpage1] = useState(0)
     const [page2, setpage2] = useState(0)
     const [page3, setpage3] = useState(0)
    const [rowsperpage, setrowsperpage] = useState(pages[page])
    const [rowsperpaged, setrowsperpaged] = useState(pagesd[paged])
    const [rowsperpage1, setrowsperpage1] = useState(pages1[page1])
    const [rowsperpage2, setrowsperpage2] = useState(pages2[page2])
    const [rowsperpage3, setrowsperpage3] = useState(pages3[page3])
    const [uploadprecntage, setuploadprecntage] = useState(0)
    const [uploadprecntage1, setuploadprecntage1] = useState(0)
    const [loading, setloading] = useState(false)
    const [loading1, setloading1] = useState(false)
     const [imageerro1, setimageerro1] = useState(false)
     const [imageerro2, setimageerro2] = useState(false)
     const [imageerro3, setimageerro3] = useState(false)
     const [imageerro4, setimageerro4] = useState(false)
     const [imageerro5, setimageerro5] = useState(false)
      const [subCategory, setsubCategory] = useState([])
      const [category, setcategory] = useState([])
      const [GetSubCategory, setGetSubCategory] = useState('')
      const [GetCategoryId, setGetCategoryId] = useState('')

      //snackbar usestate
      const [open, setopen] = useState(false)
      const [open1, setopen1] = useState(false)
      const [open2, setopen2] = useState(false)
      const [open3, setopen3] = useState(false)
      const [open4, setopen4] = useState(false)
      const [open5, setopen5] = useState(false)
      const [open6, setopen6] = useState(false)
      const [open7, setopen7] = useState(false)
      const [opendialog, setopendialog] = useState(false)
      const [opendialog1, setopendialog1] = useState(false)
       const [opendialog2, setopendialog2] = useState(false)
    //image
     const [Defactsimage1, setDefactsimage1] = useState({image1: ''})
     const [Defactsimage2, setDefactsimage2] = useState({image2: ''})
     const [Defactsimage3, setDefactsimage3] = useState({image3: ''})
     const [Defactsimage4, setDefactsimage4] = useState({image4: ''})
     const [Defactsdata, setDefactsdata] = useState([])
    //imageload
      const [Defactimageload1, setDefactimageload1] = useState(null)
      const [Defactimageload2, setDefactimageload2] = useState(null)
      const [Defactimageload3, setDefactimageload3] = useState(null)
      const [Defactimageload4, setDefactimageload4] = useState(null)

      const [Critical, setCritical] = useState('')
      const [Major, setMajor] = useState('')
      const [Minor, setMinor] = useState('')
      const [Criticalsums, setCriticalsums] = useState([])
      const [Majorsum, setMajorsum] = useState([])
      const [Minorsum, setMinorsum] = useState([])
      const [Criticalsum, setCriticalsum] = useState([])

      const [getCartondata, setgetCartondata] = useState([])

     const [Boxcontroll, setBoxcontroll] = useState([])

     const [sampleaudit1, setsampleaudit1] = useState('')

    
    const history = useHistory()
    const sampleauditref = useRef('')
    const sampleauditref1 = useRef('')
    const sampleauditref2 = useRef('')
    const sampleauditrefcomment = useRef('')
    const colorauditref = useRef('')
     const colorauditref1 = useRef('')
     const colorauditref2 = useRef('')
    const coloraudicommenttref = useRef('')
    const materialauditref = useRef('')
    const materialauditref1 = useRef('')
    const materialauditref2 = useRef('')
     const materialcommentauditref  = useRef('')
     const specialcountryauditref = useRef('')
     const specialcountryauditref1 = useRef('')
     const specialcountryauditref2 = useRef('')
     const specialcountryauditcommentref = useRef('')
     const AllTicketAuditref = useRef('')
     const AllTicketAuditref1 = useRef('')
     const AllTicketAuditref2 = useRef('')
     const AllTicketAuditcommentref = useRef('')
     const cortonlableref = useRef('')
     const cortonlableref1 = useRef('')
     const cortonlableref2 = useRef('')
     const cortonlablecommentref = useRef('')
     const pecperauditref = useRef('')
     const pecperauditref1 = useRef('')
     const pecperauditref2 = useRef('')
     const pecperauditcommnetref = useRef('')
     const Productsafetyauditref = useRef('')
     const Productsafetyauditref1 = useRef('')
     const Productsafetyauditref2 = useRef('')
     const Productsafetyauditcommentref = useRef('') 
     const sizeauditref = useRef('')
     const sizeauditref1 = useRef('')
     const sizeauditref2 = useRef('')
     const sizeauditcommentref = useRef('')
     const mainlableauditref = useRef('')
     const mainlableauditref1 = useRef('')
     const mainlableauditref2 = useRef('')
     const mainlableauditcommentref = useRef('')
     const carelableauditref = useRef('')
     const carelableauditref1 = useRef('')
     const carelableauditref2 = useRef('')
     const carlableauditcommentref = useRef('')
     const printauditref = useRef('')
     const printauditref1 = useRef('')
     const printauditref2 = useRef('')
     const printauditcommentref = useRef('')
     const embauditref = useRef('')
     const embauditref1 = useRef('')
     const embauditref2 = useRef('')
     const embauditcommentref = useRef('')
     const washauditref = useRef('')
     const washauditref1 = useRef('')
     const washauditref2 = useRef('')
     const washauditrefcomment = useRef('')

     const totalcortanref = useRef('')
     const completecartonref = useRef('')
     const roundedcartonref = useRef('')
     const countryoriginref = useRef('')
     const sizetosizeref = useRef('')
     const measurementref = useRef('')
     const actualgsmref = useRef('')
     const remarksref1 = useRef('')
     const remarksref2 = useRef('')
     const remarksref3 = useRef('')
     const Measurementref1 = useRef('')
     const Measurementref2 = useRef('')
     const Measurementref3 = useRef('')
     const packingref = useRef('')
     const Workmanshipref = useRef('')
     const OtherAuditref = useRef('')
     const Overallresult  = useRef('')
     const packingref1 = useRef('')
     const packingref2 = useRef('')
     const Workmanshipref1 = useRef('')
     const Workmanshipref2 = useRef('')
     const Overallresult1 = useRef('')
     const Overallresult2 = useRef('')
    
     const OtherAuditref1 = useRef('')
  const OtherAuditref2 = useRef('')


  const [factoryoption, setfactoryoption] = useState([])
  const [Buyeroption, setBuyeroption] = useState([])


 










      const [getinspectionheaderdata , setgetinspectionheaderdata] = useState([])
      const[getauditdata, setgetauditdata] = useState([])
      const[Boxcontrolerandother, setBoxcontrolerandother] = useState([])
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setopen(false);
        setopen1(false);
        setopen2(false);
        setopen3(false);
        setopen4(false);
        setopen5(false);
        setopen6(false)
        setopen7(false)
      };




     const handleChangePage = (event, newPage) => {
       setpage(newPage);
     };
     const handleChangePage1 = (event, newPage) => {
      setpage1(newPage);
    };
    const handleChangePage2 = (event, newPage) => {
      setpage2(newPage);
    };
    const handleChangePage3 = (event, newPage) => {
      setpage3(newPage);
    };
    const handleChangePaged = (event, newPage) => {
      setpaged(newPage);
    };
   
   
     const handleChangeRowsPerPage = (event) => {
       setrowsperpage(parseInt(event.target.value, 10));
       // setpage(0);
     };
     
     const handleChangeRowsPerPaged = (event) => {
      setrowsperpaged(parseInt(event.target.value, 10));
      // setpage(0);
    };
   
     const handleChangeRowsPerPage1 = (event) => {
      setrowsperpage1(parseInt(event.target.value, 10));
      // setpage(0);
    };
  
    const handleChangeRowsPerPage2 = (event) => {
      setrowsperpage2(parseInt(event.target.value, 10));
      // setpage(0);
    };
    const handleChangeRowsPerPage3 = (event) => {
      setrowsperpage3(parseInt(event.target.value, 10));
      // setpage(0);
    };
   
     const changepage = () => {
       return imagecollection.slice(page * rowsperpage, (page + 1) * rowsperpage)
     }
     const changepage1 = () => {
      return imagecollectionbymasurement.slice(page1 * rowsperpage1, (page1 + 1) * rowsperpage1)
    }
    const changepage2 = () => {
      return getCartondata.slice(page2 * rowsperpage2, (page2 + 1) * rowsperpage2)
    }

    const changepagefordefactdescription = () => {
      return Getdefactone.slice(paged * rowsperpaged, (paged + 1) * rowsperpaged)
    }
    







     const toggle = tab => {
       if(activeTab !== tab) setActiveTab(tab);
     }


     const getfactory = async e => {
      const factory = await axios.instance.get('/gen',  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setfactoryinfo(factory.data) 
      const data  =factory.data
      const options = data.map(f => ( {
      'label' : f.AccName,
      'value' : f.AccId
      }))
      setfactoryoption(options)
     console.log(options)
    }


    const buyer =async e => {
      const buyers = await axios.instance.get('/Buyer',  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setBuyer(buyers.data)
      const data  = buyers.data
      const optionbuyer = data.map(b => (
        {
          'label' : b.Buyer,
          'value': b.BuyerId
        }
      ))
      setBuyeroption(optionbuyer)
    }
 







  useEffect(() => {
    setgetfabgen([])
    localStorage.removeItem('Fabric')
    localStorage.removeItem('Garment')
    localStorage.removeItem('TotalDefect')
   
 
 
  
      const getInspectionforedit = async e => {
        const inpsectionupdate = await axios.instance.get(`/inspectionbyid/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
        'Content-Type': 'application/json'
        }})
   
        setgetinspectionheaderdata(inpsectionupdate.data)
      }
      if(props.match.params.id) {
        getInspectionforedit()
    }
   


  
  const GetBoxcontroller = async e => {
    const audit = await axios.instance.get(`/Boxcontroler/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    
    setBoxcontrolerandother(audit.data)
  }
  if(props.match.params.id) {
    GetBoxcontroller()
}

  

   const getimages = async e => {
     const img = await  axios.instance.get('/getgarmentimage',  { headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'
     }})
     setimagecollection(img.data)
     
   }
  
   
   
   buyer()
 
   getfactory()
  
  if(user){
    setuservalue(user)
  }

   setdate(moment(data).format('YYYY-MM-DD'))

    const getqa = async e => {
      const qa = await axios.instance.get('/qaparameter',  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setgetqavalue(qa.data)
     
      
    }
    getqa()
   
    const categoryget =  async e => {
    const cat = await axios.instance.get('/defectcategoryfordescription',  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setcategory(cat.data)
    }

   
    categoryget()
    
    const  getDefactsdata =  async e => {
      const Defactdatas = await axios.instance.get('/GetInpsectionData',  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setDefactsdata(Defactdatas.data)
      
    }
    getDefactsdata()
    
   
    
  


 
  


   const boxcontroll = async e => {
     const box = await axios.instance.get('/Boxcontroler',  { headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'
     }})
     setBoxcontroll(box.data)
   }

   boxcontroll()
    

   const getiamge2 = async e => {
    const img = await  axios.instance.get(`/getgarmentimage/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setimagecollection(img.data)
    
   }

   if(props.match.params.id) {
    getiamge2()
  }

   const carton1 = async e => {
    const cartoon = await axios.instance.get(`/carton/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setgetCartondata(cartoon.data)
    
  }

  if(props.match.params.id) {
    carton1()
  }


  const GetMasurmentimages2 = async e => {
    const masurement =  
    await axios.instance.get(`/getmasurementimage/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setimagecollectionbymasurement(masurement.data)
    
  }

  if(props.match.params.id) {
    GetMasurmentimages2()
  }


  const Getinspectionone = async(inspectid, e) => {
    const getinspet = await axios.instance.get(`/GetInpsectionData/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setGetdefactone(getinspet.data)
  }


 if(props.match.params.id) {
  Getinspectionone()
  document.getElementById('InspectionBtn').disabled = true;     
  document.getElementById('audishow').style.display = 'inline'
  document.getElementById('imgtb').style.display = 'inline'
  document.getElementById('summary').style.display = 'inline'
  document.getElementById('threecard').style.display = 'inline'
  if(localStorage.getItem('editid') === '1') {
    document.getElementById('saveBtn').style.display = 'inline'
  }
 
  
  
  
   
  
 
 }



  
const Getsumvalue = async e => {
  const sumvalue = await axios.instance.get(`/GetInpsectionDatasum/${props.match.params.id}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
  'Content-Type': 'application/json'
  }})
  setCriticalsum(sumvalue.data)
}

if(props.match.params.id){
  Getsumvalue()
}
if(!props.match.params.id) {
  localStorage.setItem('editid', 1)
}

  
  }, [])


  useEffect(() => {
   
    const getaudit = async e => {
      const audit = await axios.instance.get(`/Audit/${props.match.params.id}` ,  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }} ).then((res) => {
    
        setgetauditdata(res.data)
      })
      
          
    }
    if(props.match.params.id) {
      getaudit()
  }
  

  }, [setgetauditdata])
  
  const getimages1 = async e => {
    const img = await  axios.instance.get(`/getgarmentimage/${localStorage.getItem('QaInsptid')}` ,  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setimagecollection(img.data)

  }

 
    const getiamge2 = async e => {
   const img = await  axios.instance.get(`/getgarmentimage/${props.match.params.id}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
   'Content-Type': 'application/json'
   }})
   setimagecollection(img.data)
 
  }



 


  const getfactoryidss =  async (facid, e) => {
    await  setvalueoffacid(facid)
    setgetfactoryid(facid)
   
   
   }
  

   const buyeridss = async(buyid, e) => {
   const valueoffact =  await axios.instance.get(`/workod/${valueoffacid}/${buyid}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
   'Content-Type': 'application/json'
   }})
     setvalueofbuyid(buyid)
      setgetbuyerId(buyid)
     

      const data = valueoffact.data
      const optionvalue = data.map(i => (
        {
          'label' : i.TEXT,
          'value' : i.VALUE
        }
      ))
      setstyle(optionvalue)
     // setgetfabgen(valueoffact.data)
      // for(const data of valueoffact.data) {
      //   localStorage.setItem('Garment', data.Garment)
      //   localStorage.setItem('Fabric', data.Fabric)
      // }
    
   }
   const Getinspectionone = async(inspectid, e) => {
     const getinspet = await axios.instance.get(`/GetInpsectionData/${localStorage.getItem('QaInsptid')}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'
     }})
     setGetdefactone(getinspet.data)

   
   }

   const Getinspectiontwo = async(inspectid, e) => {
    const getinspet = await axios.instance.get(`/GetInpsectionData/${props.match.params.id}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setGetdefactone(getinspet.data)
  }

   

  const carton1 = async e => {
    const cartoon = await axios.instance.get(`/carton/${localStorage.getItem('QaInsptid')}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setgetCartondata(cartoon.data)
    
  }

  const carton2 = async e => {
    const cartoon = await axios.instance.get(`/carton/${props.match.params.id}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setgetCartondata(cartoon.data)
    
  }

  const Getsumvalueone = async e => {
    const sumvalue = await axios.instance.get(`/GetInpsectionDatasum/${props.match.params.id}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setCriticalsum(sumvalue.data)
  }

   
   const getiponumber =  async(ipono, e) => {
    setvalueofqty(0)
    setgetpononumber([])
    setvaluess([])
    console.log(ipono)
       if(valuess.length !=0 && getpononumber.length !=0) {
        document.getElementById('13').checked =false
       }
     
    
    
     
     const ipono1 =  await axios.instance.get(`/Orderhdr/${ipono}/${valueofbuyid}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'
     }})
    
     setgetipono(ipono)
     setgetipopoqt(ipono1.data)
     const ipono2 = await axios.instance.get(`/storestyleno/${ipono}`,{ headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'}}).then(res => {
      setgetfabgen(res.data)
      for(const data of res.data) {
        localStorage.setItem('Styleno', data.Styleno)
        localStorage.setItem('Garment', data.Garment)
        localStorage.setItem('Fabric', data.Fabric)
        
      }
     })
     
       }

   const getvaluess = (e)  => {
    const target = e.currentTarget;
    var value = target.value;
    var label = target.name
    if(target.checked){
      valuess.push(parseInt(value))
      
       getpononumber.push(label)
       localStorage.setItem('ponum', getpononumber)
      
    }
    else {
      valuess.pop()
      valuess.splice(valuess.length, 1)
      getpononumber.pop()
      getpononumber.splice(getpononumber.length, 1)
      localStorage.removeItem('ponum',getpononumber )
     
    }
   
     let sums = 0;
     let getpono =  ''
    
      for (let i = 0; i < valuess.length; i++) {
              sums += valuess[i];
      
          }
          for (let i = 0; i < getpononumber.length; i++) {
            getpono = getpononumber[i];
    
        }
      
    setvalueofqty(sums)
   }

  
   const getsampleqty = async (e) => {
     e.preventDefault();
     const target = e.target
     var value = target.value;
     setlatqty(value)
    
     setsampleqty(0)
    await getqavalue.map((data) => {
      if(value >= data.PieceForAuditMin  &&  value <= data.PieceForAuditMax) {

       
        setsampleqty(data.SamplePiece)  
       }
     
    })

    getpononumber.map((data) => (
     setgetpono(data)
    
    ))

   
   
      
     

     
   }
   
 


     
  


   const createordhdr = async e => {
    if((getfactoryid != 0) && (getbuyerId !=0) && (latqty != 0) && (sampleqty !=0) && (getipono !=0) && (shipqty !=0)  && (majoraql != 0) && (minoraql !=0) && (typeofinsepction !=0) ) {

    
     const ordhdr =  await axios.instance.post('/orderhdr', {
      FactoryId: getfactoryid,
      BuyerId: getbuyerId,
      Lotqty:  latqty,
      SampleQuantity: sampleqty,
      Auditorid: localStorage.getItem('userid'),
      Styleno:  localStorage.getItem('Styleno'),
      Pono: localStorage.getItem('ponum'),
      OrderQty: valueofqty,
      Shipqty: shipqty,
      PlusorMinusQuantity: plusminus,
      GarmentDescription: genref.current.value,
      FabricDescription: feb.current.value,
      TypesofInspection: typeofinsepction,
      AQLMajor: majoraql,
      AQLMinor: minoraql ,
      Status: 'p',
      CreatedBy: localStorage.getItem('userid'),
      ModifiedBy: localStorage.getItem('userid')
     },  { headers: {'Authorization': localStorage.getItem('authtoken'),
     'Content-Type': 'application/json'
     }})
     setopen(true)
     
     window.localStorage.setItem('QainspectId', JSON.stringify(ordhdr.data))
     setQAInspectionId(ordhdr.data)
     document.getElementById('1').disabled = true;
     document.getElementById('2').disabled = true;
     document.getElementById('3').disabled = true;
      document.getElementById('4').disabled = true;
      document.getElementById('5').disabled = true;
      document.getElementById('6').disabled = true;
       document.getElementById('7').disabled = true;
       document.getElementById('8').disabled = true;
        document.getElementById('9').disabled = true;
      
       
         
        
           document.getElementById('14').disabled = true;
           document.getElementById('15').disabled = true;
        
           document.getElementById('17').disabled = true;
           document.getElementById('18').disabled = true;
           document.getElementById('19').disabled = true;
           document.getElementById('20').disabled = true;
           document.getElementById('21').disabled = true;
           document.getElementById('22').disabled = true;
           document.getElementById('23').disabled = true;
           document.getElementById('13').disabled = true;
           document.getElementById('InspectionBtn').disabled = true;     
           document.getElementById('audishow').style.display = 'inline'
           document.getElementById('imgtb').style.display = 'inline'
           document.getElementById('summary').style.display = 'inline'
           document.getElementById('threecard').style.display = 'inline'
       
           document.getElementById('saveBtn1').style.display = 'inline'
          
          } 
       else {
         if(typeofinsepction.length === 0) {
           seterror1(true)
         }
         if(majoraql.length === 0){
           seterror2(true)
         }
         if(minoraql.length ===0) {
           seterror3(true)
         }
        
         if(getipono.length ===0){
           seterror5(true)
         }
        
         if(latqty.length === 0) {
           seterror7(true)
         }
         if(shipqty.length === 0 ){
           seterror8(true)
         }
        
         if(getfactoryid.length === 0) {
           seterror4(true)
         }
         if(getbuyerId.length === 0) {
           seterror6(true)
         }

     }
     setTimeout(() => {
       seterror1(false)
       seterror2(false)
       seterror3(false)
       seterror4(false)
       seterror5(false)
       seterror6(false)
       seterror7(false)
       seterror8(false)
       seterror9(false)
     }, 2000);
   }


   const createaudit = async e => {
    
    
    const auditadd = await axios.instance.post(`/audit/${localStorage.getItem('QaInsptid')}`, {
      QAInspectionId: localStorage.getItem('QaInsptid'),
      SampleAudit: sampleaudit,
      SampleAuditComments: sampleauditcomment,
      ColorFabricAudit: colorfabaric,
      ColorFabricAuditComments: colorfabariccomment,
      MaterialAudit: materailaudit,
      MaterialAuditComments: materailauditcomment,
      SpecialCountryAudit: specialcountryaudit,
      SpecialCountryAuditComments: specialcountryauditcomment,
      AllTicketAudit: alltiecktingaudit,
      AllTicketAuditComments: alltiecktingcomment,
      CartonAudit: Cartonaudit,
      CartonAuditComments: Cartoncomment,
      PcsPerCartonAudit: PcsPerCartonaudit,
      PcsPerCartonAuditComments: PcsPerCartoncommment,
      ProductSafetyAudit: ProductSafetyaudit,
      ProductSafetyAuditComments: ProductSafetycomment,
      Sizeaudit: SizeAudit,
      SizeAuditComments: SizeAuditcomment,
      MainLableAudit: MainLabelAudit,
      MainLableAuditComments: MainLabelAuditcomment,
      CareLableAudit: CareLabelAudit,
      CarelLableAuditCommnents: CareLabelAuditcomment,
      PrintAudit: PrintAudit,
      PrintAuditComments: PrintAuditcomment,
      EmbroadaryAudit: EmbAudit,
      EmbroadaryAuditComments: EmbAuditcomment,
      WashAudit: WashAudit,
      WashAuditComments: WashAuditcomment
    },  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
 
  
   

   }





   
   const createauditupdate = async e => {
    const auditadd = await axios.instance.post(`/audit/${props.match.params.id}`, {
     
    QAInspectionId:  props.match.params.id,
      SampleAudit: sampleauditref.current.checked  ?  sampleauditref.current.value : sampleauditref1.current.checked  ?  sampleauditref1.current.value  : sampleauditref2.current.checked  ?  sampleauditref2.current.value : '',
      SampleAuditComments: sampleauditrefcomment.current.value,
      ColorFabricAudit: colorauditref.current.checked  ?  colorauditref.current.value : colorauditref1.current.checked  ?  colorauditref1.current.value  : colorauditref2.current.checked  ?  colorauditref2.current.value : '',
      ColorFabricAuditComments: coloraudicommenttref.current.value,
      MaterialAudit: materialauditref.current.checked  ?  sampleauditref.current.value : materialauditref1.current.checked  ?  materialauditref1.current.value  : materialauditref2.current.checked  ?  materialauditref2.current.value : '',
      MaterialAuditComments: materialcommentauditref.current.value,
      SpecialCountryAudit: specialcountryauditref.current.checked  ?  specialcountryauditref.current.value : specialcountryauditref1.current.checked  ?  specialcountryauditref1.current.value  : specialcountryauditref2.current.checked  ?  specialcountryauditref2.current.value : '',
      SpecialCountryAuditComments: specialcountryauditcommentref.current.value,
      AllTicketAudit:AllTicketAuditref.current.checked  ?  AllTicketAuditref.current.value : AllTicketAuditref1.current.checked  ?  AllTicketAuditref1.current.value  : AllTicketAuditref2.current.checked  ?  AllTicketAuditref2.current.value : '',
      AllTicketAuditComments: AllTicketAuditcommentref.current.value,
      CartonAudit: cortonlableref.current.checked  ?  cortonlableref.current.value : cortonlableref1.current.checked  ?  cortonlableref1.current.value  : cortonlableref2.current.checked  ?  cortonlableref2.current.value : '',
      CartonAuditComments: cortonlablecommentref.current.value,
      PcsPerCartonAudit: pecperauditref.current.checked  ?  pecperauditref.current.value : pecperauditref1.current.checked  ?  pecperauditref1.current.value  : pecperauditref2.current.checked  ?  pecperauditref2.current.value : '',
      PcsPerCartonAuditComments: pecperauditcommnetref.current.value,
      ProductSafetyAudit: Productsafetyauditref.current.checked  ?  Productsafetyauditref.current.value : Productsafetyauditref1.current.checked  ?  Productsafetyauditref1.current.value  : Productsafetyauditref2.current.checked  ?  Productsafetyauditref2.current.value : '',
      ProductSafetyAuditComments: Productsafetyauditcommentref.current.value,
      Sizeaudit: sizeauditref.current.checked  ?  sizeauditref.current.value : sizeauditref1.current.checked  ?  sizeauditref1.current.value  : sizeauditref2.current.checked  ?  sizeauditref2.current.value : '',
      SizeAuditComments: sizeauditcommentref.current.value,
      MainLableAudit: mainlableauditref.current.checked  ?  mainlableauditref.current.value : mainlableauditref1.current.checked  ?  mainlableauditref1.current.value  : mainlableauditref2.current.checked  ?  mainlableauditref2.current.value : '',
      MainLableAuditComments: mainlableauditcommentref.current.value,
      CareLableAudit: carelableauditref.current.checked  ?  carelableauditref.current.value : carelableauditref1.current.checked  ?  carelableauditref1.current.value  : carelableauditref2.current.checked  ?  carelableauditref2.current.value : '',
      CarelLableAuditCommnents: carlableauditcommentref.current.value,
      PrintAudit: printauditref.current.checked  ?  printauditref.current.value : printauditref1.current.checked  ?  printauditref1.current.value  : printauditref2.current.checked  ?  printauditref2.current.value : '',
      PrintAuditComments: printauditcommentref.current.value,
      EmbroadaryAudit:embauditref.current.checked  ?  embauditref.current.value : embauditref1.current.checked  ?  embauditref1.current.value  : embauditref2.current.checked  ?  embauditref2.current.value : '',
      EmbroadaryAuditComments: embauditcommentref.current.value,
      WashAudit: washauditref.current.checked  ?  washauditref.current.value : washauditref1.current.checked  ?  washauditref1.current.value  : washauditref2.current.checked  ?  washauditref2.current.value : '',
      WashAuditComments: washauditrefcomment.current.value
    } , { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
 
    
  

   }
 

    const createboxandother = async e => {
      
      const box = await  axios.instance.post(`/Boxcontroler/${localStorage.getItem('QaInsptid')}`, {
     QAInspectionId: localStorage.getItem('QaInsptid'),
    TotalNoCartonsComments: TotalNoCartonsComment,
	CompletedCartonsComments: CompletedCartonsComment,
	RoundedCartonsComments: RoundedCartonsComment,
	CountryofOrigin: CountryofOrigin,
  SizetoSize:  SizetoSize,
	Measurement: Measurement,
	ActualGSMCount: ActualGSMCount ,
	MeasurementAudit: MeasurementAudit ,
	PackingAudit : PackingAudit,
	WorkmanshipAudit: WorkmanshipAudit,
  OtherAudit:OtherAudit,
	OverallResult: OverallResult ,
	Remarks1:Remarks1 ,
	Remarks2: Remarks2 ,
	Remarks3: Remarks3
      } , { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setopen2(true)
      console.log(box.data)
      setTotalNoCartonsComment('')
      setCompletedCartonsComment('')
      setRoundedCartonsComment('')
      setSizetoSize('')
      setMeasurement('')
      setActualGSMCount('')   
      setMeasurementAudit('') 
      setPackingAudit('')
      setWorkmanshipAudit('')
     
      setRemarks1('')
      setRemarks2('')
      setRemarks3('')
           
      
     
         setTotalNoCartonsComment('')
    setCompletedCartonsComment('')
    setRoundedCartonsComment('')
    setSizetoSize('')
    setMeasurement('')
    setActualGSMCount('')   
    setMeasurementAudit('') 
    setPackingAudit('')
    setWorkmanshipAudit('')
    setOverallResult('')
    setRemarks1('')
    setRemarks2('')
    setRemarks3('')
      
    
   setTimeout(() => {
    seterror38(false)
    seterror39(false)
    seterror40(false)
    seterror41(false)
    seterror42(false)
    seterror43(false)
    seterror44(false)
    seterror45(false)
    seterror46(false)
    seterror47(false)
    seterror48(false)
    seterror49(false)
    seterror50(false)
    seterror51(false)
   }, 2000);
 
    }



    const createboxandotherupdate = async e => {
      
      const box = await  axios.instance.post(`/Boxcontroler/${props.match.params.id}`, {
     QAInspectionId: props.match.params.id,
    TotalNoCartonsComments: totalcortanref.current.value,
	CompletedCartonsComments: completecartonref.current.value,
	RoundedCartonsComments: roundedcartonref.current.value,
	CountryofOrigin: countryoriginref.current.value,
  SizetoSize:  sizetosizeref.current.value,
	Measurement: measurementref.current.value  ,
	ActualGSMCount: actualgsmref.current.value ,
	MeasurementAudit: Measurementref1.current.checked ? Measurementref1.current.value : Measurementref2.current.checked ? Measurementref2.current.value : Measurementref3.current.checked ? Measurementref3.current.value : ''  ,
	PackingAudit : packingref.current.checked ? packingref.current.value : packingref1.current.checked ? packingref1.current.value : packingref2.current.checked ? packingref2.current.value : ''  ,
	WorkmanshipAudit: Workmanshipref.current.checked ? Workmanshipref.current.value : Workmanshipref1.current.checked ? Workmanshipref1.current.value : Workmanshipref2.current.checked ? Workmanshipref2.current.value : ''  ,
	OverallResult: Overallresult.current.checked ? Overallresult.current.value : Overallresult1.current.checked ? Overallresult1.current.value : Overallresult2.current.checked ? Overallresult2.current.value : ''   ,
	OtherAudit: OtherAuditref.current.checked  ?  OtherAuditref.current.value : OtherAuditref1.current.checked ? OtherAuditref1.current.value : OtherAuditref2.current.checked ? OtherAuditref2.current.value: '',
  Remarks1: remarksref1.current.value ,
	Remarks2: remarksref2.current.value ,
	Remarks3: remarksref3.current.value
      } , { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
     
     
     
         
 
    }




    const uploadimg = async e => {

     
      if((commetsforimg.length !=0) && (imageloade != null  )) {

    
      const formdata = new FormData()
     
      formdata.append('cartonimage', imagegerment )
      formdata.append('QAInspectionId',localStorage.getItem('QaInsptid'))
      formdata.append('ImageType', imagetype)
      formdata.append('Comments',  commetsforimg)
      formdata.append('ImageStatus', ImageStatus)
     
      const img = await axios.instance.post('/imageupoad', formdata, 
     { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }}).then(res => {
       
   
        setopendialog(true)
        getimages1()
      }).then(() => {
        setTimeout(() => {
          
         
          setopendialog(false)
         }, 1000);
         setopen3(true)
         setimageloade(null)
         setcommetsforimg('')
      })
     
     
      
      }
       else {
        if(commetsforimg.length ===0) {
          setimageerro1(true)
          setTimeout(() => {
            setimageerro1(false)
          }, 2000);
          
        }
        if(imageloade ===  null) {
          setimageerro2(true)
          setTimeout(() => {
            setimageerro2(false)
          }, 2000);
         
        }
      }
    } 

    const uploadimg1 = async e => {

     
      if((commetsforimg.length !=0) && (imageloade != null  )) {

    
      const formdata = new FormData()
     
      formdata.append('cartonimage', imagegerment )
      formdata.append('QAInspectionId', props.match.params.id)
      formdata.append('ImageType', imagetype)
      formdata.append('Comments',  commetsforimg)
      formdata.append('ImageStatus', ImageStatus)
      
      const img = await axios.instance.post('/imageupoad', formdata, 
       
       { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }}).then(res => {
        setopen3(true)
       
        setopendialog(true)
        getiamge2()
      })
      setTimeout(() => {
          
         
        setopendialog(false)
       }, 1000);
       setopen3(true)
       setTimeout(() => {
        setuploadprecntage1(0)
       }, 2000);
       setimageloade(null)
       setcommetsforimg('')
       document.getElementById('imagegarmentimagid').style.display ="none"
      }
       else {
        if(commetsforimg.length ===0) {
          setimageerro1(true)
          setTimeout(() => {
            setimageerro1(false)
          }, 2000);
          
        }
        if(imageloade ===  null) {
          setimageerro2(true)
          setTimeout(() => {
            setimageerro2(false)
          }, 2000);
         
        }
      }
    } 









    const handleimage  = async(e) => {
     
      setimagegerment(e.target.files[0])
       const filereader = new FileReader()
       filereader.readAsDataURL(e.target.files[0])
       filereader.onload = (renderevent) => {
        setimageloade(renderevent.target.result)
       }
     
    }

    const Removeimage = () => {
      setimageloade(null)
    }

    const Removeimage1 = () => {
      setimageloade1(null)
    }
   

    const masurementimage = async(e) => {
      setimagemasurement(  e.target.files[0])
      const filereader = new FileReader()
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (renderevent) => {
       setimageloade1(renderevent.target.result)
      }
    }
    const Inspectionimage1 = async(e) => {
      setDefactsimage1(e.target.files[0])
      const filereader = new FileReader()
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (renderevent) => {
        setDefactimageload1(renderevent.target.result)
      }
    }
    const Inspectionimage2 = async(e) => {
      setDefactsimage2(e.target.files[0])
      const filereader = new FileReader()
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (renderevent) => {
       setDefactimageload2(renderevent.target.result)
      }
     let sum = 0


    }

    const Inspectionimage3 = async(e) => {
      setDefactsimage3(e.target.files[0])
      const filereader = new FileReader()
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (renderevent) => {
       setDefactimageload3(renderevent.target.result)
      }
    }

    const Inspectionimage4 = async(e) => {
      setDefactsimage4(e.target.files[0])
      const filereader = new FileReader()
      filereader.readAsDataURL(e.target.files[0])
      filereader.onload = (renderevent) => {
       setDefactimageload4(renderevent.target.result)
      }
    }

    const Removeimagedefactimage1 = () => {
      setDefactimageload1(null)
    }
    const Removeimagedefactimage2  = () => {
      setDefactimageload2(null)
    }
    const Removeimagedefactimage3  = () => {
      setDefactimageload3(null)
    }
    const Removeimagedefactimage4  = () => {
      setDefactimageload4(null)
    }


    const GetMasurmentimages1 = async e => {
      const masurement =  
      await axios.instance.get(`/getmasurementimage/${localStorage.getItem('QaInsptid')}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setimagecollectionbymasurement(masurement.data)
      
    }


    const GetMasurmentimages2 = async e => {
      const masurement =  
      await axios.instance.get(`/getmasurementimage/${props.match.params.id}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
      setimagecollectionbymasurement(masurement.data)
     
    }

    

 


    const addimagedisplay = () => {
      document.getElementById('masurementimgid').style.display ="inline"
    }

    const addimagegarnemt = () => {
      document.getElementById('imagegarmentimagid').style.display ="inline"
    }
 
    const removeimagecontainder1 = () => {
      document.getElementById('imagegarmentimagid').style.display ="none"
    }

    const removeimagecontainder = () => {
      document.getElementById('masurementimgid').style.display ="none"
    }

  


    const UpdateImageformasurment = async e => {
      e.preventDefault()
       if( (masurmentcommet.length !=0) && (imageloade1 != null)  ) {
      const formdata = new FormData()
     
      formdata.append('cartonimage', imagemasurement )
      formdata.append('QAInspectionId',localStorage.getItem('QaInsptid'))
      formdata.append('ImageType', imagetype1)
      formdata.append('Comments',  masurmentcommet)
      formdata.append('ImageStatus', ImageStatus)
      
      const img = await axios.instance.post('/imageupoad', formdata , { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }} ).then(res => {
      
        
      }).then(() => {
       
        setopendialog1(true)
          setopen3(true)
           GetMasurmentimages1()
      })
    
     
      setTimeout(() => {
       
        setopendialog1(false)
      }, 1000);
      setimageloade1(null)
      setmasurmentcommet('')
     
    }
    else {
      if(imageloade1 === null ){
       setimageerro4(true)
       setTimeout(() => {
        setimageerro4(false) 
       }, 2000);
      }
      if(masurmentcommet.length ===0) {
        setimageerro3(true)
        setTimeout(() => {
          setimageerro3(false)
        }, 2000);
      }
    }
     
    }

    const UpdateImageformasurmentEditpage = async e => {
      e.preventDefault()
       if( (masurmentcommet.length !=0) && (imageloade1 != null)  ) {
      const formdata = new FormData()
     
      formdata.append('cartonimage', imagemasurement )
      formdata.append('QAInspectionId',props.match.params.id)
      formdata.append('ImageType', imagetype1)
      formdata.append('Comments',  masurmentcommet)
      formdata.append('ImageStatus', ImageStatus)
   
      const img = await axios.instance.post('/imageupoad', formdata,
       
        { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }}).then(res => {
      
        setopendialog1(true)
        setopen3(true)
        GetMasurmentimages2()
      })
    
     
      setTimeout(() => {
        setuploadprecntage(0)
        setopendialog1(false)
      }, 1000);
      setimageloade1(null)
      setmasurmentcommet('')
      document.getElementById('masurementimgid').style.display ="none"
    }
    else {
      if(imageloade1 === null ){
       setimageerro4(true)
       setTimeout(() => {
        setimageerro4(false) 
       }, 2000);
      }
      if(masurmentcommet.length ===0) {
        setimageerro3(true)
        setTimeout(() => {
          setimageerro3(false)
        }, 2000);
      }
    }
     
    }





     const CreateCartonDetail =  async e => {
      if((ShippedCartonCount.length !=0) && (PulledCartonCount.length !=0) && ( PassedCartonCount.length != 0) && (FailedCartonCount.length !=0)  ) {
       const cartonDeatil =  await axios.instance.post('/carton', {
        QAInspectionId: localStorage.getItem('QaInsptid'),
             ShippedCartonCount: ShippedCartonCount,
             PulledCartonCount: PulledCartonCount,
             PassedCartonCount: PassedCartonCount,
             FailedCartonCount: FailedCartonCount
       }, { headers: {'Authorization': localStorage.getItem('authtoken'),
       'Content-Type': 'application/json'
       }})
       
       carton1()
       setShippedCartonCount('')
       setPulledCartonCount('')
       setPassedCartonCount('')
       setFailedCartonCount('')
       setopen4(true)
       document.getElementById('imgtb').style.display = 'inline'
      }else {
        if(ShippedCartonCount.length ===0) {
                  seterror52(true)
                }
              if(PulledCartonCount.length ===0){
                  seterror53(true)
                }
                 if(PassedCartonCount.length ===0){
                  seterror54(true)
                }
                if(FailedCartonCount.length ===0){
                  seterror55(true)
                }
      }

      setTimeout(() => {
        seterror52(false)
        seterror53(false)
        seterror54(false)
        seterror55(false)
      }, 2000);
      
     }


     const CreateCartonDetailEditpage =  async e => {
      if((ShippedCartonCount.length !=0) && (PulledCartonCount.length !=0) && ( PassedCartonCount.length != 0) && (FailedCartonCount.length !=0)  ) {
       const cartonDeatil =  await axios.instance.post('/carton', {
        QAInspectionId: props.match.params.id,
             ShippedCartonCount: ShippedCartonCount,
             PulledCartonCount: PulledCartonCount,
             PassedCartonCount: PassedCartonCount,
             FailedCartonCount: FailedCartonCount
       } , { headers: {'Authorization': localStorage.getItem('authtoken'),
       'Content-Type': 'application/json'
       }})
       
       carton2()
       setShippedCartonCount('')
       setPulledCartonCount('')
       setPassedCartonCount('')
       setFailedCartonCount('')
       setopen4(true)
       document.getElementById('imgtb').style.display = 'inline'
      }else {
        if(ShippedCartonCount.length ===0) {
                  seterror52(true)
                }
              if(PulledCartonCount.length ===0){
                  seterror53(true)
                }
                 if(PassedCartonCount.length ===0){
                  seterror54(true)
                }
                if(FailedCartonCount.length ===0){
                  seterror55(true)
                }
      }

      setTimeout(() => {
        seterror52(false)
        seterror53(false)
        seterror54(false)
        seterror55(false)
      }, 2000);
      
     }

    



     const CreateInspectionDefacts = async e => {
        
      if((GetCategoryId.length !=0) && (GetSubCategory.length !=0) && (parseInt(Critical) >0 || parseInt(Major) >0 || parseInt(Minor) > 0)) {

     
      const formdata = new FormData()
      
      formdata.append('image1', Defactsimage1 )
      formdata.append('image2', Defactsimage2)
      formdata.append('image3', Defactsimage3)
      formdata.append('image4',  Defactsimage4)
      formdata.append('QAInspectionId',localStorage.getItem('QaInsptid'))
      formdata.append('CategoryID', GetCategoryId)
      formdata.append('SubCategoryID', GetSubCategory)
      formdata.append('Critical', Critical)
      formdata.append('Major', Major)
      formdata.append('Minor', Minor)
        const createinspection = await axios.instance.post('/CreateInspectionDefacts', formdata , { headers: {'Authorization': localStorage.getItem('authtoken'),
        'Content-Type': 'application/json'
        }})
        
       
        setopen5(true)
        Getinspectionone()
         setopendialog2(true)
         setTimeout(() => {
          setopendialog2(false)
         }, 3000);
        const Getsumvalue = async e => {
          const sumvalue = await axios.instance.get(`/GetInpsectionDatasum/${localStorage.getItem('QaInsptid')}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then((res) => {
            setCriticalsum(res.data)
          })
         
         
        }
        Getsumvalue()
        document.getElementById('inspectionid').style.display = 'none'
      
       
        
       setGetCategoryId('')
       setGetSubCategory('')
       setCritical('')
       setMajor('')
       setMinor('')
     setDefactimageload1(null)
     setDefactimageload2(null)
     setDefactimageload3(null)
     setDefactimageload4(null)
      setDefactsimage1({image1 : ''})
      setDefactsimage2({image2 : ''})
      setDefactsimage3({image3 : ''})
      setDefactsimage4({image4 : ''})
      

       
       
      }
      else {

     
        if(GetSubCategory.length ===0) {
          seterror57(true)
        }
        if(GetCategoryId.length ===0) {
          seterror56(true)
        }
        
         if(!parseInt(Critical) >0 || parseInt(Major) >0 || parseInt(Minor) > 0) {
          seterrordefact(true)
     
         }
        
       

      
               
        

      }
      setTimeout(() => {
        seterror57(false)
        seterror56(false)
        setimageerro5(false)
        seterrordefact(false)
     
      }, 2000);
     }

     const CreateInspectionDefactseditpage = async e => {
      if((GetCategoryId.length !=0) && (GetSubCategory.length !=0) && (parseInt(Critical) >0 || parseInt(Major) >0 || parseInt(Minor) > 0)) {     
      const formdata = new FormData()
      
      formdata.append('image1', Defactsimage1 )
      formdata.append('image2', Defactsimage2)
      formdata.append('image3', Defactsimage3)
      formdata.append('image4',  Defactsimage4)
      formdata.append('QAInspectionId', props.match.params.id)
      formdata.append('CategoryID', GetCategoryId)
      formdata.append('SubCategoryID', GetSubCategory)
      formdata.append('Critical', Critical)
      formdata.append('Major', Major)
      formdata.append('Minor', Minor)
        const createinspection = await axios.instance.post('/CreateInspectionDefacts', formdata , { headers: {'Authorization': localStorage.getItem('authtoken'),
        'Content-Type': 'application/json'
        }})
        
        setopen5(true)
        
         setopendialog2(true)
         setTimeout(() => {
          setopendialog2(false)
         }, 3000);
       
        Getinspectiontwo()
      
        Getsumvalueone()
        document.getElementById('inspectionid').style.display = 'none'
      
        setDefactimageload1(null)
        setDefactimageload2(null)
        setDefactimageload3(null)
        setDefactimageload4(null)
        setDefactsimage1({image1 : ''})
      setDefactsimage2({image2 : ''})
      setDefactsimage3({image3 : ''})
      setDefactsimage4({image4 : ''})
       setGetCategoryId('')
       setGetSubCategory('')
       setCritical('')
       setMajor('')
       setMinor('')
       
      }
      else {
        if(GetSubCategory.length ===0) {
          seterror57(true)
        }
        if(GetCategoryId.length ===0) {
          seterror56(true)
        }


        if(!parseInt(Critical) >0 || parseInt(Major) >0 || parseInt(Minor) > 0) {
          seterrordefact(true)
     
         }
      

      
               
        

      }
      setTimeout(() => {
        seterror57(false)
        seterror56(false)
        seterrordefact(false)
      }, 2000);
     }







      const getinspectionform  =  () => {
        document.getElementById('inspectionid').style.display = 'inline'
      }

      const Closeinspectionform  = () => {
        document.getElementById('inspectionid').style.display = 'none'
      }

     
      const DeleteCarton =async (catid ,e) => {
        if (window.confirm('Are you sure delete Carton?')){
          const deleteCartdata =  await axios.instance.delete(`/carton/${catid}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }})
          .then(res => {
            const deletedata = getCartondata.filter(subdelete => subdelete.CartonId)
          })
          
          carton1()
        }
      }

      const DeleteCartonEditpage =async (catid ,e) => {
        if (window.confirm('Are you sure delete Carton?')){
          const deleteCartdata =  await axios.instance.delete(`/carton/${catid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }})
          .then(res => {
            const deletedata = getCartondata.filter(subdelete => subdelete.CartonId)
            
          })
          carton2()
         
        }
      }

      const Deleteimagegerment =  async (imgid, imgurl , e) => {
        
        if (window.confirm('Are you sure delete image?')) {
          const delteimage =  await axios.instance.delete(`Deleteimage/${imgid}/${imgurl}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then(res => {
            const deleteimage = imagecollection.filter(delimg => delimg.ImageId)
          })
        }
        getimages1()
      }
       
      const Deleteimagegerment1 =  async (imgid, imgurl , e) => {
        
        if (window.confirm('Are you sure delete image?')) {
          const delteimage =  await axios.instance.delete(`Deleteimage/${imgid}/${imgurl}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then(res => {
            const deleteimage = imagecollection1.filter(delimg => delimg.ImageId)
          })
        }
        getiamge2()
      }


      

      const DeleteimageMesurement =  async (imgid, imgurl , e) => {
        
        if (window.confirm('Are you sure delete image?')) {
          const delteimage =  await axios.instance.delete(`Deleteimage/${imgid}/${imgurl}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then(res => {
            const deleteimage = imagecollectionbymasurement.filter(delimg => delimg.ImageId)
          })
        }
        GetMasurmentimages1()
      
      }

      const DeleteimageMesurementone =  async (imgid, imgurl , e) => {
        
        if (window.confirm('Are you sure delete image?')) {
          const delteimage =  await axios.instance.delete(`Deleteimage/${imgid}/${imgurl}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then(res => {
            const deleteimage = imagecollectionbymasurement.filter(delimg => delimg.ImageId)
          
          })
        }
        GetMasurmentimages2()
      
      }

      const DeleteDefactdata =  async (imgid, imgurl1,imgurl2, imgurl3, imgurl4 , e) => {
      
        if (window.confirm('Are you sure delete Defect Description ?')) {
          const delteimage =  await axios.instance.delete(`Deleteimagemasurment/${imgid}/${imgurl1}/${imgurl2}/${imgurl3}/${imgurl4}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then(res => {
            const deleteimage = Getdefactone.filter(delimg => delimg.DefectID)
          })
        }
        Getinspectionone()
        const Getsumvalue = async e => {
          const sumvalue = await axios.instance.get(`/GetInpsectionDatasum/${localStorage.getItem('QaInsptid')}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then((res) => {
            setCriticalsum(res.data)
          })
         
         
        }
        Getsumvalue()
      }


      
      const DeleteDefactdataeditpage =  async (imgid, imgurl1,imgurl2, imgurl3, imgurl4 , e) => {
      
        if (window.confirm('Are you sure delete Defect Description ?')) {
          const delteimage =  await axios.instance.delete(`Deleteimagemasurment/${imgid}/${imgurl1}/${imgurl2}/${imgurl3}/${imgurl4}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
          'Content-Type': 'application/json'
          }}).then(res => {
            const deleteimage = Getdefactone.filter(delimg => delimg.DefectID)
          })
        }
        Getinspectiontwo()
      
        Getsumvalueone()
      
      }

     const onsamplechange = (e) => {
      setsampleaudit(e.target.value)
     
      }
   
      const onfabaricchange = (e) => {
        setcolorfabaric(e.target.value)
       
        
        
      }
     
      const onMaterialchange = (e) => {
        setmaterailaudit(e.target.value)
       
      }

      const onSpeccialchange = (e) => {
        setspecialcountryaudit(e.target.value)
        
        
       
      }


      const onalltiecktingaudit = (e) => {
        setalltiecktingaudit(e.target.value)
       
      }
  
     const  onCartonaudit = (e) => {
        setCartonaudit(e.target.value)
       
       }


       const onPcsPerCartonaudit = (e) => {
         setPcsPerCartonaudit(e.target.value)
        
       }

    const onProductSafetyaudit = (e) => {
      setProductSafetyaudit(e.target.value) 
     
     }
   
     const onSizeAudit = (e) => {
       setSizeAudit(e.target.value)
       
     }
   

     const onMainLabelAudit = (e) => {
      setMainLabelAudit(e.target.value)
     
     }

   const onCareLabelAudit = (e) => {
    setCareLabelAudit(e.target.value)
  
   }
   
   const OnEmbAudit = (e) => {
    setEmbAudit(e.target.value)
    
   }

   const onPrintAudit = (e) => {
    setPrintAudit(e.target.value)
    
   }
   const onWashAudit = (e) => {
    setWashAudit(e.target.value)
   
   }


   const getsubcategorys =  async (e) => {
    setGetCategoryId(e.target.value)
    localStorage.setItem('cateid', e.target.value)
    const subcate = await axios.instance.get(`/subcategorybycate/${parseInt(localStorage.getItem('cateid'))}` , { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }}) 
    setsubCategory(subcate.data)
    
   }

    const saveauditandboxcontrolleranddefactdescription = async() => {
       
       if(Getdefactone.length !=0) {
         const insertdefacttotal = await axios.instance.put(`/totaldeactadd/${localStorage.getItem('QaInsptid')}`, {
          TotalDefect: localStorage.getItem('TotalDefect')
         },  { headers: {'Authorization': localStorage.getItem('authtoken'),
         'Content-Type': 'application/json'
         }}) 
      
        createboxandother()
        createaudit()
       
        setloading(true)
         setopen1(true)
          if(typeofinsepction === 'Final') {
              const pono =  await axios.instance.put(`/Pononumberupdate/${localStorage.getItem('ponum')}`, {
              Inspection : 'Y'
              },  { headers: {'Authorization': localStorage.getItem('authtoken'),
              'Content-Type': 'application/json'
              }})
               
            
          }
        setTimeout(() => {
          setloading(false)
        }, 3000)
       
      setTimeout(() => {
        history.push('/inspectionModify')
        setloading(false)
       }, 3000);
 
      }
      else {
        setopen6(true)
      }   
       
   
      localStorage.removeItem('TotalDefect')
    }

    const updateboxcontrolleradnaudit =  () => {
      if(Getdefactone.length !=0) {
      const insertdefacttotal =  axios.instance.put(`/totaldeactadd/${props.match.params.id}`, {
        TotalDefect: localStorage.getItem('TotalDefectupdate')
       },  { headers: {'Authorization': localStorage.getItem('authtoken'),
       'Content-Type': 'application/json'
       }})
       setopen7(true)
      setloading1(true)
      createauditupdate()
      createboxandotherupdate()
     
      setTimeout(() => {
        setloading1(false)
        history.push('/inspectionModify')
      }, 3000);
    }
    else {
      setopen6(true)
    }
    
    }



    const critcalchange =  (criticalvalue, e)  => {
       setCritical(criticalvalue)
      if(parseInt(criticalvalue) <= 0) {
         setOverallResult('P')
       }else {
        setOverallResult('F')
       }
    }

    const Majorvalue =  (major, e) => {
      setMajor(major)
      if(parseInt(major) <=0) {
        setOverallResult('P')
      }else {
        setOverallResult('F')
      }
    }


    const MinorValue =  (minor, e) => {
      setMinor(minor)
      if(parseInt(minor) <=0) {
        setOverallResult('P')
      }else {
        setOverallResult('F')
      }
    }



    const someoffailedcartton  = (pass, e) => {
      setFailedCartonCount(0)
     const sub =  (parseInt(PulledCartonCount) - parseInt(pass))
  
     setPassedCartonCount(pass)
     setFailedCartonCount(sub)
        }

    if(loading) {
     
      return (

 

        <div className="progressscreen" >
          <div className="progress">
            <div className="spinner">
          <Spinner name="ball-spin-fade-loader"  color='#0069D9' />
          </div>
          <div>
          <h6>Trasaction processing...</h6>
          </div>
          </div>
        </div>

      )
    }



    if(loading1) {
     
      return (

 

        <div className="progressscreen" >
          <div className="progress">
            <div className="spinner">
          <Spinner name="ball-spin-fade-loader"  color='#0069D9' />
          </div>
          <div>
          <h6>Updating Trasaction ...</h6>
          </div>
          </div>
        </div>

      )
    }




   



   
  return (

 
    <div>
        
      <div className="uid">
      
     
      </div>
      <div style={{display: 'none'}}  >
        { QAInspectionId.map((data) => (
        
         localStorage.setItem('QaInsptid',data.QAInspectionId)
 
        ))}

     

        
      
      </div>
      <div  style={{display: 'none'}}  >
      
         <input value={getpono}  ref={getpoo} /> 
 
       
      
      </div>
     
      <div>
        <div className="geffb" >
       
             {getfabgen.map((data) => (
          
            localStorage.setItem('Garment', data.Garment)
            ))}
         
         
          {getfabgen.map((data) => (
            localStorage.setItem('Fabric', data.Fabric)
            ))} 
        
        </div>
        
        <Card>
          <CardBody>
            <div className="header">
              <h5>Inspection</h5>
            </div>
            <div className="aqlparams">
              <p>Aql Parameter</p>
            </div>
            <div className="headerinsp">
              <div className="typeofinspction">
              <div className="tyotitle">
             <p>Type of inspection:</p>
            
             </div>
            
             <div className="typoradion">
             {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
             <Label check>
              <Input type="radio"  id="1" name="typeofinsp"  value="inline" checked={data.TypesofInspection === 'inline'}  onChange={e => settypeofinsepction(e.target.value) }  />{' '}
              Inline 
            </Label>
             ) : 
             
             <Label check >
             <Input style={{color: 'red'}} type="radio" id="1" name="typeofinsp" checked={typeofinsepction === 'inline'}  value="inline"  onChange={e => settypeofinsepction(e.target.value) }  />{' '}
             Inline 
           </Label>
             
             }   
        </div>
        <div className="typoradion">
        {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) => 
             <Label check>
              <Input type="radio"   id="2" name="typeofinsp"  value="Prefinal"  checked={data.TypesofInspection === 'Prefinal'} onChange={e => settypeofinsepction(e.target.value)}  />{' '}
              Prefinal  
            </Label>
        ) :
        <Label check>
        <Input type="radio"  id="2" name="typeofinsp"  value="Prefinal"  onChange={e => settypeofinsepction(e.target.value)}  />{' '}
        Prefinal  
      </Label>
}
        </div>
        <div className="typoradion">
        {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) => 
             <Label check>
              <Input type="radio"   id="3" name="typeofinsp" value="Final" checked={data.TypesofInspection === 'Final'}  onChange={e => settypeofinsepction(e.target.value)} />{' '}
              Final  
            </Label>
        ): 
      <Label check>
              <Input type="radio"  id="3" name="typeofinsp" value="Final"  onChange={e => settypeofinsepction(e.target.value)} />{' '}
              Final  
            </Label>

           }
        </div>
        {error1 ? <p className="errors">required</p> : ""}      
            </div>
             
            <div className="aqlparams1">
              <p>Aql Parameter</p>
            </div>
            <div className="typeofinspction2">
           
            <div className="tyotitle">
            <p>A.Q.L Major</p>
           </div>
           <div className="typoradion">
           {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) => 
             <Label check>
              <Input type="radio"   id="4" value={1} name="Major" checked={data.AQLMajor === 1}   onChange={e => setmajoraql(e.target.value)} />{' '}
              1.5  
            </Label>
           ) : 
          
           <Label check>
              <Input type="radio"  id="4" value="1" name="Major" checked={majoraql ==='1'} onChange={e => setmajoraql(e.target.value)} />{' '}
              1.5  
            </Label>
          } 
        </div>

        <div className="typoradion">
        {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) => 
             <Label check>
              <Input type="radio"  id="5" name="Major" value={2} checked={data.AQLMajor === 2} onChange={e => setmajoraql(e.target.value)} />{' '}
              2.5
            </Label>
        ) : 
        
        <Label check>
              <Input type="radio"  id="5" name="Major" value="2" onChange={e => setmajoraql(e.target.value)} />{' '}
              2.5
            </Label>
        
        }

        </div>

        <div className="typoradion">
        {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>  
             <Label check>
              <Input type="radio"  id="6" name="Major" value={4} checked={data.AQLMajor === 4} onChange={e => setmajoraql(e.target.value)} />{' '}
              4.0  
            </Label>
        ): 
        
        <Label check>
        <Input type="radio" id="6" name="Major" value="4" onChange={e => setmajoraql(e.target.value)} />{' '}
        4.0  
      </Label>

          }
        </div>
        
           </div>
           {error2 ? <p className="errors">required</p> : ""}
           <div className="typeofinspction3">
            <div className="tyotitle">
            <p>A.Q.L Minor</p>
           </div>

           <div className="typoradion">
           {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>  
             <Label check>
              <Input type="radio"  id="7" value={1} name="minor" checked={data.AQLMinor === 1} onChange={e => setminoraql(e.target.value)} />{' '}
              1.5  
            </Label>
           ): 
           <Label check>
              <Input type="radio"  id="7" value="1"  name="minor"  checked={minoraql === '1'} onChange={e => setminoraql(e.target.value)} />{' '}
              1.5  
            </Label>
           }
        </div>

        <div className="typoradion">
        {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>  
             <Label check>
              <Input type="radio"   id="8" value={2}  name="minor"  checked={data.AQLMinor === 2}  onChange={e => setminoraql(e.target.value)} />{' '}
              2.5
            </Label>
        ): 
        
        <Label check>
              <Input type="radio"  id="8" value="2"  name="minor"  onChange={e => setminoraql(e.target.value)} />{' '}
              2.5
            </Label>
        
        }
        </div>

        <div className="typoradion">
        {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>  
             <Label check>
              <Input type="radio"   id="9" value={4} name="minor"  checked={data.AQLMinor === 4}  onChange={e => setminoraql(e.target.value)} />{' '}
              4.0  
            </Label>
        ): 
        <Label check>
        <Input type="radio"  id="9" value="4" name="minor"   onChange={e => setminoraql(e.target.value)} />{' '}
        4.0  
      </Label>
        
        }
            
        </div>

           </div>
           {error3 ? <p className="errors">required</p> : ""}
            </div>
         
           <div className="forms">
             <div className="leftsideform">
              <div className="rowone">
               {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>  
               <div className="input4">
                 <lable>Factory Name</lable>
                  <input value={data.AccName} disabled />
                   {error4 ? <p className="errors">please select factory</p> : ""}   
               </div>
                 ): 
                 
                 <div className="select1">
                 <lable>Factory Name</lable>
                 {/* <select value={getfactoryid}  id="10"   onChange={(e) =>  getfactoryidss(e.target.value, e) }    >
                   <option  >select  Factory</option>
                   {factoryinfo.map((data) => (
                      <option value={data.AccId}  >{data.AccName}</option>
                   ))}
                   </select>   */}
                   <Select options={factoryoption}  defaultValue={{ 'label': "select Factory", 'value': '' }} onChange={(value) => getfactoryidss(value.value)}  />
                   {error4 ? <p className="errors">please select factory</p> : ""}   
               </div>
                 
                 
                 }
                 {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                  <div className="input13">
                 <lable>Buyer Name</lable>
                <input value={data.Buyer} disabled  />
               </div>
               ):
               <div className="select2">
                 <lable>Buyer Name</lable>
                 {/* <select value={getbuyerId}  id="16"    onChange={(e) => buyeridss(e.target.value, e)}  >
                   <option selected >select  Buyer</option>
                   {Buyer.map((data) => (
                     <option  value={data.BuyerId} >{data.Buyer}</option>
                   ))}
                   </select>    */}
                            <Select defaultValue={{ 'label': "select buyer", 'value': '' }} options={Buyeroption} onChange={(value) => buyeridss(value.value)} />
                     {error6 ? <p className="errors">please select buyer</p> : ""}  
               </div>
                }
               {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data, index) =>
               <div className="input9">
                   <lable>Date</lable>
                   <input id="17" disabled   type="date" value={moment(data.QAInspectionDate).format('YYYY-MM-DD')}  />
                   </div>
               ):
               <div className="input9">
               <lable>Date</lable>
               <input id="17"    type="date" value={date}  onChange={e => setdate(e.target.value)} />
               </div>
               }
                   {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                   <div className="input10">
                  
                   <lable>Auditor</lable>
                   <input  disabled  value={localStorage.getItem('username')}  placeholder="Auditor"  />
                  
                  
                   </div>
                    ): 
                    
                    <div className="input10">
                  
                    <lable>Auditor</lable>
                    <input value={localStorage.getItem('username')}  disabled placeholder="Auditor"  />
                   
                   
                    </div>
                    
                    }
            
              </div>
              <div className="rowtwo">
              {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                 <div className="input7">
                   <lable>Style/Ipo</lable>
                    <input value={data.Styleno} disabled />
                    {error5 ? <p className="errors">please select Ipo/style </p> : ""}
                   </div>
                ): 
                <div className="input5" style={{width: '150px'}}>
                <lable>Style/Ipo</lable>
                 {/* <select value={getipono}   id="12"   onChange={(e) => getiponumber(e.target.value, e) }  >
                   <option>Ipo/Style</option>
                   {style.map((data) => (

                    
                
                   <option value={data.VALUE}>{data.TEXT}</option>
                 
                   ))}
                 </select> */}
                   <Select defaultValue={{ 'label': "select Ipo/Style", 'value': '' }} options={style} onChange={(value) => getiponumber(value.value)} />
            
                 {error5 ? <p className="errors">please select Ipo/style </p> : ""}
                </div>
                
                }
                    
                    <div className="input6">
                    {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                      <div className="pooinpu">
                     <lable>Po no</lable>
                     
                 <textarea  id="ponoid" placeholder="pono"  value={data.Pono} disabled cols="5" />
               
                 </div>

                    ):
                   
                    <div className="pooinpu">
                    <lable >Po no</lable>
                <input  id="ponoid" style={{display: 'none'}} placeholder="pono"  />
              
                </div>  }
                {!props.match.params.id ?
                <div  id="ponoid1">
                  <div className="ponum">              
                  {getipopoqt.map((data) => (
                <div className="ponuminput" >
                  <lable >{data.pono}</lable>
            <input id="13" type="checkbox" value={data.qty}  name={data.pono} onChange={getvaluess} /> 
              
            </div>
                 
            ))}
                  </div>
                   </div>
                    :''}
                    </div>
                   
                    {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                    <div className="input7">
                    <lable>PO Qty</lable> 
                    <input value={data.OrderQty} id="14" disabled  />
                    </div> 
                    ): 
                    <div className="input7">
                    <lable>PO Qty</lable> 
                    <input value={valueofqty} id="14"  />
                    </div> 
                   }
                   {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                   <div className="input1">
                 <lable>Lot Qty</lable>
                 <input placeholder="Lot Qty" type="number"  id="18" ref={samp} defaultValue={data.Lotqty} disabled  onChange={getsampleqty} />
                 {error7 ? <p className="errors"> enter lotqty</p> : ""}
                </div>
              ) :
                 <div className="input1">
                 <lable>Lot Qty</lable>
                 <input placeholder="Lot Qty" type="number"  id="18" ref={samp} value={latqty}  onChange={getsampleqty} />
                 {error7 ? <p className="errors"> enter lotqty</p> : ""}
                </div>

                  }
                {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                <div className="input2">
                 <lable>Sample Qty </lable>
                 <input placeholder="Sample Qty" type="number"  id="19" defaultValue={data.SampleQuantity }  disabled  onChange={e => setsampleqty(e.target.value)} />
                </div>
                ): <div className="input2">
                <lable>Sample Qty </lable>
                <input placeholder="Sample Qty" type="number"  disabled id="19" value={sampleqty}   onChange={e => setsampleqty(e.target.value)} />
               </div> }
               {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                <div className="input3">
                 <lable>Ship Qty </lable>
                 <input placeholder="Ship Qty" type="number" value={data.Shipqty}  disabled id="20"  onChange={e => setshipqty(e.target.value) } />
                 {error8 ? <p className="errors">enter shipqty</p> : ""}
                </div> ) : 
                <div className="input3">
                <lable>Ship Qty </lable>
                <input placeholder="Ship Qty" type="number"  id="20"  onChange={e => setshipqty(e.target.value) } />
                {error8 ? <p className="errors">enter shipqty</p> : ""}
               </div>
                }
                {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                <div className="input8">
                   <lable>+/- Qty</lable>
                   <input placeholder="+/- Qty"  id="21" ref={plusminusref} disabled  defaultValue={data.PlusorMinusQuantity} onChange={e => setplusminus(e.target.value) } type="number"/>
                   {error9 ? <p className="errors"> enter +/-qty</p> : ""}
                   </div>
                ):
                
                <div className="input8">
                <lable>+/- Qty</lable>
                <input placeholder="+/- Qty"  id="21" ref={plusminusref}  value={plusminus } onChange={e => setplusminus(e.target.value) } type="number"/>
                {error9 ? <p className="errors"> enter +/-qty</p> : ""}
                </div>
                }
                   <div className="input11">
                   <lable>S code</lable>
                   <input id="22"  value="S code" />
                   </div>
               
              </div>
              <div className="rowthree">
            
             </div>
             </div>
             
           
            
          
           </div>
           <div className="rightformthree">
           {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
                   <div className="input4">
               <lable>Garment Description </lable>
                 <input    id="15"    value={data.GarmentDescription} disabled onChange={e => setgdesp(e.target.value)} />
               </div>
           ):
           
           <div className="input4">
           <lable>Garment Description </lable>
             <input    id="15" ref={genref}    value={localStorage.getItem('Garment') } onChange={e => setgdesp(e.target.value)} />
           </div>
           }

         {getinspectionheaderdata.length !=0 ?  getinspectionheaderdata.map((data) =>
               <div className="input12">
                   <lable>Fabric Description</lable>
                   <input   id="23" value={ data.FabricDescription} disabled onChange={e => setfdesp(e.target.value)}  />
                   </div>
                       ):
                   <div className="input12">
                 <lable>Fabric Description</lable>
                 <input   id="23"  ref={feb} value={localStorage.getItem('Fabric')} onChange={e => setfdesp(e.target.value)}  />
                 </div>
                  }
             </div>
             
             
            
             <div className="buttonnext">

               {getinspectionheaderdata.length !=0 ? 
          '' : 
           <Button  id="InspectionBtn"  color="success" onClick={createordhdr}  >Next</Button>
           
          }
         
           </div>
          </CardBody>
        </Card>

      </div>
      {props.match.params.id && localStorage.getItem('editid') === '1'  ?   ( <button  id="saveBtn" onClick={updateboxcontrolleradnaudit}  title="Go to top">Update</button> ): ''}
      { !props.match.params.id ?    <button  id="saveBtn1" onClick={saveauditandboxcontrolleranddefactdescription} title="Go to top">Save</button> : ''}   
      
     
      <div className="inspefooter" id="audishow" >
     
      <Card className="">
        <CardBody>
         
      <div className="tablink" >
      <Tabs  defaultActiveKey="Audit" id="uncontrolled-tab-example">
      <Tab eventKey="Audit" title="Audit">
    <div className="tablse" id="auditpanel">
      <div className="typeofaduit">
      {props.match.params.id  ?  (
        <table>
          <tr>
            <th>Type of Audit</th>
             <th id="au1">Accept</th>
             <th >Reject</th>
             <th className="au1">N/A</th>
             <th>Comment</th>
          </tr>
          {getauditdata.length !=0 ?  getauditdata.map((data) => 
      
         
        
          <tr>
            
              <td>Sample Audit:
              {error10 ? <p className="errors">please select sampleaudit</p> : ""}  
              {error11 ? <p className="errors">please enter the sample Audit Comment</p> : ""}  
              </td>
              <td align='center' ><input type='radio' value='A ' ref={sampleauditref}    name='EDITSampleAudit' defaultChecked={data.SampleAudit === 'A '   }   onChange={onsamplechange   }/></td>
              <td align='center'><input type='radio' value='R ' ref={sampleauditref1}    name='EDITSampleAudit'  defaultChecked={data.SampleAudit === 'R '   }   onChange={onsamplechange}  /></td>
              <td align='center'><input type='radio' value='NA'  ref={sampleauditref2}  name='EDITSampleAudit' defaultChecked={data.SampleAudit === 'NA' }      onChange={e => setsampleaudit(e.target.value) }/></td>
              <td align='center'><input type='text' maxLength="16" size="16" width="30px" ref={sampleauditrefcomment}  style={{border: 'none', outline: '0'}} defaultValue={data.SampleAuditComments} onChange={e => setsampleauditcomment(e.target.value)}  onLoad={() => setsampleauditcomment(data.SampleAuditComments) } /></td>
          </tr>
           ): 
          <tr>
        
          <td>Sample Audit:
          {error10 ? <p className="errors">please select sampleaudit</p> : ""}  
          {error11 ? <p className="errors">please enter the sample Audit Comment</p> : ""}  
          </td>
          <td align='center' ><input type='radio' value='A'  name='AUDIT'  onChange={onsamplechange} /></td>
          <td align='center'><input type='radio' value='R'   name='AUDIT'   onChange={onsamplechange} /></td>
          <td align='center'><input type='radio' value='NA'   name='AUDIT' checked={sampleaudit === 'NA'}     onChange={e => sampleaudit(e.target.value) }/></td>
          <td align='center'><input type='text' maxLength="16" size="16" width="30px"  style={{border: 'none', outline: '0'}} value={sampleauditcomment} onChange={e => setsampleauditcomment(e.target.value)} /></td>
      </tr>
          
          }

{getauditdata.length !=0 ?  getauditdata.map((data) =>
          <tr>
            
            <td>Color/Fabric Audit:
            {error12 ? <p className="errors">please select any on color</p> : ""}  
            {error13 ? <p className="errors">please enter color comment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A '  ref={colorauditref} id="28" name='ColorFabricAudit'  defaultChecked={data.ColorFabricAudit === 'A ' }   onChange={onfabaricchange} /></td>
            <td align="center"><input type='radio' value='R ' ref={colorauditref1} id="29"   name='ColorFabricAudit'  defaultChecked={data.ColorFabricAudit === 'R '}  onChange={onfabaricchange}  /></td>
            <td align="center"><input type='radio' value='NA' ref={colorauditref2} id="30"  name='ColorFabricAudit' defaultChecked={data.ColorFabricAudit === 'NA'}       onChange={e => setcolorfabaric(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="30px" ref={coloraudicommenttref} id="31" defaultValue={data.ColorFabricAuditComments}  onChange={e => setcolorfabariccomment(e.target.value)}   style={{border: 'none', outline: '0'}} /></td>
        </tr>
): 
<tr>
        
        <td>Color/Fabric Audit:
        {error12 ? <p className="errors">please select any on color</p> : ""}  
        {error13 ? <p className="errors">please enter color comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A'  id="28" name='Color' onChange={onfabaricchange} /></td>
        <td align="center"><input type='radio' value='R' id="29"   name='Color'   onChange={onfabaricchange}  /></td>
        <td align="center"><input type='radio' value='NA' id="30"  name='Color' checked={colorfabaric === 'NA'}       onChange={e => setcolorfabaric(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="31" value={colorfabariccomment}  onChange={e => setcolorfabariccomment(e.target.value)}   style={{border: 'none', outline: '0'}} /></td>
    </tr>


}

{getauditdata.length !=0 ?  getauditdata.map((data) =>
        <tr>
            
            <td>Material Audit:
            {error14 ? <p className="errors">please select any one material</p> : ""}  
            {error15 ? <p className="errors">please enter materailauditcomment </p> : ""}  
            </td>
            <td align='center'><input type='radio' name='MaterialAudit' ref={materialauditref} id="32"     value='A '  defaultChecked={data.MaterialAudit === 'A '}   onChange={onMaterialchange}  /></td>
            <td align="center"><input type='radio' name='MaterialAudit' ref={materialauditref1} id="33" value='R '   defaultChecked={data.MaterialAudit === 'R '}   onChange={onMaterialchange}   /></td>
            <td align="center"><input type='radio' name='MaterialAudit' ref={materialauditref2} id="34"  value='NA'  defaultChecked={data.MaterialAudit === 'NA'}       onChange={e => setmaterailaudit(e.target.value)}   /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="35" ref={materialcommentauditref} defaultValue={data.MaterialAuditComments}  onChange={e => setmaterailauditcomment(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
        </tr>
): 
<tr>
        
        <td>Material Audit:
        {error14 ? <p className="errors">please select any one material</p> : ""}  
        {error15 ? <p className="errors">please enter materailauditcomment </p> : ""}  
        </td>
        <td align='center'><input type='radio' name='Material' id="32"     value='A'  onChange={onMaterialchange}  /></td>
        <td align="center"><input type='radio' name='Material'  id="33" value='R'   onChange={onMaterialchange}   /></td>
        <td align="center"><input type='radio' name='Material' id="34"  value='NA' checked={materailaudit === 'NA'}     onChange={e => setmaterailaudit(e.target.value)}   /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="35" value={materailauditcomment}  onChange={e => setmaterailauditcomment(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
    </tr>


}

{getauditdata.length !=0 ?  getauditdata.map((data) =>


        <tr>
            
            <td>Special Country Audit:
            {error16 ? <p className="errors">please select special country</p> : ""}  
             {error17 ? <p className="errors">please enter special country comment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A ' id="36" ref={specialcountryauditref} name='SpecialCountryAudit'   defaultChecked={data.SpecialCountryAudit === 'A '}  onChange={onSpeccialchange}   /></td>
            <td align="center"><input type='radio' value='R '  id="37" ref={specialcountryauditref1} name='SpecialCountryAudit'  defaultChecked={data.SpecialCountryAudit === 'R '}   onChange={onSpeccialchange}   /></td>
            <td align="center"><input type='radio' value='NA'  id="38" ref={specialcountryauditref2} name='SpecialCountryAudit' defaultChecked={data.SpecialCountryAudit === 'NA'}      onChange={e => setspecialcountryaudit(e.target.value)}    /></td>
            <td align="center"><input type='text' width="30px" maxLength="16" size="16" id="39" ref={specialcountryauditcommentref} style={{border: 'none', outline: '0'}}  defaultValue={data.SpecialCountryAuditComments}  onChange={e => setspecialcountryauditcomment(e.target.value)}    /></td>
        </tr>

):

<tr>
        
<td>Special Country Audit:
{error16 ? <p className="errors">please select special country</p> : ""}  
 {error17 ? <p className="errors">please enter special country comment</p> : ""}  
</td>
<td align='center'><input type='radio' value='A' id="36" name='specilcountry'   onChange={onSpeccialchange}   /></td>
<td align="center"><input type='radio' value='R'  id="37" name='specilcountry'    onChange={onSpeccialchange}   /></td>
<td align="center"><input type='radio' value='NA'  id="38" name='specilcountry' checked={specialcountryaudit === 'NA'}      onChange={e => setspecialcountryaudit(e.target.value)}    /></td>
<td align="center"><input type='text' width="30px" id="39" style={{border: 'none', outline: '0'}}  value={specialcountryauditcomment}  onChange={e => setspecialcountryauditcomment(e.target.value)}    /></td>
</tr>


}


{getauditdata.length !=0 ?  getauditdata.map((data) =>

        <tr>
            
            <td>All Ticketing Audit:
            {error18 ? <p className="errors">please select alltieckting</p> : ""}  
            {error19 ? <p className="errors">please enter alltieckting auditcomment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A ' id="40" ref={AllTicketAuditref}  name='AllTicketAudit' defaultChecked={data.AllTicketAudit === 'A '}   onChange={onalltiecktingaudit} /></td>
            <td align="center"><input type='radio' value='R '  id="41" ref={AllTicketAuditref1} name='AllTicketAudit' defaultChecked={data.AllTicketAudit === 'R '}   onChange={onalltiecktingaudit} /></td>
            <td align="center"><input type='radio' value='NA' id="42"  ref={AllTicketAuditref2} name='AllTicketAudit' defaultChecked={data.AllTicketAudit === 'NA'}     onChange={e => setalltiecktingaudit(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="43" ref={AllTicketAuditcommentref} style={{border: 'none', outline: '0'}}  defaultValue={data.AllTicketAuditComments}  onChange={e => setalltiecktingcomment(e.target.value)} /></td>
        </tr>
):

<tr>
        
<td>All Ticketing Audit:
{error18 ? <p className="errors">please select alltieckting</p> : ""}  
{error19 ? <p className="errors">please enter alltieckting auditcomment</p> : ""}  
</td>
<td align='center'><input type='radio' value='A' id="40"  name='allticket'   onChange={onalltiecktingaudit} /></td>
<td align="center"><input type='radio' value='R'  id="41" name='allticket'   onChange={onalltiecktingaudit} /></td>
<td align="center"><input type='radio' value='NA' id="42"  name='allticket' checked={alltiecktingaudit === 'NA'}     onChange={e => setalltiecktingaudit(e.target.value)} /></td>
<td align="center"><input type='text' maxLength="16" size="16" width="30px" id="43" style={{border: 'none', outline: '0'}}  value={alltiecktingcomment}  onChange={e => setalltiecktingcomment(e.target.value)} /></td>
</tr>



}

{getauditdata.length !=0 ?  getauditdata.map((data) =>
        <tr>
            
            <td>Carton Label Audit:
            {error20 ? <p className="errors">please select cartonlable</p> : ""}  
            {error21 ? <p className="errors">please enter cartonaudit comment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A ' id="44" ref={cortonlableref} name='CartonAudit' defaultChecked={data.CartonAudit === 'A '}  onChange={onCartonaudit} /></td>
            <td align="center"><input type='radio' value='R ' id="45" ref={cortonlableref1}  name='CartonAudit' defaultChecked={data.CartonAudit === 'R '}   onChange={onCartonaudit} /></td>
            <td align="center"><input type='radio' value='NA'id="46" ref={cortonlableref2} name='CartonAudit' defaultChecked={data.CartonAudit === 'NA'}    onChange={e => setCartonaudit(e.target.value)}  /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="47" ref={cortonlablecommentref} style={{border: 'none', outline: '0'}}  defaultValue={data.CartonAuditComments}  onChange={e => setCartoncomment(e.target.value)} /></td>
        </tr>

):

        <tr>
        
        <td>Carton Label Audit:
        {error20 ? <p className="errors">please select cartonlable</p> : ""}  
        {error21 ? <p className="errors">please enter cartonaudit comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="44"  name='carton'  onChange={onCartonaudit} /></td>
        <td align="center"><input type='radio' value='R' id="45"  name='carton'   onChange={onCartonaudit} /></td>
        <td align="center"><input type='radio' value='NA'id="46"  name='carton' checked={Cartonaudit === 'NA'}    onChange={e => setCartonaudit(e.target.value)}  /></td>
        <td align="center"><input type='text' width="30px" id="47"  style={{border: 'none', outline: '0'}}  value={Cartoncomment}  onChange={e => setCartoncomment(e.target.value)} /></td>
    </tr>
      }
      {getauditdata.length !=0 ?  getauditdata.map((data) =>
        <tr>
            
            <td>Pcs Per Carton Audit:
            {error22 ? <p className="errors">please select pcs per</p> : ""}  
            {error23 ? <p className="errors">please enter pcs per comment</p> : ""}  
            </td>
            <td align='center'><input type='radio' name='PcsPerCartonAudit' ref={pecperauditref} id="48" value='A ' defaultChecked={data.PcsPerCartonAudit === 'A '} onChange={onPcsPerCartonaudit} /></td>
            <td align="center"><input type='radio' name='PcsPerCartonAudit' ref={pecperauditref1} id="49" value='R ' defaultChecked={data.PcsPerCartonAudit === 'R '} onChange={onPcsPerCartonaudit} /></td>
            <td align="center"><input type='radio' name='PcsPerCartonAudit' ref={pecperauditref2} id="50" value='NA' defaultChecked={data.PcsPerCartonAudit === 'NA'}   onChange={e => setPcsPerCartonaudit(e.target.value)}    /></td>
            <td align="center"><input type='text' maxLength="16" size="16"  width="30px" id="51" ref={pecperauditcommnetref} style={{border: 'none', outline: '0'}}  defaultValue={data.PcsPerCartonAuditComments}  onChange={e => setPcsPerCartoncommment(e.target.value)} /></td>
        </tr>
      ):

        <tr>
        
        <td>Pcs Per Carton Audit:
        {error22 ? <p className="errors">please select pcs per</p> : ""}  
        {error23 ? <p className="errors">please enter pcs per comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' name='pcsper' id="48" value='A' onChange={onPcsPerCartonaudit} /></td>
        <td align="center"><input type='radio' name='pcsper' id="49" value='R' onChange={onPcsPerCartonaudit} /></td>
        <td align="center"><input type='radio' name='pcsper'  id="50" value='NA' checked={PcsPerCartonaudit === 'NA'}   onChange={e => setPcsPerCartonaudit(e.target.value)}    /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="51" style={{border: 'none', outline: '0'}}  value={PcsPerCartoncommment}  onChange={e => setPcsPerCartoncommment(e.target.value)} /></td>
    </tr>

      }

{getauditdata.length !=0 ?  getauditdata.map((data) =>
        <tr>
            
            <td>Product Safety Audit:
            {error24 ? <p className="errors">please select productsafecty</p> : ""}  
            {error25 ? <p className="errors">please enter productsafetycomment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A ' id="52" ref={Productsafetyauditref} name="productsafety" defaultChecked={data.ProductSafetyAudit === 'A '} onChange={onProductSafetyaudit}  /></td>
            <td align="center"><input type='radio'  value='R ' id="53" ref={Productsafetyauditref1} name="productsafety" defaultChecked={data.ProductSafetyAudit === 'R '}   onChange={onProductSafetyaudit} /></td>
            <td align="center"><input type='radio' value='NA' id="54" ref={Productsafetyauditref2} name="productsafety" defaultChecked={data.ProductSafetyAudit === 'NA'}   onChange={e => setProductSafetyaudit(e.target.value)}/></td>
            <td align="center"><input type='text' width="30px" id="55" maxLength="16" size="16" ref={Productsafetyauditcommentref} style={{border: 'none', outline: '0'}}   defaultValue={data.ProductSafetyAuditComments} onChange={e => setProductSafetycomment(e.target.value)} /></td>
        </tr>

):
        <tr>
        
        <td>Product Safety Audit:
        {error24 ? <p className="errors">please select productsafecty</p> : ""}  
        {error25 ? <p className="errors">please enter productsafetycomment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="52"  name="productsafety" onChange={onProductSafetyaudit}  /></td>
        <td align="center"><input type='radio'  value='R' id="53"  name="productsafety"   onChange={onProductSafetyaudit} /></td>
        <td align="center"><input type='radio' value='NA' id="54"  name="productsafety" checked={ProductSafetyaudit === 'NA'}   onChange={e => setProductSafetyaudit(e.target.value)}/></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="55" style={{border: 'none', outline: '0'}}   value={ProductSafetycomment} onChange={e => setProductSafetycomment(e.target.value)} /></td>
    </tr>
}
        </table> 
  ):
      <table>
      <tr>
        <th>Type of Audit</th>
         <th id="au1">Accept</th>
         <th >Reject</th>
         <th className="au1">N/A</th>
         <th>Comment</th>
      </tr>
      <tr>
        
          <td>Sample Audit:
          {error10 ? <p className="errors">please select sampleaudit</p> : ""}  
          {error11 ? <p className="errors">please enter the sample Audit Comment</p> : ""}  
          </td>
          <td align='center' ><input type='radio' value='A'  name='AUDIT'  onChange={onsamplechange} /></td>
          <td align='center'><input type='radio' value='R'   name='AUDIT'   onChange={onsamplechange} /></td>
          <td align='center'><input type='radio' value='NA'   name='AUDIT' checked={sampleaudit === 'NA'}     onChange={e => sampleaudit1(e.target.value) }/></td>
          <td align='center'><input type='text' maxLength="16" size="16" width="30px"  style={{border: 'none', outline: '0'}} value={sampleauditcomment} onChange={e => setsampleauditcomment(e.target.value)} /></td>
      </tr>
      <tr>
        
        <td>Color/Fabric Audit:
        {error12 ? <p className="errors">please select any on color</p> : ""}  
        {error13 ? <p className="errors">please enter color comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A'  id="28" name='Color' onChange={onfabaricchange} /></td>
        <td align="center"><input type='radio' value='R' id="29"   name='Color'   onChange={onfabaricchange}  /></td>
        <td align="center"><input type='radio' value='NA' id="30"  name='Color' checked={colorfabaric === 'NA'}       onChange={e => setcolorfabaric(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="31" value={colorfabariccomment}  onChange={e => setcolorfabariccomment(e.target.value)}   style={{border: 'none', outline: '0'}} /></td>
    </tr>
    <tr>
        
        <td>Material Audit:
        {error14 ? <p className="errors">please select any one material</p> : ""}  
        {error15 ? <p className="errors">please enter materailauditcomment </p> : ""}  
        </td>
        <td align='center'><input type='radio' name='Material' id="32"     value='A'  onChange={onMaterialchange}  /></td>
        <td align="center"><input type='radio' name='Material'  id="33" value='R'   onChange={onMaterialchange}   /></td>
        <td align="center"><input type='radio' name='Material' id="34"  value='NA' checked={materailaudit === 'NA'}     onChange={e => setmaterailaudit(e.target.value)}   /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="35" value={materailauditcomment}  onChange={e => setmaterailauditcomment(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
    </tr>
    <tr>
        
        <td>Special Country Audit:
        {error16 ? <p className="errors">please select special country</p> : ""}  
         {error17 ? <p className="errors">please enter special country comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="36" name='specilcountry'   onChange={onSpeccialchange}   /></td>
        <td align="center"><input type='radio' value='R'  id="37" name='specilcountry'    onChange={onSpeccialchange}   /></td>
        <td align="center"><input type='radio' value='NA'  id="38" name='specilcountry' checked={specialcountryaudit === 'NA'}      onChange={e => setspecialcountryaudit(e.target.value)}    /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="39" style={{border: 'none', outline: '0'}}  value={specialcountryauditcomment}  onChange={e => setspecialcountryauditcomment(e.target.value)}    /></td>
    </tr>
    <tr>
        
        <td>All Ticketing Audit:
        {error18 ? <p className="errors">please select alltieckting</p> : ""}  
        {error19 ? <p className="errors">please enter alltieckting auditcomment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="40"  name='allticket'   onChange={onalltiecktingaudit} /></td>
        <td align="center"><input type='radio' value='R'  id="41" name='allticket'   onChange={onalltiecktingaudit} /></td>
        <td align="center"><input type='radio' value='NA' id="42"  name='allticket' checked={alltiecktingaudit === 'NA'}     onChange={e => setalltiecktingaudit(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="43" style={{border: 'none', outline: '0'}}  value={alltiecktingcomment}  onChange={e => setalltiecktingcomment(e.target.value)} /></td>
    </tr>
    <tr>
        
        <td>Carton Label Audit:
        {error20 ? <p className="errors">please select cartonlable</p> : ""}  
        {error21 ? <p className="errors">please enter cartonaudit comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="44"  name='carton'  onChange={onCartonaudit} /></td>
        <td align="center"><input type='radio' value='R' id="45"  name='carton'   onChange={onCartonaudit} /></td>
        <td align="center"><input type='radio' value='NA'id="46"  name='carton' checked={Cartonaudit === 'NA'}    onChange={e => setCartonaudit(e.target.value)}  /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="47"  style={{border: 'none', outline: '0'}}  value={Cartoncomment}  onChange={e => setCartoncomment(e.target.value)} /></td>
    </tr>
    <tr>
        
        <td>Pcs Per Carton Audit:
        {error22 ? <p className="errors">please select pcs per</p> : ""}  
        {error23 ? <p className="errors">please enter pcs per comment</p> : ""}  
        </td>
        <td align='center'><input type='radio' name='pcsper' id="48" value='A' onChange={onPcsPerCartonaudit} /></td>
        <td align="center"><input type='radio' name='pcsper' id="49" value='R' onChange={onPcsPerCartonaudit} /></td>
        <td align="center"><input type='radio' name='pcsper'  id="50" value='NA' checked={PcsPerCartonaudit === 'NA'}   onChange={e => setPcsPerCartonaudit(e.target.value)}    /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="51" style={{border: 'none', outline: '0'}}  value={PcsPerCartoncommment}  onChange={e => setPcsPerCartoncommment(e.target.value)} /></td>
    </tr>
    <tr>
        
        <td>Product Safety Audit:
        {error24 ? <p className="errors">please select productsafecty</p> : ""}  
        {error25 ? <p className="errors">please enter productsafetycomment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="52" name="productsafety" onChange={onProductSafetyaudit}  /></td>
        <td align="center"><input type='radio'  value='R' id="53" name="productsafety"   onChange={onProductSafetyaudit} /></td>
        <td align="center"><input type='radio' value='NA' id="54" name="productsafety" checked={ProductSafetyaudit === 'NA'}   onChange={e => setProductSafetyaudit(e.target.value)}/></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="30px" id="55" style={{border: 'none', outline: '0'}}   value={ProductSafetycomment} onChange={e => setProductSafetycomment(e.target.value)} /></td>
    </tr>
      
    </table>
}
      
      
      
      
      
      
      
      
     
      </div>
      <div  className="tablse1" id="auditpanel2">
        <div className="labeingtable">
        {props.match.params.id ?  (
          <table>
            <tr>
              <th>Labeling</th>
              <th>Accept</th>
              <th>Reject</th>
              <th>N/A</th>
              <th>Comment</th>
            </tr>
            {getauditdata.length!=0  ?  getauditdata.map((data) => 
            <tr>
            <td>Size Audit:
            {error26 ? <p className="errors">please select size</p> : ""}  
            {error27 ? <p className="errors">please enter sizecomment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A ' ref={sizeauditref} id="56" name='Sizeaudit' defaultChecked={data.Sizeaudit === 'A '}   onChange={onSizeAudit} /></td>
            <td align="center"><input type='radio' value='R ' ref={sizeauditref1} id="57" name='Sizeaudit' defaultChecked={data.Sizeaudit === 'R '}  onChange={onSizeAudit}  /></td>
            <td align="center"><input type='radio' value='NA' ref={sizeauditref2} id="58" name='Sizeaudit' defaultChecked={data.Sizeaudit === 'NA'}    onChange={e => setSizeAudit(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="100px" ref={sizeauditcommentref} id="59" style={{border: 'none', outline: '0'}}  defaultValue={data.SizeAuditComments}  onChange={e => setSizeAuditcomment(e.target.value)} /></td>
            </tr>
            ):
            <tr>
            <td>Size Audit:
            {error26 ? <p className="errors">please select size</p> : ""}  
            {error27 ? <p className="errors">please enter sizecomment</p> : ""}  
            </td>
            <td align='center'><input type='radio' value='A' id="56" name='sizeaudit'   onChange={onSizeAudit} /></td>
            <td align="center"><input type='radio' value='R' id="57" name='sizeaudit'  onChange={onSizeAudit}  /></td>
            <td align="center"><input type='radio' value='NA' id="58" name='sizeaudit' checked={SizeAudit === 'NA'}    onChange={e => setSizeAudit(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="59" style={{border: 'none', outline: '0'}}  value={SizeAuditcomment}  onChange={e => setSizeAuditcomment(e.target.value)} /></td>
            </tr>
            
            
            }
             {getauditdata.length!=0  ?  getauditdata.map((data) => 
            <tr>
            <td>Main Label Audit:
            {error28 ? <p className="errors">please select main lable</p> : ""}  
            {error29 ? <p className="errors">please enter mainlablecomment</p> : ""} 
            </td>
            <td align='center'><input type='radio' value='A ' id="60" ref={mainlableauditref} name='MainLableAudit' defaultChecked={data.MainLableAudit === 'A '}   onChange={onMainLabelAudit} /></td>
            <td align="center"><input type='radio' value='R ' id="61" ref={mainlableauditref1} name='MainLableAudit' defaultChecked={data.MainLableAudit === 'R '}  onChange={onMainLabelAudit} /></td>
            <td align="center"><input type='radio' value='NA' id="62" ref={mainlableauditref2} name='MainLableAudit' defaultChecked={data.MainLableAudit === 'NA'}     onChange={e => setMainLabelAudit(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="63" ref={mainlableauditcommentref} style={{border: 'none', outline: '0'}} defaultValue={data.MainLableAuditComments} onChange={e => setMainLabelAuditcomment(e.target.value)} /></td>
            </tr>
             ): 

             <tr>
             <td>Main Label Audit:
             {error28 ? <p className="errors">please select main lable</p> : ""}  
             {error29 ? <p className="errors">please enter mainlablecomment</p> : ""} 
             </td>
             <td align='center'><input type='radio' value='A' id="60" name='mainlableaudit'  onChange={onMainLabelAudit} /></td>
             <td align="center"><input type='radio' value='R' id="61" name='mainlableaudit' onChange={onMainLabelAudit} /></td>
             <td align="center"><input type='radio' value='NA' id="62" name='mainlableaudit' checked={MainLabelAudit === 'NA'}     onChange={e => setMainLabelAudit(e.target.value)} /></td>
             <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="63" style={{border: 'none', outline: '0'}} value={MainLabelAuditcomment} onChange={e => setMainLabelAuditcomment(e.target.value)} /></td>
             </tr>
             

             }
              {getauditdata.length !=0  ?  getauditdata.map((data) => 
            <tr>
            <td>Care Label Audit:
            {error30 ? <p className="errors">please select carelable</p> : ""}  
            {error31 ? <p className="errors">please enter carelablecomment</p> : ""} 
            </td>
            <td align='center'><input type='radio' value='A ' ref={carelableauditref} id="64" name='CareLableAudit' defaultChecked={data.CareLableAudit === 'A '} onChange={onCareLabelAudit} /></td>
            <td align="center"><input type='radio' value='R ' ref={carelableauditref1} id="65" name='CareLableAudit' defaultChecked={data.CareLableAudit === 'R '} onChange={onCareLabelAudit} /></td>
            <td align="center"><input type='radio' value='NA' ref={carelableauditref2} id="66" name='CareLableAudit' defaultChecked={data.CareLableAudit === 'NA'}  onChange={e => setCareLabelAudit(e.target.value)}    /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="100px" ref={carlableauditcommentref} id="67" style={{border: 'none', outline: '0'}}  defaultValue={data.CarelLableAuditCommnents} onChange={e => setCareLabelAuditcomment(e.target.value)}  /></td>
            </tr>
              ):
              <tr>
              <td>Care Label Audit:
              {error30 ? <p className="errors">please select carelable</p> : ""}  
              {error31 ? <p className="errors">please enter carelablecomment</p> : ""} 
              </td>
              <td align='center'><input type='radio' value='A' id="64" name='careaudit' onChange={onCareLabelAudit} /></td>
              <td align="center"><input type='radio' value='R' id="65" name='careaudit' onChange={onCareLabelAudit} /></td>
              <td align="center"><input type='radio' value='NA' id="66" name='careaudit' checked={CareLabelAudit === 'NA'}  onChange={e => setCareLabelAudit(e.target.value)}    /></td>
              <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="67" style={{border: 'none', outline: '0'}}  value={CareLabelAuditcomment} onChange={e => setCareLabelAuditcomment(e.target.value)}  /></td>
              </tr>
}
          </table>

        ): 
        <table>
        <tr>
          <th>Labeling</th>
          <th>Accept</th>
          <th>Reject</th>
          <th>N/A</th>
          <th>Comment</th>
        </tr>
        <tr>
        <td>Size Audit:
        {error26 ? <p className="errors">please select size</p> : ""}  
        {error27 ? <p className="errors">please enter sizecomment</p> : ""}  
        </td>
        <td align='center'><input type='radio' value='A' id="56" name='sizeaudit'   onChange={onSizeAudit} /></td>
        <td align="center"><input type='radio' value='R' id="57" name='sizeaudit'  onChange={onSizeAudit}  /></td>
        <td align="center"><input type='radio' value='NA' id="58" name='sizeaudit' checked={SizeAudit === 'NA'}    onChange={e => setSizeAudit(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="59" style={{border: 'none', outline: '0'}}  value={SizeAuditcomment}  onChange={e => setSizeAuditcomment(e.target.value)} /></td>
        </tr>
        <tr>
        <td>Main Label Audit:
        {error28 ? <p className="errors">please select main lable</p> : ""}  
        {error29 ? <p className="errors">please enter mainlablecomment</p> : ""} 
        </td>
        <td align='center'><input type='radio' value='A' id="60" name='mainlableaudit'  onChange={onMainLabelAudit} /></td>
        <td align="center"><input type='radio' value='R' id="61" name='mainlableaudit' onChange={onMainLabelAudit} /></td>
        <td align="center"><input type='radio' value='NA' id="62" name='mainlableaudit' checked={MainLabelAudit === 'NA'}     onChange={e => setMainLabelAudit(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="63" style={{border: 'none', outline: '0'}} value={MainLabelAuditcomment} onChange={e => setMainLabelAuditcomment(e.target.value)} /></td>
        </tr>
        <tr>
        <td>Care Label Audit:
        {error30 ? <p className="errors">please select carelable</p> : ""}  
        {error31 ? <p className="errors">please enter carelablecomment</p> : ""} 
        </td>
        <td align='center'><input type='radio' value='A' id="64" name='careaudit' onChange={onCareLabelAudit} /></td>
        <td align="center"><input type='radio' value='R' id="65" name='careaudit' onChange={onCareLabelAudit} /></td>
        <td align="center"><input type='radio' value='NA' id="66" name='careaudit' checked={CareLabelAudit === 'NA'}  onChange={e => setCareLabelAudit(e.target.value)}    /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="67" style={{border: 'none', outline: '0'}}  value={CareLabelAuditcomment} onChange={e => setCareLabelAuditcomment(e.target.value)}  /></td>
        </tr>
      </table>





}

        </div>
        <div className="Print" id="auditpanel3">
        {props.match.params.id  ?  (
        <table>
            <tr>
              <th>Print,Emb & Wash   </th>
              <th>Accept</th>
              <th>Reject</th>
              <th>N/A</th>
              <th>Comment</th>
            </tr>
            {getauditdata.length !=0  ?   getauditdata.map((data) =>
            <tr>
        <td>Print Audit:
        {error32 ? <p className="errors">please select Print audit</p> : ""}  
            {error33 ? <p className="errors">please enter printcomment</p> : ""} 
        </td>
            <td align='center'><input type='radio' ref={printauditref} value='A '  id="68" name='PrintAudit' defaultChecked={data.PrintAudit === 'A '} onChange={onPrintAudit} /></td>
            <td align="center"><input type='radio' ref={printauditref1} value='R '  id="69" name='PrintAudit' defaultChecked={data.PrintAudit === 'R '}  onChange={onPrintAudit} /></td>
            <td align="center"><input type='radio' ref={printauditref2} id="70" name='PrintAudit' defaultChecked={data.PrintAudit === 'NA'}  onChange={e => setPrintAudit(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" ref={printauditcommentref} width="100px" id="71" style={{border: 'none', outline: '0'}}  defaultValue={data.PrintAuditComments} onChange={e => setPrintAuditcomment(e.target.value)} /></td>
            </tr>
            ):
            <tr>
            <td>Print Audit:
            {error32 ? <p className="errors">please select Print audit</p> : ""}  
                {error33 ? <p className="errors">please enter printcomment</p> : ""} 
            </td>
                <td align='center'><input type='radio' value='A'  id="68" name='printaudit' onChange={onPrintAudit} /></td>
                <td align="center"><input type='radio' value='R'  id="69" name='printaudit'  onChange={onPrintAudit} /></td>
                <td align="center"><input type='radio'  id="70" name='printaudit' checked={PrintAudit === 'NA'}  onChange={e => setPrintAudit(e.target.value)} /></td>
                <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="71" style={{border: 'none', outline: '0'}}  defaultValue={PrintAuditcomment} onChange={e => setPrintAuditcomment(e.target.value)} /></td>
                </tr>

}



{getauditdata.length !=0  ?   getauditdata.map((data) =>
            <tr>
            <td>Emb Audit:
            {error34 ? <p className="errors">please select emb</p> : ""}  
            {error35 ? <p className="errors">please enter embcomment</p> : ""} 
            </td>
            <td align='center'><input type='radio' value='A ' ref={embauditref} id="72" name="EmbAudit" defaultChecked={data.EmbroadaryAudit === 'A '}   onChange={OnEmbAudit} /></td>
            <td align="center"><input type='radio' value='R ' ref={embauditref1} id="73" name="EmbAudit" defaultChecked={data.EmbroadaryAudit === 'R '}   onChange={OnEmbAudit}   /></td>
            <td align="center"><input type='radio' value='NA' ref={embauditref2} id="74" name="EmbAudit" defaultChecked={data.EmbroadaryAudit === 'NA'}      onChange={e => setEmbAudit(e.target.value)} /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="100px" ref={embauditcommentref} id="75" defaultValue={data.EmbroadaryAuditComments}  style={{border: 'none', outline: '0'}} onChange={e => setEmbAuditcomment(e.target.value)}   /></td>
            </tr>
):
<tr>
<td>Emb Audit:
{error34 ? <p className="errors">please select emb</p> : ""}  
{error35 ? <p className="errors">please enter embcomment</p> : ""} 
</td>
<td align='center'><input type='radio' value='A' id="72" name="emb" onChange={OnEmbAudit} /></td>
<td align="center"><input type='radio' value='R' id="73" name="emb" onChange={OnEmbAudit}   /></td>
<td align="center"><input type='radio' value='NA' id="74" name="emb" checked={EmbAudit === 'NA'}      onChange={e => setEmbAudit(e.target.value)} /></td>
<td align="center"><input type='text' width="100px" maxLength="16" size="16" id="75" value={EmbAuditcomment}  style={{border: 'none', outline: '0'}} onChange={e => setEmbAuditcomment(e.target.value)}   /></td>
</tr>

}

{getauditdata.length !=0  ?   getauditdata.map((data) =>
            <tr>
            <td>Wash Audit:
            {error36 ? <p className="errors">please select wash</p> : ""}  
            {error37 ? <p className="errors">please enter washcomment</p> : ""}
            </td>
            <td align='center'><input type='radio' value='A ' ref={washauditref} id="76" name='WashAudit' defaultChecked={data.WashAudit === 'A '} onChange={onWashAudit} /></td>
            <td align="center"><input type='radio' value='R ' ref={washauditref1} id="77" name='WashAudit' defaultChecked={data.WashAudit === 'R '} onChange={onWashAudit} /></td>
            <td align="center"><input type='radio' value='NA' ref={washauditref2} id="78" name='WashAudit' defaultChecked={data.WashAudit === 'NA' }   onChange={e => setWashAudit(e.target.value)}    /></td>
            <td align="center"><input type='text' maxLength="16" size="16" width="100px" ref={washauditrefcomment} id="79" style={{border: 'none', outline: '0'}} defaultValue={data.WashAuditComments}  onChange={e => setWashAuditcomment(e.target.value)} /></td>
            </tr>
): 
<tr>
<td>Wash Audit:
{error36 ? <p className="errors">please select wash</p> : ""}  
{error37 ? <p className="errors">please enter washcomment</p> : ""}
</td>
<td align='center'><input type='radio' value='A' id="76" name='Wash' onChange={onWashAudit} /></td>
<td align="center"><input type='radio' value='R' id="77" name='Wash' onChange={onWashAudit} /></td>
<td align="center"><input type='radio' value='NA' id="78" name='Wash' checked={WashAudit === 'NA'}  onChange={e => setWashAudit(e.target.value)}    /></td>
<td align="center"><input type='text' width="100px"  maxLength="16" size="16" id="79" style={{border: 'none', outline: '0'}} value={WashAuditcomment}  onChange={e => setWashAuditcomment(e.target.value)} /></td>
</tr>


}
            </table>
        ) : 
        
        <table>
        <tr>
          <th>Print,Emb & Wash   </th>
          <th>Accept</th>
          <th>Reject</th>
          <th>N/A</th>
          <th>Comment</th>
        </tr>
        <tr>
    <td>Print Audit:
    {error32 ? <p className="errors">please select Print audit</p> : ""}  
        {error33 ? <p className="errors">please enter printcomment</p> : ""} 
    </td>
        <td align='center'><input type='radio' value='A'  id="68" name='printaudit' onChange={onPrintAudit} /></td>
        <td align="center"><input type='radio' value='R'  id="69" name='printaudit'  onChange={onPrintAudit} /></td>
        <td align="center"><input type='radio'  id="70" name='printaudit' checked={PrintAudit === 'NA'}  onChange={e => setPrintAudit(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="71" style={{border: 'none', outline: '0'}}  value={PrintAuditcomment} onChange={e => setPrintAuditcomment(e.target.value)} /></td>
        </tr>
        <tr>
        <td>Emb Audit:
        {error34 ? <p className="errors">please select emb</p> : ""}  
        {error35 ? <p className="errors">please enter embcomment</p> : ""} 
        </td>
        <td align='center'><input type='radio' value='A' id="72" name="emb" onChange={OnEmbAudit} /></td>
        <td align="center"><input type='radio' value='R' id="73" name="emb" onChange={OnEmbAudit}   /></td>
        <td align="center"><input type='radio' value='NA' id="74" name="emb" checked={EmbAudit === 'NA'}      onChange={e => setEmbAudit(e.target.value)} /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="75" value={EmbAuditcomment}  style={{border: 'none', outline: '0'}} onChange={e => setEmbAuditcomment(e.target.value)}   /></td>
        </tr>
        <tr>
        <td>Wash Audit:
        {error36 ? <p className="errors">please select wash</p> : ""}  
        {error37 ? <p className="errors">please enter washcomment</p> : ""}
        </td>
        <td align='center'><input type='radio' value='A' id="76" name='Wash' onChange={onWashAudit} /></td>
        <td align="center"><input type='radio' value='R' id="77" name='Wash' onChange={onWashAudit} /></td>
        <td align="center"><input type='radio' value='NA' id="78" name='Wash' checked={WashAudit === 'NA'}  onChange={e => setWashAudit(e.target.value)}    /></td>
        <td align="center"><input type='text' maxLength="16" size="16" width="100px" id="79" style={{border: 'none', outline: '0'}} value={WashAuditcomment}  onChange={e => setWashAuditcomment(e.target.value)} /></td>
        </tr>
        </table>
        
        
        }
        </div>
      </div>
      
    </div>
    

         
  </Tab>
  <Tab eventKey=" Box Control" title=" Box Control">
    <div className='box'>
      <div className="boxcontroller">
        
      {props.match.params.id     ?  (
        <table>
          <tr>
            <th>Box Control</th>
            <th>Comment</th>
          </tr>
          {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) => 
          <tr className="row1">
            <td >Ttl No Of Ctn
            {error38 ? <p className="errors">please enter totlenocartonscomment</p> : ""}
            </td>
            <td ><input type='text' width="500px" id="80" size="16" maxLength="16" style={{border: 'none', outline: '0'}}  ref={totalcortanref}  defaultValue={data.TotalNoCartonsComments}  onChange={e => setTotalNoCartonsComment(e.target.value)} /></td>
          </tr>
          ):  
          <tr className="row1">
          <td >Ttl No Of Ctn
          {error38 ? <p className="errors">please enter totlenocartonscomment</p> : ""}
          </td>
          <td ><input type='text' width="500px"  size="16" maxLength="16" id="80" style={{border: 'none', outline: '0'}}  value={TotalNoCartonsComment}  onChange={e => setTotalNoCartonsComment(e.target.value)} /></td>
        </tr>
          
          }
           {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) => 
          <tr>
            <td >Completed Ctn
            {error39 ? <p className="errors">please enter CompletedCartonsComment</p> : ""}
            </td>
            <td ><input type='text'  size="16" maxLength="16" width="500px" id="81" style={{border: 'none', outline: '0'}} ref={completecartonref}  defaultValue={data.CompletedCartonsComments} onChange={e => setCompletedCartonsComment(e.target.value)} /></td>
          </tr>
           ):

            <tr>
            <td >Completed Ctn
            {error39 ? <p className="errors">please enter CompletedCartonsComment</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="81" style={{border: 'none', outline: '0'}} ref={com1}  value={CompletedCartonsComment} onChange={e => setCompletedCartonsComment(e.target.value)} /></td>
          </tr> 
            }
             {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) => 
          <tr>
            <td >Rounded Ctn No
            {error40 ? <p className="errors">please enter RoundedCartonsComment</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="82" style={{border: 'none', outline: '0'}}  ref={roundedcartonref} defaultValue={data.RoundedCartonsComments}  onChange={e=> setRoundedCartonsComment(e.target.value)}  /></td>
          </tr>
             ):  <tr>
             <td >Rounded Ctn No
             {error40 ? <p className="errors">please enter RoundedCartonsComment</p> : ""}
             </td>
             <td ><input type='text' width="500px"  size="16" maxLength="16" id="82" style={{border: 'none', outline: '0'}} value={RoundedCartonsComment}  onChange={e=> setRoundedCartonsComment(e.target.value)}  /></td>
           </tr>  }
         
          
           
         
        </table>
      ) : 


        <table>
          <tr>
            <th>Box Control</th>
            <th>Comment</th>
          </tr>
          <tr className="row1">
            <td >Ttl No Of Ctn
            {error38 ? <p className="errors">please enter totlenocartonscomment</p> : ""}
            </td>
            <td ><input type='text' width="500px" id="80"  size="16" maxLength="16" style={{border: 'none', outline: '0'}}  value={TotalNoCartonsComment}  onChange={e => setTotalNoCartonsComment(e.target.value)} /></td>
          </tr>
          <tr>
            <td >Completed Ctn
            {error39 ? <p className="errors">please enter CompletedCartonsComment</p> : ""}
            </td>
            <td ><input type='text' width="500px" id="81"  size="16" maxLength="16" style={{border: 'none', outline: '0'}} ref={com1}  value={CompletedCartonsComment} onChange={e => setCompletedCartonsComment(e.target.value)} /></td>
          </tr>
          <tr>
            <td >Rounded Ctn No
            {error40 ? <p className="errors">please enter RoundedCartonsComment</p> : ""}
            </td>
            <td ><input type='text' width="500px" id="82"  size="16" maxLength="16" style={{border: 'none', outline: '0'}} value={RoundedCartonsComment}  onChange={e=> setRoundedCartonsComment(e.target.value)}  /></td>
          </tr>
         
         
        </table>
}
      </div>
     

     










    </div>
   

  



 



  </Tab>
  <Tab eventKey="Others" title="Others" >
  <div className='others'>
      <div className="otherstbl">
      {props.match.params.id ?  (
        <table>
          <tr>
            <th>others</th>
            <th>Comment</th>
          </tr>
          {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>
          <tr>
            <td >Country of Origin
            {error41 ? <p className="errors">please enter CounteryofOrigin</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="83" style={{border: 'none', outline: '0'}} ref={countryoriginref}   defaultValue={data.CountryofOrigin}  onChange={e => setCountryofOrigin(e.target.value)} /></td>
          </tr> 
          ): <tr>
          <td >Country of Origin
          {error41 ? <p className="errors">please enter CounteryofOrigin</p> : ""}
          </td>
          <td ><input type='text'  size="16" maxLength="16" width="500px" id="83" style={{border: 'none', outline: '0'}} value={CountryofOrigin} onChange={e => setCountryofOrigin(e.target.value)} /></td>
        </tr>}
           {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>  
          <tr>
            <td >Size to Size:
            {error42 ? <p className="errors">please enter sizetosize</p> : ""}
            </td>
            <td ><input type='text'  size="16" maxLength="16" width="500px" id="84" defaultValue={data.SizetoSize}   ref={sizetosizeref} onChange={e => setSizetoSize(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
          </tr>
           ):  <tr>
           <td >Size to Size:
           {error42 ? <p className="errors">please enter sizetosize</p> : ""}
           </td>
           <td ><input type='text'  size="16" maxLength="16" width="500px" id="84" value={SizetoSize} onChange={e => setSizetoSize(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
         </tr>}
            {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>
          <tr>
            <td >Measurement :
            {error43 ? <p className="errors">please enter measurement</p> : ""}
            </td>
            <td ><input type='text'  size="16" maxLength="16" width="500px" id="85" defaultValue={data.Measurement} ref={measurementref}  onChange={e => setMeasurement(e.target.value)}  style={{border: 'none', outline: '0'}} /></td>
          </tr>
            ):  <tr>
            <td >Measurement :
            {error43 ? <p className="errors">please enter measurement</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="85" value={Measurement} onChange={e => setMeasurement(e.target.value)}  style={{border: 'none', outline: '0'}} /></td>
          </tr>
          }
             {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>
          <tr>
            <td >Actual GSM :
            {error44 ? <p className="errors">please enter acutualgsmcound</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="86" defaultValue={data.ActualGSMCount}  ref={actualgsmref} onChange={e => setActualGSMCount(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
          </tr>
             ): <tr>
             <td >Actual GSM :
             {error44 ? <p className="errors">please enter acutualgsmcound</p> : ""}
             </td>
             <td ><input type='text' width="500px"  size="16" maxLength="16" id="86" value={ActualGSMCount} onChange={e => setActualGSMCount(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
           </tr>}
         
        </table>
      ):

        <table>
          <tr>
            <th>others</th>
            <th>Comment</th>
          </tr>
         
          <tr>
            <td >Country of Origin
            {error41 ? <p className="errors">please enter CounteryofOrigin</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="83" style={{border: 'none', outline: '0'}} value={CountryofOrigin} onChange={e => setCountryofOrigin(e.target.value)} /></td>
          </tr>   
          <tr>
            <td >Size to Size:
            {error42 ? <p className="errors">please enter sizetosize</p> : ""}
            </td>
            <td ><input type='text'  size="16" maxLength="16" width="500px" id="84" value={SizetoSize} onChange={e => setSizetoSize(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
          </tr>
          <tr>
            <td >Measurement :
            {error43 ? <p className="errors">please enter measurement</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="85" value={Measurement} onChange={e => setMeasurement(e.target.value)}  style={{border: 'none', outline: '0'}} /></td>
          </tr>
          <tr>
            <td >Actual GSM :
            {error44 ? <p className="errors">please enter acutualgsmcound</p> : ""}
            </td>
            <td ><input type='text' width="500px"  size="16" maxLength="16" id="86" value={ActualGSMCount} onChange={e => setActualGSMCount(e.target.value)} style={{border: 'none', outline: '0'}} /></td>
          </tr>
         
        </table>
}
      </div>
    </div>
  </Tab>
  
  <Tab eventKey="Remarks" title="Remarks" >
  <div className='remarks'>
      <div className="remarkstbl">
      {props.match.params.id ?  (
        <table className="remarstbl">
          <tr>
            <th>Remarks and Comments</th>
          
          </tr>
          {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>
          <tr className="row1">
        
            <td ><input    defaultValue={data.Remarks1} ref={remarksref1} onChange={e => setRemarks1(e.target.value)}  style={{border: 'none', outline: '0'}}   />
            {error49 ? <p className="errors">please enter Remarks1</p> : ""}
            </td>
          </tr>
          ):  <tr className="row1">
        
          <td ><input    value={Remarks1} onChange={e => setRemarks1(e.target.value)}  style={{border: 'none', outline: '0'}}   />
          {error49 ? <p className="errors">please enter Remarks1</p> : ""}
          </td>
        </tr>}
           {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>
          <tr>
         
            <td ><input     defaultValue={data.Remarks2} ref={remarksref2} onChange={e => setRemarks2(e.target.value)}  style={{border: 'none', outline: '0'}}  />
            {error50 ? <p className="errors">please enter Remarks2</p> : ""}
            </td>
          </tr>
           ):  <tr>
         
           <td ><input     value={Remarks2} onChange={e => setRemarks2(e.target.value)}  style={{border: 'none', outline: '0'}}  />
           {error50 ? <p className="errors">please enter Remarks2</p> : ""}
           </td>
         </tr> }
            {Boxcontrolerandother.length !=0  ?  Boxcontrolerandother.map((data) =>
          <tr>
         
            <td ><input    defaultValue={data.Remarks3} ref={remarksref3} onChange={e => setRemarks3(e.target.value)}   style={{border: 'none', outline: '0'}}  />
            {error51 ? <p className="errors">please enter Remarks3</p> : ""}
            </td>
          </tr>
         
            ):  <tr>
         
            <td ><input   value={Remarks3} onChange={e => setRemarks3(e.target.value)}   style={{border: 'none', outline: '0'}}  />
            {error51 ? <p className="errors">please enter Remarks3</p> : ""}
            </td>
          </tr>}
        </table>

      ):
        <table className="remarstbl">
          <tr>
            <th>Remarks and Comments</th>
          
          </tr>
          <tr className="row1">
        
            <td ><input    value={Remarks1} onChange={e => setRemarks1(e.target.value)}  style={{border: 'none', outline: '0'}}   />
            {error49 ? <p className="errors">please enter Remarks1</p> : ""}
            </td>
          </tr>
          <tr>
         
            <td ><input     value={Remarks2} onChange={e => setRemarks2(e.target.value)}  style={{border: 'none', outline: '0'}}  />
            {error50 ? <p className="errors">please enter Remarks2</p> : ""}
            </td>
          </tr>
          <tr>
         
            <td ><input   value={Remarks3} onChange={e => setRemarks3(e.target.value)}   style={{border: 'none', outline: '0'}}  />
            {error51 ? <p className="errors">please enter Remarks3</p> : ""}
            </td>
          </tr>
         
         
        </table>
        }
      </div>
    </div>
   
  


  </Tab>
  
  


  <Tab eventKey="Cartons Details" title="Cartons Details">
  <div className='cartondetl'>
      <div className="ca">
        {props.match.params.id  ?     (

     

        <div className="cartantabinput">
           {localStorage.getItem('editid') === '1' ? (
        <div className="cartondinputs">
        <lable style={{marginLeft: '1px'}}>Number of cartons in shipment</lable>
       <input  name="w3review"  value={ShippedCartonCount} onChange={e => setShippedCartonCount(e.target.value)}   cols="100" />
         {error52 ? <p className="errors" style={{width:'150px', marginLeft: '20px'}}>please enter number of cartons shipment</p> : ""}
        
        </div>
         ): ''}
         {localStorage.getItem('editid') === '1' ? (
        <div className="cartondinputs">
        <lable style={{marginLeft: '10px'}}>Number of cartons pulled</lable>
        <input type='number'name="w3review" value={PulledCartonCount} onChange={e => setPulledCartonCount(e.target.value)} />
           {error53 ? <p className="errors" style={{width:'150px', marginLeft: '20px'}}>please enter number of cartons pulled</p> : ""}
           
       
        </div>
         ): ''}
        {localStorage.getItem('editid') === '1' ? (
        <div className="cartondinputs">
         <lable style={{marginLeft: '10px'}}>Cartons audit passes</lable>
         <input type='number'  value={PassedCartonCount}  onChange={e => someoffailedcartton(e.target.value,e)}   />
          {error54 ? <p className="errors" style={{width:'150px', marginLeft: '20px'}}>please enter Cartons audit passes</p> : ""}
         
        </div>
         ): ''}
        {localStorage.getItem('editid') === '1' ? (
        <div className="cartondinputs">
        <lable style={{marginLeft: '10px'}}>Cartons audit failed</lable>
        <input type='number'  value={FailedCartonCount}  onChange={e =>  setFailedCartonCount(e.target.value)}   />
        {error55 ? <p className="errors" style={{width:'100px', marginLeft: '20px'}} >please enter Cartons audit failed</p> : ""}
        
        </div>
         ): ''}
      </div>
      
        ): 
       


        <div className="cartantabinput">
          <div className="cartondinputs">
          <lable style={{marginLeft: '1px'}}>Number of cartons in shipment</lable>
         <input  name="w3review"  value={ShippedCartonCount} onChange={e => setShippedCartonCount(e.target.value)}   cols="100" />
           {error52 ? <p className="errors" style={{width:'150px', marginLeft: '20px'}}>please enter number of cartons shipment</p> : ""}
           
          </div>
          <div className="cartondinputs">
          <lable style={{marginLeft: '10px'}}>Number of cartons pulled</lable>
          <input type='number'name="w3review" value={PulledCartonCount} onChange={e => setPulledCartonCount(e.target.value)} />
             {error53 ? <p className="errors" style={{width:'150px', marginLeft: '20px'}}>please enter number of cartons pulled</p> : ""}
             
         
          </div>
          <div className="cartondinputs">
           <lable style={{marginLeft: '10px'}}>Cartons audit passes</lable>
           <input type='number'  value={PassedCartonCount}  onChange={e => someoffailedcartton(e.target.value,e)}   />
            {error54 ? <p className="errors" style={{width:'150px', marginLeft: '20px'}}>please enter Cartons audit passes</p> : ""}
           
          </div>
          <div className="cartondinputs">
          <lable style={{marginLeft: '10px'}}>Cartons audit failed</lable>
          <input type='number'  value={FailedCartonCount}  onChange={e =>  setFailedCartonCount(e.target.value)}   />
          {error55 ? <p className="errors" style={{width:'100px', marginLeft: '20px'}} >please enter Cartons audit failed</p> : ""}
          
          </div>

        </div>
        
        
        }
       
      </div>
      
     {props.match.params.id ?   (

   
      <div className="buttonnext">
         {localStorage.getItem('editid') === '1' ? (
           <Button    color="success" onClick={CreateCartonDetailEditpage}  >Add</Button>
         ): ''}
           </div>
             ):
           <div className="buttonnext">
           <Button    color="success" onClick={CreateCartonDetail}  >Add</Button>
           </div>
           }
    </div>

    <div className="carta">
      <Card>
        <CardBody>
         
    <TableContainer >
   
      <Table  className="imagetble" >
        <TableHead>
          <TableRow>
          <TableCell>ShippedCartonCount</TableCell>
          <TableCell>PulledCartonCount</TableCell>
          <TableCell >PassedCartonCount</TableCell>
          <TableCell >FailedCartonCount</TableCell>
          {localStorage.getItem('editid') === '1' ? (
          <TableCell>Delete</TableCell>
          ): ''}
          </TableRow>
        </TableHead>
        <TableBody>
     
            
             {getCartondata.map((data) => (

            
            <TableRow>
              <TableCell >{data.ShippedCartonCount}</TableCell>
            
            <TableCell >{data.PulledCartonCount}</TableCell>
            <TableCell >{data.PassedCartonCount}</TableCell>
            
              <TableCell >{data.FailedCartonCount}</TableCell>
              {props.match.params.id   ? (
              <TableCell>
                 {localStorage.getItem('editid') === '1' ? (
              <IconButton size="small" color="secondary" onClick={(e) => DeleteCartonEditpage(data.CartonId, e)   }   >
                  <CloseIcon fontSize="small" />
                </IconButton  >
                 ): ''}
                </TableCell>
                ):
                <TableCell>
                  
              <IconButton size="small" color="secondary" onClick={(e) => DeleteCarton(data.CartonId, e)   }   >
                  <CloseIcon fontSize="small" />
                </IconButton  >
                </TableCell>
                }
            </TableRow>

            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        component="div"
        rowsPerPageOptions={pages2}
        count={getCartondata.length}
        rowsPerPage={rowsperpage2}
        page={page2}
        onChangePage={handleChangePage2}
       onChangeRowsPerPage={handleChangeRowsPerPage2}
    />
        </CardBody>
        </Card>
    </div>


  </Tab>






 
</Tabs>
    </div>
    </CardBody></Card>
    </div>
    <Card className="imagegallerycard" id="imgtb">
      <CardBody>
      <CardHeader className="imagegallerytitle">Defect's Details</CardHeader>
      
    <div className="imagetabs" >
    <Tabs  defaultActiveKey="Audit Images" id="uncontrolled-tab-example">
    <Tab eventKey="Audit Images" title="Audit Images">
  <div className="imagegarlleryforgarment" id="imagegarmentimagid">
  {props.match.params.id   ?  (
  <Card className="measureimgcard">
      <CardBody>

   
        <div className="imagegarllery"   >
        <div className="closebutn">
        <IconButton  onClick={removeimagecontainder1}>
      <CloseIcon color="secondary"  />
      </IconButton> 
          </div>
         
          <p> Audit  Images    </p>
          {localStorage.getItem('editid') === '1' ? (
          <div className="imageform">

          <div className="comment" >
            
            <lable>Description</lable>
            <input  placeholder="enter your description" value={commetsforimg} onChange={e => setcommetsforimg(e.target.value)} />
             {imageerro1 ?  <p className='errors' style={{color: 'red'}}> please enter the description </p>: ''}
             {imageerro2 ?  <p className='errors'  style={{color: 'red'}}  >  Choose  one image file</p>: ''}
            </div>
            {imageloade &&  (
                <div className="imagevalue">
                  <img src={imageloade} width="100px" height="100px" />
                </div>
              )}
            <div onClick={() => imageref1.current.click() }   className="fileupload">
                <AttachFileIcon />
              {/* <input ref={imageref1} id="garmentImage" type='file' accept=".png,.jpg,.pdf"  hidden  onChange={handleimage} /> */}
            
          </div>
         

          <div className="buttonnextimg">
           <Button id="garementimagebtn"  color="success" onClick={uploadimg1}  >add</Button>
           </div>
           <div className="bar">
           <CircularProgress variant="determinate" value={uploadprecntage} />
           </div>
          </div>
          ): ''}
        </div>
    
 
  </CardBody>
    </Card>

  ) :

  <Card className="measureimgcard">
      <CardBody>

   
        <div className="imagegarllery"   >
        <div className="closebutn">
        <IconButton  onClick={removeimagecontainder1}>
      <CloseIcon color="secondary"  />
      </IconButton> 
          </div>
         
          <p >Audit Images    </p>
          <div className="imageform">
          <div className="comment" >
            
            <lable>Description</lable>
            <input  placeholder="enter your description" value={commetsforimg} onChange={e => setcommetsforimg(e.target.value)} />
             {imageerro1 ?  <p className='errors' style={{color: 'red'}}> please enter the description </p>: ''}
             {imageerro2 ?  <p className='errors'  style={{color: 'red'}}  > Choose  one image file </p>: ''}
            </div>
            {imageloade &&  (
                <div className="imagevalue" >
                  <img src={imageloade} width="100px" height="100px" />
                </div>
              )}
            <div onClick={() => imageref1.current.click() }   className="fileupload">
                <AttachFileIcon />
              <input ref={imageref1} id="garmentImage" type='file' accept=".png,.jpg,.pdf"  hidden  onChange={handleimage} />
            
          </div>
         

          <div className="buttonnextimg">
           <Button id="garementimagebtn"  color="success" onClick={uploadimg}  >add</Button>
           </div>
           <div className="bar">
           <CircularProgress variant="determinate" value={uploadprecntage} />
           </div>
          </div>
         
        </div>
    
 
  </CardBody>
    </Card>



    }
    
   
    </div>
    <Backdrop  open={opendialog} className={classes.backdrop} >

           
    <Spinner name="ball-spin-fade-loader"  color='#fafafa' />


</Backdrop>

    <div>
      
      <Card className="measureimgcard">
        <CardBody >
       
    <TableContainer >
    <Toolbar className="serchdiv">
         
           {localStorage.getItem('editid') === '1' ? (
           <button  className="addbutton" onClick={addimagegarnemt}>Add image  </button>
           ): ''}
         </Toolbar>
      <Table  className="imagetble" >
        <TableHead>
          <TableRow>
         
          <TableCell>IMAGE</TableCell>
        
            <TableCell align="left">Description</TableCell>
          
            {localStorage.getItem('editid') === '1' ? (
            <TableCell>DELETE</TableCell>
            ): ''}
          </TableRow>
        </TableHead>
        <TableBody>
     
            
        {imagecollection.map((data) => (
            <TableRow>
             
                
              
              <TableCell className='imagecell' >
              <img  src={axios.baseURL+"GetCartonimage/"+ data.ImageURL} />
              </TableCell>
              <TableCell >{data.Comments}</TableCell>
              {props.match.params.id   ?  (
              <TableCell>
                 {localStorage.getItem('editid') === '1' ? (
              <IconButton size="small" color="secondary" onClick={(e) => Deleteimagegerment1(data.ImageId, data.ImageURL, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton  >
                 ): ''}
                </TableCell>
              ) :
            <TableCell>
              <IconButton size="small" color="secondary" onClick={(e) => Deleteimagegerment(data.ImageId, data.ImageURL, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton  >
                </TableCell>

         }
             
            
            </TableRow>
     ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={imagecollection.length}
        rowsPerPage={rowsperpage}
        page={page}
        onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
    />

</CardBody>
      </Card>

    </div>


    </Tab>

    <Tab eventKey="Defect Description" title="Defect Description">
 <div className="Inspectiondefacts"  id="inspectionid">
   {props.match.params.id  ? (

   
     <Card  className="defactcard">
       <CardBody>
       {localStorage.getItem('editid') === '0' ? (
         ''
       ):
       
       <div>
          <p>Defect Description</p>
          <div className="closebutn1">
          <IconButton  onClick={Closeinspectionform}>
      <CloseIcon color="secondary"  />
      </IconButton>
      </div>
      </div>
       
       
       
       
       }
         
      {localStorage.getItem('editid') === '1' ? (
        <div>
        <div className="defactform">
           
          <div className="categroyinfo">
            <lable>Defect Category</lable>
            <select value={GetCategoryId} onChange ={getsubcategorys}>
         
             
             <option>Select category</option>
             {category.map((data) => (
             <option value={data.CategoryId}>{data.CategoryDescription}</option>
             ))}
            
           </select>
           {error56 ? <p style={{color: 'red'}}>please select Category</p> : '' }
          </div>
          <div className="subcategroyinfo" >
          <lable>  Sub Category</lable>
          <select value={GetSubCategory} onChange={e => setGetSubCategory(e.target.value)}>
              <option>Select Subcategroy</option>
              {subCategory.map((data) =>(
                <option value={data.SubCategoryId}>{data.SubCategoryDescription}</option>
              ))}
            </select>
            {error57 ? <p style={{color: 'red'}}>please select subCategory</p> : '' }
            </div>
           
            <div className="Critical">
              <label >Critical</label>
              <select value={Critical} onChange={e => setCritical(e.target.value)}>
              <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34"> 34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
              </select>

            </div>
            <div className="Marjor">
              <label>Major</label>
              <select value={Major} onChange={e => setMajor(e.target.value)}>
              <option value="0" selected>0</option>
               <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34"> 34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
              </select>
                
           

            </div>
            <div className="Mainor">
              <label>Minor</label>
            
              <select value={Minor}  onChange={e => setMinor(e.target.value)}>
              <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34"> 34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
              </select>
                 
             

            </div>
           
            </div>
           
            <div className="filluploaders">
            <div onClick={() => imageref3.current.click() }   className="fileupload1">
              <lable>image1</lable>
                <AttachFileIcon />
              <input ref={imageref3}  type='file' accept=".png,.jpg,.pdf"  id="imgup" hidden  onChange={Inspectionimage1}  />
            
          </div>
          <div onClick={() => imageref4.current.click() }   className="fileupload1">
            <lable>image2</lable>
                <AttachFileIcon />
              <input ref={imageref4} type='file' accept=".png,.jpg,.pdf" id="imgup"  hidden onChange={Inspectionimage2}  />
            
          </div>
          <div onClick={() => imageref5.current.click() }   className="fileupload1">
          <lable>image3</lable>
                <AttachFileIcon />
              <input ref={imageref5} type='file' accept=".png,.jpg,.pdf" id="imgup" hidden onChange={Inspectionimage3}  />
            
          </div>
          <div onClick={() => imageref6.current.click() }   className="fileupload1">
          <lable>image4</lable>
                <AttachFileIcon />
              <input ref={imageref6} type='file' accept=".png,.jpg,.pdf" id="imgup" hidden  onChange={Inspectionimage4}  />
            
          </div>
          <div className="buttonnext1">
    <Button id="mesurmentimage" color="success" onClick={CreateInspectionDefactseditpage}   >add</Button>
    </div>
         
            </div>
          
     
     
        <div className="imagecontainer">
        {Defactimageload1  !=null  ? <div className="image1" >
           <p>Image-1</p>
          <img src={Defactimageload1} />
          {imageerro5 ?  <p className='errors'  style={{color: 'red'}}  > Choose a ful file </p>: ''}
          </div> : '' }
          {Defactimageload2  !=null  ? <div className="image2" > 
          <p>Image-2</p>
          <img src={Defactimageload2} />
          </div> : '' }
          {Defactimageload3  !=null  ? <div className="image3" >
          <p>Image-3</p>
          <img src={Defactimageload3} />
          </div> : '' }
          {Defactimageload4  !=null  ? <div className="image4" >
          <p>Image-4</p>
          <img src={Defactimageload4} />
          </div> : '' }
         
          {imageerro5 ?  <p className='errors'  style={{color: 'red'}}  > Choose a four file </p>: ''}

        </div>
          {errordefact ? <p className='errors'  style={{color: 'red'}}  > please select  any one defects</p>: ''}
        </div>
      ):''}

       </CardBody>
     </Card>

    
):  

<Card className="defactcard">
<CardBody>
   <p>Defect Description</p>
   <div className="closebutn1">
   <IconButton  onClick={Closeinspectionform}>
<CloseIcon color="secondary"  />
</IconButton>
</div>
 <div className="defactform">
    
   <div className="categroyinfo">
     <lable>Defect Category</lable>
     <select value={GetCategoryId} onChange ={getsubcategorys}>
  
      
      <option>Select category</option>
      {category.map((data) => (
      <option value={data.CategoryId}>{data.CategoryDescription}</option>
      ))}
     
    </select>
    {error56 ? <p style={{color: 'red'}}>please select Category</p> : '' }
   </div>
   <div className="subcategroyinfo" >
   <lable>Sub Category</lable>
   <select value={GetSubCategory} onChange={e => setGetSubCategory(e.target.value)}>
       <option>Select Subcategroy</option>
       {subCategory.map((data) =>(
         <option value={data.SubCategoryId}>{data.SubCategoryDescription}</option>
       ))}
     </select>
     {error57 ? <p style={{color: 'red'}}>please select subCategory</p> : '' }
     </div>
    
     <div className="Critical">
       <label >Critical</label>
       <select value={Critical} onChange={e =>  critcalchange(e.target.value, e)}>
       <option value="0" selected>0</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
         <option value="13">13</option>
         <option value="14">14</option>
         <option value="15">15</option>
         <option value="16">16</option>
         <option value="17">17</option>
         <option value="18">18</option>
         <option value="19">19</option>
         <option value="20">20</option>
         <option value="21">21</option>
         <option value="22">22</option>
         <option value="23">23</option>
         <option value="24">24</option>
         <option value="25">25</option>
         <option value="26">26</option>
         <option value="27">27</option>
         <option value="28">28</option>
         <option value="29">29</option>
         <option value="30">30</option>
         <option value="31">31</option>
         <option value="32">32</option>
         <option value="33">33</option>
         <option value="34"> 34</option>
         <option value="35">35</option>
         <option value="36">36</option>
         <option value="37">37</option>
         <option value="38">38</option>
         <option value="39">39</option>
         <option value="40">40</option>
         <option value="41">41</option>
         <option value="42">42</option>
         <option value="43">43</option>
         <option value="44">44</option>
         <option value="45">45</option>
         <option value="46">46</option>
         <option value="47">47</option>
         <option value="48">48</option>
         <option value="49">49</option>
         <option value="50">50</option>
       </select>

     </div>
     <div className="Marjor">
       <label>Major</label>
       <select value={Major} onChange={e => Majorvalue(e.target.value,e)}>
       <option value="0" selected>0</option>
        <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
         <option value="13">13</option>
         <option value="14">14</option>
         <option value="15">15</option>
         <option value="16">16</option>
         <option value="17">17</option>
         <option value="18">18</option>
         <option value="19">19</option>
         <option value="20">20</option>
         <option value="21">21</option>
         <option value="22">22</option>
         <option value="23">23</option>
         <option value="24">24</option>
         <option value="25">25</option>
         <option value="26">26</option>
         <option value="27">27</option>
         <option value="28">28</option>
         <option value="29">29</option>
         <option value="30">30</option>
         <option value="31">31</option>
         <option value="32">32</option>
         <option value="33">33</option>
         <option value="34"> 34</option>
         <option value="35">35</option>
         <option value="36">36</option>
         <option value="37">37</option>
         <option value="38">38</option>
         <option value="39">39</option>
         <option value="40">40</option>
         <option value="41">41</option>
         <option value="42">42</option>
         <option value="43">43</option>
         <option value="44">44</option>
         <option value="45">45</option>
         <option value="46">46</option>
         <option value="47">47</option>
         <option value="48">48</option>
         <option value="49">49</option>
         <option value="50">50</option>
       </select>
         
    

     </div>
     <div className="Mainor">
       <label>Minor</label>
     
       <select value={Minor}  onChange={e => MinorValue(e.target.value,e)}>
       <option value="0" selected>0</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
         <option value="13">13</option>
         <option value="14">14</option>
         <option value="15">15</option>
         <option value="16">16</option>
         <option value="17">17</option>
         <option value="18">18</option>
         <option value="19">19</option>
         <option value="20">20</option>
         <option value="21">21</option>
         <option value="22">22</option>
         <option value="23">23</option>
         <option value="24">24</option>
         <option value="25">25</option>
         <option value="26">26</option>
         <option value="27">27</option>
         <option value="28">28</option>
         <option value="29">29</option>
         <option value="30">30</option>
         <option value="31">31</option>
         <option value="32">32</option>
         <option value="33">33</option>
         <option value="34"> 34</option>
         <option value="35">35</option>
         <option value="36">36</option>
         <option value="37">37</option>
         <option value="38">38</option>
         <option value="39">39</option>
         <option value="40">40</option>
         <option value="41">41</option>
         <option value="42">42</option>
         <option value="43">43</option>
         <option value="44">44</option>
         <option value="45">45</option>
         <option value="46">46</option>
         <option value="47">47</option>
         <option value="48">48</option>
         <option value="49">49</option>
         <option value="50">50</option>
       </select>
          
      

     </div>
    
     </div>
    
     <div className="filluploaders">
     <div onClick={() => imageref3.current.click() }   className="fileupload1">
       <lable>image1</lable>
         <AttachFileIcon />
       <input ref={imageref3} type='file'   accept=".png,.jpg,.pdf" id="imgup" hidden  onChange={Inspectionimage1}  />
     
   </div>
   <div onClick={() => imageref4.current.click() }   className="fileupload1">
     <lable>image2</lable>
         <AttachFileIcon />
       <input ref={imageref4} type='file' accept=".png,.jpg,.pdf" id="imgup" hidden onChange={Inspectionimage2}  />
     
   </div>
   <div onClick={() => imageref5.current.click() }   className="fileupload1">
   <lable>image3</lable>
         <AttachFileIcon />
       <input ref={imageref5} type='file' accept=".png,.jpg,.pdf" id="imgup" hidden onChange={Inspectionimage3}  />
     
   </div>
   <div onClick={() => imageref6.current.click() }   className="fileupload1">
   <lable>image4</lable>
         <AttachFileIcon />
       <input ref={imageref6} type='file' accept=".png,.jpg,.pdf" id="imgup" hidden  onChange={Inspectionimage4}  />
     
   </div>
   <div className="buttonnext1">
    <Button id="mesurmentimage" color="success" onClick={CreateInspectionDefacts}   >add</Button>
    </div>
     </div>
   


 <div className="imagecontainer">
 {Defactimageload1  !=null  ? <div className="image1" >
    <p>Image-1</p>
   <img src={Defactimageload1} />
  
   </div> : '' }
   {Defactimageload2  !=null  ? <div className="image2"  > 
   <p>Image-2</p>
   <img src={Defactimageload2} />
   </div> : '' }
   {Defactimageload3  !=null  ? <div className="image3" >
   <p>Image-3</p>
   <img src={Defactimageload3} />
   </div> : '' }
   {Defactimageload4  !=null  ? <div className="image4" >
   <p>Image-4</p>
   <img src={Defactimageload4} />
   </div> : '' }
  
  
   {errordefact ? <p className='errors'  style={{color: 'red'}}  > please select  any one defects</p>: ''}
 </div>




</CardBody>
</Card>





}


   </div>
   <Backdrop  open={opendialog2} className={classes.backdrop} >

           
<Spinner name="ball-spin-fade-loader"  color='#fafafa' />


</Backdrop>
   <div>
      <Card>
        <CardBody>
    <TableContainer >
    <Toolbar className="serchdiv">
          
           {localStorage.getItem('editid') === '1' ? (

           
           <button  className="addbutton" onClick={getinspectionform} >Add Defect Image  </button>
           ): ''}
         </Toolbar>
         
      <Table  className="imagetble" >
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
             {localStorage.getItem('editid') === '1' ? (

            <TableCell align="left">Delete</TableCell>
             ): ''}
          </TableRow>
          
        </TableHead>
        <TableBody>
     
            
             {changepagefordefactdescription().map((data) => (

            
            <TableRow>
              <TableCell >{data.CategoryDescription}</TableCell>
            
            <TableCell >{data.SubCategoryDescription}</TableCell>
            <TableCell >{data.Critical}</TableCell>
            
              <TableCell >{data.Major}</TableCell>
              <TableCell >{data.Minor}</TableCell>
            
              <TableCell className='imagecell' >
              {data.ImageURL1 ===  'No Image Found' ? 'No Image found' : <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL1} />}
                </TableCell>
                <TableCell className='imagecell' >
                  {data.ImageURL2 ===  'No Image Found' ? 'No Image found' :  <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL2} />  }
                
              </TableCell>
               <TableCell className='imagecell'  >    {data.ImageURL3 ===  'No Image Found' ? 'No Image found' :  <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL3} /> }
               </TableCell>
            
              <TableCell className='imagecell' >   {data.ImageURL4 ===  'No Image Found' ? 'No Image found' :    <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL4} /> }</TableCell>
              {props.match.params.id   ?        (
              <TableCell>
 {localStorage.getItem('editid') === '1' ? (

              <IconButton size="small" color="secondary" onClick={(e) => DeleteDefactdataeditpage(data.DefectID, data.ImageURL1,data.ImageURL2,data.ImageURL3,data.ImageURL4, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton   >
 ): ''}
                </TableCell>
              ): 
              
              <TableCell>
              <IconButton size="small" color="secondary" onClick={(e) => DeleteDefactdata(data.DefectID, data.ImageURL1,data.ImageURL2,data.ImageURL3,data.ImageURL4, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton   >
                </TableCell>
              
              
               }

            </TableRow>
            ))}
            <TableRow >
            <TableCell>

            </TableCell>
            <TableCell style={{color:'red', textAlign:'center', fontWeight:'bold'}}>TOTAL</TableCell>
            {Criticalsum.map((data) => (
            <TableCell style={{fontWeight:'400'}}> <b>{data.criticals}</b> 
</TableCell>
))}
       {Criticalsum.map((data) => (
            <TableCell style={{fontWeight:'400'}}><b>{data.Major}</b> 
</TableCell>
))}

{Criticalsum.map((data) => (
            <TableCell style={{fontWeight:'400'}}> <b>{data.Minor}</b> 
</TableCell>
))}
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
            </TableRow>
        </TableBody>
      </Table>
         
    </TableContainer>
    <TablePagination
        component="div"
        rowsPerPageOptions={pagesd}
        count={Getdefactone.length}
        rowsPerPage={rowsperpaged}
        page={paged}
        onChangePage={handleChangePaged}
       onChangeRowsPerPage={handleChangeRowsPerPaged}
    />
        </CardBody>
        </Card>
    </div>




 </Tab>


  <Tab eventKey="Measurement images" title="Measurement Chart ">
  <div className="imagegarllery1" id="masurementimgid">
  {props.match.params.id   ?  (
  <Card className="measureimgcard">
      <CardBody>
  
   
        <div className="imagegarllery">
          <div className="closebutn">
          <IconButton  onClick={removeimagecontainder}>
      <CloseIcon color="secondary"  />
      </IconButton>
          </div>
          <p >Measurement  Chart </p>
          {localStorage.getItem('editid') === '1' ? (
          <div className="imageform">
          <div className="comment" >
            
            <lable>Description</lable>
            <input   value={masurmentcommet} onChange={e => setmasurmentcommet(e.target.value)} placeholder="enter your description"  />
            {imageerro3 ?  <p className='errors' style={{color: 'red'}}> please enter the description </p>: ''}
             {imageerro4 ?  <p className='errors'  style={{color: 'red'}}  >  Choose  one image file </p>: ''}
            </div>
            {imageloade1 &&  (
                <div className="imagevalue" >
                  <img src={imageloade1} width="100px" height="100px" />
                </div>
              )}
            <div onClick={() => imageref2.current.click() }   className="fileupload">
                <AttachFileIcon />
              <input ref={imageref2}  type='file' accept=".png,.jpg,.pdf" id="imgup" hidden  onChange={masurementimage} />
            
          </div>
        
          <div className="buttonnextimg">
           <Button  outline  color="success" onClick={ UpdateImageformasurmentEditpage}  >add</Button>
           </div>
           <div className="bar">
           <CircularProgress variant="determinate" value={uploadprecntage} />
           </div>
          
          </div>
          ):''}
        </div>
    
  
  </CardBody>
    </Card>
  ) :  
  <Card className="measureimgcard">
      <CardBody>
  
   
        <div className="imagegarllery">
          <div className="closebutn">
          <IconButton  onClick={removeimagecontainder}>
      <CloseIcon color="secondary"  />
      </IconButton>
          </div>
          <p >Measurement  Chart </p>
          <div className="imageform">
          <div className="comment" >
            
            <lable>Description</lable>
            <input  placeholder="enter your description" value={masurmentcommet} onChange={e => setmasurmentcommet(e.target.value)} />
            {imageerro3 ?  <p className='errors' style={{color: 'red'}}> please enter the description </p>: ''}
             {imageerro4 ?  <p className='errors'  style={{color: 'red'}}  >  Choose  one image file </p>: ''}
            </div>
            {imageloade1 &&  (
                <div className="imagevalue" >
                  <img src={imageloade1} width="100px" height="100px" />
                </div>
              )}
            <div onClick={() => imageref2.current.click() }   className="fileupload">
                <AttachFileIcon />
              <input ref={imageref2} type='file' accept=".png,.jpg,.pdf" id="imgup" hidden  onChange={masurementimage} />
            
          </div>
        
          <div className="buttonnextimg">
           <Button  outline  color="success" onClick={UpdateImageformasurment}  >add</Button>
           </div>
           <div className="bar">
           <CircularProgress variant="determinate" value={uploadprecntage} />
           </div>
          
          </div>
         
        </div>
    
  
  </CardBody>
    </Card>
 
  
  
  }
     


    </div>
   

    <Backdrop  open={opendialog1} className={classes.backdrop} >

           
    <Spinner name="ball-spin-fade-loader"  color='#fafafa' />


</Backdrop>

    <div>
      <Card className="">
        <CardBody>
        
  
    <TableContainer >
    <Toolbar className="serchdiv">
          
           {localStorage.getItem('editid') === '1' ? (
           <button  className="addbutton" onClick={addimagedisplay}>Add image  </button>
           ): ''}
         </Toolbar>
      <Table  className="imagetble" >
        <TableHead>
          <TableRow>
          <TableCell>IMAGE</TableCell>
          <TableCell align="left">Description</TableCell>
        
           
          
            {localStorage.getItem('editid') === '1' ? (
            <TableCell>Delete</TableCell>
            ):''}
          </TableRow>
        </TableHead>
        <TableBody>
        {changepage1().map((data) => (
            
      
            <TableRow>
           
              
             
              <TableCell className='imagecell1' >
              <img  src={axios.baseURL+"GetCartonimage/"+data.ImageURL} />
              </TableCell>
              <TableCell >{data.Comments}</TableCell>
                 
              {props.match.params.id ?  (
              <TableCell>
                 {localStorage.getItem('editid') === '1' ? (
              <IconButton size="small" color="secondary" onClick={(e) => DeleteimageMesurementone(data.ImageId, data.ImageURL, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton  >
                 ): ''}
                </TableCell>
                ): 
                
                <TableCell>
              <IconButton size="small" color="secondary" onClick={(e) => DeleteimageMesurement(data.ImageId, data.ImageURL, e)   }  >
                  <CloseIcon fontSize="small" />
                </IconButton  >
                </TableCell>
                
                }

            </TableRow>
           ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  
    <TablePagination
        component="div"
        rowsPerPageOptions={pages1}
        count={imagecollectionbymasurement.length}
        rowsPerPage={rowsperpage1}
        page={page1}
        onChangePage={handleChangePage1}
       onChangeRowsPerPage={handleChangeRowsPerPage1}
    />


</CardBody>
      </Card>

    </div>


    </Tab>
 


</Tabs>
</div>
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
            message="Inspection Inserted successfully"

          />
           <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Audit Insepction and InspectionInfo and Defact Description Inserted successfully"


          >
          
        </Snackbar>
<Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open2}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Boxcontroll and  Inserted successfully"

          />
              <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open3}
            autoHideDuration={2000}
            onClose={handleClose}
            message=" Inspection Image Inserted successfully"

          />


<Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open4}
            autoHideDuration={2000}
            onClose={handleClose}
            message=" Cartons detail Inserted successfully"

          />
  <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open7}
            autoHideDuration={2000}
            onClose={handleClose}
            message=" Transaction Updated successfully"

          />


          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open4}
            autoHideDuration={2000}
            onClose={handleClose}
            message=" Cartons detail added successfully"

          />
    
    <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open5}
            autoHideDuration={2000}
            onClose={handleClose}
            message=" Defects Description added successfully"

          />

       <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
              
            }}
            
            open={open6}
            autoHideDuration={2000}
            onClose={handleClose}
         
          >
             <Alert onClose={handleClose} severity="error">
             Atleast One defect should be added to save inspection
  </Alert>
  </Snackbar >
<div className="inspectionresult" id="summary">
<Card  className="inspectionresult1" >
<CardBody>

<CardHeader className="inspectionresulecardheadr" >Inspection result - Summary </CardHeader>
<div className="summ">
     <div className="summarytbl">
       {props.match.params.id   ?  (
       <table>
       <tr>
         <th>Result   </th>
         <th>Pass</th>
         <th>Fail</th>
         <th>Repair</th>
        
       </tr>
       {Boxcontrolerandother.length !=0  ?   Boxcontrolerandother.map((data) => 
         <tr>
         <td width="400px">Measurement Audit
         {error45 ? <p className="errors">please select masurment</p> : ""}
         </td>
       <td align='center'><input type='radio' id="87" value='P ' name='ms' defaultChecked={data.MeasurementAudit === 'P '} ref={Measurementref1}  onChange={e => setMeasurementAudit(e.target.value)} /></td>
       <td align='center'><input type='radio' id="88" value='F ' name='ms' defaultChecked={data.MeasurementAudit === 'F '} ref={Measurementref2} onChange={e => setMeasurementAudit(e.target.value)} /></td>
       <td align='center'><input type='radio' id="89" value='R ' name='ms' defaultChecked={data.MeasurementAudit === 'R '} ref={Measurementref3}   onChange={e => setMeasurementAudit(e.target.value)} /></td>
     
       </tr>
       ):
         <tr>
           <td width="400px">Measurement Audit
           {error45 ? <p className="errors">please select masurment</p> : ""}
           </td>
         <td align='center'><input type='radio' id="87" value='P' name='ms'  onChange={e => setMeasurementAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="88" value='F' name='ms' checked={MeasurementAudit === 'F'} onChange={e => setMeasurementAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="89" value='R' name='ms' onChange={e => setMeasurementAudit(e.target.value)} /></td>
       
         </tr>
}
{Boxcontrolerandother.length !=0  ?   Boxcontrolerandother.map((data) => 
         <tr>
           <td width="400px">Packaging Audit
           {error46 ? <p className="errors">please select Packaging</p> : ""}
           </td>
         <td align='center'><input type='radio' id="90" value='P ' name='PA'   defaultChecked={data.PackingAudit === 'P '} ref={packingref} onChange={e => setPackingAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="91" value='F ' name='PA' defaultChecked={data.PackingAudit === 'F '} ref={packingref1} onChange={e => setPackingAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="92" value='R ' name='PA' defaultChecked={data.PackingAudit === 'R '} ref={packingref2}  onChange={e => setPackingAudit(e.target.value)} /></td>
      
         </tr>
):  
<tr>
<td width="400px">Packaging Audit
{error46 ? <p className="errors">please select Packaging</p> : ""}
</td>
<td align='center'><input type='radio' id="90" value='P' name='PA' onChange={e => setPackingAudit(e.target.value)} /></td>
<td align='center'><input type='radio' id="91" value='F' name='PA' checked={PackingAudit === 'F'} onChange={e => setPackingAudit(e.target.value)} /></td>
<td align='center'><input type='radio' id="92" value='R' name='PA' onChange={e => setPackingAudit(e.target.value)} /></td>

</tr>



}


{Boxcontrolerandother.length !=0  ?   Boxcontrolerandother.map((data) => 
         <tr>
           <td width="400px">Workmanship Audit
           {error47 ? <p className="errors">please select Workmanship</p> : ""}
           </td>
         <td align='center'><input type='radio' id="93" value='P ' name='Wa' defaultChecked={data.WorkmanshipAudit === 'P '} ref={Workmanshipref} onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="94" value='F ' name='Wa' defaultChecked={data.WorkmanshipAudit === 'F '} ref={Workmanshipref1}  onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="95" value='R ' name='Wa' defaultChecked={data.WorkmanshipAudit === 'R '} ref={Workmanshipref2} onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
      
         </tr>
       
):

<tr>
           <td width="400px">Workmanship Audit
           {error47 ? <p className="errors">please select Workmanship</p> : ""}
           </td>
         <td align='center'><input type='radio' id="93" value='P' name='Wa' onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="94" value='F' name='Wa' checked={WorkmanshipAudit ==='F'} onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="95" value='R' name='Wa' onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
      
         </tr>

}
{Boxcontrolerandother.length !=0  ?   Boxcontrolerandother.map((data) => 
         <tr>
           <td width="400px">Other Audit
           {error47 ? <p className="errors">please select OtherAudit</p> : ""}
           </td>
         <td align='center'><input type='radio' id="93" value='P ' name='ot' defaultChecked={data.OtherAudit === 'P '} ref={OtherAuditref} onChange={e => setOtherAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="94" value='F ' name='ot' defaultChecked={data.OtherAudit === 'F '} ref={OtherAuditref1}  onChange={e => setOtherAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="95" value='R ' name='ot' defaultChecked={data.OtherAudit === 'R '} ref={OtherAuditref2} onChange={e => setOtherAudit(e.target.value)} /></td>
      
         </tr>
       
):

<tr>
           <td width="400px">OtherAudit
           {error47 ? <p className="errors">please select OtherAudit</p> : ""}
           </td>
         <td align='center'><input type='radio' id="93" value='P' name='ot' onChange={e => setOtherAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="94" value='F' name='ot' checked={OtherAudit ==='F'} onChange={e => setOtherAudit(e.target.value)} /></td>
         <td align='center'><input type='radio' id="95" value='R' name='ot' onChange={e => setOtherAudit(e.target.value)} /></td>
      
         </tr>

}

       
{Boxcontrolerandother.length !=0  ?   Boxcontrolerandother.map((data) => 
         <tr>
           <td width="400px">Overall Result
            {error48 ? <p className="errors">please select overallresult</p> : ""}
           </td>
            <td align='center'><input type='radio' id="96" value='P ' name='OR' defaultChecked={data.OverallResult === 'P '} ref={Overallresult}    onChange={e => setOverallResult(e.target.value)} /> </td>
          
      
            <td align='center'><input type='radio' id="96" value='F ' name='OR' defaultChecked={data.OverallResult === 'F '} ref={Overallresult1}  onChange={e => setOverallResult(e.target.value)} /> </td>
          
                <td align='center'><input type='radio' id="98" value='R ' name='OR' defaultChecked={data.OverallResult === 'R '} ref={Overallresult2}   onChange={e => setOverallResult(e.target.value)} /></td>
        </tr>
): 


<tr>
           <td width="400px">Overall Result
            {error48 ? <p className="errors">please select overallresult</p> : ""}
           </td>
            <td align='center'><input type='radio' id="96" value='P' name='OR' checked={OverallResult === 'P' }     onChange={e => setOverallResult(e.target.value)} /> </td>
          
      
            <td align='center'><input type='radio' id="96" value='F' name='OR' checked={OverallResult === 'F' }  onChange={e => setOverallResult(e.target.value)} /> </td>
          
                <td align='center'><input type='radio' id="98" value='R' name='OR'    onChange={e => setOverallResult(e.target.value)} /></td>
        </tr>

}
        
       </table>  
       ):
     <table>
            <tr>
              <th>Result   </th>
              <th>Pass</th>
              <th>Fail</th>
              <th>Repair</th>
             
            </tr>
             
              <tr>
                <td width="400px">Measurement Audit
                {error45 ? <p className="errors">please select masurment</p> : ""}
                </td>
              <td align='center'><input type='radio' id="87" value='P' name='ms'  onChange={e => setMeasurementAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="88" value='F' name='ms' checked={MeasurementAudit === 'F'} onChange={e => setMeasurementAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="89" value='R' name='ms' onChange={e => setMeasurementAudit(e.target.value)} /></td>
            
              </tr>
          
              <tr>
                <td width="400px">Packaging Audit
                {error46 ? <p className="errors">please select Packaging</p> : ""}
                </td>
              <td align='center'><input type='radio' id="90" value='P' name='PA' onChange={e => setPackingAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="91" value='A' name='PA' checked={PackingAudit === 'F'} onChange={e => setPackingAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="92" value='F' name='PA' onChange={e => setPackingAudit(e.target.value)} /></td>
           
              </tr>
              
              <tr>
                <td width="400px">Workmanship Audit
                {error47 ? <p className="errors">please select Workmanship</p> : ""}
                </td>
              <td align='center'><input type='radio' id="93" value='P' name='Wa' onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="94" value='F' name='Wa' checked={WorkmanshipAudit ==='F'} onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="95" value='R' name='Wa' onChange={e => setWorkmanshipAudit(e.target.value)} /></td>
           
              </tr>
              <tr>
                <td width="400px">OtherAudit
                {error47 ? <p className="errors">please select OtherAudit</p> : ""}
                </td>
              <td align='center'><input type='radio' id="93" value='P' name='ot' onChange={e => setOtherAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="94" value='F' name='ot' checked={OtherAudit ==='F'} onChange={e => setOtherAudit(e.target.value)} /></td>
              <td align='center'><input type='radio' id="95" value='R' name='ot' onChange={e => setOtherAudit(e.target.value)} /></td>
           
              </tr>
              
                   
              <tr>
                <td width="400px">Overall Result
                 {error48 ? <p className="errors">please select overallresult</p> : ""}
                </td>
                 <td align='center'><input type='radio' id="96" value='P' name='OR' checked={OverallResult === 'P' }     onChange={e => setOverallResult(e.target.value)} /> </td>
               
           
                 <td align='center'><input type='radio' id="96" value='P' name='OR' checked={OverallResult === 'F' }  onChange={e => setOverallResult(e.target.value)} /> </td>
               
                     <td align='center'><input type='radio' id="98" value='R' name='OR'    onChange={e => setOverallResult(e.target.value)} /></td>
             </tr>
             
             
            </table>
}
     </div>



   





   </div>
   </CardBody>
   </Card>
   </div>
 
  
   <div className="threecard" id="threecard">
   <Row>
          
         

          <Col lg={3} md={6} sm={6} xs={12}>
            <Card className="card1">
             
              <CardBody className="card1bd">
              <EmojiObjectsIcon size="large"  />
               <p>Critical</p>  {Criticalsum.map((data) => (<p style={{marginLeft: '10px', fontWeight: 600}}>{data.criticals}</p>))}
              </CardBody>
               
            </Card>

          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
          <Card className="card2">
          
              <CardBody className="card2bd">
              <ThumbUpAltIcon size="large"  />
               <p>Major</p> {Criticalsum.map((data) => ( <p style={{marginLeft: '10px', fontWeight: 600}}>{data.Major}</p>  ))}
               </CardBody>
         
            </Card>
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
          <Card className="card3">
          
              <CardBody className="card3bd">
                <ThumbsUpDownIcon size="large" />
                <p>Minor</p> {Criticalsum.map((data) => (<p style={{marginLeft: '10px', fontWeight: 600}}>{data.Minor}</p>   ))} </CardBody>
               
                {Criticalsum.map((data) => (
                  localStorage.setItem('TotalDefect', data.Totaldefacts)
                ))}
            </Card>
          </Col>
        </Row>


   {props.match.params.id ? (
     Criticalsum.map((data) => (
      localStorage.setItem('TotalDefectupdate', data.Totaldefacts)
    ))
   ): ''}

   </div>


    </div>
  )
}

export default Inspection

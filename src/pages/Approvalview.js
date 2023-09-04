import {
    Avatar,
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Button,
    Typography
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
    Row
  } from 'reactstrap';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import SearchIcon from '@material-ui/icons/Search';
  import Select from 'react-select'
  import Paper from '@material-ui/core/Paper';
  import IconButton from '@material-ui/core/IconButton';
  import EditIcon from '@material-ui/icons/Edit';
  import DeleteIcon from '@material-ui/icons/Delete';
  import CloseIcon from '@material-ui/icons/Close';
  import UpdateIcon from '@material-ui/icons/Update';
  import ClearIcon from '@material-ui/icons/Clear';
  import {saveAs} from 'file-saver'
  import Backdrop from '@material-ui/core/Backdrop';

  import PerfectScrollbar from 'react-perfect-scrollbar';
  import './Approval.css'
  import React, { useEffect, useRef, useState, } from 'react'
  import Alert from '@material-ui/lab/Alert';
  import moment from 'moment'
  
  import Button1 from 'reactstrap/lib/Button'
  import {Helmet} from 'react-helmet'
  import { Cancel, Category } from '@material-ui/icons';
  import axios from '../axios'
  import Snackbar from '@material-ui/core/Snackbar'; 
  import { useStateValue } from '../StateProvider';
  import Toolbar from '@material-ui/core/Toolbar';
  import numeral from 'numeral';
  import { makeStyles } from '@material-ui/core/styles';
  import  Spinner  from 'react-spinkit'
  import  { useHistory } from  'react-router-dom'
  import axioss from "axios";
  
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      
    },
  }));

  function ChartPage(props) {
    const classes = useStyles();
    const history = useHistory()
  
    const [getcat, setgetcat] = useState([])
    const [category, setcategory] = useState('')
    const [updateCategory, setupdateCategory] = useState("")
    const [Contactperson, setContactperson] = useState('')
    const [Suppliermail, setSuppliermail] = useState('')
   const [defact1, setdefact1] = useState([])
   const [open, setopen] = useState(false)
   const [open1, setopen1] = useState(false)
   const [open2, setopen2] = useState(false)
   const [open3, setopen3] = useState(false)
   const [open4, setopen4] = useState(false)
    const [Acive, setAcive] = useState('yes')
    const updatecatee = useRef('')
    const activeref = useRef('')
    const [{ user } , dispatch] = useStateValue();
    const [userinf, setuserinf] = useState([])
    const idref = useRef('')
    const pages = [5,10,15,20,25,30,35,40,45,50,100]
    const [page, setpage] = useState(0)
   const [rowsperpage, setrowsperpage] = useState(pages[page])
   const [erros, seterros] = useState(false)
   const [errors1, seterrors1] = useState(false)
   const [fromdatee, setfromdatee] = useState('')
   const [todate1, settodate1] = useState('')
   const [toodate, settoodate] = useState('')
   const [show1, setShow1] = useState(false);
   const [sharename, setsharename] = useState('')
     const [show, setShow] = useState(false);
     const [mode, setMode] = useState('date');
     const [mode1, setMode1] = useState('date');
    
  const [cutomer, setcutomer] = useState([])
  const [deletingid, setdeletingid] = useState('')
  const [deleteconfirmstatus, setdeleteconfirmstatus] = useState('')
  const [customerss, setcustomerss] = useState('')
  const [usertype, setusertype] = useState('')
  const [custt, setcustt] = useState('')
  const [bracnch, setbracnch] = useState('')
  const [branches, setbranches] = useState([])
  const [branchesadmin, setbranchesadmin] = useState([])
  const [purchase, setpurchase] = useState([])
  const [branchfornoadmin, setbranchfornoadmin] = useState([])
  
  const [isVisible, setIsVisible] = useState(false);
  const [All, setAll] = useState('0')
  const [Poshow, setPoshow] = useState(true)
  const [Poshowadd, setPoshowadd] = useState(true)
  const [remarks, setremarks] = useState('')
  const [pono, setpono] = useState('')
  const [deliverdate, setdeliverdate] = useState('')

  const [Cusidvalue, setCusidvalue] = useState("")
  const [totalamountvaluedata, settotalamountvaluedata] = useState('')
  const [ohdate, setohdate] = useState('')
  const [todate, settodate] = useState('')
  const [purchasedeliverydate, setpurchasedeliverydate] = useState('')

  const [cccmail, setcccmail] = useState('')
  const [nonadmin, setnonadmin] = useState('')

  const [department, setdepartment] = useState('')
  const [designation, setdesignation] = useState('')

  const [spinerforapprovespinner, setspinerforapprovespinner] = useState(false)
    const handleChangePage = (event, newPage) => {
      setpage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setrowsperpage(parseInt(event.target.value, 10));
      // setpage(0);
    };
  
    const changepage = () => {
      return provalue.slice(page * rowsperpage, (page + 1) * rowsperpage)
    }
   
    const [taxes, settaxes] = useState([])
    const [hdrnetamt, sethdrnetamt] = useState('')

   useEffect(() => {
    const getusertype = async() => {
  
      const type =  localStorage.getItem('AdminUser')
      
     setusertype(type)

    
     
     }
     const custtt = async () => {
    
       const custt =   localStorage.getItem('Customer_Log')
       setcustt(custt)
       //////console.log(custt)
     }
     const branch = async () => {
    
       const branch =  localStorage.getItem('Branch_Log')
       setbracnch(branch)
       //////console.log(branch)
     }
    var date =  new Date()
    var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
    // var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)
    var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    var lastdays = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    getusertype()
    custtt()
    branch()
    purchasepo()
    customeradmin()
   
    
    if (props.match.params.id) {
      updatescreenview(props.match.params.id)
      pdfcreate(props.match.params.id)
      Mailcontent(props.match.params.id)
      UserMailDetail()
      usernames(props.match.params.id)
      gettaxes(props.match.params.id)
      ponodate(props.match.params.id)
    }
  
  
    branchet()
  
  
   setfromdatee(moment(firstday).format('YYYY-MM-DD'))
   settoodate(moment(lastday).format('YYYY-MM-DD'))
   settodate1(moment(lastdays).format('YYYY-MM-DD'))
    
   }, [])

   const usernames=async()=>{
    await axios.instance.get(`username/${props.match.params.id}`)
    .then((res)=>{
     setnonadmin(res.data.at(0).User_Name);

     
      setdepartment(res.data.at(0).Department)
      setdesignation(res.data.at(0).Designation)
     
    })
   }
  
 
  
   const Getorderhdr = async(id)  => {
    setprovalue([])
    const tokent  =   localStorage.getItem('authtoken') 
  const ordeheader = await  axios.instance.get(`/POOrdr/${localStorage.getItem("customer_HO")}/${id}`, {'Authorization': tokent
  , 'Content-Type': 'application/json'}).then((res) => {
   console.log(res.data,'testtt')
    for(const data of res.data) {
       ////////console.log(new Date(data.Delivery_Date))
       settoodate(data.Delivery_Date)
       setdeliverdate(data.Order_Date)
       //setohdate(new Date(data.Delivery_Date))
       ////console.log(data.Order_Date)
      setremark(data.Remarks)
      setpono(data.PO_No)
      setCusidvalue(data.Customer_Id)
      localStorage.setItem('MailCustomerid', data.Customer_Id)
      ////console.log('remarks', data.REMARKS)
     
    }
    
  })
   }
    
   const getprodctdel =  async(id) => {
    setprovalue([])
    const tokent  =   localStorage.getItem('authtoken') 
     const prod = await  axios.instance.get(`/POOrdrDtl/${id}`, {'Authorization': tokent
     , 'Content-Type': 'application/json'}).then(async(res)  => {
      localStorage.setItem('Products', JSON.stringify( res.data))
    setprovalue(res.data)
    console.log(provalue,'provalue')
    
    //setProductcollection(res.data)
    //console.log(res.data)
    let totalnetamt = []
  
  let qtytotal = []
  
  for(const data of res.data){
    qtytotal.push(data.Order_Qty)
  }
  var qtyvalue = 0 
      for (let i = 0; i < qtytotal.length; i++) {
        qtyvalue += qtytotal[i];
    }
    //////////console.log(qtyvalue)
    settotalqty(qtyvalue)
    
  
  let totalcgstamt = []
  for(const data of res.data) {
  var amounvalu =  data.Order_Qty * data.Rate
  
  var sgstamt =  amounvalu * data.VAT_Percentage
  var sgstcal =  sgstamt/100
   totalcgstamt.push(sgstcal)
  }
  var  totalcgstvalu = 0
  for(let i=0; i< totalcgstamt.length; i++) {
  totalcgstvalu +=totalcgstamt[i]
  }
  settotaltax(totalcgstvalu+totalcgstvalu)
  
  
  let totaltamt = []
  for(const data of res.data) {
  var amounvalu =  data.Order_Qty * data.Rate
  
  
  totaltamt.push(amounvalu)
  }
  var  totaltvalue = 0
  for(let i=0; i< totaltamt.length; i++) {
  totaltvalue +=totaltamt[i]
  }
  settotalamountvaluedata(totaltvalue)
  
  let  totalnetamount = []
    for(const data of res.data) {
      totalnetamount.push(data.Amount )
    }
    var totalnetcount = 0
    for(let i =0; i< totalnetamount.length; i++) {
      totalnetcount += totalnetamount[i]
    }
    settotalamt(totalnetcount)
  
  
    let totaltdisamt = []
    for(const data of res.data) {
      totaltdisamt.push(data.DisAmt)
    }
    ////console.log(totaltdisamt)
    var  totalamutdis = 0
    for(let i=0; i< totaltdisamt.length; i++) {
      totalamutdis +=totaltdisamt[i]
    }
    ////console.log(totalamutdis)
    setTotal_discount_amt(totalamutdis)
    
    let totalIgstamt = []
  for(const data of res.data) {
  totalIgstamt.push(data.Rate * data.Order_Qty * data.IGSTPer/100)
  ////console.log('igst', data.IGSTPer)
  }
  var  totalIgstvalu = 0
  for(let i=0; i< totalIgstamt.length; i++) {
  totalIgstvalu +=totalIgstamt[i]
  }
  ////console.log(totalIgstvalu)
  //settotaltax(totalcgstvalu +totalcgstvalu)
  setTOtaligstamt(totalIgstvalu)
  
    
  
  
  })
  
   }
   const list = [
    { title: 'Print' },
    { title: 'Share' },
    { title: 'EDIT'},
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];
  
  
  
  // const handlePress = async () => {
  //   setloading(true)
  //   setTimeout(() => {
  //     setloading(false)
  
  //   }, 5000);
  //   const getpdf =  await axios.instance.get(`/Createpdf/${deletingid}`).then(async(res) => {
  
  //   const supportedURL = "http://3.109.148.179/Toms_customer_connect/api/Purchaseorder";
  // const supported = await Linking.canOpenURL(supportedURL);
  
  //   if (supported) {
  //     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //     // by some browser in the mobile
  //     await Linking.openURL(supportedURL);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
  //   }
  // })
  //   //const getpdf =  await axiios.instance.get(`/Createpdf/${deletingid}`)
  
  //   // Checking if the link is supported for links with custom URL scheme.
    
  // };
  const purchasepo =  async() => {  
    const tokent  =   localStorage.getItem('authtoken') 
   const branchid =  localStorage.getItem('Branch_Log')
   const custoemrid =   localStorage.getItem('Customer_Log')
   const   Usertype =   localStorage.getItem('AdminUser')
   //////console.log(branchid,custoemrid,Usertype)
    const purchases =  await axios.instance.get(`/POViewdash/${custoemrid}/${branchid}/${Usertype}/${localStorage.getItem('Userid')}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}}).then((res) => {
      setpurchase(res.data)
                 
    })
 
   
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setopen(false);
    setopen1(false);
    setopen2(false);
  setopen3(false);
  
  };
  const branchet = async () => {
    const tokent  =   localStorage.getItem('authtoken')
    const type =  localStorage.getItem('AdminUser') 
    const branch =  localStorage.getItem('Branch_Log')
    const cuslog =   localStorage.getItem('Customer_Log')
     const branccc =  axios.instance.get(`/BranchHelp/${cuslog}/${branch}/${type}`, { headers: {'Authorization': tokent
     , 'Content-Type': 'application/json'}})
     setbranchfornoadmin(branccc.data)
  //////console.log('test',branccc.data)
  
    }
    const customeradmin = async () => {
      const tokent  =   localStorage.getItem('authtoken') 
      const type = localStorage.getItem('AdminUser') 
      const branch =  localStorage.getItem('Branch_Log')
      const cuslog =   localStorage.getItem('Customer_Log')
      
    const cusadmin = await axios.instance.get(`/BranchHelp/${cuslog}/0/${type}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
    setbranchesadmin(cusadmin.data)
    ////console.log('testone',cusadmin.data)
    
    }
  
    const getbranchasehelp =  async(id) => {
      setAll(id)
     
     if (id === 'All' ) {
      const tokent  =   localStorage.getItem('authtoken') 
      const type =  localStorage.getItem('AdminUser') 
      const branch =  localStorage.getItem('Branch_Log')
      const cuslog =   localStorage.getItem('Customer_Log')
      const customers = axios.instance.get(`/POOdrview/${cuslog}/0/${moment(fromdatee).format('YYYYMMDD')}/${moment(toodate).format('YYYYMMDD')}/${type}`, { headers: {'Authorization': tokent
      , 'Content-Type': 'application/json'}}).then((res)  => {
        setpurchase(res.data)
        //////console.log( res.data)
        
    
      })
     } else {
     
      const tokent  =  localStorage.getItem('authtoken') 
    const type =  localStorage.getItem('AdminUser') 
    const branch =  localStorage.getItem('Branch_Log')
    const cuslog =   localStorage.getItem('Customer_Log')
    const customers = axios.instance.get(`/POOdrview/${cuslog}/${id}/${moment(fromdatee).format('YYYYMMDD')}/${moment(toodate).format('YYYYMMDD')}/${type}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}}).then((res)  => {
      setpurchase(res.data)
      //////console.log( res.data)
      
    
    })
     }
      
    }
    const getnoadminpo =  async() => {
      const tokent  =   localStorage.getItem('authtoken') 
      const type = localStorage.getItem('AdminUser') 
      const branch =  localStorage.getItem('Branch_Log')
      const cuslog =   localStorage.getItem('Customer_Log')
      const customers = axios.instance.get(`/POOdrview/${cuslog}/${branch}/${moment(fromdatee).format('YYYYMMDD')}/${moment(toodate).format('YYYYMMDD')}/${type}`, { headers: {'Authorization': tokent
      , 'Content-Type': 'application/json'}}).then((res)  => {
        setpurchase(res.data)
        ////console.log()
      })
    }
    
    const customerget = async() => {
      if(All === '0')  {
        
      }
      const tokent  =   localStorage.getItem('authtoken') 
      const type =  localStorage.getItem('AdminUser') 
      const branch =  localStorage.getItem('Branch_Log')
      const cuslog =  localStorage.getItem('Customer_Log')
      const customers = axios.instance.get(`/POOdrview/${cuslog}/${All}/${moment(fromdatee).format('YYYYMMDD')}/${moment(toodate).format('YYYYMMDD')}/${type}`, { headers: {'Authorization': tokent
    
      , 'Content-Type': 'application/json'}}).then((res)  => {
        setpurchase(res.data)
        ////console.log( res.data)
        
    
      })
     //setbranchesadmin(customers.data)
    
    
     
    }
   
    const deletepo = async () => {
   
   
      const tokent  =  localStorage.getItem('authtoken') 
      const podel =  await axios.instance.delete(`/POdelete/${deletingid}`, { headers: {'Authorization': tokent
      , 'Content-Type': 'application/json'}})
      purchasepo()
    
    }
    const deleteconformation =  () => {
      setIsVisible(false)
      if(deleteconfirmstatus === 'Not Approved') {
    
      
      Alert.alert(
        "Are you sure delete this Purchase", "",
        [
          {text:'Yes', onPress: () => deletepo() },
       {text:'Cancel', onPress: console.log('')}
         ]
      )
    }
   
    }
    const deleteform = (id, status, po) => {
      ////console.log(status)
      setdeleteconfirmstatus(status)
      setsharename(po)
      setIsVisible(true)
      setdeletingid(id)
    }
    const [show2, setShow2] = useState(false);
   
    const [mode2, setMode2] = useState('date');
    const [fromdatetr, setfromdatetr] = useState(new Date())
    const [todatetr, settodatetr] = useState(new Date())
    const [remark, setremark] = useState('')
    
    const [addscreen, setaddscreen] = useState(true)
    const [updatescren, setupdatescren] = useState(false)
    
    
    
    
    
    
    
    const [selectedValue, setSelectedValue] = useState("");
    const [Productcollection, setProductcollection] = useState([])
    const [Productcollection1, setProductcollection1] = useState([])
    const [Productonecollect, setProductonecollect] = useState([])
    const [amount, setamount] = useState('')
    const [discount, setdiscount] = useState('')
    const [tax, settax] = useState('')
    const [qty, setqty] = useState('')
    const [netamount, setnetamount] = useState('')
    const [cgst, setcgst] = useState('')
    const [cgstamt, setcgstamt] = useState('')
    const [sgstamt, setsgstamt] = useState('')
    const [igst, setigst] = useState('')
    
    const [productoption, setproductoption] = useState([])
    
    const [totaltax, settotaltax] = useState('')
    const [tottaldiscount, settottaldiscount] = useState('')
    const [totalqty, settotalqty] = useState('')
    const [totalamt, settotalamt] = useState('')
    const [igstamt, setigstamt] = useState('')
    const [TOtaligstamt, setTOtaligstamt] = useState('')
    const [productname, setproductname] = useState('')
    const [Total_discount_amt, setTotal_discount_amt] = useState('')
    const [taxid, settaxid] = useState('')
    const [Gst, setGst] = useState('')
    const [Igst, setIgst] = useState('')
    const [updatedqty, setupdatedqty] = useState('')
    const [updateproductid, setupdateproductid] = useState('')
    const [updatedamt, setupdatedamt] = useState('')
    const [igstupdate, setigstupdate] = useState('')
    const [taxidupdate, settaxidupdate] = useState('')
    const [proudctnameupdate, setproudctnameupdate] = useState('')
    const [updatenetamt, setupdatenetamt] = useState('')
    const [updatesgst, setupdatesgst] = useState('')
    const [updatecgst, setupdatecgst] = useState('')
    const [updattax, setupdattax] = useState('')
    
    const [Total_cgst, setTotal_cgst] = useState('')
    const [Total_sgst, setTotal_sgst] = useState('')
    const [Total_Amount, setTotal_Amount] = useState('')
    const [Totalamountheader, setTotalamountheader] = useState('')
    const [sgst, setsgst] = useState('')
    const [Discount, setDiscount] = useState('')
    const [visible, setvisible] = useState(false)
    const [Visiblespinner, setVisiblespinner] = useState(true)
    const [vtaper, setvtaper] = useState(true)
    const [provalue, setprovalue] = useState([])
    const [loading, setloading] = useState(false)
    const [producterror, setproducterror] = useState('')
    const [qtyerror, setqtyerror] = useState('')
    const [selectedtext, setselectedtext] = useState('Select Product')
    const [cgstid, setcgstid] = useState('')
    const [umoid, setumoid] = useState('')
    const [igstid, setigstid] = useState('')
    const [sgstid, setsgstid] = useState('')
    const [disper, setdisper] = useState('')
    const [disamt, setdisamt] = useState('')
    const [DutyPer, setDutyPer] = useState('')
    const [Duty_Id, setDuty_Id] = useState(' ')
    const [uomupdateid, setuomupdateid] = useState('')
    const [igstupdateid, setigstupdateid] = useState('')
    const [sgstupdatid, setsgstupdatid] = useState('')
    const [disperupdate, setdisperupdate] = useState('')
    const [disamtupdate, setdisamtupdate] = useState('')
    const [dutyperupdateid, setdutyperupdateid] = useState('')
    const [dutyidupdate, setdutyidupdate] = useState('')
    const [Statecodeee, setStatecodeee] = useState('')
    const [Igstperupdate, setIgstperupdate] = useState('')
    const [Customerlog, setCustomerlog] = useState('')
    const [Authtoken, setAuthtoken] = useState('')
    const [uom, setuom] = useState('')
    const [indexalueofupdate, setindexalueofupdate] = useState('')
  const [productssgetss, setproductssgetss] = useState('')
    useEffect(() => {
      localStorage.setItem('Products', '')
      const getstateid =  async()  => {
      const statecode  =   localStorage.getItem('StateCode')
      const customerid =   localStorage.getItem('Customer_Log')
      const token =   localStorage.getItem('AuthToken')
      setCustomerlog(customerid)
      setAuthtoken(token)
      setStatecodeee(statecode)
      
      }
      // getprodct()
      getstateid()
      }, [])
      
  
      // const getprodct = async() =>  {
      //   const token =   localStorage.getItem('AuthToken')
      //   const userid =   localStorage.getItem('Userid')
      //   const companyid =  localStorage.getItem('Companyid')
      //   const customerid =  localStorage.getItem('Customer_Log')
      //   //console.log('compid', companyid)
      //   //console.log('customerid',customerid )
      //   const prod =  await axios.instance.get(`/Product/${2}/${ localStorage.getItem('Customer_Log')}`, { headers: {'Authorization':token,
      //   'Content-Type': 'application/json'
     
      //   }}).then((res) =>{
      //     const data =  res.data
      //     console.log(res.data)
      //     const optionvalue =  data.map(f =>(
      //       {
      //         'label' : f.Product_Details_Description,
      //         'value' : f.Product_Details_Id ,
      //       } 
      //     ))
      //     setProductcollection(optionvalue)
      //   })        
      // }
        
  
        const getoneproduct =  async(id,name)  => {
          
          setSelectedValue(id)
          setselectedtext(name)
          
          
          const product =  await axios.instance.get(`/Productone/${id}/${Customerlog}`, { headers: {'Authorization':Authtoken,
          'Content-Type': 'application/json'
          }})
          //console.log(product.data)
          setqty('')
          setnetamount('')
          for(const data of product.data) {
          
          setamount(data.Rate)
          setproductname(data.Product_Details_Description)
          setdiscount(data.DisPer)
          
          
          settax(data.CGSTPer +  data.SGSTPer)
          
          setIgst(data.IGSTPer)
          setcgst(data.CGSTPer)
          setsgst(data.SGSTPer)
          setDiscount(data.Discount)
          settaxid(data.TaxId)
          setigstid(data.IGSTId)
          setsgstid(data.SGSTId)
          setcgstid(data.SGSTId)
          setumoid(data.UOM_Id)
          setuom(data.UOM_Description)
          setdisper(data.DisPer)
          setdisamt(data.DisAmt)
          setDuty_Id(data.Duty_Id)
          setDutyPer(data.DutyPer)
          setTotal_cgst(data.Total_cgstamt)
          setTotal_sgst(data.Total_sgstamt)
          setTotal_Amount(data.Total_Amount)
          }
          }
          const amountcal = async(amt) => {
  
  
            setqty(amt)
            
            
            if(discount != 0){
              var amounvalu =  (amt * amount)  
              var discounts  =  amounvalu * discount/100
              
              setdisamt(discounts)
              
              var valueofdis =  amounvalu - discounts
              var gstinfo =((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igst:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? tax : Igst
              var gstcal =  valueofdis * gstinfo 
              var gstvalcal = gstcal/100
              var gstvalue =  valueofdis + gstvalcal 
            const valueformat =  gstvalue
            setnetamount(valueformat)
            
            var sgstamt =  valueofdis * sgst
            var sgstcal =  sgstamt/100
            //////console.log(sgstcal)
            // var sgstvalue =  amounvalu + sgstcal
            // const sgstamts =  sgstvalue
            // ////console.log(sgstcal)
            setsgstamt(sgstcal)
            
            var cgstamt =  valueofdis * cgst
            var cgstcal =  cgstamt/100
            // var cgstvalue =  amounvalu + cgstcal
            // const cgstamts = cgstvalue
            //////console.log(cgstcal)
            setcgstamt(cgstcal)
            ////console.log(cgstcal)
            setigst(0)
              
            
            }else {
            ////console.log(Igst)
            var amounvalu =  (amt * amount)  
            var gstinfo =((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igst:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? tax : Igst
            ////console.log('taxes', Igst)
            ////console.log('igst', tax)
            var gstcal =  amounvalu * gstinfo
            
            var gstvalcal = gstcal/100
            var gstvalue =  amounvalu + gstvalcal 
            const valueformat =  gstvalue
            setnetamount(valueformat)
            
            var sgstamt =  amounvalu * sgst
            var sgstcal =  sgstamt/100
            //////console.log(sgstcal)
            // var sgstvalue =  amounvalu + sgstcal
            // const sgstamts =  sgstvalue
            // ////console.log(sgstcal)
            setsgstamt(sgstcal)
            
            var cgstamt =  amounvalu * cgst
            var cgstcal =  cgstamt/100
            // var cgstvalue =  amounvalu + cgstcal
            // const cgstamts = cgstvalue
            //////console.log(cgstcal)
            setcgstamt(cgstcal)
            ////console.log(cgstcal)
            setigst(0)
            
            
            }
            
            
            }
            const productarray =  async()  => {
              //AsyncStorage.removeItem('Products')
              
              if((selectedValue.length !=0) && (qty.length !=0)) {
              
              
              let product =  []
              
               let prod =   localStorage.getItem('Products')
              // //console.log(prod)
            if(  localStorage.getItem('Products')  ) {
             const getdata = JSON.parse( prod ) 
            for(const data of getdata){
              ////console.log(data)
             product.push(data)
               
             }
              }
              
              
              product.push({
              Order_no: product.length +1 ,
              Product_Id : parseInt(selectedValue),
              Order_Qty: parseFloat(qty),
              Rate: amount,
              TaxId:  Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ? parseInt(taxid) : 0,
              GSTPer:    tax ,
              VAT_Percentage:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? cgst : 0,
                IGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igst:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0: Igst,
                SGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? sgst: 0,
              Discount:discount,
              Amount: netamount,
              Product_Details_Description: productname,
              UOM_Id: umoid,
              DisPer: discount,
              DisAmt:disamt,
              SGSTId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? sgstid : 0,
              IGSTId: Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ? 0: igstid,
              ConQty: 1,
              DutyPer:DutyPer,
              Duty_Id:Duty_Id, 
              Total_Amount: parseInt(qty * amount),
              Total_cgstamt: cgstamt,
              UOM_Description:uom,
              Total_sgstamt : sgstamt,
              
              })
              
              
              
              
              
              const unique = [];
              product.map(x => unique.filter(a => a.Product_Id == x.Product_Id).length > 0 ? null : unique.push(x));
              //const indexofnum =unique.map((items, index) => ({index, ...items}))
              ////console.log(unique.length , product.length)
              
              
              
              
              
              
              
              localStorage.setItem('Products',  JSON.stringify(unique))
              
              let Getprod =   localStorage.getItem('Products')
              
              
              
              let prodvalues = JSON.parse(Getprod)
              ////console.log(prodvalues)
              setprovalue(prodvalues)
              let qtytotal = []
              
              for(const data of prodvalues){
              qtytotal.push(data.Order_Qty)
              }
              var qtyvalue = 0 
              for (let i = 0; i < qtytotal.length; i++) {
                qtyvalue += qtytotal[i];
              }
              settotalqty(qtyvalue)
              
              
              let taxtotal = []
              for(const data of prodvalues) {
              taxtotal.push(data.GSTPer)
              }
              var taxvalue = 0
              for(let i =0; i< taxtotal.length; i++) {
              taxvalue += taxtotal[i]
              }
              //AsyncStorage.setItem('Toataltax', taxvalue.toString())
              let  totalnetamount = []
              for(const data of prodvalues) {
                totalnetamount.push(data.Amount )
              }
              var totalnetcount = 0
              for(let i =0; i< totalnetamount.length; i++) {
                totalnetcount += totalnetamount[i]
              }
              settotalamt(totalnetcount)
              //AsyncStorage.setItem('Totalamt', totalnetcount.toString())
              
              
              
              let totalcgstamt = []
              for(const data of prodvalues) {
              totalcgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.SGSTPer/100)
              }
              var  totalcgstvalu = 0
              for(let i=0; i< totalcgstamt.length; i++) {
              totalcgstvalu +=totalcgstamt[i]
              }
              //////console.log(totalcgstvalu)
              settotaltax(totalcgstvalu +totalcgstvalu)
              ///AsyncStorage.setItem('Totalcgst', totalcgstvalu.toString())
              
              
              
              
              let totaltamt = []
              for(const data of prodvalues) {
              totaltamt.push(data.Rate * data.Order_Qty)
              }
              var  totalamt = 0
              for(let i=0; i< totaltamt.length; i++) {
              totalamt +=totaltamt[i]
              }
              setTotalamountheader(totalamt)
              settotalamountvaluedata(totalamt)
              //AsyncStorage.setItem('Total_Amount', totalamt.toString())
              
              
              let totaltdisamt = []
              for(const data of prodvalues) {
              totaltdisamt.push(data.DisAmt)
              }
              ////console.log(totaltdisamt)
              var  totalamutdis = 0
              for(let i=0; i< totaltdisamt.length; i++) {
              totalamutdis +=totaltdisamt[i]
              }
              ////console.log(totalamutdis)
              setTotal_discount_amt(totalamutdis)
              
              
              let totalIgstamt = []
              for(const data of prodvalues) {
              totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt)* data.IGSTPer/100)
              ////console.log('igst', data.IGSTPer)
              }
              var  totalIgstvalu = 0
              for(let i=0; i< totalIgstamt.length; i++) {
              totalIgstvalu +=totalIgstamt[i]
              }
              ////console.log(totalIgstvalu)
              //settotaltax(totalcgstvalu +totalcgstvalu)
              setTOtaligstamt(totalIgstvalu)
              
              
              
              setSelectedValue('')
              setqty('')
              setamount('')
              settax('')
              setsgstamt('')
              setigstamt('')
              setcgstamt('')
              setIgst('')
              setuom('')
            
              setdiscount('')
              setnetamount('')
             
              setselectedtext('Select Product')
              ////console.log(unique.length, product.length)
              if(unique.length === product.length ) {
              
              setloading(true)
                setopen(true)
              //localStorage.removeItem('Product')
              
              }else {
               
              setSelectedValue('')
              setqty('')
              setamount('')
              settax('')
              setsgstamt('')
              setigstamt('')
              setcgstamt('')
              setnetamount('')
              setselectedtext('Select Product')
              
              //const totalamtvalueget =  await AsyncStorage.getItem('Totalamt')
           
              setopen3(true)
              
              }
              
              //settotalamt(totalamtvalueget)
              
              
              
              
              
              
              
              }
              else {
              
              if(selectedValue.length ===0) {
              setproducterror('please select product')
              }
              if(qty.length === 0) {
              setqtyerror('please enter qty')
              }
              
              }
              setTimeout(() => {
              setproducterror('')
              setqtyerror('')
              }, 3000);
              }
                     
              const deleteproduct  =  async(id) => {
                let productsvalue =  localStorage.getItem('Products')
                var items = JSON.parse(productsvalue)
                // ////console.log(items)
                for (var i =0; i< items.length; i++) {
                // var items = JSON.parse(items[i]);
                //////console.log(items[i].Product_Id)
                if (items[i].Product_Id == id) {
                 const deletedata =  items.splice(i, 1);
                 //////console.log(deletedata)
                }
                
                }
                //////console.log(items)
                let  prod = JSON.stringify(items);
                
                localStorage.setItem('Products', prod)
                const getdelteddate =   localStorage.getItem('Products')
                
                let removeproducts = JSON.parse(getdelteddate)
                const indexofnum =removeproducts.map((items, index) => ({index, ...items}))
                let qtytotal = []
                
                for(const data of removeproducts){
                qtytotal.push(data.Order_Qty)
                }
                var qtyvalue = 0 
                for (let i = 0; i < qtytotal.length; i++) {
                  qtyvalue += qtytotal[i];
                }
                settotalqty(qtyvalue)
                
                
                let taxtotal = []
                for(const data of removeproducts) {
                taxtotal.push(data.GSTPer)
                }
                var taxvalue = 0
                for(let i =0; i< taxtotal.length; i++) {
                taxvalue += taxtotal[i]
                }
                //AsyncStorage.setItem('Toataltax', taxvalue.toString())
                let  totalnetamount = []
                for(const data of removeproducts) {
                  totalnetamount.push(data.Amount )
                }
                var totalnetcount = 0
                for(let i =0; i< totalnetamount.length; i++) {
                  totalnetcount += totalnetamount[i]
                }
                settotalamt(totalnetcount)
                //AsyncStorage.setItem('Totalamt', totalnetcount.toString())
                
                
                
                let totalcgstamt = []
                for(const data of removeproducts) {
                totalcgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.SGSTPer/100)
                }
                var  totalcgstvalu = 0
                for(let i=0; i< totalcgstamt.length; i++) {
                totalcgstvalu +=totalcgstamt[i]
                }
                
                
                
                let totaltamt = []
                for(const data of removeproducts) {
                totaltamt.push(data.Rate * data.Order_Qty)
                }
                var  totalamt = 0
                for(let i=0; i< totaltamt.length; i++) {
                totalamt +=totaltamt[i]
                }
                
                
                
                
                let totaltdisamt = []
                for(const data of removeproducts) {
                totaltdisamt.push(data.DisAmt)
                }
                ////console.log(totaltdisamt)
                var  totalamutdis = 0
                for(let i=0; i< totaltdisamt.length; i++) {
                totalamutdis +=totaltdisamt[i]
                }
                
                
                let totalIgstamt = []
                for(const data of removeproducts) {
                totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.IGSTPer/100)
                ////console.log('igst', data.IGSTPer)
                }
                var  totalIgstvalu = 0
                for(let i=0; i< totalIgstamt.length; i++) {
                totalIgstvalu +=totalIgstamt[i]
                }
                ////console.log(totalIgstvalu)
                //settotaltax(totalcgstvalu +totalcgstvalu)
                setTOtaligstamt(totalIgstvalu)
                
                ////console.log(totalamutdis)
                setTotal_discount_amt(totalamutdis)
                setTotalamountheader(totalamt)
                settotalamountvaluedata(totalamt)
                //////console.log(totalcgstvalu)
                settotaltax(totalcgstvalu +totalcgstvalu)
                ////console.log(indexofnum)
                setprovalue(removeproducts)
              
                }
                const deleteweb =  async(id)  => {
                  if(window.confirm('Are You sure delete this product?')) {
                    let productsvalue = localStorage.getItem('Products')
                    var items = JSON.parse(productsvalue)
                    // ////console.log(items)
                    for (var i =0; i< items.length; i++) {
                    // var items = JSON.parse(items[i]);
                    //////console.log(items[i].Product_Id)
                    if (items[i].Product_Id == id) {
                     const deletedata =  items.splice(i, 1);
                     //////console.log(deletedata)
                    }
                    
                    }
                    //////console.log(items)
                    let  prod = JSON.stringify(items);
                    
                    localStorage.setItem('Products', prod)
                    const getdelteddate =   localStorage.getItem('Products')
                    
                    let removeproducts = JSON.parse(getdelteddate)
                    const indexofnum =removeproducts.map((items, index) => ({index, ...items}))
                    let qtytotal = []
                    
                    for(const data of removeproducts){
                    qtytotal.push(data.Order_Qty)
                    }
                    var qtyvalue = 0 
                    for (let i = 0; i < qtytotal.length; i++) {
                      qtyvalue += qtytotal[i];
                    }
                    settotalqty(qtyvalue)
                    
                    
                    let taxtotal = []
                    for(const data of removeproducts) {
                    taxtotal.push(data.GSTPer)
                    }
                    var taxvalue = 0
                    for(let i =0; i< taxtotal.length; i++) {
                    taxvalue += taxtotal[i]
                    }
                    //AsyncStorage.setItem('Toataltax', taxvalue.toString())
                    let  totalnetamount = []
                    for(const data of removeproducts) {
                      totalnetamount.push(data.Amount )
                    }
                    var totalnetcount = 0
                    for(let i =0; i< totalnetamount.length; i++) {
                      totalnetcount += totalnetamount[i]
                    }
                    settotalamt(totalnetcount)
                    //AsyncStorage.setItem('Totalamt', totalnetcount.toString())
                    
                    
                    
                    let totalcgstamt = []
                    for(const data of removeproducts) {
                    totalcgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.SGSTPer/100)
                    }
                    var  totalcgstvalu = 0
                    for(let i=0; i< totalcgstamt.length; i++) {
                    totalcgstvalu +=totalcgstamt[i]
                    }
                    
                    
                    
                    let totaltamt = []
                    for(const data of removeproducts) {
                    totaltamt.push(data.Rate * data.Order_Qty)
                    }
                    var  totalamt = 0
                    for(let i=0; i< totaltamt.length; i++) {
                    totalamt +=totaltamt[i]
                    }
                    
                    
                    
                    
                    let totaltdisamt = []
                    for(const data of removeproducts) {
                    totaltdisamt.push(data.DisAmt)
                    }
                    ////console.log(totaltdisamt)
                    var  totalamutdis = 0
                    for(let i=0; i< totaltdisamt.length; i++) {
                    totalamutdis +=totaltdisamt[i]
                    }
                    
                    
                    let totalIgstamt = []
                    for(const data of removeproducts) {
                    totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.IGSTPer/100)
                    ////console.log('igst', data.IGSTPer)
                    }
                    var  totalIgstvalu = 0
                    for(let i=0; i< totalIgstamt.length; i++) {
                    totalIgstvalu +=totalIgstamt[i]
                    }
                    ////console.log(totalIgstvalu)
                    //settotaltax(totalcgstvalu +totalcgstvalu)
                    setTOtaligstamt(totalIgstvalu)
                    
                    ////console.log(totalamutdis)
                    setTotal_discount_amt(totalamutdis)
                    setTotalamountheader(totalamt)
                    settotalamountvaluedata(totalamt)
                    //////console.log(totalcgstvalu)
                    settotaltax(totalcgstvalu +totalcgstvalu)
                    ////console.log(indexofnum)
                    setprovalue(removeproducts)
                   setopen2(true)
                  }
                }
                const deleteconformation1 =  (id) => {
  
                  Alert.alert(
                  "Are you sure delete this Product ?", "",
                  [
                  {text:'Yes', onPress: () => deleteproduct(id) },
                  {text:'Cancel', onPress: console.log('')}
                  ]
                  )
                  }
                                              
                  const Updateget =  async(id, id1)  => {
                    setindexalueofupdate(id1)
                  setProductonecollect([])
                  setvisible(true)
                  setvtaper(false)
                  setTimeout(() => {
                  setVisiblespinner(false)
                  }, 2000);
                  const datavalue  =  provalue.filter(a => a.Product_Id  === id)
                  setProductonecollect(datavalue)
                  for(const data of datavalue) {
                     
                   
                    
                    setupdatedqty(data.Order_Qty)
                  setupdatedamt(data.Rate)
                  setupdattax(data.GSTPer)
                  setupdatesgst(data.SGSTPer)
                  setupdateproductid(data.Product_Id)
                  //setupdatecgst(data.IGSTPer)
                  setupdatenetamt(data.Amount)
                  setproudctnameupdate(data.Product_Details_Description)
                  settaxidupdate(data.TaxId)
                  setIgstperupdate(data.IGSTPer)
                  setigstupdate(data.IGSTId)
                  setsgstupdatid(data.SGSTId)
                  setupdatecgst(data.SGSTId)
                  setuomupdateid(data.UOM_Id)
                  setdisperupdate(data.DisPer)
                  setdisamtupdate(data.DisAmt)
                  setdutyidupdate(data.Duty_Id)
                  setdutyperupdateid(data.DutyPer)
                  setTotal_cgst(data.Total_cgstamt)
                  setTotal_sgst(data.Total_sgstamt)
                  setTotal_Amount(data.Total_Amount)
                  }
                  }
                  const toggleOverlay = async() => {
                    setvisible(false);
                    };
                    const items = [
                      // name key is must. It is to show the text in front
                      {id: 1, name: 'angellist'},
                      {id: 2, name: 'codepen'},
                      {id: 3, name: 'envelope'},
                      {id: 4, name: 'etsy'},
                      {id: 5, name: 'facebook'},
                      {id: 6, name: 'foursquare'},
                      {id: 7, name: 'github-alt'},
                      {id: 8, name: 'github'},
                      {id: 9, name: 'gitlab'},
                      {id: 10, name: 'instagram'},
                      ];
                    
                      const editforproduct =  async(amt)  => {
  
                        setupdatedqty(amt)
                        if(disperupdate != 0) {
                        
                        
                        
                        var amounvalu =  (amt * updatedamt) 
                        
                        var discount =  amounvalu * disperupdate/100
                        var discouamt =  amounvalu -discount
                        setdisamtupdate(discount)
                        var gstof = ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igstperupdate: Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ?  updattax : Igstperupdate
                        var gstcal =  discouamt *gstof
                        var gstvalcal = gstcal/100
                        var gstvalue =  discouamt + gstvalcal
                        const valueformat = gstvalue
                        
                        setupdatenetamt(valueformat)
                        //////console.log(valueformat)
                        var sgstval=  updattax /2
                        ////console.log(sgstval)
                        var sgstamt =  discouamt * sgstval
                        var sgstcal =  sgstamt/100
                        var sgstvalue =  discouamt + sgstcal
                        const sgstamts =  numeral(sgstvalue).format('0,0.00')
                        //setsgstamt(sgstamts)
                        setupdatesgst(sgstcal)
                        ////console.log(sgstcal)
                        var cgstval=  updattax /2
                        var cgstamt =  discouamt * cgstval
                        var cgstcal =  cgstamt/100
                        var cgstvalue =  discouamt + cgstcal
                        const cgstamts =  numeral(cgstvalue).format('0,0.00')
                        //setcgstamt(cgstamts)
                        setupdatecgst(cgstcal)
                        ////console.log(cgstvalue)
                        }else {
                        var amounvalu =  (amt * updatedamt) 
                        var gstof = ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))? Igstperupdate: Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ?   updattax : Igstperupdate
                        var gstcal =  amounvalu *gstof
                        var gstvalcal = gstcal/100
                        var gstvalue =  amounvalu + gstvalcal
                        const valueformat = gstvalue
                        
                        setupdatenetamt(valueformat)
                        //////console.log(valueformat)
                        var sgstval=  updattax /2
                        ////console.log(sgstval)
                        var sgstamt =  amounvalu * sgstval
                        var sgstcal =  sgstamt/100
                        var sgstvalue =  amounvalu + sgstcal
                        const sgstamts =  numeral(sgstvalue).format('0,0.00')
                        //setsgstamt(sgstamts)
                        setupdatesgst(sgstcal)
                        ////console.log(sgstcal)
                        var cgstval=  updattax /2
                        var cgstamt =  amounvalu * cgstval
                        var cgstcal =  cgstamt/100
                        var cgstvalue =  amounvalu + cgstcal
                        const cgstamts =  numeral(cgstvalue).format('0,0.00')
                        //setcgstamt(cgstamts)
                        setupdatecgst(cgstcal)
                        ////console.log(cgstvalue)
                        }
                        
                        }
                        const updateproduct =  async()  => {
                          let product = []
                          let productsvalue =  localStorage.getItem('Products')
                          
                          //////console.log(items)
                          // ////console.log(items != null  )
                          if( productsvalue != null  ) {
                          const getdata = JSON.parse(productsvalue) 
                          for(const data of getdata){
                          // ////console.log(data)
                          product.push(data)
                          
                          }
                          
                          }
                          ////console.log(parseInt( updatedqty))
                          const totlaamoutns =  localStorage.getItem('Total_Amount')
                          const updateddatevalue = {
                          Order_no: 1,
                          Product_Id : parseInt(updateproductid),
                          Order_Qty: parseInt(updatedqty),
                          Rate: parseInt(updatedamt),
                          TaxId:  Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ? parseInt(taxidupdate): 0,
                          GSTPer: ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? updattax :0,
                          VAT_Percentage:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ?  updattax/2:0,
                          IGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igstperupdate: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0 : Igstperupdate ,
                          SGSTPer: ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? updattax/2 : 0,
                          Discount:0,
                          Amount: updatenetamt,
                          Product_Details_Description: proudctnameupdate,
                          UOM_Id: uomupdateid,
                          DisPer: disperupdate,
                          DisAmt:disamtupdate,
                          SGSTId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE")? sgstupdatid : 0,
                          IGSTId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? igstupdateid : 0,
                          ConQty: 1,
                          DutyPer:dutyperupdateid,
                          Duty_Id:dutyidupdate,
                          Total_Amount: totlaamoutns,
                          Total_cgst:  (totlaamoutns*updattax/100)/2,
                          Total_sgst: (totlaamoutns*updattax/100)/2
                          
                          }
                             product[indexalueofupdate]  =  updateddatevalue
                          ////console.log(product)
                          localStorage.setItem('Products',  JSON.stringify(product))
                          let Getprod =   localStorage.getItem('Products')
                          // setprovalue(Getprod)
                          const getdelteddate =   localStorage.getItem('Products')
                          let removeproducts = JSON.parse(getdelteddate)
                          ////console.log(removeproducts)
                          let qtytotal = []
                          
                          for(const data of removeproducts){
                          qtytotal.push(data.Order_Qty)
                          }
                          var qtyvalue = 0 
                          for (let i = 0; i < qtytotal.length; i++) {
                            qtyvalue += qtytotal[i];
                          }
                          settotalqty(qtyvalue)
                          
                          
                          let taxtotal = []
                          for(const data of removeproducts) {
                          taxtotal.push(data.GSTPer)
                          }
                          var taxvalue = 0
                          for(let i =0; i< taxtotal.length; i++) {
                          taxvalue += taxtotal[i]
                          }
                          //AsyncStorage.setItem('Toataltax', taxvalue.toString())
                          let  totalnetamount = []
                          for(const data of removeproducts) {
                            totalnetamount.push(data.Amount )
                          }
                          var totalnetcount = 0
                          for(let i =0; i< totalnetamount.length; i++) {
                            totalnetcount += totalnetamount[i]
                          }
                          settotalamt(totalnetcount)
                          //AsyncStorage.setItem('Totalamt', totalnetcount.toString())
                          
                          
                          
                          let totalcgstamt = []
                          for(const data of removeproducts) {
                          totalcgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.SGSTPer/100)
                          }
                          var  totalcgstvalu = 0
                          for(let i=0; i< totalcgstamt.length; i++) {
                          totalcgstvalu +=totalcgstamt[i]
                          }
                          //////console.log(totalcgstvalu)
                          settotaltax(totalcgstvalu +totalcgstvalu)
                          
                          let totaltamt = []
                          for(const data of removeproducts) {
                          totaltamt.push(data.Rate * data.Order_Qty)
                          }
                          var  totalamt = 0
                          for(let i=0; i< totaltamt.length; i++) {
                          totalamt +=totaltamt[i]
                          }
                          setTotalamountheader(totalamt)
                          settotalamountvaluedata(totalamt)
                          
                          let totaltdisamt = []
                          for(const data of removeproducts) {
                          totaltdisamt.push(data.DisAmt)
                          }
                          ////console.log(totaltdisamt)
                          var  totalamutdis = 0
                          for(let i=0; i< totaltdisamt.length; i++) {
                          totalamutdis +=totaltdisamt[i]
                          }
                          ////console.log(totalamutdis)
                          setTotal_discount_amt(totalamutdis)
                          let totalIgstamt = []
                          for(const data of removeproducts) {
                          totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.IGSTPer/100)
                          ////console.log('igst', data.IGSTPer)
                          }
                          var  totalIgstvalu = 0
                          for(let i=0; i< totalIgstamt.length; i++) {
                          totalIgstvalu +=totalIgstamt[i]
                          }
                          ////console.log(totalIgstvalu)
                          //settotaltax(totalcgstvalu +totalcgstvalu)
                          setTOtaligstamt(totalIgstvalu)
                          
                       
                          
                          let prodvalues = JSON.parse(Getprod)
                          ////console.log(prodvalues)
                          setprovalue(prodvalues)
                          
                          
                          setvisible(false)
                          setupdatedqty('')
                          setupdatedamt('')
                          setupdattax('')
                          setupdatesgst('')
                          setupdateproductid('')
                          //setupdatecgst(data.IGSTPer)
                          setupdatenetamt('')
                          setproudctnameupdate('')
                          settaxidupdate('')
                          setIgstperupdate('')
                          setigstupdate('')
                          setsgstupdatid('')
                          setupdatecgst('')
                          setuomupdateid('')
                          setdisperupdate('')
                          setdisamtupdate('')
                          setdutyidupdate('')
                          setdutyperupdateid('')
                          setTotal_cgst('')
                          setTotal_sgst('')
                          setTotal_Amount('')
                          setvtaper(true)
                          setvisible(false)
                          }
  
  
                          const save = async()  => {
                            if(provalue.length !=0) {
                            
                            
                            let prodvalue = []
                            const token =   localStorage.getItem('AuthToken')
                            
                            const productsvalue =    localStorage.getItem('Products')
                            let product =  JSON.parse(productsvalue)
                        //console.log('prodts','101', product)
                            prodvalue.push(product)
                            
                            
                            const customerid =   localStorage.getItem('Customer_Log')
                            const Branchlog =   localStorage.getItem('Branch_Log')
                            const TOTALQTY =   localStorage.getItem('Totalqty')
                            const TOTALTAX =   localStorage.getItem('Toataltax')
                            const TOTALAMT =   localStorage.getItem('Totalamt')
                            const netamountvalue = numeral(TOTALAMT).format('0')
                            //console.log(parseInt(netamountvalue))
                            
                            const totalnetamt =   localStorage.getItem('TotalnetMT')
                            const statecode =   localStorage.getItem('StateCode')
                            const stateid =   localStorage.getItem('StateId')
                            const createdby =  localStorage.getItem('Userid')
                            const companyid =     localStorage.getItem('Companyid')
                            const statename =  localStorage.getItem('Statename')
                            //console.log(stateid)
                            const cgstamtvalues =   localStorage.getItem('Totalcgst')
                            const sgstamtvalues =   localStorage.getItem('Totalsgst')
                            const igstamtvalues =   localStorage.getItem('Totaligst')
                            
                            const Total_Amount = localStorage.getItem('Total_Amount')
                            const createpohed =  axios.instance.post('/POHdr',  {
                            
                            Order_Date: new Date(),
                            Delivery_Date:todatetr,
                            Company_id:2,
                            Customer_Id: customerid,
                            Remarks: remark.length !=0  ? remark : '0',
                            Total_Amount:Totalamountheader,
                            Vat_Amount:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,
                            Discount_Amount:Total_discount_amt,
                            Net_Amount: totalamt,
                            Created_by:createdby,
                            Created_on:fromdatetr,
                            Cus_Branchid:Branchlog,
                            CurrencyId:1,
                            Branch_Id:0,
                            CBranch_Id:0,
                            StateId: 33,
                            PlaceofSupply:'tamilnadu',
                            StateCode:33,
                            SGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,
                            IGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0 : TOtaligstamt 
                            },{ headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                            }}).then((res)  => {
                            //console.log('obeject',res.data)
                            for(const data of res.data) {
                             let orderid =  data.Order_Id
                             localStorage.setItem('Order_Id', orderid)
                             ////console.log(orderid)
                            }
                            }).then(async()  => {
                            // const productsvalue =  await  AsyncStorage.getItem('Products')
                            // let product =  JSON.parse(productsvalue)
                            //const productsvalue =    localStorage.getItem('Products')
                           // //console.log('test',productsvalue)
                            const Orderid =   localStorage.getItem('Order_Id')
                            ////let product =  JSON.parse(productsvalue)
                            //console.log('prod',product)
                            for(const data of product){
                            const productcoll = Object.assign(data, {Order_Id: parseInt(Orderid),OpType:'New'})
                            //////console.log(productcoll)
                            const createpohed = await axios.instance.post('/PODtl', productcoll
                            
                             ,{ headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                             }})
                            //console.log(createpohed.data)
                            
                            }
                            setTotalamountheader('')
                            settotaltax('')
                            settotalqty('')
                            settotalamt('')
                            
                            }).then(() => {
                            
                            })
                            
                            purchasepo()
                            
                            localStorage.removeItem('Products')
                            setprovalue([])
                            settodatetr(new Date())
                            setremark('')
                            
                            setloading(true)
                            
                            setTimeout(() => {
                            setPoshow(true)
                            setloading(false)
                           
                            
                            }, 2000);
                            history.push('/viewpo')
                            }else {
                              setopen4(true)
                             setTimeout(() => {
                               setopen4(false)
                             }, 2000);
                            }
                            }
                            const save1 = async()  => {
                              if(provalue.length  !=0) {
                            
                             
                              let prodvalue = []
                              const token =   localStorage.getItem('AuthToken')
                            
                              const productsvalue =    localStorage.getItem('Products')
                              let product =  JSON.parse(productsvalue)
                             // ////////console.log(product)
                              prodvalue.push(product)
                            
                              
                            const customerid =   localStorage.getItem('Customer_Log')
                            const Branchlog =   localStorage.getItem('Branch_Log')
                            const TOTALQTY =   localStorage.getItem('Totalqty')
                            const TOTALTAX =  localStorage.getItem('Toataltax')
                            const TOTALAMT =   localStorage.getItem('Totalamt')
                            const totalnetamt =   localStorage.getItem('TotalnetMT')
                            const statecode =  localStorage.getItem('StateCode')
                            const stateid =   localStorage.getItem('StateId')
                            const createdby =  localStorage.getItem('Userid')
                            const companyid =     localStorage.getItem('Companyid')
                            const statename =  localStorage.getItem('Statename')
                            //////////console.log(stateid)
                            const cgstamtvalues =   localStorage.getItem('Totalcgst')
                            const sgstamtvalues =   localStorage.getItem('Totalsgst')
                            const igstamtvalues =   localStorage.getItem('Totaligst')
                            // const productcollectionvalue =  await AsyncStorage.setItem('Products')
                            // let products =  JSON.parse(productcollectionvalue)
                            const Totalamt =  localStorage.getItem('Total_Amount')
                            const createpohed = await axios.instance.put(`/POHdr/${props.match.params.id}`,  {
                              Order_Id: deletingid,
                            Order_Date: deliverdate,
                            Delivery_Date:todate,
                            Company_id:customerid,
                            Customer_Id: customerid,
                            Remarks: remarks.length !=0  ? remarks : '0',
                            Total_Amount:totalamountvaluedata,
                            Vat_Amount:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ?  totaltax/2 : 0,
                            Discount_Amount:Total_discount_amt,
                            Net_Amount: totalamt,
                            Created_by:createdby,
                            Created_on:fromdatee,
                            Cus_Branchid:Branchlog,
                            CurrencyId:0,
                            Branch_Id:0,
                            CBranch_Id:0,
                            StateId: 33,
                            PlaceofSupply:'tamilnadu',
                            StateCode:33,
                            SGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ?  totaltax/2 : 0,
                            IGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?TOtaligstamt:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ?  0 :  TOtaligstamt,
                            Modified_by : 1,                          
                            Modified_on : 1,
                            OpType:'Edit'
                            },{ headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                            }}).then(async(res)  => {
                              setprovalue([])
                              // const productsvalue =  await  AsyncStorage.getItem('Products')
                              // let product =  JSON.parse(productsvalue)
                             //////console.log(res.data)
                              const deleteproduct =  await axios.instance.delete(`/PoDeltedtl/${props.match.params.id}`)
                              const productsvalue =    localStorage.getItem('Products')
                              const Orderid =   localStorage.getItem('Order_Id')
                              let product =  JSON.parse(productsvalue)
                               
                               for(const data of product){
                                const productcoll = Object.assign(data, {Order_Id: parseInt(props.match.params.id),OpType:'New'})
                                  ////////console.log('test')
                                 
                                 ////////console.log(productcoll)
                               
                             
                               const createpohed = await axios.instance.post(`/PODtl`, productcoll
                              
                                 ,{ headers: {'Authorization':token,
                                'Content-Type': 'application/json'
                                 }}).then((res) => {
                                 
                                  localStorage.removeItem('Products')
                             
                                 })
                                
                              // ////////console.log(createpohed.data)
                               
                                }
                            
                            }).then(() => {
                             
                            })
                            
                            
                            
                            
                            
                            
                          
                             setloading(true)
                             purchasepo()
                            
                            settodate(new Date())
                              setTimeout(() => {
                              setloading(false)
                              setPoshow(true)
                              history.push('/viewpo')
                             
                              }, 3000);
                            } else {
                            
                            }
                            }
                                           
                            const backtopoview = ()  => {
                              setPoshow(true)
                              setremark('')
                              setprovalue([])
                              settotalamt('')
                              setselectedtext('Select Product')
                              setTOtaligstamt('')
                              settotalqty('')
                            settotaltax('')
                            setTotal_discount_amt('')
                            localStorage.removeItem('Products')
                            }
                            const addscreenview  =  () => {
                              setPoshow(false)
                              setPoshowadd(true)
                              setremark('')
                              setprovalue([])
                              settotalamt('')
                              setselectedtext('Select Product')
                              setTOtaligstamt('')
                              settotalqty('')
                            settotaltax('')
                            setSelectedValue('')
                            setqty('')
                            setamount('')
                            settax('')
                            setsgstamt('')
                            setigstamt('')
                            setcgstamt('')
                            setnetamount('')
                            setTotal_discount_amt('')
                            
                            localStorage.removeItem('Products')
                            }
  
                            const updatescreenview =  (id)  => {
                              setloading(true)
                              
                              setPoshow(false)
                              setPoshowadd(false)
                              setremark('')
                              setSelectedValue('')
                            setqty('')
                            setamount('')
                            settax('')
                            setsgstamt('')
                            setigstamt('')
                            setcgstamt('')
                            setnetamount('')
                              setprovalue([])
                              Getorderhdr(id)
                              getprodctdel(id)
                            setIsVisible(false)
                            settotalamt('')
                            setselectedtext('Select Product')
                            setTOtaligstamt('')
                            settotalqty('')
                            settotaltax('')
                            
                            localStorage.removeItem('Products')
                            setTotal_discount_amt('')
                            setTimeout(() => {
                              setloading(false)
                            }, 3000);
                            }
  
  //approve methods


  const approvals  = async (id,status) => {
    //console.log(status)
    //setApprovelpage(false)
    // setStatuscalll(status)
    // setApprovedid(id)
   /// navigation.navigate('Approvelview', {orderid: id, Status: status})
//   getprodctdel(id)
//   Getorderhdr(id)
 

  }
  const pdfcreate =  async(id)  => {
    const tokent  =   localStorage.getItem('authtoken')
    const branccc = await axios.instance.get(`/Createpdf/${id}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
    //console.log(branccc.data)
  }
  const Mailcontent =  async(id)  => {
   // console.log('mail')
   const tokent  =   localStorage.getItem('authtoken')
 
   const branch =  localStorage.getItem('Branch_Log')
   const cuslog =  localStorage.getItem('Customer_Log')
    const branccc = await axios.instance.get(`/mailHelp/${cuslog}/${id}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}}).then((res) => {
     console.log('mail',res.data)
      // for(const data of res.data) {
      //  setFrommail(data.frommail)
      //  setTomail(data.Tomail)
      //  setsmptport(data.SMTPPort)
      //  setSMTPServer(data.SMTPServer)
      //  setmailpassword(data.mailpassword)
      // setccmail(data.ccmail)
      // //console.log(data.ccmail)
      // setcustomername(data.customername)
      // //console.log('mailname',data.customername)
      // setContact_Person(data.Contact_Person)
      // setbranchname(data.Branch_Name)
      // setcus_name(data.Customer_Name)
      // setusersmptport(data.usersmptport)
      // setusersmptserver(data.usersmptsever)
      // setusermailpassword(data.useremailpassword)
      // }
      
    })
    
 }
 //const [cutomer, setcutomer] = useState([])
  //const [deletingid, setdeletingid] = useState('')
  //const [show1, setShow1] = useState(false);
  //const [show, setShow] = useState(false);
  //const [mode, setMode] = useState('date');
  //const [mode1, setMode1] = useState('date');
  //const [fromdate, setfromdate] = useState()
  //const [todate, settodate] = useState(new Date())
  //const [customerss, setcustomerss] = useState('')
  const [Approvedid, setApprovedid] = useState('')
  //const [usertype, setusertype] = useState('')
  //const [custt, setcustt] = useState('')
  //const [bracnch, setbracnch] = useState('')
 // const [branches, setbranches] = useState([])
  //const [branchesadmin, setbranchesadmin] = useState([])
  const [branchnon, setbranchnon] = useState([])
  //const [purchase, setpurchase] = useState([])
  //const [isVisible, setIsVisible] = useState(false);
  const [approvereq, setapprovereq] = useState('')


  
  //const [loading, setloading] = useState(false)

  const [sss, setsss] = useState(false)
  const [one, setone] = useState(false)
  const [two, settwo] = useState(false)
  const [threee, setthreee] = useState(false)
  const [four, setfour] = useState(false)
  //const [All, setAll] = useState('0')
  const [five, setfive] = useState(false)
  const [isSelected, setSelection] = useState(false);
//  const toggleSwitch = () => setIsEnabled(previousState => !previousState)
const [getpendigs, setgetpendigs] = useState([])
const [status, setstatus] = useState('Y')
const [deliverydate, setdeliverydate] = useState(new Date())
const [pos, setpos] = useState('Accepted')
const [Approvelpage, setApprovelpage] = useState(true)
const [Approvelviewpage, setApprovelviewpage] = useState(false)

//const [provalue, setprovalue] = useState([])
//const [totaltax, settotaltax] = useState('')
const [totaltaxamt, settotaltaxamt] = useState('')
//const [totalamt, settotalamt] = useState('')
//const [totalqty, settotalqty] = useState('')
const [orderdate, setorderdate] = useState('')
const [deliverydate1, setdeliverydate1] = useState('')
//const [remarks, setremarks] = useState('')
//const [pono, setpono] = useState('')
const [orderhederdata, setorderhederdata] = useState([])
const [Frommail, setFrommail] = useState('')
const [Tomail, setTomail] = useState('')
const [smptport, setsmptport] = useState('')
const [SMTPServer, setSMTPServer] = useState('')
const [mailpassword, setmailpassword] = useState('')
const [Statuscalll, setStatuscalll] = useState('')
const [ccmail, setccmail] = useState('')
const [mailloginnames, setmailloginnames] = useState('')

const [customername, setcustomername] = useState('')
const [branchname, setbranchname] = useState('')
const [Contact_Person, setContact_Person] = useState('')
const [cus_name, setcus_name] = useState('')
const [usersmptserver, setusersmptserver] = useState('')
const [usersmptport, setusersmptport] = useState('')
const [usermailpassword, setusermailpassword] = useState('')
const [spinnersforapprove, setspinnersforapprove] = useState(false)

const [stege1tomail, setstege1tomail] = useState('')
console.log(stege1tomail,"stege1tomail");
const [poinsert, setpoinsert] = useState([])

const [purchaseordermail, setpurchaseordermail] = useState('')
const [cclev1, setcclev1] = useState('')
const [cclevel1mail, setcclevel1mail] = useState('')
const [finallevmail, setfinallevmail] = useState('')

const postatusupdate=async(id)=>{
  const token =   localStorage.getItem('AuthToken')

  await axios.instance.post(`/PODtl1`,{
    Orderid:id,
    CustomerId:localStorage.getItem("Customer_Log"),
    PoStatus:localStorage.getItem('Approval2') === 'Y'  ?   "Stage 1 completed" :  localStorage.getItem('Approval3') === 'Y' ?  "Stage 2 completed" : localStorage.getItem('AdminUser') === 'Y' ?  'Approved' : null,
    PoStatusDate:new Date(),
    CreatedBy:localStorage.getItem("Userid"),
    CreatedDate:new Date(),
    // ModifyBy:"",
    // ModifyDate:
  },{ headers: {'Authorization':token
    , 'Content-Type': 'application/json'}})
  .then((res)=>{
    setpoinsert(res.data)
    console.log(poinsert,"insert")
  })
}




const UserMailDetail = async() => {
  const tokent  =   localStorage.getItem('authtoken') 
  const Username =  localStorage.getItem('Username')
  const userId =  localStorage.getItem('Userid')
 const mailDetail  =await axios.instance.get(`/UsermailDetails/${localStorage.getItem('customer_HO')}/${localStorage.getItem('customer_HO') === 'Y' ? localStorage.getItem('MailCustomerid'):localStorage.getItem('Customer_Log')}/${localStorage.getItem('Userid')}/${localStorage.getItem('Approval2') ==='Y' ? 2 : localStorage.getItem('AdminUser') ==='Y' ? 3 : 0}/${localStorage.getItem("Branch_Log")}/${(localStorage.getItem('AdminUser')==='Y')?props.match.params.id:0}/${localStorage.getItem("Hoflagmail")==='Y'?0:1}`, { headers: {'Authorization': tokent
 , 'Content-Type': 'application/json'}}).then((res) => {

  console.log(res.data,'dd')
 for (const data of res.data) {
if(localStorage.getItem('AdminUser') === 'Y') {
  const Mails =  data.CCmail + ',' + data.Tomail  + ',' + data.cccmail
  setccmail(Mails)
}else {
  setccmail(data.CCmail + ',' + data.cccmail)
}

for (const data of res.data)
{
  const cccmail=data.cccmail
  setcccmail(cccmail)
}
  
   setFrommail(data.PurchaseMailId)
       setTomail(data.SupplierMail)
       setstege1tomail(data.Tomail)

       setsmptport(data.SMTPPort)
       setSMTPServer(data.SMTPServer)
       setmailpassword(data.PurchaseMail_Pwd)
     
      setcustomername(data.User_Name)
      setSuppliermail(data.SupplierMail)
      setContact_Person(data.Contact_Person)
      setpurchaseordermail(data.PurchaseMailId)
      setcclev1(data.ccmail11)
      setcclevel1mail(data.ccmaillvl1)
      setfinallevmail(data.ccmailfinal)
 }

 })
}
















const Approve = async() => {
    console.log('called')
    ////console.log('server',SMTPServer)
    //console.log('port',smptport)
    //console.log('frommail',Frommail)
    //console.log('password',mailpassword)
    //console.log('tomaiil',Tomail)
    //console.log('name',mailloginnames)
    //console.log('cc', ccmail)
  //  setspinerforapprovespinner(true)
   const tokent  =   localStorage.getItem('authtoken') 
   const Username =  localStorage.getItem('Username')
   const userId =  localStorage.getItem('Userid')
     const approvs = await axios.instance.put(`/Approve/${props.match.params.id}`,
    { 
     ApproveDate: new Date(), 
     Confirmed_Status:'Y',
     Approve: 'Y',
     POStatus: 'Approved',
     ApproveBy: userId
   },
     { headers: {'Authorization': tokent
     , 'Content-Type': 'application/json'}}).then(async(res) => {
      // console.log(res.data)
      laoding()
 
       const mailsend =  await axios.instance.post('mail', {
         
           host: SMTPServer,
           port:smptport,
           username:Frommail,
           password: mailpassword,
           tomail:ccmail,
           cc:ccmail,
           sub:"PO is approved",
           orderno:`${pono}`,
           loginname:Username,
           customernme: customername
       
       },  { headers: {'Authorization': tokent
       , 'Content-Type': 'application/json'}})
      // console.log('test',mailsend.status)

       const mailsend1 =  await axios.instance.post('mailforsupplier', {
         
        host: SMTPServer,
        port:smptport,
        username:Frommail,
        password: mailpassword,
        tomail:Tomail,
        
        sub:"Po to supply material",
        orderno:`${pono}`,
        loginname:Username,
        customernme: customername,
        ContactPerson: Contact_Person,
        BranchName: branchname,
        Cus_name: cus_name
    
    },  { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
  //  console.log('test',mailsend1.status)
    
      // getdataview()
       setApprovelpage(true)
     //history.push(`/Approval`)
    // setspinerforapprovespinner(false)
   })
       
  }






  const ApproveStageOne = async() => {
    //console.log('called')
    ////console.log('server',SMTPServer)
    //console.log('port',smptport)
    //console.log('frommail',Frommail)
    //console.log('password',mailpassword)
    //console.log('tomaiil',Tomail)
    //console.log('name',mailloginnames)
    //console.log('cc', ccmail)
  //  setspinerforapprovespinner(true)
   const tokent  =   localStorage.getItem('authtoken') 
   const Username =  localStorage.getItem('Username')
   const userId =  localStorage.getItem('Userid')
     const approvs = await axios.instance.put(`/ApprovalStage/${props.match.params.id}/${localStorage.getItem('Customer_Log')}`,
    { 
   

     Approvalone: "Y",
Approvaltwo:  localStorage.getItem('Approval3') === 'Y' ?  "Y" : 'N',
Approve: localStorage.getItem('AdminUser') === 'Y' ? "Y" :"N",
ApprovedBy: parseInt(localStorage.getItem('Userid')),
ApproveDate: new Date(),
Order_Id:parseInt(props.match.params.id),
POStatus:localStorage.getItem('Approval2') === 'Y'  ?   "Stage 1 completed" :  localStorage.getItem('Approval3') === 'Y' ?  "Stage 2 complete" : localStorage.getItem('AdminUser') === 'Y' ?  'Approved' : null,
customer_id:parseInt(localStorage.getItem('Customer_Log')),
   },
     { headers: {'Authorization': tokent
     , 'Content-Type': 'application/json'}}).then(async(res) => {
     console.log(res.data,'mails')
      laoding()
      
      postatusupdate(props.match.params.id)
      
     if(localStorage.getItem('Approval2') === 'Y') {
      console.log(stege1tomail,'tomail')
      if(window.confirm('Do You Want To Send Mail For Approval')) {
    //   const approvs = await axios.instance.post(`/ApiForAPProve1`,
    //   { 
    //     Cus: customername,
    //     Department: localStorage.getItem('Department'),
    //     Designation: localStorage.getItem('Designation'),
    //     Loginname: Username,
    //     Username: Frommail,
    //     ccmail: ccmail,
    //     hostname: SMTPServer,
    //     password: mailpassword,
    //     port: smptport,
    //     sub: "Stage 1 Completed",
    //     tomail: stege1tomail,
    //     PO_No:pono
    //  },
    //    { headers: {'Authorization': tokent
    //    , 'Content-Type': 'application/json'}})
    await axioss.post(`http://103.27.85.36/EmailAPi/api/Mail`, 
   
      
    {
  
      FromMailid:purchaseordermail,
         ToMailid:stege1tomail,
          CcMailid: cccmail,
         CcMailid1:cclevel1mail,
         CcMailid2:"",
         Subject:"New Purchase  Order Request",
         SmtpServer:SMTPServer,
         MailPassowrd:mailpassword,
         Body: ` <p>Dear   ${customername}  , </p>
         <p>Please Find the purchase request and Approve. The Order No: ${pono}</p> 
        <p>Regards,</p>
        <p>${localStorage.getItem("Usercode")}</p>
        <p>${ localStorage.getItem('Designation')}</p>
        <p>${localStorage.getItem('Department')}</p>
        <p>Please <a href='http://103.27.85.36/Po_generator/'>click </a> here to Approve : </p> 
          
       `,

         SmtpPort:smptport,
         Filepathattach:"C:\\inetpub\\wwwroot\\tomspognerator\\Views\\Purchaseorder.pdf"
  
  }
  
  
  
    ,{ headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
}
else{
  
}

 



     }
     
     if(localStorage.getItem('Approval3') === 'Y') {

      const approvs = await axios.instance.post(`/ApiForAPProve1`,
      { 
        Cus: customername,
        Department: localStorage.getItem('Department'),
        Designation: localStorage.getItem('Designation'),
        Loginname: Username,
        Username: Frommail,
        ccmail: ccmail,
        hostname: SMTPServer,
        password: mailpassword,
        port: smptport,
        sub: "Stage 1 Completed",
        tomail: Tomail,
        PO_No:pono
     },
       { headers: {'Authorization': tokent
       , 'Content-Type': 'application/json'}})

     }




     if(localStorage.getItem('AdminUser') === 'Y') {
      if(window.confirm('Do You Want To Send Mail For Approval')) {

    //   const approvs = await axios.instance.post(`/ApiForAPProve2`,
    //   { 
    //     ContactPerson: Contact_Person ,
    //     Department: localStorage.getItem('Department'),
    //     Designation: localStorage.getItem('Designation'),
    //     Loginname: Username,
    //     Username: Frommail,
    //     ccmail: ccmail,
    //     hostname: SMTPServer,
    //     password: mailpassword,
    //     port: smptport,
    //     sub: "PO Approved, Supply the Materials",
    //     tomail: Tomail,
    //     PO_No: pono,
    //     Cus:localStorage.getItem('Suppliername')
    //  },
    //    { headers: {'Authorization': tokent
    //    , 'Content-Type': 'application/json'}})
    await axioss.post(`http://103.27.85.36/EmailAPi/api/Mail`, 
   
      
    {
  
      FromMailid:Frommail,
         ToMailid:Suppliermail,
          CcMailid: cccmail,
         CcMailid1:cclev1,
         CcMailid2:finallevmail,
         Subject:"Approved",
         SmtpServer:SMTPServer,
         MailPassowrd:mailpassword,
        //  Body: ` <p>Dear  ${customername}  , </p>
         Body: `<p>Dear Sir/Madam,</p>
         <p>Please find the purchase  Order No: ${pono} and supply as earliest </p> 
         <p>Aprrovrd By : ${localStorage.getItem("Usercode")}</p>
        <p>Regards,</p>
        <p>${nonadmin}</p>
        <p> ${designation}</p>
        <p> ${department}</p>
       <p>Company: ${localStorage.getItem("companyName")} </p>
        `,

         SmtpPort:smptport,
         Filepathattach:"C:\\inetpub\\wwwroot\\tomspognerator\\Views\\Purchaseorder.pdf"
  
  }
  
  
  
    ,{ headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
}
else{
  
}

     }
    
       setApprovelpage(true)
     
   })
       
  }
  const laoding = () => {
    setspinerforapprovespinner(true)
    setopen(true)
    setTimeout(() => {
          history.push(`/Approval`)

      setspinerforapprovespinner(false)
      setopen(false)

    }, 3000);
  }


    const gettaxes=async(id)=>{
      await axios.instance.get(`GETSGSTCGSTAPRVL/${id}`)
      .then((res)=>{
        console.log(res.data,"gettaxes")
        settaxes(res.data)
      })
    }

    const ponodate=async(id)=>{
      await axios.instance.get(`/POHDRPONODATE/${id}`)
      .then((res)=>{
        //console.log(res.data,'ponodate')
        for(const data of res.data){
          // sethdrpono(data.Order_No)
          // sethdrorderdate(data.Order_Date)
          // sethdrdeliverydate(data.Delivery_Date)
          // sethdrremarks(data.Remarks)
          sethdrnetamt(data.Net_Amount)
        }
      })
    }
    return (
      <>
      {!props.match.params.id ? (
      <div>
        <Card className="titledefect">
          <CardBody>
            <h6>Purchase Order</h6>
          </CardBody>
        </Card>
      </div>
      ):
      <div>
      <Card className="titledefect">
        <CardBody>
         {localStorage.getItem('approvereq') ==='Y' ?  <h6> Send Po</h6>:  <h6> Approval</h6>}
        </CardBody>
      </Card>
    </div>}
  
  {!props.match.params.id ? (  
      <div >
        <Card className="hedercard">
        <div className="InspectionReportForm">
          <div className="poss"><b>Po#</b></div>
          <div  className="fromdate">
          <input type='date' value={todate1} id="fromdate"  /> 
  
            
              </div>
              <div className="Deliveryss">
              <lable ><b>Delivery Date</b></lable>
              </div>
              <div  className="Todate">
              
              <input type='date'  value={moment(toodate).format('YYYY-MM-DD')} id="fromdate" onChange={e => settoodate(e.target.value)} /> 
          </div>
          <div className="tearmsconditions">
          <Label className="termslables" for="exampleDate"><b>Terms&conditions</b></Label>
                    <Input
                  
                     value={remark}
                     onChange={e => setremark(e.target.value)}
                      id="exampleDate"
                      placeholder="Terms&conditions"
                    
                    />
          </div>
          </div>
        </Card>
        <Paper>
        
        <Card className="subcard">
        
        </Card>

        {visible &&
        <Card className="subcard">
        <div className="headersub">
      <div className="closebutton">
      
      </div>
      
      </div> 
      <form id="subfom">
        
        <CardBody>
        
      
     
     
        
  
  
        </CardBody>
        </form>
      </Card>
  }
  </Paper>
        <Paper>
        <div style={{marginTop:"5px", marginLeft:'15px'}}>
        <TableContainer className="" >
        <Toolbar className="serchdiv">
             <div className="search" style={{display: 'none'}}>
             <input className="inpusearch" placeholder="search"    width= "750px" />
             <SearchIcon />
             </div>
             <div className='savebutt'>
             <Button1   onClick={save} color="success" className="adbtn2"  >
     Save
  </Button1>
  </div>
           </Toolbar>
        <Table className="Qacats" aria-label="simple table">
          <TableHead>
         
            <TableRow>
            <TableCell  align="left">S.no</TableCell>
  
            <TableCell align="center">Products</TableCell>
            <TableCell  align="left">Qty</TableCell>
              <TableCell  align="left" >Uom</TableCell>
              <TableCell  align="left" >Rate</TableCell>
              <TableCell  align="left" >Dis%</TableCell>
              <TableCell  align="left" >Tax%</TableCell>
              <TableCell  align="left" >Amount</TableCell>
             
             
  <TableCell align="left">Edit</TableCell>
  <TableCell align="left">
  Delete
  </TableCell>
  <TableCell align="left">
  
  </TableCell>
              
            </TableRow>
       
  
          </TableHead>
          <TableBody>
          {provalue.length !=0 ?  (     changepage().map((data,index) => (
              <TableRow >
                 <TableCell  align="left" >
                {index+1}
                </TableCell>
                <TableCell  align="left" >
                {data.Product_Details_Description}
                </TableCell>
           
                <TableCell   align="left" >
                {data.Order_Qty}
                </TableCell>
                <TableCell  align="left" >{data.UOM_Description}</TableCell>
                <TableCell    align="left">
                {numeral(data.Rate).format('0,0.00')}
                </TableCell>
              
                <TableCell  color="red"  align="left"   >
                {data.DisPer}
                </TableCell>
                
                <TableCell  color="red"  align="left"  >
                {data.GSTPer !=0 ?  data.GSTPer : data.IGSTPer}%
                </TableCell>
                
                <TableCell  color="red"  align="left"   >
                {numeral(data.Amount).format('0,0.00')}
                </TableCell>
                <TableCell  color="red"  align="center"     >
                <IconButton size="small"  color="primaty" onClick={() =>  Updateget(data.Product_Id, index)}>
                    <EditIcon  fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell  color="red"  align="center"  >
                <IconButton onClick={(e) =>  deleteweb(data.Product_Id, e)} size="small" color="secondary"  >
                    <CloseIcon  fontSize="small" />
                  </IconButton  >
                </TableCell>
                <TableCell  color="red"  align="center"     >
                
                </TableCell>
  
              </TableRow>
         )) ) : (
          null
             )}
          </TableBody>
        </Table>
        
      </TableContainer>
      
      
      <TablePagination
          component="div"
          rowsPerPageOptions={pages}
          count={provalue.length}
          rowsPerPage={rowsperpage}
          page={page}
          onChangePage={handleChangePage}
         onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              message="product added successfully"
  
            />
             <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open1}
              autoHideDuration={2000}
              onClose={handleClose}
              message="Defect category   updated successfully"
  
            />
             <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open2}
              autoHideDuration={2000}
              onClose={handleClose}
              message="Product  deleted successfully"
  
            />
  </div>
  </Paper>
        
  <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                
              }}
              
              open={open3}
              autoHideDuration={2000}
              onClose={handleClose}
           
            >
               <Alert onClose={handleClose} severity="error">
               Product Already exists
    </Alert>
    </Snackbar >
  
  
    <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                
              }}
              
              open={open4}
              autoHideDuration={2000}
              onClose={handleClose}
           
            >
               <Alert onClose={handleClose} severity="error">
               Atleast add one Product to complete a Po
    </Alert>
    </Snackbar >
      </div>
      ): <div >
      <Card className="hedercard">
      <div className="InspectionReportForm">
        <div className="poss"><span>PO No : </span><span>{pono}</span></div>
        <div  className="Deliveryss">
        <lable ><span>PO Date </span></lable>
        </div>
        <div  className="Todate1">
        <input type='date' value={todate1} id="fromdate"  /> 
        </div>
            <div className="Deliveryss">
            <lable ><span>Delivery Date</span></lable>
            </div>
            <div  className="Todate1">
            
            <Input type='date' disabled value={moment(toodate).format('YYYY-MM-DD')} id="fromdate" onChange={e => settoodate(e.target.value)} /> 
        </div>
        <div className="tearmsconditions">
        <Label className="termslables" for="exampleDate"><span>Terms&conditions</span></Label>
                  <Input
                
                value={remark}
                onChange={(e)=> setremark(e.target.value)}
                    id="exampleDate"
                    placeholder="Terms&conditions"
                  
                  />
        </div>
        </div>
      </Card>
     
      <Paper>
      <div style={{marginTop:"5px", marginLeft:'15px'}}>
      <TableContainer className="" >
      <Toolbar className="serchdiv">
           <div className="search" style={{display: 'none'}}>
           <input className="inpusearch" placeholder="search"    width= "750px" />
           <SearchIcon />
           </div>
           <div className='savebutt'>
                {localStorage.getItem('approvereq') ==='Y' ?
           <Button1 onClick={Approve} color="primary" className="adbtn2"  >
   Send Po
  
  </Button1> : localStorage.getItem('Approval2') ==='Y' || localStorage.getItem('Approval3') === 'Y' || localStorage.getItem('AdminUser')  === 'Y' ?
        <Button1 onClick={ApproveStageOne} color="primary" className="adbtn2"  >
        Approve
       
       </Button1> : localStorage.getItem('Approval3') ==='Y' ?   
       
       <Button1 onClick={Approve} color="primary" className="adbtn2"  >
       Approve
      
      </Button1>: null
      
      }
  </div>
         </Toolbar>
      <Table className="Qacats" aria-label="simple table">
        <TableHead>
       
          <TableRow>
          <TableCell  align="center">S.no</TableCell>
          <TableCell align="center">Products</TableCell>
          <TableCell  align="center">Qty</TableCell>
          
            <TableCell  align="center" >Uom</TableCell>
            
            <TableCell  align="center" >Rate</TableCell>
            <TableCell  align="center" >Dis%</TableCell>
            <TableCell  align="center" >Tax%</TableCell>
            <TableCell  align="center" >Amount</TableCell>   
  
  <TableCell align="left">
  
  </TableCell>
            
          </TableRow>
     
  
        </TableHead>
        {provalue.length !=0 ?  (     changepage().map((data,index) => (
        <TableBody>
        
            <TableRow >
           <TableCell width="100px" align="left">{index+1}</TableCell>
              <TableCell width="300px" align="center" >
              {data.Product_Details_Description}
              </TableCell>
         
              <TableCell width="100px"  align="center" >
              {data.Order_Qty}
              </TableCell>
              <TableCell  width="100"  align="center">
             {data.UOM_Description}
              </TableCell>
              <TableCell  width="100"  align="right">
              {numeral(data.Rate).format('0,0.00')}
              </TableCell>
              <TableCell  color="red"  align="center" width="100"    >
              {data.DisPer}
              </TableCell>
              
              <TableCell  color="red"  align="center" width="100"    >
              {data.GSTPer !=0 ?  data.GSTPer : data.IGSTPer}%
              </TableCell>
            
              <TableCell  color="red"  align="right" width="100"    >
              {numeral(data.Amount).format('0,0.00')}
              </TableCell>
             
              <TableCell  color="red"  align="center" width="100"    >
              
              </TableCell>
  
            </TableRow>
            
        
      
      
        </TableBody>
       )) ) : (
        null
           )}
        <TableRow>
      <TableCell  align="left"></TableCell>
     
      <TableCell  align="center"><b>Total Qty</b></TableCell>
      <TableCell align="center" style={{color:'red'}}>{totalqty}</TableCell>
        <TableCell  align="left" ></TableCell>
        <TableCell  align="left" ></TableCell>
        <TableCell  align="left" style={{color:'red'}} ></TableCell>
        <TableCell  align="left" className='text-nowrap'><b>Total Amount</b></TableCell>
        <TableCell  align="right" style={{color:'red'}} >{numeral(totalamt).format('0,0.00')}</TableCell>   

<TableCell align="left">

</TableCell>
        
      </TableRow> 
      {/* <TableRow>
        <TableCell  align="left"></TableCell>
      
        <TableCell  align="left"><b>Discount</b></TableCell>
       
        <TableCell  align="left"><b>{Total_discount_amt}</b></TableCell>
        <TableCell  align="left"><b>SGST</b></TableCell>
        <TableCell  align="left"><b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE")?provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0):0}</b></TableCell>
        <TableCell  align="left"><b>CGST</b></TableCell>
        <TableCell  align="left"><b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE")?provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0):0}</b></TableCell>
        <TableCell  align="left"><b>IGST</b></TableCell>
        <TableCell  align="left"><b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0):Statecodeee === localStorage.getItem("COMPANY_STATECODE")? 0: provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)}</b></TableCell>
       

      </TableRow> */}
      {/* {taxes.map((data,index)=>( */}  
      </Table>
      
    </TableContainer>
    <TableContainer>
      <Table>
        {taxes.map((data,index )=> (


      <TableRow key={index}>
      <TableCell  align="left"></TableCell>
      
      <TableCell  align="center"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>Discount</Badge> </TableCell>
      <TableCell align="center"> <b>{data.Discount_Amount}</b></TableCell>
      <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>SGST</Badge> : <b>{data.SGSTAmt}</b></TableCell>
      <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>CGST</Badge> : <b>{data.Vat_Amount}</b></TableCell>
      <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>IGST</Badge> : <b>{data.IGSTAmt}</b></TableCell>
      <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>NET_AMT</Badge> </TableCell> 
      <TableCell><b>{numeral(hdrnetamt-data.Discount_Amount).format('0,0.00')}</b></TableCell>


      </TableRow>
      ))}
      </Table>
    </TableContainer>
    
    
    <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={provalue.length}
        rowsPerPage={rowsperpage}
        page={page}
        onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="PO Approved  successfully"
  
          />
           <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Defect category   updated successfully"
  
          />
          
      <Backdrop  open={spinerforapprovespinner} className={classes.backdrop} >
    
           
    <Spinner name="ball-spin-fade-loader"  color='#fafafa' />
    
    </Backdrop>
           <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open2}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Defect category   deleted successfully"
  
          />
  </div>
  </Paper>
      
  <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
              
            }}
            
            open={open3}
            autoHideDuration={2000}
            onClose={handleClose}
         
          >
             <Alert onClose={handleClose} severity="error">
             Product Already exists
  </Alert>
  </Snackbar >
  
  
  <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
              
            }}
            
            open={open4}
            autoHideDuration={2000}
            onClose={handleClose}
         
          >
             <Alert onClose={handleClose} severity="error">
             Atleast add one Product to complete a Po
  </Alert>
  </Snackbar >
    </div>}
      </>
    )
  }
  
  export default ChartPage
  
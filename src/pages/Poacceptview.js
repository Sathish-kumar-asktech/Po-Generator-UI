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
  const [totalamountvaluedata, settotalamountvaluedata] = useState('')
  const [ohdate, setohdate] = useState('')
  const [todate, settodate] = useState('')
  const [purchasedeliverydate, setpurchasedeliverydate] = useState('')

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
   
    
   useEffect(() => {
    const getusertype = async() => {
  
      const type =  localStorage.getItem('AdminUser')
      
     setusertype(type)
     //////console.log(type)
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
    }
  
  
    branchet()
  
  
   setfromdatee(moment(firstday).format('YYYY-MM-DD'))
   settoodate(moment(lastday).format('YYYY-MM-DD'))
   settodate1(moment(lastdays).format('YYYY-MM-DD'))
    
   }, [])
  
 
  
   const Getorderhdr = async(id)  => {
    setprovalue([])
    const tokent  =   localStorage.getItem('authtoken') 
  const ordeheader = await  axios.instance.get(`/POOrdr/${'N'}/${id}`, {'Authorization': tokent
  , 'Content-Type': 'application/json'}).then((res) => {
   // ////////console.log(res.data)
    for(const data of res.data) {
       ////////console.log(new Date(data.Delivery_Date))
       settoodate(data.Delivery_Date)
       setdeliverdate(data.Order_Date)
       //setohdate(new Date(data.Delivery_Date))
       ////console.log(data.Order_Date)
      setremark(data.Remarks)
      setpono(data.PO_No)
      setcusid(data.Customer_Id)
      setproductid(data.Order_Id)
      setcompanyid(data.Company_id)
      ////console.log('remarks', data.REMARKS)
     
    }
    
  })
   }
    
   const getprodctdel =  async(id) => {
    setprovalue([])
    const tokent  =   localStorage.getItem('authtoken') 
     const prod = await  axios.instance.get(`/POOrdrDtl/${id}`, {'Authorization': tokent
     , 'Content-Type': 'application/json'}).then(async(res)  => {

      // for(const data of res.data){
      //   setproductid(data.Product_Id)
      // }
      localStorage.setItem('Products', JSON.stringify( res.data))
    setprovalue(res.data)
    
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
   const   Usertype =   localStorage.getItem('AdminUser1')
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

  const [productid, setproductid] = useState('')
  const [cusid, setcusid] = useState('')
  const [companyid, setcompanyid] = useState('')

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
      getprodct()
      getstateid()
      }, [])
      
  
      const getprodct = async() =>  {
    
        const token =   localStorage.getItem('AuthToken')
        const userid =   localStorage.getItem('Userid')
        const companyid =  localStorage.getItem('Companyid')
        const customerid =  localStorage.getItem('Customer_Log')
        //console.log('compid', companyid)
        //console.log('customerid',customerid )
        const prod =  await axios.instance.get(`/Product/${2}/${customerid}`, { headers: {'Authorization':token,
        'Content-Type': 'application/json'
     
        }})
        
        
        const data =  prod.data
  
        
       
        const optionvalue =  data.map(f =>(
         
          {
        
          'label' : f.Product_Details_Description,
           'value' : f.Product_Details_Id ,
          
        } 
        
        
        ))
       
   
        
        
        setProductcollection(optionvalue)
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






const UserMailDetail = async() => {
  const tokent  =   localStorage.getItem('authtoken') 
  const Username =  localStorage.getItem('Username')
  const userId =  localStorage.getItem('Userid')
 const mailDetail  =await axios.instance.get(`/UsermailDetails/${localStorage.getItem('Customer_Log')}/${localStorage.getItem('Userid')}/${0}`, { headers: {'Authorization': tokent
 , 'Content-Type': 'application/json'}}).then((res) => {

  console.log(res.data,'dd')
 for (const data of res.data) {
if(localStorage.getItem('AdminUser1') === 'Y') {
  const Mails =  data.CCmail + ',' + data.Tomail  + ',' + data.cccmail
  setccmail(Mails)
}else {
  setccmail(data.CCmail + ',' + data.cccmail)
}
  
   setFrommail(data.Emailid)
       setTomail(data.Tomail)
       setsmptport(data.SMTPPort)
       setSMTPServer(data.SMTPServer)
       setmailpassword(data.mailpassword)
     
      setcustomername(data.User_Name)
      setSuppliermail(data.SupplierMail)
      setContact_Person(data.Contact_Person)
 }

 })
}
















const Approve1 = async() => {
   
   const tokent  =   localStorage.getItem('authtoken') 
   const Username =  localStorage.getItem('Username')
   const userId =  localStorage.getItem('Userid')
     const approvs = await axios.instance.put(`/Approve/${props.match.params.id}`,
    { 
     ApproveDate: new Date(), 
     Approve: 'Y',
     Confirmed_Status:'Y',
     POStatus: 'Accepted',
     ApprovedBy: userId
   },
     { headers: {'Authorization': tokent
     , 'Content-Type': 'application/json'}}).then(async(res) => {
       console.log(res.data)
      laoding()
 
    //    const mailsend =  await axios.instance.post('mail', {
         
    //        host: SMTPServer,
    //        port:smptport,
    //        username:Frommail,
    //        password: mailpassword,
    //        tomail:ccmail,
    //        cc:ccmail,
    //        sub:"PO is approved",
    //        orderno:`${pono}`,
    //        loginname:Username,
    //        customernme: customername
       
    //    },  { headers: {'Authorization': tokent
    //    , 'Content-Type': 'application/json'}})
    //    console.log('test',mailsend.status)

    //    const mailsend1 =  await axios.instance.post('mailforsupplier', {
         
    //     host: SMTPServer,
    //     port:smptport,
    //     username:Frommail,
    //     password: mailpassword,
    //     tomail:Tomail,
        
    //     sub:"Po to supply material",
    //     orderno:`${pono}`,
    //     loginname:Username,
    //     customernme: customername,
    //     ContactPerson: Contact_Person,
    //     BranchName: branchname,
    //     Cus_name: cus_name
    
    // },  { headers: {'Authorization': tokent
    // , 'Content-Type': 'application/json'}})
  //  console.log('test',mailsend1.status)
    
      // getdataview()
       setApprovelpage(true)
     //history.push(`/Approval`)
    // setspinerforapprovespinner(false)
   })
      //  history.push(`/createsalesorder/${cusid}/${productid}`)
  }







  const laoding = () => {
    setspinerforapprovespinner(true)
    setopen(true)
    setTimeout(() => {
          // history.push(`/PoAccept`)
          history.push(`/createsalesorder/${cusid}/${productid}/${companyid}`)

      setspinerforapprovespinner(false)
      setopen(false)

    }, 3000);
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
         {localStorage.getItem('approvereq') ==='Y' ?  <h6> Send Po</h6>:  <h6> Po Accept</h6>}
        </CardBody>
      </Card>
    </div>}
  
 <div >
      <Card className="hedercard">
      <div className="InspectionReportForm">
        <div className="poss"><b>Po No:</b><b>{pono}</b></div>
        <div  className="Deliveryss">
        <lable ><b>PO Date</b></lable>
        <input type='date' value={moment(deliverdate).format("YYYY-MM-DD")} id="fromdate"  /> 
  
          
            </div>
            <div className="Deliveryss">
            <lable ><b>Delivery Date</b></lable>
            </div>
            <div  className="Todate1">
            
            <Input type='date' disabled value={moment(toodate).format('YYYY-MM-DD')} id="fromdate" onChange={e => settoodate(e.target.value)} /> 
        </div>
        <div className="tearmsconditions">
        <Label className="termslables" for="exampleDate"><b>Terms&conditions</b></Label>
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
             
 
       
       <Button1 onClick={Approve1} color="primary" className="adbtn2"  >
       Accept
      
      </Button1>
      
      
  </div>
         </Toolbar>
      <Table className="Qacats" aria-label="simple table">
        <TableHead>
       
          <TableRow>
          <TableCell  align="left">S.no</TableCell>
          <TableCell align="left">Products</TableCell>
          <TableCell  align="left">Qty</TableCell>
          
            <TableCell  align="left" >Uom</TableCell>
            
            <TableCell  align="left" >Rate</TableCell>
            <TableCell  align="left" >Dis%</TableCell>
            <TableCell  align="left" >Tax%</TableCell>
            <TableCell  align="left" >Amount</TableCell>   
  
  <TableCell align="left">
  
  </TableCell>
            
          </TableRow>
     
  
        </TableHead>
        {provalue.length !=0 ?  (     changepage().map((data,index) => (
        <TableBody>
        
            <TableRow >
           <TableCell>{index+1}</TableCell>
              <TableCell width="200px" align="left" >
              {data.Product_Details_Description}
              </TableCell>
         
              <TableCell width="200px"  align="left" >
              {data.Order_Qty}
              </TableCell>
              <TableCell  width="170"  align="left">
             {data.UOM_Description}
              </TableCell>
              <TableCell  width="170"  align="left">
              {numeral(data.Rate).format('0,0.00')}
              </TableCell>
              <TableCell  color="red"  align="left" width="170"    >
              {data.DisPer}
              </TableCell>
              
              <TableCell  color="red"  align="left" width="170"    >
              {data.GSTPer !=0 ?  data.GSTPer : data.IGSTPer}%
              </TableCell>
            
              <TableCell  color="red"  align="left" width="100"    >
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
     
      <TableCell  align="left"><b>Total Qty</b></TableCell>
      <TableCell align="left" style={{color:'red'}}>{totalqty}</TableCell>
        <TableCell  align="left" ></TableCell>
        <TableCell  align="left" ></TableCell>
        <TableCell  align="left" style={{color:'red'}} ></TableCell>
        <TableCell  align="left" ><b>Total Amount</b></TableCell>
        <TableCell  align="left" style={{color:'red'}} >{numeral(totalamt).format('0,0.00')}</TableCell>   

<TableCell align="left">

</TableCell>
        
      </TableRow> 
      <TableRow  >
        <TableCell  align="left"></TableCell>
      
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>Discounts</Badge></TableCell>  
       
        <TableCell  align="left"><b>{(Total_discount_amt)}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>SGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: localStorage.getItem("CStateId") === localStorage.getItem("CStateCode")?numeral(provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>CGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:localStorage.getItem("CStateId") === localStorage.getItem("CStateCode")?numeral(provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>IGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?numeral(provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00'):localStorage.getItem("CStateId") === localStorage.getItem("CStateCode")? 0: numeral(provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00')}</b></TableCell>
        {localStorage.getItem("CStateId") === localStorage.getItem("CStateCode")?
        <>
       
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>NET_AMT</Badge></TableCell>
        <TableCell  align="left"><b>{numeral((provalue.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100 +(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100,0))-Total_discount_amt).format('0,0.00')}</b></TableCell>
        </>
        :
        <>
         <TableCell  align="left"><b>NET_AMT</b></TableCell>
        <TableCell  align="left"><b>{numeral((provalue.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100,0))-Total_discount_amt).format('0,0.00')}</b></TableCell>


        </>
        
        }
        <TableCell></TableCell>
        


      </TableRow>
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
            message="PO  Approved  successfully"
  
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
    </div>
      </>
    )
  }
  
  export default ChartPage
  
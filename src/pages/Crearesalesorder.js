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
  import Backdrop from '@material-ui/core/Backdrop';
  
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
  
  
  import PerfectScrollbar from 'react-perfect-scrollbar';
  import './createsalesorder.css'
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
  import tr from 'faker/lib/locales/tr';
import { Badge } from 'react-bootstrap';
  
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      
    },
  }));
  function ChartPage(props) {

    const [remark1, setremark1] = useState('')
    
    const classes = useStyles();
    const history = useHistory()
  
    const [getcat, setgetcat] = useState([])
    const [category, setcategory] = useState('')
    const [updateCategory, setupdateCategory] = useState("")
   const [defact1, setdefact1] = useState([])
   const [UomDesp, setUomDesp] = useState('')
   const [open, setopen] = useState(false)
   const [open1, setopen1] = useState(false)
   const [open2, setopen2] = useState(false)
   const [open3, setopen3] = useState(false)
   const [open4, setopen4] = useState(false)
  const [OutoffRange, setOutoffRange] = useState(false)
    const [Acive, setAcive] = useState('yes')
    const [Mindate, setMindate] = useState(new Date())
    const updatecatee = useRef('')
    const activeref = useRef('')
    const [{ user } , dispatch] = useStateValue();
    const [userinf, setuserinf] = useState([])
    const idref = useRef('')
    const pages = [5,10,15,20,25,30,35,40,45,50,100]
    const [page, setpage] = useState(0)
   const [rowsperpage, setrowsperpage] = useState(pages[page])
 
   const [fromdatee, setfromdatee] = useState('')
   const [todate1, settodate1] = useState('')
   const [toodate, settoodate] = useState(new Date())

   const [sharename, setsharename] = useState('')
 
    const [spinnerforpo, setspinnerforpo] = useState(false)
  const [cutomer, setcutomer] = useState([])
  const [deletingid, setdeletingid] = useState('')
  const [deleteconfirmstatus, setdeleteconfirmstatus] = useState('')
  const [customerss, setcustomerss] = useState('')
  const [usertype, setusertype] = useState('')
  const [opeecreate, setopeecreate] = useState(false)
  const [opeecreate1, setopeecreate1] = useState(false)
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
  const [savespinners, setsavespinners] = useState(false)
  const [spinnerforsingleupdate, setspinnerforsingleupdate] = useState(false)
  const [singleupdateproductssspiners, setsingleupdateproductssspiners] = useState(false)
  const [categorydefaultvalue, setcategorydefaultvalue] = useState({label:"Select Product...", value:""})
 const [poreferid, setporeferid] = useState('')
 const [suppliererror, setsuppliererror] = useState(false)
 const [podeliverdate, setpodeliverdate] = useState('')
 const [cusname, setcusname] = useState('')
 const [poreferid1, setporeferid1] = useState('')
 const [orderno, setorderno] = useState('')
 const [customerid1, setcustomerid1] = useState('')


 //params

 const [cusnameforparams, setcusnameforparams] = useState('')
 const [ponoforparams, setponoforparams] = useState('')
 const [orderidforparams, setorderidforparams] = useState('')
 const [cusidforparams, setcusidforparams] = useState('')

 const [SelectedPORefNo, setSelectedPORefNo] = useState({label:"select",value:""});

 const [purchaseid, setpurchaseid] = useState('')

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };
  
  const changepage = () => {
     return allpodetailscollections.slice(page * rowsperpage, (page + 1) * rowsperpage)
   }
  
  //  const changepage1 = () => {
  //   return podetailscollections.slice(page * rowsperpage, (page + 1) * rowsperpage)
  // }
 
   useEffect(() => {
    const getusertype = async() => {
  
      const type =  localStorage.getItem('AdminUser')
      
     setusertype(type)
     //////////////////console.log(type)
     }
     const custtt = async () => {
    
       const custt =   localStorage.getItem('Customer_Log')
       setcustt(custt)
       //////////////////console.log(custt)
     }
     const branch = async () => {
    
       const branch =  localStorage.getItem('Branch_Log')
       setbracnch(branch)
       //////////////////console.log(branch)
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
    Getallsuppliervalue()
    if(props.match.params.id && props.match.params.id1 && props.match.params.id2){
      getcompanystatecode(props.match.params.id)
      getbuyers(props.match.params.id)
      getallpohder(props.match.params.id1)
      Getallpodetils(props.match.params.id1)
      
      
    }
    // if (props.match.params.id) {
    //   // getcompanystatecode(props.match.params.id)
    //   // getbuyers(props.match.params.id)
    //   // getallpohder(props.match.params.id1)
    //   // Getallpodetils(props.match.params.id1)
     


    //   // updatescreenview(props.match.params.id)
    //   getallsodetailcollections(props.match.params.id)
    //   getonsaleorderheader(props.match.params.id)

    // }
  
  
    branchet()
  
  if(!props.match.params.id || (props.match.params.id && props.match.params.id1 && props.match.params.id2)) {
  
   // Getallpodetils()
   setfromdatee(moment(firstday).format('YYYY-MM-DD'))
   settoodate(moment(lastday).format('YYYY-MM-DD'))
   settodate1(moment(lastdays).format('YYYY-MM-DD'))
  }
   }, [])
  
 
  
  
   const Getorderhdr = async(id)  => {
    setprovalue([])
    const tokent  =   localStorage.getItem('authtoken') 
  const ordeheader = await  axios.instance.get(`/POOrdr/${id}`, {'Authorization': tokent
  , 'Content-Type': 'application/json'}).then((res) => {
   // ////////////////////console.log(res.data)
    for(const data of res.data) {
      console.log(res.data,'csss')
       ////////////////////console.log(new Date(data.Delivery_Date))
       settoodate(moment(data.Delivery_Date).format('YYYY-MM-DD'))
       setdeliverdate(data.Order_Date)
       //setohdate(new Date(data.Delivery_Date))
       ////////////////console.log(data.Order_Date)
      setremark(data.Remarks)
      setpono(data.PO_No)
      ////////////////console.log('remarks', data.REMARKS)
     
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
    
    //setProductcollection(res.data)
    //////////////console.log(res.data)
    let totalnetamt = []
  
  let qtytotal = []
  
  for(const data of res.data){
    qtytotal.push(data.Order_Qty)
  }
  var qtyvalue = 0 
      for (let i = 0; i < qtytotal.length; i++) {
        qtyvalue += qtytotal[i];
    }
    //////////////////////console.log(qtyvalue)
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
    ////////////////console.log(totaltdisamt)
    var  totalamutdis = 0
    for(let i=0; i< totaltdisamt.length; i++) {
      totalamutdis +=totaltdisamt[i]
    }
    ////////////////console.log(totalamutdis)
    setTotal_discount_amt(totalamutdis)
    
    let totalIgstamt = []
  for(const data of res.data) {
  totalIgstamt.push(data.Rate * data.Order_Qty * data.IGSTPer/100)
  ////////////////console.log('igst', data.IGSTPer)
  }
  var  totalIgstvalu = 0
  for(let i=0; i< totalIgstamt.length; i++) {
  totalIgstvalu +=totalIgstamt[i]
  }
console.log(totalIgstvalu)
  //settotaltax(totalcgstvalu +totalcgstvalu)
  setTOtaligstamt(totalIgstvalu)
  
    
  
  
  })
  
   }

  
  
  
 
  const purchasepo =  async() => {  
    const tokent  =   localStorage.getItem('authtoken') 
   const branchid =  localStorage.getItem('Branch_Log')
   const custoemrid =   localStorage.getItem('Customer_Log')
   const   Usertype =   localStorage.getItem('AdminUser')
   //////////////////console.log(branchid,custoemrid,Usertype)
    const purchases =  await axios.instance.get(`/POViewdash/${custoemrid}/${branchid}/${Usertype}/${localStorage.getItem('Userid')}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
  setpurchase(purchases.data)
   
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
     const branccc = await axios.instance.get(`/BranchHelp/${cuslog}/${branch}/${type}`, { headers: {'Authorization': tokent
     , 'Content-Type': 'application/json'}})
     setbranchfornoadmin(branccc.data)
  //////////////////console.log('test',branccc.data)
  
    }
    const customeradmin = async () => {
      const tokent  =   localStorage.getItem('authtoken') 
      const type = localStorage.getItem('AdminUser') 
      const branch =  localStorage.getItem('Branch_Log')
      const cuslog =   localStorage.getItem('Customer_Log')
      
    const cusadmin = await axios.instance.get(`/BranchHelp/${cuslog}/0/${type}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
    setbranchesadmin(cusadmin.data)
    ////////////////console.log('testone',cusadmin.data)
    
    }
  
    
   
    const deletepo = async () => {
   
   
      const tokent  =  localStorage.getItem('authtoken') 
      const podel =  await axios.instance.delete(`/POdelete/${deletingid}`, { headers: {'Authorization': tokent
      , 'Content-Type': 'application/json'}})
      purchasepo()
    
    }
  
   
  
    const [fromdatetr, setfromdatetr] = useState(new Date())
    const [todatetr, settodatetr] = useState(new Date())
    const [remark, setremark] = useState('')
    
    const [addscreen, setaddscreen] = useState(true)
    const [updatescren, setupdatescren] = useState(false)
    
    
    
    
    
    const [allsupplierinfo, setallsupplierinfo] = useState([])
    const [suppliid, setsuppliid] = useState('')
    const [EditCustomerid, setEditCustomerid] = useState({label:'Select...',value:''})


       
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
  
  const [Frommail, setFrommail] = useState('')
  const [Tomail, setTomail] = useState('')
  const [smptport, setsmptport] = useState('')
  const [SMTPServer, setSMTPServer] = useState('')
  const [mailpassword, setmailpassword] = useState('')
  const [Statuscalll, setStatuscalll] = useState('')
  const [ccmail, setccmail] = useState('')
  const [mailloginnames, setmailloginnames] = useState('')
  const [allporefnos, setallporefnos] = useState([])
  const [allpoheadercollections, setallpoheadercollections] = useState([])
  const [allpodetailscollections, setallpodetailscollections] = useState([])
  const [allpodetailscollections1, setallpodetailscollections1] = useState([])
  const [allsodetailcollections, setallsodetailcollections] = useState([])
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
      UserMailDetail()
    

      }, [])
      
      const UserMailDetail = async() => {
        const tokent  =   localStorage.getItem('authtoken') 
        const Username =  localStorage.getItem('Username')
        const userId =  localStorage.getItem('Userid')
       const mailDetail  =await axios.instance.get(`/UsermailDetails/${localStorage.getItem('Customer_Log')}/${localStorage.getItem('Userid')}/${localStorage.getItem('Approval2') ==='N' || localStorage.getItem('Approval3') === 'N' || localStorage.getItem('AdminUser') === 'N' ? 1 :  0}`, { headers: {'Authorization': tokent
       , 'Content-Type': 'application/json'}}).then((res) => {
      
       for (const data of res.data) {
         setFrommail(data.Emailid)
             setTomail(data.Tomail)
             setsmptport(data.SMTPPort)
             setSMTPServer(data.SMTPServer)
             setmailpassword(data.mailpassword)
            setccmail(data.cccmail)
            setcustomerss(data.User_Name)
       }
      
       })
      }
  
      const getbuyers =(id) => {
        setsuppliid(id)
        //Getonesupplier(id)
        console.log(suppliid)
        Getallporefnos(id)

        
       
      }
     
      const SendMail  =async() => {
  
        if(window.confirm('Do You Want To Send Mail For Approval')) {
  
     
        const tokent  =   localStorage.getItem('authtoken') 
        const Username =  localStorage.getItem('Username')
        const approvs = await axios.instance.post(`/ApiForUser`,
        { 
          Cus: customerss,
          Department: localStorage.getItem('Department'),
          Designation: localStorage.getItem('Designation'),
          Loginname: Username,
          Username: Frommail,
          ccmail: ccmail,
          hostname: SMTPServer,
          password: mailpassword,
          port: smptport,
          sub: "New Purchase  Order Request",
          tomail: Tomail,
       },
         { headers: {'Authorization': tokent
         , 'Content-Type': 'application/json'}})
        }else {
  
  
        }
       
      }
      const getprodct = async() =>  {
    
        const token =   localStorage.getItem('AuthToken')
        const userid =   localStorage.getItem('Userid')
        const companyid =  localStorage.getItem('Companyid')
        const customerid =  localStorage.getItem('Customer_Log')
        //////////////console.log('compid', companyid)
        //////////////console.log('customerid',customerid )
        const prod =  await axios.instance.get(`/Product/${2}/${customerid}`, { headers: {'Authorization':token,
        'Content-Type': 'application/json'
     
        }})
        
        
        const data =  prod.data
  
        
       
        // const optionvalue =  data.map(f =>(
         
        //   {
        
        //   'label' : f.Product_Details_Description,
        //    'value' : f.Product_Details_Id ,
          
        // } 
        
        
        // ))
      //  console.log(optionvalue,"option value");
   
        
        
        // setProductcollection(optionvalue)
      }
        
  
        const getoneproduct =  async(id,name)  => {
          
          setSelectedValue(id)
          setselectedtext(name)
          
          
          const product =  await axios.instance.get(`/Productone/${id}/${Customerlog}`, { headers: {'Authorization':Authtoken,
          'Content-Type': 'application/json'
          }})
          //////////////console.log(product.data)
          setqty('')
          setnetamount('')
          setamount('')
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
            //////////////////console.log(sgstcal)
            // var sgstvalue =  amounvalu + sgstcal
            // const sgstamts =  sgstvalue
            // ////////////////console.log(sgstcal)
            setsgstamt(sgstcal)
            
            var cgstamt =  valueofdis * cgst
            var cgstcal =  cgstamt/100
            // var cgstvalue =  amounvalu + cgstcal
            // const cgstamts = cgstvalue
            //////////////////console.log(cgstcal)
            setcgstamt(cgstcal)
            ////////////////console.log(cgstcal)
            setigst(0)
              
            
            }else {
            ////////////////console.log(Igst)
            var amounvalu =  (amt * amount)  
            var gstinfo =((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igst:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? tax : Igst
            ////////////////console.log('taxes', Igst)
            ////////////////console.log('igst', tax)
            var gstcal =  amounvalu * gstinfo
            
            var gstvalcal = gstcal/100
            var gstvalue =  amounvalu + gstvalcal 
            const valueformat =  gstvalue
            setnetamount(valueformat)
            
            var sgstamt =  amounvalu * sgst
            var sgstcal =  sgstamt/100
            //////////////////console.log(sgstcal)
            // var sgstvalue =  amounvalu + sgstcal
            // const sgstamts =  sgstvalue
            // ////////////////console.log(sgstcal)
            setsgstamt(sgstcal)
            
            var cgstamt =  amounvalu * cgst
            var cgstcal =  cgstamt/100
            // var cgstvalue =  amounvalu + cgstcal
            // const cgstamts = cgstvalue
            //////////////////console.log(cgstcal)
            setcgstamt(cgstcal)
            ////////////////console.log(cgstcal)
            setigst(0)
            
            
            }
            
            
            }
            const productarray =  async()  => {
              //AsyncStorage.removeItem('Products')
              
              if((selectedValue.length !=0) && (qty.length !=0)) {
              
              
              let product =  []
              
               let prod =   localStorage.getItem('Products1')
              // //////////////console.log(prod)
            if(  localStorage.getItem('Products1')  ) {
             const getdata = JSON.parse( prod ) 
            for(const data of getdata){
              ////////////////console.log(data)
             product.push(data)
               
             }
              }
              
              
              product.push({
              Order_no: product.length +1 ,
              Product_Id : parseInt(selectedValue),
              Order_Qty: parseFloat(qty),
              Rate: amount,
              TaxId: ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ? parseInt(taxid) : 0,
              GSTPer:  tax ,
              VAT_Percentage:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? cgst : 0,
                IGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))? Igst:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0: Igst,
                SGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? sgst: 0,
              Discount:discount,
              Amount: netamount,
              Product_Details_Description: productname,
              UOM_Id: umoid,
              DisPer: discount,
              DisAmt:disamt,
              SGSTId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? sgstid : 0,
              IGSTId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))? igstid: Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ? 0: igstid,
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
            
              
              
              
              
              
              
              
              localStorage.setItem('Products',  JSON.stringify(unique))
              
              let Getprod =   localStorage.getItem('Products1')
              
              
              
              let prodvalues = JSON.parse(Getprod)
              ////////////////console.log(prodvalues)
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
              //////////////////console.log(totalcgstvalu)
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
              ////////////////console.log(totaltdisamt)
              var  totalamutdis = 0
              for(let i=0; i< totaltdisamt.length; i++) {
              totalamutdis +=totaltdisamt[i]
              }
              ////////////////console.log(totalamutdis)
              setTotal_discount_amt(totalamutdis)
              
              
              let totalIgstamt = []
              for(const data of prodvalues) {
              totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt)* data.IGSTPer/100)
              ////////////////console.log('igst', data.IGSTPer)
              }
              var  totalIgstvalu = 0
              for(let i=0; i< totalIgstamt.length; i++) {
              totalIgstvalu +=totalIgstamt[i]
              }
              console.log(totalIgstvalu,"totaligstvalue");

              ////////////////console.log(totalIgstvalu)
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
             
             // setselectedtext('Select Product')
              ////////////////console.log(unique.length, product.length)
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
              //setselectedtext('Select Product')
              
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
              setSelectedValue('')
              //setselectedtext('Select Product')
             
              }
                     
              const deleteproduct  =  async(id) => {
                let productsvalue =  localStorage.getItem('Products1')
                var items = JSON.parse(productsvalue)
                // ////////////////console.log(items)
                for (var i =0; i< items.length; i++) {
                // var items = JSON.parse(items[i]);
                //////////////////console.log(items[i].Product_Id)
                if (items[i].Product_Id == id) {
                 const deletedata =  items.splice(i, 1);
                 //////////////////console.log(deletedata)
                }
                
                }
                //////////////////console.log(items)
                let  prod = JSON.stringify(items);
                
                localStorage.setItem('Products', prod)
                const getdelteddate =   localStorage.getItem('Products1')
                
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
                ////////////////console.log(totaltdisamt)
                var  totalamutdis = 0
                for(let i=0; i< totaltdisamt.length; i++) {
                totalamutdis +=totaltdisamt[i]
                }
                
                
                let totalIgstamt = []
                for(const data of removeproducts) {
                totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.IGSTPer/100)
                ////////////////console.log('igst', data.IGSTPer)
                }
                var  totalIgstvalu = 0
                for(let i=0; i< totalIgstamt.length; i++) {
                totalIgstvalu +=totalIgstamt[i]
                }
                console.log(totalIgstvalu)
                //settotaltax(totalcgstvalu +totalcgstvalu)
                setTOtaligstamt(totalIgstvalu)
                
                ////////////////console.log(totalamutdis)
                setTotal_discount_amt(totalamutdis)
                setTotalamountheader(totalamt)
                settotalamountvaluedata(totalamt)
                //////////////////console.log(totalcgstvalu)
                settotaltax(totalcgstvalu +totalcgstvalu)
                ////////////////console.log(indexofnum)
                setprovalue(removeproducts)
              
                }

                // const deleteweb =  async(id)  => {
                //   console.log(id)
                //   if(window.confirm('Are You sure delete this product?')) {
                //     let productsvalue = localStorage.getItem('Products1')
                //     var items = JSON.parse(productsvalue)
                //     console.log(items,"productsvalue")
                //     for (var i =0; i< items.length; i++) {
                //     // var items = JSON.parse(items[i]);
                //     console.log(items[i].Product_Id)
                //     if (items[i].Product_Id == id) {
                //      const deletedata =  items.splice(i, 1);
                //      console.log(deletedata)
                //     }
                    
                //     }
                //     console.log(items)
                //     let  prod = JSON.stringify(items);
                    
                //     localStorage.setItem('Products', prod)
                //     const getdelteddate =   localStorage.getItem('Products1')
                    
                //     let removeproducts = JSON.parse(getdelteddate)
                //     const indexofnum =removeproducts.map((items, index) => ({index, ...items}))
                //     let qtytotal = []
                    
                //     for(const data of removeproducts){
                //     qtytotal.push(data.Order_Qty)
                //     }
                //     var qtyvalue = 0 
                //     for (let i = 0; i < qtytotal.length; i++) {
                //       qtyvalue += qtytotal[i];
                //     }
                //     settotalqty(qtyvalue)
                    
                    
                //     let taxtotal = []
                //     for(const data of removeproducts) {
                //     taxtotal.push(data.GSTPer)
                //     }
                //     var taxvalue = 0
                //     for(let i =0; i< taxtotal.length; i++) {
                //     taxvalue += taxtotal[i]
                //     }
                //     //AsyncStorage.setItem('Toataltax', taxvalue.toString())
                //     let  totalnetamount = []
                //     for(const data of removeproducts) {
                //       totalnetamount.push(data.Amount )
                //     }
                //     var totalnetcount = 0
                //     for(let i =0; i< totalnetamount.length; i++) {
                //       totalnetcount += totalnetamount[i]
                //     }
                //     settotalamt(totalnetcount)
                //     //AsyncStorage.setItem('Totalamt', totalnetcount.toString())
                    
                    
                    
                //     let totalcgstamt = []
                //     for(const data of removeproducts) {
                //     totalcgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.SGSTPer/100)
                //     }
                //     var  totalcgstvalu = 0
                //     for(let i=0; i< totalcgstamt.length; i++) {
                //     totalcgstvalu +=totalcgstamt[i]
                //     }
                    
                    
                    
                //     let totaltamt = []
                //     for(const data of removeproducts) {
                //     totaltamt.push(data.Rate * data.Order_Qty)
                //     }
                //     var  totalamt = 0
                //     for(let i=0; i< totaltamt.length; i++) {
                //     totalamt +=totaltamt[i]
                //     }
                    
                    
                    
                    
                //     let totaltdisamt = []
                //     for(const data of removeproducts) {
                //     totaltdisamt.push(data.DisAmt)
                //     }
                //     ////////////////console.log(totaltdisamt)
                //     var  totalamutdis = 0
                //     for(let i=0; i< totaltdisamt.length; i++) {
                //     totalamutdis +=totaltdisamt[i]
                //     }
                    
                    
                //     let totalIgstamt = []
                //     for(const data of removeproducts) {
                //     totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.IGSTPer/100)
                //     ////////////////console.log('igst', data.IGSTPer)
                //     }
                //     var  totalIgstvalu = 0
                //     for(let i=0; i< totalIgstamt.length; i++) {
                //     totalIgstvalu +=totalIgstamt[i]
                //     }
                //     console.log(totalIgstvalu)
                //     //settotaltax(totalcgstvalu +totalcgstvalu)
                //     setTOtaligstamt(totalIgstvalu)
                    
                //     ////////////////console.log(totalamutdis)
                //     setTotal_discount_amt(totalamutdis)
                //     setTotalamountheader(totalamt)
                //     settotalamountvaluedata(totalamt)
                //     //////////////////console.log(totalcgstvalu)
                //     settotaltax(totalcgstvalu +totalcgstvalu)
                //     ////////////////console.log(indexofnum)
                //     setprovalue(removeproducts)
                //    setopen2(true)
                //   }
                // }
                // const deleteweb =  async(id)  => {
                //   console.log(id)
                //   if(window.confirm('Are You sure delete this product?')) {
                //     await axios.instance.delete(`DeleteSalsedtl/${id}`)
                //     .then((res)=>{
                //       console.log(res.data,"deleted");
                //     })
                //     getallsodetailcollections()
                   
                //   }
                // }
           
                                              
                  const Updateget =  async(id, id1)  => {
                    ////////////console.log(id)
                    setindexalueofupdate(id1)
                  
                  //setallpodetailscollections([])
                  setvisible(true)
                  setvtaper(false)
                  setTimeout(() => {
                  setVisiblespinner(false)
                 
  
                  }, 2000);
                  const datavalue  =  allpodetailscollections.filter(a => a.Product_Id  === id)
                  console.log(allpodetailscollections,'ttt')
                  console.log(datavalue,'ttt')
                  setProductonecollect(datavalue)
                  for(const data of datavalue) {
                     
                   console.log(data,'testdata')
                    
                    setupdatedqty(data.Order_Qty)
                  setupdatedamt(data.Rate)
                  setupdattax(data.GSTPer)
                  setupdatesgst(data.SGSTPer)
                  setupdateproductid(data.Product_Id)
                  setUomDesp(data.UOM_Description)
                  setupdatenetamt(data.Amount)
                  setproudctnameupdate(data.Product_Details_Description)
                  settaxidupdate(data.TaxId)
                  setIgstperupdate(data.IGSTPer)
                  setigstupdate(data.IGSTId)
                  setsgstupdatid(data.SGSTId)
                  setupdatecgst(data.SGSTId)
                  setuomupdateid(data.UOM_Id)
                  setdisperupdate(data.DisPer === undefined ? 0 : data.DisPer)
                  setdisamtupdate(data.DisAmt)
                  setdutyidupdate(data.Duty_Id)
                  setdutyperupdateid(data.DutyPer)
                  setTotal_cgst(data.Total_cgstamt)
                  setTotal_sgst(data.Total_sgstamt)
                  setTotal_Amount(data.Total_Amount)
                  }
                  }
                
                    
                      const editforproduct =  async(amt)  => {
  
                        setupdatedqty(amt)
                        if(disperupdate != 0) {
                        
                        
                        
                        var amounvalu =  (amt * updatedamt) 
                        
                        var discount =  amounvalu * disperupdate/100
                        var discouamt =  amounvalu - discount
                        setdisamtupdate(discount)
                        var gstof = ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igstperupdate: Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ?  updattax : Igstperupdate
                        var gstcal =  discouamt *gstof
                        var gstvalcal = gstcal/100
                        var gstvalue =  discouamt + gstvalcal
                        const valueformat = gstvalue
                        
                        setupdatenetamt(valueformat)
                   console.log(disperupdate)
                        var sgstval=  updattax /2
                        ////////////////console.log(sgstval)
                        var sgstamt =  discouamt * sgstval
                        var sgstcal =  sgstamt/100
                        var sgstvalue =  discouamt + sgstcal
                        const sgstamts =  sgstvalue
                        //setsgstamt(sgstamts)
                        setupdatesgst(sgstcal)
                        ////////////////console.log(sgstcal)
                        var cgstval=  updattax /2
                        var cgstamt =  discouamt * cgstval
                        var cgstcal =  cgstamt/100
                        var cgstvalue =  discouamt + cgstcal
                        const cgstamts =  numeral(cgstvalue).format('0,0.00')
                        //setcgstamt(cgstamts)
                        setupdatecgst(cgstcal)
                        ////////////////console.log(cgstvalue)
                        }else {
                        var amounvalu =  (amt * updatedamt) 
                        var gstof = ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igstperupdate :  Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ?   updattax : Igstperupdate
                        var gstcal =  amounvalu *gstof
                        var gstvalcal = gstcal/100
                        var gstvalue =  amounvalu + gstvalcal
                        const valueformat = gstvalue
                        
                        setupdatenetamt(valueformat)
                        //////////////////console.log(valueformat)
                        var sgstval=  updattax /2
                        ////////////////console.log(sgstval)
                        var sgstamt =  amounvalu * sgstval
                        var sgstcal =  sgstamt/100
                        var sgstvalue =  amounvalu + sgstcal
                        const sgstamts =  numeral(sgstvalue).format('0,0.00')
                        //setsgstamt(sgstamts)
                        setupdatesgst(sgstcal)
                        ////////////////console.log(sgstcal)
                        var cgstval=  updattax /2
                        var cgstamt =  amounvalu * cgstval
                        var cgstcal =  cgstamt/100
                        var cgstvalue =  amounvalu + cgstcal
                        const cgstamts =  numeral(cgstvalue).format('0,0.00')
                        //setcgstamt(cgstamts)
                        setupdatecgst(cgstcal)
                        ////////////////console.log(cgstvalue)
                        }
                        
                        }
                        const updateproduct =  async()  => {
                          setspinnerforsingleupdate(true)
                          let product = []
                          let productsvalue =  localStorage.getItem('Products1')
                          
                          //////////////////console.log(items)
                          // ////////////////console.log(items != null  )
                          if( productsvalue != null  ) {
                          const getdata = JSON.parse(productsvalue) 
                          for(const data of getdata){
                          // ////////////////console.log(data)
                          product.push(data)
                          
                          }
                          
                          }
                          ////////////////console.log(parseInt( updatedqty))
                          const totlaamoutns =  localStorage.getItem('Total_Amount')
                          const updateddatevalue = {
                          Order_no: 1,
                          Product_Id : parseInt(updateproductid),
                          Order_Qty: parseInt(updatedqty),
                          Rate: parseFloat(updatedamt),
                          TaxId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:  Statecodeee ===localStorage.getItem("COMPANY_STATECODE") ? parseInt(taxidupdate): 0,
                          GSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? updattax :0,
                          VAT_Percentage:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ?  updattax/2:0,
                          IGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?Igstperupdate: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0 : Igstperupdate ,
                          SGSTPer:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? updattax/2 : 0,
                          Discount:0,
                          Amount: updatenetamt,
                          Product_Details_Description: proudctnameupdate,
                          UOM_Id: uomupdateid,
                          DisPer: disperupdate,
                          DisAmt:disamtupdate,
                          SGSTId:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE")? sgstupdatid : 0,
                          IGSTId: ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?igstupdateid :Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? igstupdateid : 0,
                          ConQty: 1,
                          DutyPer:dutyperupdateid,
                          Duty_Id:dutyidupdate,
                          PriUOM_Id:uomupdateid,
                          Total_Amount: totlaamoutns,
                          Total_cgst:  (totlaamoutns*updattax/100)/2,
                          Total_sgst: (totlaamoutns*updattax/100)/2,
                          UOM_Description: UomDesp,CST_Percentage:0,PoSlNo:0,OtherDesc:0
                          }
                             product[indexalueofupdate]  =  updateddatevalue
                          ////////////////console.log(product)
                          localStorage.setItem('Products1',  JSON.stringify(product))
                          let Getprod =   localStorage.getItem('Products1')
                          // setprovalue(Getprod)
                          const getdelteddate =   localStorage.getItem('Products1')
                          let removeproducts = JSON.parse(getdelteddate)
                          ////////////////console.log(removeproducts)
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
                          //////////////////console.log(totalcgstvalu)
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
                          ////////////////console.log(totaltdisamt)
                          var  totalamutdis = 0
                          for(let i=0; i< totaltdisamt.length; i++) {
                          totalamutdis +=totaltdisamt[i]
                          }
                          ////////////////console.log(totalamutdis)
                          setTotal_discount_amt(totalamutdis)
                          let totalIgstamt = []
                          for(const data of removeproducts) {
                          totalIgstamt.push((data.Rate * data.Order_Qty-data.DisAmt) * data.IGSTPer/100)
                          ////////////////console.log('igst', data.IGSTPer)
                          }
                          var  totalIgstvalu = 0
                          for(let i=0; i< totalIgstamt.length; i++) {
                          totalIgstvalu +=totalIgstamt[i]
                          }
                          console.log(totalIgstvalu)
                          //settotaltax(totalcgstvalu +totalcgstvalu)
                          setTOtaligstamt(totalIgstvalu)
                          
                       
                          
                          let prodvalues = JSON.parse(Getprod)
                      console.log(prodvalues)
                          setallpodetailscollections(prodvalues)
                           spinerss123()
                          
                          setspinnerforsingleupdate(false)
                          setsingleupdateproductssspiners(true)
                          setTimeout(() => {
                            setsingleupdateproductssspiners(false)
  
                          }, 2000);
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
  
  const spinerss = () => {
    setsavespinners(true)
  
    setTimeout(() => {
      setopeecreate1(true)
  
      setsavespinners(false)
      setTimeout(() => {
        history.push('/viewpo')
        setopeecreate1(false)
  
      }, 1000);
  
  
    }, 2000);
  }
       
  
  const spinerss12 = () => {
    setsavespinners(true)
  
    setTimeout(() => {
      setopeecreate1(true)
  
      setsavespinners(false)
      setTimeout(() => {
        history.push('/salesorder')
        setopeecreate(false)
  
      }, 1000);
  
  
    }, 2000);
  }
  const spinerss123 = () => {
    setsavespinners(true)
  
    setTimeout(() => {
      setsingleupdateproductssspiners(true)
  
      setsavespinners(false)
      setTimeout(() => {
        //history.push('/salesorder')
        setopeecreate(false)
  
      }, 1000);
  
  
    }, 2000);
  }

  const spinerss1 = () => {
    setsavespinners(true)
  
    setTimeout(() => {
      setopeecreate(true)
  
      setsavespinners(false)
      setTimeout(() => {
        history.push('/salesorder')
        setopeecreate(false)
  
      }, 1000);
  
  
    }, 2000);
  }
  const Getallsuppliervalue = async() => {
    const token =   localStorage.getItem('AuthToken')
    const get= await axios.instance.get(`/Getallcustomer/${localStorage.getItem('Companyid')}`,{ headers: {'Authorization':token,
    'Content-Type': 'application/json',
    
    }}).then((res) => {
      
      const data  =res.data
      const options = data.map(b => ( {
      'label' : b.Customer_Name,
      'value' : b.Customer_Id
      }))

setallsupplierinfo(options)
    })
    }
    const Getallporefnos = async(id,) => {
        const token =   localStorage.getItem('AuthToken')
        const get= await axios.instance.get(`/Getallporefno/${localStorage.getItem('Companyid')}/${id}`,{ headers: {'Authorization':token,
        'Content-Type': 'application/json',
        
        }}).then((res) => {
          ////////////console.log(res.data,'test')
          const data  =res.data
          const options = data.map(b => ( {
          'label' : b.Order_NO,
          'value' : b.Order_ID
          }))
    
    setallporefnos(options)

        })
        }


        const getallpohder = async(id) => {
          const token =   localStorage.getItem('AuthToken')
          const get= await axios.instance.get(`/Getallpohdr/${id}`,{ headers: {'Authorization':token,
          'Content-Type': 'application/json',
          
          }}).then((res) => {
            console.log(res.data,'pohd')
           setallpoheadercollections(res.data)
           let totaltamt = []
           for(const data of res.data) {
           totaltamt.push(data.TOTAL_AMOUNT)
           }
           var  totalamt = 0
           for(let i=0; i< totaltamt.length; i++) {
           totalamt +=totaltamt[i]
           }
           setTotalamountheader(totalamt)
           let totaltdisamt = []
           for(const data of res.data) {
             totaltdisamt.push(data.DISCOUNT_AMOUNT)
           }
           ////////////////console.log(totaltdisamt)
           var  totalamutdis = 0
           for(let i=0; i< totaltdisamt.length; i++) {
             totalamutdis +=totaltdisamt[i]
           }
           ////////////////console.log(totalamutdis)
           setTotal_discount_amt(totalamutdis)
           for(const data of res.data) {
            setremark(data.REMARKS)
            settoodate(moment(data.Delivery_Date,'DD/MM/YYYY').format('YYYY-MM-DD'))
            setorderno(data.Order_NO)
            setEditCustomerid({label:data.Customer_Name,value:data.Customer_Id})
            setsuppliid(data.Customer_Id)
            setcusnameforparams(data.Customer_Name)
            setcusidforparams(data.Customer_Id)
            setponoforparams(data.Order_NO)
            setorderidforparams(data.Order_ID)
          }
   
          })

         
          }
          const getonsaleorderheader = async(id) => {
            const token =   localStorage.getItem('AuthToken')
            const get= await axios.instance.get(`/Getonesalesorderhdr/${id}`,{ headers: {'Authorization':token,
            'Content-Type': 'application/json',
            
            }}).then((res) => {
              ////////////console.log(res.data,'pohd')
             setallpoheadercollections(res.data)
             let totaltamt = []
             for(const data of res.data) {
             totaltamt.push(data.TOTAL_AMOUNT)
             }
             var  totalamt = 0
             for(let i=0; i< totaltamt.length; i++) {
             totalamt +=totaltamt[i]
             }
             setTotalamountheader(totalamt)
             let totaltdisamt = []
             for(const data of res.data) {
               totaltdisamt.push(data.DISCOUNT_AMOUNT)
             }
             ////////////////console.log(totaltdisamt)
             var  totalamutdis = 0
             for(let i=0; i< totaltdisamt.length; i++) {
               totalamutdis +=totaltdisamt[i]
             }
             ////////////////console.log(totalamutdis)
             setTotal_discount_amt(totalamutdis)

             for(const data of res.data){
              setpono(data.Order_No)
              setdeliverdate(data.Order_Date)
              setpodeliverdate(data.Delivery_Date)
              setcusname(data.Customer_Name)
              setporeferid1(data.Cust_PO_Ref)
              setremark1(data.Remarks)
              
              
             }
            })
            }
  

          const getallsodetailcollections = async() => {
            const token =   localStorage.getItem('AuthToken')
            const get= await axios.instance.get(`/Getonesalesorderdetail/${props.match.params.id}`,{ headers: {'Authorization':token,
            'Content-Type': 'application/json',
            
            }}).then((res) => {
              console.log(res.data,'Detail')
             setallpodetailscollections1(res.data)
             setallpodetailscollections(res.data)

             let qtytotal = []
  
             for(const data of res.data){
               qtytotal.push(data.Order_Qty)
             }
             var qtyvalue = 0 
                 for (let i = 0; i < qtytotal.length; i++) {
                   qtyvalue += qtytotal[i];
               }
               ////////////console.log(qtyvalue)
               settotalqty(qtyvalue)
              
              
               let taxtotal = []
               for(const data of res.data) {
               taxtotal.push(data.GSTPer)
               }
               var taxvalue = 0
               for(let i =0; i< taxtotal.length; i++) {
               taxvalue += taxtotal[i]
               }
               //AsyncStorage.setItem('Toataltax', taxvalue.toString())
               let  totalnetamount = []
               for(const data of res.data) {
                 totalnetamount.push(data.Amount )
               }
               var totalnetcount = 0
               for(let i =0; i< totalnetamount.length; i++) {
                 totalnetcount += totalnetamount[i]
               }
               ////////////console.log(qtyvalue)
               settotalamt(totalnetcount)
                let totaltdisamt = []
             for(const data of res.data) {
               totaltdisamt.push(data.DISCOUNT_AMOUNT)
             }
             ////////////////console.log(totaltdisamt)
             var  totalamutdis = 0
             for(let i=0; i< totaltdisamt.length; i++) {
               totalamutdis +=totaltdisamt[i]
             }
             ////////////////console.log(totalamutdis)
             setTotal_discount_amt(totalamutdis)
            })
            }
          const Getallpodetils = async(porefid) => {
            setsavespinners(true)
            setTimeout(() => {
              setsavespinners(false)
            }, 2000);
            const token =   localStorage.getItem('AuthToken')
            const get= await axios.instance.get(`/Getallpodetailsrefno/${porefid}`,{ headers: {'Authorization':token,
            'Content-Type': 'application/json',
            
            }}).then((res) => {
              console.log(res.data,"alldetails");
              ////////////console.log(res.data,'podtl')


              // let product =  []
            
              // let prod =   localStorage.getItem('Products')
              // const getdata = JSON.parse( res.data ) 
          //    // //console.log(prod)
          //  if(  localStorage.getItem('Products')  ) {
          //   const getdata = JSON.parse( prod ) 
          //  for(const data of getdata){
          //    ////console.log(data)
          //   product.push(data)
              
          //   }
          //    }

          localStorage.setItem('Products1', JSON.stringify(res.data))
             setallpodetailscollections(res.data)
             let qtytotal = []
  
             for(const data of res.data){
               qtytotal.push(data.Order_Qty)
             }
             var qtyvalue = 0 
                 for (let i = 0; i < qtytotal.length; i++) {
                   qtyvalue += qtytotal[i];
               }
               ////////////console.log(qtyvalue)
               settotalqty(qtyvalue)
              
              
               let taxtotal = []
               for(const data of res.data) {
               taxtotal.push(data.GSTPer)
               }
               var taxvalue = 0
               for(let i =0; i< taxtotal.length; i++) {
               taxvalue += taxtotal[i]
               }
               //AsyncStorage.setItem('Toataltax', taxvalue.toString())
               let  totalnetamount = []
               for(const data of res.data) {
                 totalnetamount.push(data.Amount )
               }
               var totalnetcount = 0
               for(let i =0; i< totalnetamount.length; i++) {
                 totalnetcount += totalnetamount[i]
               }
               ////////////console.log(qtyvalue)
               settotalamt(totalnetcount)

              let totalIgstamt = []
              for(const data of res.data) {
                totalIgstamt.push(data.Rate * data.Order_Qty * data.IGSTPer/100)
              ////////////////console.log('igst', data.IGSTPer)
              }
              var  totalIgstvalu = 0
              for(let i=0; i< totalIgstamt.length; i++) {
              totalIgstvalu +=totalIgstamt[i]
              }
              console.log(totalIgstvalu)
              //settotaltax(totalcgstvalu +totalcgstvalu)
              setTOtaligstamt(totalIgstvalu)
               
            })
            }

const porefid = (id) => {
setporeferid(id)
  if(!props.match.params.id){
     getallpohder(id)
//   Getallpodetils(id)
 }
 

}

  const pdfcreate =  async(id)  => {
    const tokent  =   localStorage.getItem('authtoken')
    const branccc = await axios.instance.get(`/Createpdf/${id}`, { headers: {'Authorization': tokent
    , 'Content-Type': 'application/json'}})
    //////////////console.log(branccc.data)
  }
  const save = async()  => {
    ////////////console.log(localStorage.getItem('balance') > 0)
                     
  
                          
                            if(provalue.length !=0) {
                              if(localStorage.getItem('balance') > 0) {
                              
                            let prodvalue = []
                            const token =   localStorage.getItem('AuthToken')
                            
                            const productsvalue =    localStorage.getItem('Products1')
                            let product =  JSON.parse(productsvalue)
                    
                            prodvalue.push(product)
                            
                            
                            const customerid =   localStorage.getItem('Customer_Log')
                            const Branchlog =   localStorage.getItem('Branch_Log')
                            const TOTALQTY =   localStorage.getItem('Totalqty')
                            const TOTALTAX =   localStorage.getItem('Toataltax')
                            const TOTALAMT =   localStorage.getItem('Totalamt')
                            const netamountvalue = numeral(TOTALAMT).format('0')
                           
                            
                            const totalnetamt =   localStorage.getItem('TotalnetMT')
                            const statecode =   localStorage.getItem('StateCode')
                            const stateid =   localStorage.getItem('StateId')
                            const createdby =  localStorage.getItem('Userid')
                            const companyid =     localStorage.getItem('Companyid')
                            const statename =  localStorage.getItem('Statename')
                          
                            const cgstamtvalues =   localStorage.getItem('Totalcgst')
                            const sgstamtvalues =   localStorage.getItem('Totalsgst')
                            const igstamtvalues =   localStorage.getItem('Totaligst')
                            
                            const Total_Amount = localStorage.getItem('Total_Amount')
                            const createpohed =  axios.instance.post('/POHdr',  {
                            
                            Order_Date: new Date(),
                            Delivery_Date:toodate,
                            Company_id:companyid,
                            Customer_Id: customerid,
                            Remarks: remark.length !=0  ? remark : '',
                            Total_Amount:Totalamountheader,
                            Vat_Amount:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,
                            Discount_Amount:Total_discount_amt,
                            Net_Amount: totalamt,
                            Created_by:createdby,
                            Created_on:fromdatetr,
                            Cus_Branchid:Branchlog,
                            CurrencyId:1,
                            Branch_Id:Branchlog,
                            CBranch_Id:Branchlog,
                            StateId: Statecodeee,
                            PlaceofSupply:'tamilnadu',
                            StateCode:Statecodeee,
                            SGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,
                            IGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?TOtaligstamt:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0 : TOtaligstamt ,
                            Indent_id:"",
                            Contract_id:localStorage.getItem('contract_ID')
                            },{ headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                            }}).then((res)  => {
                       spinerss()
                            for(const data of res.data) {
                             let orderid =  data.Order_Id
                             localStorage.setItem('Order_Id', orderid)
                           
                            }
                            }).then(async()  => {
                           
                            const Orderid =   localStorage.getItem('Order_Id')
                         
                            for(const data of product){
                            const productcoll = Object.assign(data, {Order_Id: parseInt(Orderid),OpType:'New'})
                        
                            const createpohed = await axios.instance.post('/PODtl', productcoll
                            
                             ,{ headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                             }})
                         
                           
  
                            }
                         
                            setTotalamountheader('')
                            settotaltax('')
                            settotalqty('')
                            settotalamt('')
                            }).then(() => {
                            
                            })
                            //pdfcreate(localStorage.getItem('Order_Id'))
                            purchasepo()
  
                            if(localStorage.getItem('Approval2') === 'N' && localStorage.getItem('Approval3') === 'N' && localStorage.getItem('AdminUser') === 'N') {
                              SendMail()
                             }                       
                         
  
                            localStorage.removeItem('Products')
                            setprovalue([])
                            settodatetr(new Date())
                            setremark('')
                            
                          
                          
                            setTimeout(() => {
                            setPoshow(true)
                          
                          
                     
                            }, 2000);
                          //  
                      
                            setTimeout(() => {
                             
                              setopeecreate1(false)
                            }, 2000);
                          }else {
                          
                            setOutoffRange(true)
                            setTimeout(() => {
                              setOutoffRange(false)
                            }, 2000);
  
                         }
                            }else {
                              setopen4(true)
                             setTimeout(() => {
                               setopen4(false)
                             }, 2000);
                            }
                         
                            }
                            const save1 = async()  => {
                              ////////////console.log(remarks)
                            
                            
                             
                              let prodvalue = []
                              const token =   localStorage.getItem('AuthToken')
                            
                              const productsvalue =    localStorage.getItem('Products1')
                              let product =  JSON.parse(productsvalue)
                             // ////////////////////console.log(product)
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
                            //////////////////////console.log(stateid)
                            const cgstamtvalues =   localStorage.getItem('Totalcgst')
                            const sgstamtvalues =   localStorage.getItem('Totalsgst')
                            const igstamtvalues =   localStorage.getItem('Totaligst')
                            const companybranchid = localStorage.getItem('combranch')
                            // const productcollectionvalue =  await AsyncStorage.setItem('Products')
                            // let products =  JSON.parse(productcollectionvalue)
                            const Totalamt =  localStorage.getItem('Total_Amount')
                            const createpohed = await axios.instance.put(`/Updatesalesorderhdr/${props.match.params.id}`,  {
                            //   Order_Id:parseInt( localStorage.getItem('Order_Id')),
                            // Order_Date: deliverdate,
                            // Delivery_Date:toodate,
                            // Company_id:customerid,
                            // Customer_Id: customerid,
                            // Remarks: remark !=null ? remark : ' ',
                            // Total_Amount:totalamountvaluedata,
                            // Vat_Amount:Statecodeee === '33' ?  totaltax/2 : 0,
                            // Discount_Amount:Total_discount_amt,
                            // Net_Amount: totalamt,
                            // Created_by:createdby,
                            // Created_on:fromdatee,
                            // Cus_Branchid:Branchlog,
                            // CurrencyId:0,
                            // Branch_Id:Branchlog,
                            // CBranch_Id:Branchlog,
                            // StateId: Statecodeee,
                            // PlaceofSupply:'tamilnadu',
                            // StateCode:Statecodeee,
                            // SGSTAmt:Statecodeee === '33' ?  totaltax/2 : 0,
                            // IGSTAmt:Statecodeee === '33' ?  0 :  TOtaligstamt,
                            // Modified_by : 1,                          
                            // Modified_on : 1,
                            // Indent_id:"",
                            // Contract_id:parseInt(localStorage.getItem('contract_ID')),
                            // OpType:'Edit',


                            Order_Date:new Date(),
                            Delivery_Date:toodate,
                            Company_Id:localStorage.getItem('Companyid'),
                            Customer_Id:customerid1,
                            Remarks:remark.length !=0  ? remark : '',
                            Total_Amount:totalamountvaluedata,
                            Discount_Amount:Total_discount_amt,
                            Vat_Amount:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE")? totaltax/2 : 0,                                
                            CST_Amount:0,
                            Net_Amount:totalamt,
                            Branch_Id:Branchlog,
                            CBranch_Id:Branchlog ,
                            Dealivery_At:new Date(),
                            Created_by:localStorage.getItem('Userid'),
                            Created_on:new Date(),
                            APPROVED: 'Y',
                            Cust_PO_Ref:0,
                            Cust_PO_Ref_dt:new Date,          
                            Type:"",
                            SalesMan_Id:localStorage.getItem('Userid'),
                           // prefix_order_no:0,
                            CurrencyId:1,
                            Approve:"Y",
                            ApproveDate:new Date(),
                            ApprovedBy:localStorage.getItem('Userid'),
                            DutyAmt:1,
                            So_TransType:"Local",
                            SoInvoiceType:"Local",
                            PIRef_No:0,
                            PIRef_Date:new Date(),          
                            LPO_Id:1,
                            StateId:Statecodeee,
                            PlaceofSupply:"Tamil Nadu",
                            StateCode:Statecodeee,
                            SGSTAmt: ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,
                            IGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?TOtaligstamt:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0 : TOtaligstamt,
                            RoundOff:0,
                            RoundOffAmt:0,
                            PORefId:1,Confirmed_Status:'Y'
                            },{ headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                            }}).then(async(res)  => {
                              setprovalue([])
                              // const productsvalue =  await  AsyncStorage.getItem('Products')
                              // let product =  JSON.parse(productsvalue)
                             //////console.log(res.data)
                              const deleteproduct =  await axios.instance.delete(`/DeleteSalsedtl/${props.match.params.id}`)
                              const productsvalue =    localStorage.getItem('Products1')
                              const Orderid =   localStorage.getItem('Order_Id')
                              let product =  JSON.parse(productsvalue)
                               console.log(productsvalue)
                               for(const data of product){
                                console.log(data,'tttttsss')
                                const productcoll = Object.assign( {
                                   Order_Id:localStorage.getItem('Salid'),
                                Product_Id:data.Product_Id,
                                UOM_Id:data.UOM_Id,
                                Order_Qty:data.Order_Qty,
                                Rate:data.Rate,
                                CST_Percentage:0,
                                VAT_Percentage:data.VAT_Percentage === '' ? 0 : data.VAT_Percentage ,
                                Discount:data.DisPer,
                                Amount:data.Rate * data.Order_Qty
                                ,PoSlNo:0,        
                            OtherDesc:0,
                            TaxId:data.TaxId,
                            PriUOM_Id:data.UOM_Id,
                            PriOrder_Quantity:data.Order_Qty,
                            PriRate:data.Rate,
                            ConQty:data.Order_Qty,
                            Act_UOM:data.UOM_Id,
                            Act_Rate:data.Rate,
                            Act_Qty:data.Order_Qty,
                            DisAmt:data.DisAmt,
                            DutyPer:0,
                            Duty_Id:0,
                            Lpo_Id:0,
                            Sec_UomId:data.UOM_Id,    
                            GSTPer:data.GSTPer,
                            SGSTId:  data.SGSTId,
                            SGSTPer: data.SGSTPer,
                            IGSTId:  data.IGSTId,
                            IGSTPer: data.IGSTPer},{Order_Id: parseInt(props.match.params.id),OpType:'New'})
                                  ////////console.log('test')
                                 
                                 ////////console.log(productcoll)
                               
                             
                               const createpohed = await axios.instance.post(`/Insertsalesorderdtl`, productcoll
                              
                                 ,{ headers: {'Authorization':token,
                                'Content-Type': 'application/json'
                                 }}).then((res) => {
                                 
                                 // localStorage.removeItem('Products1')
                             
                                 })
                                
                              // ////////console.log(createpohed.data)
                               
                                }
                            
                            }).then(() => {
                             
                            })
                            
                            
                            
                            
                            
                            spinerss1()
                          
                             setloading(true)
                            //  purchasepo()
                            //  if(localStorage.getItem('Approval2') === 'N' && localStorage.getItem('Approval3') === 'N' && localStorage.getItem('AdminUser') === 'N') {
                            //   SendMail()
                            //  }
    
                            settodate(new Date())
                            setopeecreate(true)
                         
                              setTimeout(() => {
                              setloading(false)
                             // setPoshow(true)
                             // setopeecreate(false)
                              
                              }, 3000);
                           
  setTimeout(() => {
  setopen4(false)
  }, 2000);
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
                            const Createpurchaseorder = async() => {
                              const companybranchid = localStorage.getItem('combranch')
                              const Branchlog =   localStorage.getItem('Branch_Log')
                              console.log(suppliid.length !=0,'suplier')
                              if(suppliid.length !=0){
                                for(const data of allpoheadercollections){
                                  console.log(data,'allpodetailscollections')
                                  const headervalues = Object.assign({
                                    OpType:'New',
                                   // Order_No:"",
                                    Order_Date:new Date(),
                                    Delivery_Date:toodate,
                                    Company_Id:localStorage.getItem('Companyid'),
                                    Customer_Id:suppliid,
                                    Remarks:remark.length !=0  ? remark : '',
                                    Total_Amount:Totalamountheader,
                                    Discount_Amount:Total_discount_amt,
                                    Vat_Amount:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,                                
                                    CST_Amount:data.CST_Amount,
                                    Net_Amount:(totalamt + parseFloat((allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.GSTPer))/100, 0)))),
                                    Branch_Id:0,
                                    CBranch_Id:Branchlog,
                                    Dealivery_At:toodate,
                                    Created_by:localStorage.getItem('Userid'),
                                    Created_on:new Date(),
                                    APPROVED: 'Y',
                                    Cust_PO_Ref:data.Order_NO,
                                    Cust_PO_Ref_dt:new Date,          
                                    Type:"",
                                    SalesMan_Id:localStorage.getItem('Userid'),
                                   // prefix_order_no:"SO-32",
                                    CurrencyId:1,
                                    Approve:"Y",
                                    ApproveDate:new Date(),
                                    ApprovedBy:0,
                                    DutyAmt:1,
                                    So_TransType:"Local",
                                    SoInvoiceType:"Local",
                                    PIRef_No:0,
                                    PIRef_Date:new Date(),          
                                    LPO_Id:1,
                                    StateId:Statecodeee,
                                    PlaceofSupply:"Tamil Nadu",
                                    StateCode:Statecodeee,
                                    SGSTAmt: ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? totaltax/2 : 0,
                                    IGSTAmt:((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?TOtaligstamt:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? 0 : TOtaligstamt,
                                    RoundOff:0,
                                    RoundOffAmt:0,
                                    PORefId:data.Order_ID,Confirmed_Status:'N'
                                
                                
                                 
                                  },{OpType:'New'})
                                const token =   localStorage.getItem('AuthToken')
                             const create  = await axios.instance.post(`/Insertsalesorderhdr`,headervalues 
                            
                             
                             ,{ headers: {'Authorization':token,
                             'Content-Type': 'application/json',
                            
                             },method:"post"}).then((res) => {
                             ////////////console.log('header', res.data)
                              for(const data of res.data) {
                               localStorage.setItem('Salid', data.Order_Id)
                              setpurchaseid(data.Order_Id)
                              console.log(data.Order_Id,"orderid")
                              
                              }
                          
                              }).then(async() => {
                               //setdailoa1(true)
                          
                                  const token =   localStorage.getItem('AuthToken')
                                //const  details = localStorage.getItem('Salescart')
                                const Orderid =   localStorage.getItem('Salid')
                              
                                for(const data of allpodetailscollections){
                                  console.log(data,'st')
                                  const productcoll = Object.assign({
                                    Order_Id:localStorage.getItem('Salid'),
                                    Product_Id:data.Product_Id,
                                    UOM_Id:data.UOM_Id,
                                    Order_Qty:data.Order_Qty,
                                    Rate:data.Rate,
                                    CST_Percentage:0,
                                    VAT_Percentage:data.VAT_Percentage === '' ? 0 : data.VAT_Percentage ,
                                    Discount:data.DisPer,
                                    Amount:data.Rate * data.Order_Qty
                                    ,PoSlNo:0,        
                                OtherDesc:0,
                                TaxId:data.TaxId,
                                PriUOM_Id:data.UOM_Id,
                                PriOrder_Quantity:data.Order_Qty,
                                PriRate:data.Rate,
                                ConQty:data.Order_Qty,
                                Act_UOM:data.UOM_Id,
                                Act_Rate:data.Rate,
                                Act_Qty:data.Order_Qty,
                                DisAmt:data.DisAmt,
                                DutyPer:0,
                                Duty_Id:0,
                                Lpo_Id:0,
                                Sec_UomId:data.UOM_Id,    
                                GSTPer:data.GSTPer,
                                SGSTId:  data.SGSTId,
                                SGSTPer: data.SGSTPer,
                                IGSTId:  data.IGSTId,
                                IGSTPer: data.IGSTPer
                                  }
                                    , {Order_Id: parseInt(Orderid),OpType:'New'})
                              const Dtl  =  await axios.instance.post(`/Insertsalesorderdtl`,productcoll
                              
                              
                              ,{ headers: {'Authorization':token,
                                'Content-Type': 'application/json',
                               
                                },method:"post"}).then(() => {
                                  console.log( 'called')
                               
                                  // setTimeout(() => {
                                  //   history.push('/Salesorder')
                                   
                                  //   }, 3000);
                                  Updatepurchseorderdts()
                                  spinerss12()
                              })
                            
                             
                            
                             
                        
                                
                              }
                             // SendMail()
                          
                            
                            })
                          }
                          }else{
                            if(suppliid.length === 0) {
                          setsuppliererror(true)
                            }
                            setTimeout(() => {
                          setsuppliererror(false)
                             }, 2000);
                           
                          
                              }

                             

                            }

                           

                            const Updatepurchseorderdts = async() => {
                         
                             //////////////////console.log("test",purchsdtlid )
                             const token =   localStorage.getItem('AuthToken')
                               const create  = await axios.instance.put(`/Updatepoconfirmstatus/${poreferid}`, {
                            
                                Confirmed_Status:'Y',
                                POStatus:"Sales order Raised",
                                Closed:'Y',

                                
                               
                            
                               },{ headers: {'Authorization':token,
                               'Content-Type': 'application/json',
                               
                               }}).then((res) => {
                                 console.log(res.data)
                                 //////////////////console.log('header', res.data)
                                 //toggle()
                                // Getallsuppliervalue()
                                // setprodupdata(true)
                               
                                })
                             
                               
                           }

                           const getcompanystatecode=async(cusid)=>{
                            const token =   localStorage.getItem('AuthToken')
                            const getdash = axios.instance.get(`/Cus/${cusid}`, { headers: {'Authorization':token,
                            'Content-Type': 'application/json'
                            }}).then((res) => {
                       
                           
                           
                       
                            for(const data of  res.data) {
                            
                              localStorage.setItem('Companyid', data.Company_Id)
                              
                              localStorage.setItem('combranch', data.combranch)
                              localStorage.setItem('StateId', data.StateId)
                              localStorage.setItem('Statename', data.State)
                             localStorage.setItem('StateCode', data.StateCode)
                             localStorage.setItem('COMPANY_STATECODE', data.COMPANY_STATECODE)
                             localStorage.setItem('IGSTApplicable', data.IGSTApplicable)
                             localStorage.setItem('RegisterType', data.RegisterType)
                       
                            //console.log('test', data.StateCode)
                            }
                           })
                           }
                           
  
    return (
      <>
      {!props.match.params.id ? (
      <div>
       
        <Backdrop  open={savespinners} className={classes.backdrop} >
      
             
      <Spinner name="ball-spin-fade-loader"  color='#fafafa' />
      
      </Backdrop>
        <Card className="titledefects">
          <CardBody>
            <h6>Sales Order</h6>
          </CardBody>
        </Card>
      </div>
      ):
      <div>
      <Card className="titledefects">
        <CardBody>
          {/* {localStorage.getItem('editflag')  === 1? (
          <h6> Update Sales Order</h6>
          ):         <h6>  Sales Order View</h6>
        } */}
        </CardBody>
      </Card>
    </div>}
  
  {!props.match.params.id || (props.match.params.id && props.match.params.id1 && props.match.params.id2)? (  
      <div >
        <Card className="hedercard">
        <div className="InspectionReportForm">
          {/* <div className="poss"><b>Order  No:</b></div>
          <Input  className="Todates" type='text' style={{width:'50px'}} value={orderno}  disabled />  */}
  
          <label className="poss1"><b>Order Date</b></label>
          <div  className="Todate">
        
          <Input type='date' value={todate1} id="fromdate"  disabled /> 
  
            
              </div>
              <div className="Deliveryss">
              <lable ><b>Delivery Date</b></lable>
              </div>
              <div  className="Todate">
              
              <Input type='date'  
              // min={Mindate} 
              value={toodate} id="fromdate" onChange={(e) => settoodate(e.target.value)} /> 
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
        {vtaper &&
        <Card className="subcard">
      
          <div className="headersub">
        <div className="closebutton">
        
        </div>
        
        </div> 
      
        <form id="subfom">
          <CardBody>
          
          <div className="cardcontent">
          <div className='cardwidhdd'>
         
  </div>
  <div className="major18">
          {!props.match.params.id?
          <>
          <label><b>Customer</b> </label>
          <Select
                                  options={allsupplierinfo}
                       classNamePrefix="select2-search-disable"
                       onChange={(value)=> {getbuyers(value.value)
                        getcompanystatecode(value.value)
                        setSelectedPORefNo({label:"Select...",value:""})
                      }}
                     />   
          {suppliererror ? <p className='error' style={{color:"red"}}>please select customer</p> : null}
          </>
                     :
          <>
          <label><b>Customer</b> </label>
          <Select
        
              value={EditCustomerid} 

          />   
          </>

                    }      
                     
        </div>
        <div className="major181">
          {!props.match.params.id?
          <>
            <label><b>PO RefNos</b> </label>
            <Select
              options={allporefnos}
              classNamePrefix="select2-search-disable"
              value={SelectedPORefNo.label}
              onChange={(value)=> {
                porefid(value.value)
                Getallpodetils(value.value)
                console.log(value.label,"value")
                setSelectedPORefNo(value.label)
              }}
              
              
            />  
          </>
          :
          <>
            <label><b>PO RefNo</b> </label>
            <Input
              value={ponoforparams}
            />  
          </>
          }
                      
                           
        </div>
        {/* <div className="major14">
          <label><b>Qty</b> </label>
          <input type="text" value={qty} onChange={e => amountcal(e.target.value)}  placeholder="Qty" className="pleacadu"  />
         
        </div>
        <div className="major14">
          <label> <b>Uom</b> </label>
          <input type="text" value={uom} disabled   placeholder="Uom" className="pleacadu"   />
        </div>
        <div className="major15">
          <label><b>Rate</b></label>
          <input type="number"  disabled  value={amount}  placeholder=" Rate"  />
        </div>
        <div className="major15">
          <label><b>Dis%</b></label>
          <input type="number" value={discount} disabled  placeholder=" Dis%" />
        </div>
        <div className="major15">
          <label><b>Tax%</b></label>
          <input type="number" value= {Statecodeee === '33' ? tax : Igst}  disabled  placeholder=" Tax%" />
        </div>
        <div className="major15">
          <label><b>Amount</b></label>
          <input type="number" disabled value={numeral(netamount).format('0,0.00')} placeholder="Amount" />
        </div> */}
        <div>
          
        </div>
        {/* <div className='adbutons'>
                       <Button1  
                        // onClick={Getallpodetils} 
                         color="primary" className="adbtn2"  >
     Load
  </Button1>
  </div> */}
        </div>
        
        <div style={{display:'flex', flexDirection:'row',}} >   
     <p style={{color:'red', marginLeft:100, fontSize:15}}>{producterror}</p>
    <p style={{color:'red', marginLeft:50, fontSize:15}}>{qtyerror}</p>
  </div>
       
          
  
  
          </CardBody>
          </form>
        </Card>
  }
        {visible &&
        <Card className="subcard">
        <div className="headersub">
      <div className="closebutton">
      
      </div>
      
      </div> 
      <form id="subfom">
        
        <CardBody>
        <div className="cardcontent">
          {Productonecollect.map((data)  => (
          <div className='cardwidhdd'>
            <div className="major14">
            <label for="exampleSelect" className ><b>Products</b></label>
           
            {/* <Select  defaultInputValue='' options={Productcollection}  defaultValue={{ 'label': "Select product", 'value': '' }}  width={50} onChange={(value) => getoneproduct(value.value)}  /> */}
            <input type="text"  value={data.Product_Details_Description}  disabled  placeholder=" Tax%" />
  </div>
  </div>
          ))}
        <div className="major14">
          <label><b>Qty</b> </label>
          <input type="number" value={updatedqty} onChange={(e) => editforproduct(e.target.value)}  placeholder="Qty" className="pleacadu"  />
         
        </div>
        {Productonecollect.map((data)  => (
        <div className="major14">
          <label> <b>Uom</b> </label>
          <input type="text" value={data.UOM_Description} disabled   placeholder="Uom" className="pleacadu"   />
        </div>
        ))}
        {Productonecollect.map((data)  => (
        <div className="major15">
          <label><b>Rate</b></label>
          <input type="number"  disabled  value={numeral(data.Rate).format('0,0.00')}  placeholder=" Rate"  />
        </div>
        ))}
         {Productonecollect.map((data)  => (
        <div className="major15">
          <label><b>Dis%</b></label>
          <input type="number" value={discount} disabled  placeholder=" Dis%" />
        </div>
          ))}
           {Productonecollect.map((data)  => (
        <div className="major15">
          <label><b>Tax%</b></label>
          <input type="number" value= {((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?data.IGSTPer:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? data.GSTPer : data.IGSTPer}  disabled  placeholder=" Tax%" />
        </div>
            ))}
            
        <div className="major15">
          <label><b>Amount</b></label>
          <input type="number" disabled value={updatenetamt} placeholder="Amount" />
        </div>
         
        <div>
         
        </div>
       
        <div className='adbutons'>
                       <Button1   onClick={updateproduct}  color="primary" className="adbtn2"  >
     Update
  </Button1>
  
  </div>
   
   </div>
     
      <div style={{display:'flex', flexDirection:'row',}} >   
   <p style={{color:'red', marginLeft:10, fontSize:15}}>{producterror}</p>
  <p style={{color:'red', marginLeft:10, fontSize:15}}>{qtyerror}</p>
  </div>
     
        
  
  
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
             <Button1   onClick={e=>{Createpurchaseorder()
             console.log("clicked")}
             } color="success" className="adbtn2"  >
     Save
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
             
             
  {/* <TableCell align="left">Edit</TableCell>
  <TableCell align="left">
  Delete
  </TableCell> */}
  <TableCell align="left">
  
  </TableCell>
              
            </TableRow>
       
  
          </TableHead>
          <TableBody>
          {allpodetailscollections.length !=0 ?  (     changepage().map((data,index) => (
         
              <TableRow >
                 <TableCell width="200px"  align="left" >
                {index+1}
                </TableCell>
                <TableCell  width="200px"  align="left" >
                {data.Product_Details_Description}
                </TableCell>
           
                <TableCell width="200px"   align="left" >
                {data.Order_Qty}
                </TableCell>
                <TableCell width="200px"   align="left" >{data.Act_UOMDesc}</TableCell>
                <TableCell  width="170"  align="left">
                {numeral(data.Rate).format('0,0.00')}
                </TableCell>
              
                <TableCell  width="200px"  color="red"  align="left"    >
                {data.DisPer}
                </TableCell>
                
                <TableCell  color="red"  align="left" width="170"    >
                {data.GSTPer !=0 ?  data.GSTPer : data.IGSTPer}%
                </TableCell>
                
                <TableCell  color="red"  align="left" width="100"    >
                {numeral(data.Amount).format('0,0.00')}
                </TableCell>
                {/* <TableCell  color="red"  align="center" width="100"    >
                <IconButton size="small"  color="primaty" onClick={() =>  Updateget(data.Product_Id, index)}>
                    <EditIcon  fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell  color="red"  align="center" width="100"    >
                <IconButton 
                // onClick={(e) =>  deleteweb(data.Product_Id, e)} 
                size="small" color="secondary"  >
                    <CloseIcon  fontSize="small" />
                  </IconButton  >
                </TableCell> */}
                <TableCell  color="red"  align="center" width="100"    >
                
                </TableCell>
  
              </TableRow>
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
        
        <TableRow >
        <TableCell  align="left"></TableCell>
      
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>Discount</Badge></TableCell>  
       
        <TableCell  align="left"><b>{(Total_discount_amt)}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>SGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: localStorage.getItem("StateCode") === localStorage.getItem("COMPANY_STATECODE")?numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>CGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:localStorage.getItem("StateCode") === localStorage.getItem("COMPANY_STATECODE")?numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>IGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00'):localStorage.getItem("StateCode") === localStorage.getItem("COMPANY_STATECODE")? 0: numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00')}</b></TableCell>
        {(localStorage.getItem("StateCode")) === (localStorage.getItem("COMPANY_STATECODE"))?
        <>
       
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>NET_AMT</Badge></TableCell>
        <TableCell  align="left"><b>{numeral((allpodetailscollections.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100 +(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100,0))-Total_discount_amt).format('0,0.00')}</b></TableCell>
        </>
        :
        <>
         <TableCell  align="left"><b>NET_AMT</b></TableCell>
        <TableCell  align="left"><b>{numeral((allpodetailscollections.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100,0))-Total_discount_amt).format('0,0.00')}</b></TableCell>


        </>
        
        }
        <TableCell></TableCell>
        


      </TableRow>
          </TableBody>
        </Table>
        
      </TableContainer>
      
      
      <TablePagination
          component="div"
          rowsPerPageOptions={pages}
          count={allpodetailscollections.length}
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
              open={OutoffRange}
              autoHideDuration={2000}
              onClose={handleClose}
            
  
            >
   <Alert onClose={handleClose} severity="error">
   Available Balance Out of Range
    </Alert>
              </Snackbar>
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
            open={singleupdateproductssspiners}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Product updated successfully"
  
          />
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
    <Backdrop  open={spinnerforpo} className={classes.backdrop} >
      
             
      <Spinner name="ball-spin-fade-loader"  color='#fafafa' />
      <p style={{marginTop:'50px'}}>Po is processing...</p>
      
      </Backdrop>
  
      <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={opeecreate1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="SO added successfully"
  
          />
      </div>
      ): 
      
      <div >
         <Backdrop  open={savespinners} className={classes.backdrop} >
      
             
      <Spinner name="ball-spin-fade-loader"  color='#fafafa' />
      
      </Backdrop>
      <Card className="hedercard">
      <div className="InspectionReportForm">
        {(props.match.params.id)?
        <div className="poss"><b>SO NO:</b><b>{pono}</b></div>
        :
        <div className="poss"><b>Po No:</b><b>{pono}</b></div>
        }
        
        <label className="poss1"><b>PO Date</b></label>
        {(props.match.params.id)?
        <div  className="Todate">
          <Input type='date' value={moment(deliverdate).format('YYYY-MM-DD')} id="fromdate" disabled  /> 
        </div>
        :
        <div  className="Todate">
          <Input type='date' value={moment(deliverdate).format('YYYY-MM-DD')} id="fromdate" disabled  /> 
        </div>
         }
            <div className="Deliveryss">
            <lable ><b>Delivery Date</b></lable>
            </div>
            {(props.match.params.id)?
            <div  className="Todate">
            <Input type='date'  value={moment(podeliverdate).format('YYYY-MM-DD')}  id="fromdate" disabled /> 
            </div>
            :
            <div  className="Todate">
            <Input type='date' min={moment (new Date()).format('YYYY-MM-DD')} value={toodate} id="fromdate" onChange={(e) => settoodate(e.target.value)} /> 
            </div>
            }
        <div className="tearmsconditions">
        <Label className="termslables" for="exampleDate"><b>Terms&conditions</b></Label>
                  <Input
                
                value={remark1}
                onChange={(e)=> setremark1(e.target.value)}
                    id="exampleDate"
                    placeholder="Terms&conditions"
                  
                  />
        </div>
        </div>
      </Card>
      <Paper>
        {vtaper &&
        <Card className="subcard">
          <div className="headersub">
        <div className="closebutton">
        
        </div>
        
        </div> 
        <form id="subfom">
         { parseInt(localStorage.getItem('editflag')) === 1 &&
          <CardBody>
            <div className="cardcontent">
          <div className='cardwidhdd'>
         
  </div>
  

  
  <div className="major18">
          <label><b>Customer</b> </label>
          {(props.match.params.id)?
          <input type='text' value={cusname}></input>
          :
          <Select
                                  options={allsupplierinfo}
                       classNamePrefix="select2-search-disable"
                       onChange={(value)=> {
                        getbuyers(value.value)
                        setcustomerid1(value.value)
                      }}
                     />
          }
            </div>
  
        <div className="major181">
          <label><b>PO RefNo</b> </label>
          {(props.match.params.id)?
          <input type='text' value={poreferid1}></input>
          :
          <Select
                                  options={allporefnos}
                       classNamePrefix="select2-search-disable"
                       onChange={(value)=> porefid(value.value)}
                     />   
          }  
        </div>
        {/* <div className="major14">
          <label><b>Qty</b> </label>
          <input type="text" value={qty} onChange={e => amountcal(e.target.value)}  placeholder="Qty" className="pleacadu"  />
         
        </div>
        <div className="major14">
          <label> <b>Uom</b> </label>
          <input type="text" value={uom} disabled   placeholder="Uom" className="pleacadu"   />
        </div>
        <div className="major15">
          <label><b>Rate</b></label>
          <input type="number"  disabled  value={amount}  placeholder=" Rate"  />
        </div>
        <div className="major15">
          <label><b>Dis%</b></label>
          <input type="number" value={discount} disabled  placeholder=" Dis%" />
        </div>
        <div className="major15">
          <label><b>Tax%</b></label>
          <input type="number" value= {Statecodeee === '33' ? tax : Igst}  disabled  placeholder=" Tax%" />
        </div>
        <div className="major15">
          <label><b>Amount</b></label>
          <input type="number" disabled value={numeral(netamount).format('0,0.00')} placeholder="Amount" />
        </div> */}
        <div>
          
        </div>
          {/* <div className='adbutons'>
                        <Button1   onClick={Getallpodetils}  color="primary" className="adbtn2"  >
      Load
    </Button1>
    </div> */}
        </div>
        
        <div style={{display:'flex', flexDirection:'row',}} >   
     <p style={{color:'red', marginLeft:100, fontSize:15}}>{producterror}</p>
    <p style={{color:'red', marginLeft:50, fontSize:15}}>{qtyerror}</p>
  </div>
          
  
  
          </CardBody>
  }
          </form>
        </Card>
  }
        {visible &&
        <Card className="subcard">
        <div className="headersub">
      <div className="closebutton">
      
      </div>
      
      </div> 
      <form id="subfom">
      {parseInt(localStorage.getItem('editflag'))=== 1 &&
        <CardBody>
       
        <div className="cardcontent">
          {Productonecollect.map((data)  => (
          <div className='major14'>
            <label for="exampleSelect" className ><b>Products</b></label>
           
            {/* <Select  defaultInputValue='' options={Productcollection}  defaultValue={{ 'label': "Select product", 'value': '' }}  width={50} onChange={(value) => getoneproduct(value.value)}  /> */}
            <input type="text"  value={data.Product_Details_Description}  disabled  placeholder=" Tax%" />
  </div>
          ))}
        <div className="major14">
          <label><b>Qty</b> </label>
          <input type="number" value={updatedqty} onChange={(e) => editforproduct(e.target.value)}  placeholder="Qty" className="pleacadu"  />
         
        </div>
        {Productonecollect.map((data)  => (
        <div className="major14">
          <label> <b>Uom</b> </label>
          <input type="text" value={data.UOM_Description} disabled   placeholder="Uom" className="pleacadu"   />
        </div>
        ))}
        {Productonecollect.map((data)  => (
        <div className="major15">
          <label><b>Rate</b></label>
          <input type="number"  disabled  value={numeral(data.Rate).format('0,0.00')}  placeholder=" Rate"  />
        </div>
        ))}
         {Productonecollect.map((data)  => (
        <div className="major15">
          <label><b>Dis%</b></label>
          <input type="number" value={discount} disabled  placeholder=" Dis%" />
        </div>
          ))}
           {Productonecollect.map((data)  => (
        <div className="major15">
          <label><b>Tax%</b></label>
          <input type="number" value= {((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?data.IGSTPer:Statecodeee === localStorage.getItem("COMPANY_STATECODE") ? data.GSTPer : data.IGSTPer}  disabled  placeholder=" Tax%" />
        </div>
            ))}
            
        <div className="major15">
          <label><b>Amount</b></label>
          <input type="number" disabled value={updatenetamt} placeholder="Amount" />
        </div>
         
        <div>
         
        </div>
      
        <div className='adbutons'>
  
                       <Button1   onClick={updateproduct}  color="primary" className="adbtn2"  >
     Update
  </Button1>
  </div>
  
        </div>
      
      <div style={{display:'flex', flexDirection:'row',}} >   
   <p style={{color:'red', marginLeft:-10, fontSize:15}}>{producterror}</p>
  <p style={{color:'red', marginLeft:40, fontSize:15}}>{qtyerror}</p>
  </div>
  
        
  
  
        </CardBody>
  }
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
           {  parseInt(localStorage.getItem('editflag')) === 1 ?(
           <Button1   onClick={save1} color="success" className="adbtn2"  >
   Update
  
  </Button1>
           ): null}
  </div>
           </Toolbar>
           {  parseInt(localStorage.getItem('editflag')) === 1 ?(
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
  {/* <TableCell align="left">Edit</TableCell>
  <TableCell align="left">
  Delete
  </TableCell> */}
  {/* <TableCell align="left">
  
  </TableCell> */}
            
          </TableRow>
     
  
        </TableHead>
        {allpodetailscollections.length !=0 ?  (  changepage().map((data,index) => (
        <TableBody>
        
            <TableRow >
           
            <TableCell  color="red"  align="left" width="170"    >
              {index+1}
              </TableCell>
              <TableCell width="200px" align="left" >
              {data.Product_Details_Description}
              </TableCell>
         
              <TableCell width="200px"  align="left" >
              {data.Order_Qty}
              </TableCell>
              <TableCell width="200px"  align="left" >
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
              {/* <TableCell  color="red"  align="center" width="100"    >
              <IconButton size="small"  color="primaty" onClick={() =>  Updateget(data.Product_Id, index)} >
                  <EditIcon  fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell  color="red"  align="center" width="100"    >
              <IconButton 
              // onClick={(e) =>  deleteweb(data.Product_Id, e)}
               size="small" color="secondary"  >
                  <CloseIcon  fontSize="small" />
                </IconButton  >
              </TableCell> */}
              <TableCell  color="red"  align="center" width="100"    >
              
              </TableCell>
  
            </TableRow>
            
        
      
      
        </TableBody>
        )) ) : (
          null
             )}
        <TableRow>
        <TableCell  align="left"></TableCell>
       
        <TableCell  align="left"><b>TotalQty</b></TableCell>
        <TableCell align="left" style={{color:'red'}}>{totalqty}</TableCell>
          <TableCell  align="left" ></TableCell>
          <TableCell  align="left" ></TableCell>
          <TableCell  align="left" style={{color:'red'}} ></TableCell>
          <TableCell  align="left" ><b>TotalAmount</b></TableCell>
          <TableCell  align="left" style={{color:'red'}} >{numeral(totalamt).format('0,0.00')}</TableCell>   
  
      <TableCell align="left">
  
      </TableCell>
          
        </TableRow> 
        <TableRow  >
        <TableCell  align="left"></TableCell>
      
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>Discount</Badge></TableCell>  
       
        <TableCell  align="left"><b>{(Total_discount_amt)}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>SGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE")?numeral(allpodetailscollections1.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>CGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE")?numeral(allpodetailscollections1.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell className='text-nowrap'  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>IGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?numeral(allpodetailscollections1.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00'):Statecodeee === localStorage.getItem("COMPANY_STATECODE")? 0: numeral(allpodetailscollections1.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00')}</b></TableCell>
        {Statecodeee === localStorage.getItem("COMPANY_STATECODE")?
        <>
       
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>NET_AMT</Badge></TableCell>
        <TableCell  align="left"><b>{numeral((allpodetailscollections1.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.GSTPer/2))/100 +(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.GSTPer/2))/100,0))).format('0,0.00')}</b></TableCell>
        </>
        :
        <>
         <TableCell  align="left"><b>NET_AMT</b></TableCell>
        <TableCell  align="left"><b>{numeral((allpodetailscollections1.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.Discount)/100))*(currentValue.IGSTPer))/100,0))).format('0,0.00')}</b></TableCell>


        </>
        
        }
        <TableCell></TableCell>
        


      </TableRow>

      </Table>
      ):<Table className="Qacats" aria-label="simple table">
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
      
      <TableBody>
      {allpodetailscollections.length !=0 ?  (     changepage().map((data,index) => (
          <TableRow >
         
          <TableCell  color="red"  align="left" width="170"    >
            {index+1}
            </TableCell>
            <TableCell width="200px" align="left" >
            {data.Product_Details_Description}
            </TableCell>
       
            <TableCell width="200px"  align="left" >
            {data.Order_Qty}
            </TableCell>
            <TableCell width="200px"  align="left" >
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
        
  
          </TableRow>
          
          )) ) : (
            null
               )}
    
      </TableBody>
     
       <TableRow>
        <TableCell  align="left"></TableCell>
       
        <TableCell  align="left"><b>TotalQty</b></TableCell>
        <TableCell align="left" style={{color:'red'}}>{totalqty}</TableCell>
          <TableCell  align="left" ></TableCell>
          <TableCell  align="left" ></TableCell>
          <TableCell  align="left" style={{color:'red'}} ></TableCell>
          <TableCell  align="left" ><b>TotalAmount</b></TableCell>
          <TableCell  align="left" style={{color:'red'}} >{numeral(totalamt).format('0,0.00')}</TableCell>   
  
  <TableCell align="left">
  
  </TableCell>
          
        </TableRow> 
        <TableRow  >
        <TableCell  align="left"></TableCell>
      
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>Discount</Badge></TableCell>  
       
        <TableCell  align="left"><b>{(Total_discount_amt)}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>SGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0: Statecodeee === localStorage.getItem("COMPANY_STATECODE")?numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left" className='text-nowrap'><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>CGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?0:Statecodeee === localStorage.getItem("COMPANY_STATECODE")?numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100, 0)).format('0,0.00'):0}</b></TableCell>
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>IGST</Badge> : <b>{((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00'):Statecodeee === localStorage.getItem("COMPANY_STATECODE")? 0: numeral(allpodetailscollections.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00')}</b></TableCell>
        {localStorage.getItem("StateCode") === localStorage.getItem("COMPANY_STATECODE")?
        <>
       
        <TableCell  align="left"><Badge style={{color:'white', fontSize:'14px',backgroundColor:"#58A7AA"}}>NET_AMT</Badge></TableCell>
        <TableCell  align="left"><b>{numeral((allpodetailscollections.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100 +(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.GSTPer/2))/100,0))).format('0,0.00')}</b></TableCell>
        </>
        :
        <>
         <TableCell  align="left"><b>NET_AMT</b></TableCell>
        <TableCell  align="left"><b>{numeral((allpodetailscollections.reduce((accumulator, currentValue) => accumulator +(currentValue.Amount)+(((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100,0))).format('0,0.00')}</b></TableCell>


        </>
        
        }
        <TableCell></TableCell>
        


      </TableRow>
    </Table> }
    </TableContainer>
    
    
    <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={allpodetailscollections.length}
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
            open={opeecreate1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="SO added successfully"
  
          />
           <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={singleupdateproductssspiners}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Product updated successfully"
  
          />
           
             <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={opeecreate}
            autoHideDuration={2000}
            onClose={handleClose}
            message="SO Updated successfully"
  
          />
           <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Sales Order  updated successfully"
  
          />
           <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open2}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Product   deleted successfully"
  
          />
  </div>
  </Paper>
  
  {/* <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
              
            }}
            
            open={open5}
            autoHideDuration={2000}
            onClose={handleClose}
         
          >
             <Alert onClose={handleClose} severity="error">
             Available Balance Out of Range
  </Alert>
  
  </Snackbar > */}
      
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
            
            open={OutoffRange}
            autoHideDuration={2000}
            onClose={handleClose}
         
          >
             <Alert onClose={handleClose} severity="error">
             Available Balance Out of Range
  </Alert>
  
  </Snackbar >
  <Backdrop  open={spinnerforsingleupdate} className={classes.backdrop} >
      
             
      <Spinner name="ball-spin-fade-loader"  color='#fafafa' />
      
      </Backdrop>
       
  
     
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
             Atleast add one Product to complete a So
  </Alert>
  
  
  
  
  </Snackbar >
    </div>}
      </>
    )
  }
  
  export default ChartPage
  
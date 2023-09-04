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
  Typography,
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
} from 'reactstrap';
import Backdrop from '@material-ui/core/Backdrop';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';
import ClearIcon from '@material-ui/icons/Clear';

import PerfectScrollbar from 'react-perfect-scrollbar';
import './ChartPage.css';
import React, { useEffect, useRef, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';

import Button1 from 'reactstrap/lib/Button';
import { Helmet } from 'react-helmet';
import { Cancel, Category, CodeSharp, Height } from '@material-ui/icons';
import axios from '../axios';
import Snackbar from '@material-ui/core/Snackbar';
import { useStateValue } from '../StateProvider';
import Toolbar from '@material-ui/core/Toolbar';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from 'react-spinkit';
import { useHistory } from 'react-router-dom';
import tr from 'faker/lib/locales/tr';
import SweetAlert from 'react-bootstrap-sweetalert';
import axioss from 'axios';
import { Border } from 'victory';
import id from 'faker/lib/locales/id_ID';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
}));
function ChartPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const selectInputRef = useRef();
  const [getcat, setgetcat] = useState([]);
  const [category, setcategory] = useState('');
  const [updateCategory, setupdateCategory] = useState('');
  const [defact1, setdefact1] = useState([]);
  const [UomDesp, setUomDesp] = useState('');
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [open3, setopen3] = useState(false);
  const [open4, setopen4] = useState(false);
  const [OutoffRange, setOutoffRange] = useState(false);
  const [Acive, setAcive] = useState('yes');
  const [Mindate, setMindate] = useState(new Date());
  const updatecatee = useRef('');
  const activeref = useRef('');
  const [{ user }, dispatch] = useStateValue();
  const [userinf, setuserinf] = useState([]);
  const idref = useRef('');
  const pages = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100];
  const [page, setpage] = useState(0);
  const [rowsperpage, setrowsperpage] = useState(pages[page]);
  const [erros, seterros] = useState(false);
  const [errors1, seterrors1] = useState(false);
  const [fromdatee, setfromdatee] = useState('');
  const [todate1, settodate1] = useState('');
  const [toodate, settoodate] = useState(new Date());
  const [customername, setcustomername] = useState('');
  const [show1, setShow1] = useState(false);
  const [sharename, setsharename] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [spinnerforpo, setspinnerforpo] = useState(false);
  const [cutomer, setcutomer] = useState([]);
  const [deletingid, setdeletingid] = useState('');
  const [deleteconfirmstatus, setdeleteconfirmstatus] = useState('');
  const [customerss, setcustomerss] = useState('');
  const [usertype, setusertype] = useState('');
  const [opeecreate, setopeecreate] = useState(false);
  const [opeecreate1, setopeecreate1] = useState(false);
  const [custt, setcustt] = useState('');
  const [bracnch, setbracnch] = useState('');
  const [branches, setbranches] = useState([]);
  const [branchesadmin, setbranchesadmin] = useState([]);
  const [purchase, setpurchase] = useState([]);
  const [branchfornoadmin, setbranchfornoadmin] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [All, setAll] = useState('0');
  const [Poshow, setPoshow] = useState(true);
  const [Poshowadd, setPoshowadd] = useState(true);
  const [remarks, setremarks] = useState('');
  const [pono, setpono] = useState('');
  const [deliverdate, setdeliverdate] = useState('');
  const [totalamountvaluedata, settotalamountvaluedata] = useState('');
  const [ohdate, setohdate] = useState('');
  const [todate, settodate] = useState('');
  const [savespinners, setsavespinners] = useState(false);
  const [spinnerforsingleupdate, setspinnerforsingleupdate] = useState(false);
  const [singleupdateproductssspiners, setsingleupdateproductssspiners] =
    useState(false);
  const [categorydefaultvalue, setcategorydefaultvalue] = useState({
    label: 'Select Product...',
    value: '',
  });
  const [ponovalues, setponovalues] = useState([]);

  const [added, setadded] = useState(false);
  const [updated, setupdated] = useState(false);

  const [order_no, setorder_no] = useState('');
  const [podate, setpodate] = useState('');
  const [dispercentage, setdispercentage] = useState('');
  // //console.log(pono,"pono");

  const [productno, setproductno] = useState('');

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return provalue.slice(page * rowsperpage, (page + 1) * rowsperpage);
  };
  const onClear = () => {
    selectInputRef.current.select.commonProps.setValue({
      label: 'Select product....',
      value: '',
    });
  };

  const [hdrorderdate, sethdrorderdate] = useState('');
  const [hdrpono, sethdrpono] = useState('');
  const [hdrdeliverydate, sethdrdeliverydate] = useState('');
  const [hdrremarks, sethdrremarks] = useState('');
  const [hdrnetamt, sethdrnetamt] = useState('');

  const [amount1, setamount1] = useState('');
  const [totatlhdrnetamt, settotatlhdrnetamt] = useState(0);

  const [remark1, setremark1] = useState('');

  useEffect(() => {
    const getusertype = async () => {
      const type = localStorage.getItem('AdminUser');

      setusertype(type);
      ////////console.log(type)
    };
    const custtt = async () => {
      const custt = localStorage.getItem('Customer_Log');
      setcustt(custt);
      ////////console.log(custt)
    };
    const branch = async () => {
      const branch = localStorage.getItem('Branch_Log');
      setbracnch(branch);
      ////////console.log(branch)
    };
    var date = new Date();
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    // var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)
    var lastday = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    var lastdays = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    getusertype();
    custtt();
    branch();
    purchasepo();
    customeradmin();
    ponodate(props.match.params.id);
    if (props.match.params.id) {
      updatescreenview(props.match.params.id);
    }

    branchet();

    if (!props.match.params.id) {
      setfromdatee(moment(firstday).format('YYYY-MM-DD'));
      settoodate(moment(lastday).format('YYYY-MM-DD'));
      settodate1(moment(lastdays).format('YYYY-MM-DD'));
    }

    // postatusupdate()
  }, []);

  //  if(loading) {

  //   return (

  //     <div className="progressscreen" >
  //       <div className="progress">
  //         <div className="spinner">
  //       <Spinner name="ball-spin-fade-loader"  color='#0069D9' />
  //       </div>
  //       <div>
  //       <h6>Po is processing...</h6>
  //       </div>
  //       </div>
  //     </div>

  //   )
  // }

  const getprodctdel = async id => {
    setprovalue([]);
    const tokent = localStorage.getItem('authtoken');
    const prod = await axios.instance
      .get(`/POOrdrDtl/${id}`, {
        Authorization: tokent,
        'Content-Type': 'application/json',
      })
      .then(async res => {
        localStorage.setItem('Products', JSON.stringify(res.data));
        setprovalue(res.data);

        // for(const data of res.data){
        //   setsgst1(data.SGSTPer)
        //   setcgst1(data.VAT_Percentage)
        // }

        //setProductcollection(res.data)
        //console.log(res.data)
        let totalnetamt = [];

        let qtytotal = [];

        for (const data of res.data) {
          qtytotal.push(data.Order_Qty);
        }
        var qtyvalue = 0;
        for (let i = 0; i < qtytotal.length; i++) {
          qtyvalue += qtytotal[i];
        }
        ////////////console.log(qtyvalue)
        settotalqty(qtyvalue);

        let totalcgstamt = [];
        for (const data of res.data) {
          var amounvalu = data.Order_Qty * data.Rate;

          var sgstamt = amounvalu * data.VAT_Percentage;
          var sgstcal = sgstamt / 100;
          totalcgstamt.push(sgstcal);
        }
        var totalcgstvalu = 0;
        for (let i = 0; i < totalcgstamt.length; i++) {
          totalcgstvalu += totalcgstamt[i];
        }
        settotaltax(totalcgstvalu + totalcgstvalu);

        let totaltamt = [];
        for (const data of res.data) {
          var amounvalu = data.Order_Qty * data.Rate;

          totaltamt.push(amounvalu);
        }
        var totaltvalue = 0;
        for (let i = 0; i < totaltamt.length; i++) {
          totaltvalue += totaltamt[i];
        }
        settotalamountvaluedata(totaltvalue);

        let totalnetamount = [];
        for (const data of res.data) {
          totalnetamount.push(parseFloat(data.Amount));
        }
        var totalnetcount = 0;
        for (let i = 0; i < totalnetamount.length; i++) {
          totalnetcount += totalnetamount[i];
        }
        settotalamt(totalnetcount);

        let totaltdisamt = [];
        for (const data of res.data) {
          totaltdisamt.push(data.DisAmt);
        }
        //////console.log(totaltdisamt)
        var totalamutdis = 0;
        for (let i = 0; i < totaltdisamt.length; i++) {
          totalamutdis += totaltdisamt[i];
        }
        //////console.log(totalamutdis)
        setTotal_discount_amt(totalamutdis);

        let totalIgstamt = [];
        for (const data of res.data) {
          totalIgstamt.push((data.Rate * data.Order_Qty * data.IGSTPer) / 100);
          //////console.log('igst', data.IGSTPer)
        }
        var totalIgstvalu = 0;
        for (let i = 0; i < totalIgstamt.length; i++) {
          totalIgstvalu += totalIgstamt[i];
        }

        var totaldiscount = [];
        for (const data of res.data) {
          totaldiscount.push(data.DisAmt);
        }

        var totaldiscount = 0;
        for (let i = 0; i < totaldiscount.length; i++) {
          totaldiscount += totaldiscount[i];
        }

        setdiscount1(totaldiscount);

        var totaldisper = [];
        for (const data of res.data) {
          totaldisper.push(data.DisPer);
        }

        var totaldisper = 0;
        for (let i = 0; i < totaldisper.length; i++) {
          totaldisper += totaldisper[i];
        }
        setdispercentage(totaldisper);

        // for(const data of res.data){
        //   setdispercentage(data.DisPer)
        //   //console.log(data.DisPer,"disper");
        // }

        //////console.log(totalIgstvalu)
        //settotaltax(totalcgstvalu +totalcgstvalu)
        setTOtaligstamt(totalIgstvalu);
      });
  };
  const list = [
    { title: 'Print' },
    { title: 'Share' },
    { title: 'EDIT' },
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
  const purchasepo = async () => {
    const tokent = localStorage.getItem('authtoken');
    const branchid = localStorage.getItem('Branch_Log');
    const custoemrid = localStorage.getItem('Customer_Log');
    const Usertype = localStorage.getItem('AdminUser');
    ////////console.log(branchid,custoemrid,Usertype)
    const purchases = await axios.instance.get(
      `/POViewdash/${custoemrid}/${branchid}/${Usertype}/${localStorage.getItem(
        'Userid',
      )}`,
      {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      },
    );
    setpurchase(purchases.data);
  };

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
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    const branccc = await axios.instance.get(
      `/BranchHelp/${cuslog}/${branch}/${type}`,
      {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      },
    );
    setbranchfornoadmin(branccc.data);
    ////////console.log('test',branccc.data)
  };
  const customeradmin = async () => {
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');

    const cusadmin = await axios.instance.get(
      `/BranchHelp/${cuslog}/0/${type}`,
      {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      },
    );
    setbranchesadmin(cusadmin.data);
    //////console.log('testone',cusadmin.data)
  };

  const getbranchasehelp = async id => {
    setAll(id);

    if (id === 'All') {
      const tokent = localStorage.getItem('authtoken');
      const type = localStorage.getItem('AdminUser');
      const branch = localStorage.getItem('Branch_Log');
      const cuslog = localStorage.getItem('Customer_Log');
      const customers = await axios.instance
        .get(
          `/POOdrview/${cuslog}/0/${moment(fromdatee).format(
            'YYYYMMDD',
          )}/${moment(toodate).format('YYYYMMDD')}/${type}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setpurchase(res.data);

          for (const data of res.data) {
            setpodate(data.Order_Date);
          }
          //console.log( podate,"date")
        });
    } else {
      const tokent = localStorage.getItem('authtoken');
      const type = localStorage.getItem('AdminUser');
      const branch = localStorage.getItem('Branch_Log');
      const cuslog = localStorage.getItem('Customer_Log');
      const customers = await axios.instance
        .get(
          `/POOdrview/${cuslog}/${id}/${moment(fromdatee).format(
            'YYYYMMDD',
          )}/${moment(toodate).format('YYYYMMDD')}/${type}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setpurchase(res.data);
          //console.log( res.data,"PONOGET")
          for (const data of res.data) {
            setpodate(data.Order_Date);
          }
          //console.log( podate,"date")
        });
    }
  };
  const getnoadminpo = async () => {
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    const customers = axios.instance
      .get(
        `/POOdrview/${cuslog}/${branch}/${moment(fromdatee).format(
          'YYYYMMDD',
        )}/${moment(toodate).format('YYYYMMDD')}/${type}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setpurchase(res.data);
        //////console.log()
        for (const data of res.data) {
          setpodate(data.Order_Date);
        }
        //console.log( podate,"date")
      });
  };

  const customerget = async () => {
    if (All === '0') {
    }
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    const customers = axios.instance
      .get(
        `/POOdrview/${cuslog}/${All}/${moment(fromdatee).format(
          'YYYYMMDD',
        )}/${moment(toodate).format('YYYYMMDD')}/${type}`,
        {
          headers: {
            Authorization: tokent,

            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setpurchase(res.data);
        //////console.log( res.data)
        for (const data of res.data) {
          setpodate(data.Order_Date);
        }
        //console.log( podate,"date")
      });
    //setbranchesadmin(customers.data)
  };

  const deletepo = async () => {
    const tokent = localStorage.getItem('authtoken');
    const podel = await axios.instance.delete(`/POdelete/${deletingid}`, {
      headers: { Authorization: tokent, 'Content-Type': 'application/json' },
    });
    purchasepo();
  };
  const deleteconformation = () => {
    setIsVisible(false);

    if (deleteconfirmstatus === 'Not Approved') {
      Alert.alert('Are you sure delete this Purchase', '', [
        { text: 'Yes', onPress: () => deletepo() },
        { text: 'Cancel', onPress: console.log('') },
      ]);
    }
  };
  const deleteform = (id, status, po) => {
    //////console.log(status)
    setdeleteconfirmstatus(status);
    setsharename(po);
    setIsVisible(true);
    setdeletingid(id);
  };
  const [show2, setShow2] = useState(false);

  const [mode2, setMode2] = useState('date');
  const [fromdatetr, setfromdatetr] = useState(new Date());
  const [todatetr, settodatetr] = useState(new Date());
  const [remark, setremark] = useState('');

  const [addscreen, setaddscreen] = useState(true);
  const [updatescren, setupdatescren] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');
  const [Productcollection, setProductcollection] = useState([]);
  const [Productcollection1, setProductcollection1] = useState([]);
  const [Productonecollect, setProductonecollect] = useState([]);
  const [amount, setamount] = useState('');
  const [discount, setdiscount] = useState('');
  const [tax, settax] = useState('');
  const [qty, setqty] = useState('');
  const [netamount, setnetamount] = useState('');
  const [cgst, setcgst] = useState('');
  const [cgstamt, setcgstamt] = useState('');
  const [sgstamt, setsgstamt] = useState('');
  const [igst, setigst] = useState('');

  const [productoption, setproductoption] = useState([]);

  const [totaltax, settotaltax] = useState('');
  const [tottaldiscount, settottaldiscount] = useState('');
  const [totalqty, settotalqty] = useState('');
  const [totalamt, settotalamt] = useState('');
  const [igstamt, setigstamt] = useState('');
  const [TOtaligstamt, setTOtaligstamt] = useState('');
  const [productname, setproductname] = useState('');
  const [Total_discount_amt, setTotal_discount_amt] = useState('');
  const [taxid, settaxid] = useState('');
  const [Gst, setGst] = useState('');
  const [Igst, setIgst] = useState('');
  const [updatedqty, setupdatedqty] = useState('');
  const [updateproductid, setupdateproductid] = useState('');
  const [updatson, setupdatson] = useState('');
  const [updatedamt, setupdatedamt] = useState('');
  const [igstupdate, setigstupdate] = useState('');
  const [taxidupdate, settaxidupdate] = useState('');
  const [proudctnameupdate, setproudctnameupdate] = useState('');
  const [updatenetamt, setupdatenetamt] = useState('');
  const [updatesgst, setupdatesgst] = useState('');
  const [updatecgst, setupdatecgst] = useState('');
  const [updattax, setupdattax] = useState('');

  const [Total_cgst, setTotal_cgst] = useState('');
  const [Total_sgst, setTotal_sgst] = useState('');
  const [Total_Amount, setTotal_Amount] = useState('');
  const [Totalamountheader, setTotalamountheader] = useState('');
  const [sgst, setsgst] = useState('');
  const [Discount, setDiscount] = useState('');
  const [visible, setvisible] = useState(false);
  const [Visiblespinner, setVisiblespinner] = useState(true);
  const [vtaper, setvtaper] = useState(true);
  const [provalue, setprovalue] = useState([]);
  const [loading, setloading] = useState(false);
  const [producterror, setproducterror] = useState('');
  const [qtyerror, setqtyerror] = useState('');
  const [selectedtext, setselectedtext] = useState('Select Product');
  const [cgstid, setcgstid] = useState('');
  const [umoid, setumoid] = useState('');
  const [igstid, setigstid] = useState('');
  const [sgstid, setsgstid] = useState('');
  const [disper, setdisper] = useState('');
  const [disamt, setdisamt] = useState('');
  const [DutyPer, setDutyPer] = useState('');
  const [Duty_Id, setDuty_Id] = useState(' ');
  const [uomupdateid, setuomupdateid] = useState('');
  const [igstupdateid, setigstupdateid] = useState('');
  const [sgstupdatid, setsgstupdatid] = useState('');
  const [disperupdate, setdisperupdate] = useState('');
  const [disamtupdate, setdisamtupdate] = useState('');
  const [dutyperupdateid, setdutyperupdateid] = useState('');
  const [dutyidupdate, setdutyidupdate] = useState('');
  const [Statecodeee, setStatecodeee] = useState('');
  const [Igstperupdate, setIgstperupdate] = useState('');
  const [Customerlog, setCustomerlog] = useState('');
  const [Authtoken, setAuthtoken] = useState('');
  const [uom, setuom] = useState('');
  const [indexalueofupdate, setindexalueofupdate] = useState('');

  const [productssgetss, setproductssgetss] = useState('');

  const [Frommail, setFrommail] = useState('');
  const [Tomail, setTomail] = useState('');
  const [smptport, setsmptport] = useState('');
  const [SMTPServer, setSMTPServer] = useState('');
  const [mailpassword, setmailpassword] = useState('');
  const [Statuscalll, setStatuscalll] = useState('');
  const [ccmail, setccmail] = useState('');
  const [mailloginnames, setmailloginnames] = useState('');
  const [poinsert, setpoinsert] = useState([]);
  const [purchaseordermail, setpurchaseordermail] = useState('');

  const [discount1, setdiscount1] = useState('');
  const [cclev1, setcclev1] = useState('');
  const [sgst1, setsgst1] = useState('');
  const [cgst1, setcgst1] = useState('');

  //po raise base setstatecodes
  const [poraisecustomerstatecode, setporaisecustomerstatecode] = useState('');
  const [companystatecode, setcompanystatecode] = useState('');

  useEffect(() => {
    if (!props.match.params.id) {
      localStorage.setItem('Products', '');
    }

    const getstateid = async () => {
      const statecode = localStorage.getItem('StateCode');
      const customerid = localStorage.getItem('Customer_Log');
      const token = localStorage.getItem('AuthToken');
      setCustomerlog(customerid);
      setAuthtoken(token);
      setStatecodeee(statecode);
    };
    getprodct();
    getstateid();
    UserMailDetail();
    getbranchasehelp();
  }, [pono]);

  const UserMailDetail = async () => {
    const tokent = localStorage.getItem('authtoken');
    const Username = localStorage.getItem('Username');
    const userId = localStorage.getItem('Userid');
    const mailDetail = await axios.instance
      .get(
        `/UsermailDetails/${localStorage.getItem(
          'customer_HO',
        )}/${localStorage.getItem('Customer_Log')}/${localStorage.getItem(
          'Userid',
        )}/${
          localStorage.getItem('Approval2') === 'N' ||
          localStorage.getItem('Approval3') === 'N' ||
          localStorage.getItem('AdminUser') === 'N'
            ? 1
            : 0
        }/${localStorage.getItem('Branch_Log')}/${
          localStorage.getItem('AdminUser') === 'Y' ? props.match.params.id : 0
        }/${localStorage.getItem('Hoflagmail') === 'Y' ? 0 : 1}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        //console.log(res.data)
        for (const data of res.data) {
          setFrommail(data.Emailid);
          setTomail(data.Tomail);
          setsmptport(data.SmtpPort);
          setSMTPServer(data.SmtpServer);
          setmailpassword(data.PurchaseMail_Pwd);
          setccmail(data.cccmail);
          setcustomerss(data.User_Name);
          setpurchaseordermail(data.PurchaseMailId);
          setcclev1(data.ccmail11);
        }
      });
  };

  const Getorderhdr = async id => {
    setprovalue([]);
    const tokent = localStorage.getItem('authtoken');
    const ordeheader = await axios.instance
      .get(`/POOrdr/${localStorage.getItem('customer_HO')}/${id}`, {
        Authorization: tokent,
        'Content-Type': 'application/json',
      })
      .then(res => {
        // //////////console.log(res.data)

        for (const data of res.data) {
          //console.log(res.data,'ss')
          //////////console.log(new Date(data.Delivery_Date))
          settoodate(moment(new Date(data.Delivery_Date)).format('YYYY-MM-DD'));
          setdeliverdate(data.Order_Date);
          setohdate(new Date(data.Delivery_Date));
          //////console.log(data.Order_Date)
          setremark(data.Remarks);
          setpono(data.PO_No);
          setporaisecustomerstatecode(data.CUSTOMER_STATECODE);
          setcompanystatecode(data.COMPANY_STATECODE);
          setremark1(data.Remark);

          //////console.log('remarks', data.REMARKS)
        }
      });
  };
  // const SendMail  =async(id) => {

  //   if(window.confirm('Do You Want To Send Mail For Approval')) {

  //   const tokent  =   localStorage.getItem('authtoken')
  //   const Username =  localStorage.getItem('Username')

  //   //console.log(pono,'mail')
  //   const approvs = await axios.instance.post(`/ApiForUser`,
  //   {
  //     Cus: customerss,
  //     Department: localStorage.getItem('Department'),
  //     Designation: localStorage.getItem('Designation'),
  //     Loginname: Username,
  //     Username: Frommail,
  //     ccmail: ccmail,
  //     hostname: SMTPServer,
  //     password: mailpassword,
  //     port: smptport,

  //     PO_No: id,
  //     sub: "New Purchase  Order Request",
  //     tomail: Tomail,
  //  },
  //    { headers: {'Authorization': tokent
  //    , 'Content-Type': 'application/json'}})
  //   }else {

  //   }

  // }

  const SetMailforQutotation = async id => {
    //console.log(order_no,"order no");

    const tokent = localStorage.getItem('authtoken');
    if (window.confirm('Do You Want To Send Mail For Approval')) {
      //   const PrintInvoice = await axios.instance.get(`/QuotationPrint/${quoidvalue}`).then(async(res) => {

      // if(res.status === 200){
      //   setdialogbox(false)
      //   toast("Mail Sending... ", {
      //     position: "top-right",
      // autoClose: 4000,
      // hideProgressBar: false,
      // closeOnClick: false,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
      // theme: "dark",
      // type:"success"
      //    });
      const Username = localStorage.getItem('Username');
      await axioss
        .post(
          `http://103.27.85.36/EmailAPi/api/Mail`,

          {
            FromMailid: purchaseordermail,
            ToMailid: Tomail,
            CcMailid: ccmail,
            CcMailid1: '',
            CcMailid2: '',
            Subject: 'New Purchase  Order Request',
            SmtpServer: SMTPServer,
            MailPassowrd: mailpassword,
            Body: ` <p>Dear   ${customerss}  , </p>
             <p>Please Find the purchase request and Approve. The Order No: ${localStorage.getItem(
               'ponos',
             )}</p> 
            <p>Regards,</p>
            <p>${Username}</p>
            <p>${localStorage.getItem('Designation')}</p>
            <p>${localStorage.getItem('Department')}</p>
            <p>Please <a href='http://103.27.85.36/Po_generator/'>click </a> here to Approve : </p> 
              
           `,

            SmtpPort: smptport,

            Filepathattach:
              'C:\\inetpub\\wwwroot\\tomspognerator\\Views\\Purchaseorder.pdf',
          },

          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async res => {
          //   if(res.data === "Email Send Succefully") {
          //     toast("Email Send Succefully", {
          //       position: "top-right",
          // autoClose: 2000,
          // hideProgressBar: false,
          // closeOnClick: false,
          // pauseOnHover: true,
          // draggable: true,
          // progress: undefined,
          // theme: "dark",
          // type:"success"
          //      });
          // }
        });
      // }else {
      //   setdialogbox(false)
      // }
    } else {
    }
    // })
  };

  const getprodct = async () => {
    const token = localStorage.getItem('AuthToken');
    const userid = localStorage.getItem('Userid');
    const companyid = localStorage.getItem('Companyid');
    const customerid = localStorage.getItem('Customer_Log');
    ////console.log('compid', companyid)
    ////console.log('customerid',customerid )
    const prod = await axios.instance.get(
      `/Product/${companyid}/${
        localStorage.getItem('customer_HO') === 'Y'
          ? localStorage.getItem('customer_HOID')
          : localStorage.getItem('Customer_Log')
      }`,
      { headers: { Authorization: token, 'Content-Type': 'application/json' } },
    );

    const data = prod.data;

    const optionvalue = data.map(f => ({
      label: f.Product_Details_Description,
      value: f.Product_Details_Id,
    }));

    setProductcollection(optionvalue);
  };

  const getoneproduct = async id => {
    setSelectedValue(id);
    //console.log(selectedValue,"id");
    // setselectedtext(name)

    // const product =  await axios.instance.get(`/Productone/${id}/${(localStorage.getItem("customer_HO")==='Y')?localStorage.getItem("customer_HOID"):localStorage.getItem("Customer_Log")}`, { headers: {'Authorization':Authtoken,
    const product = await axios.instance.get(
      `/Productone/${id}/${
        localStorage.getItem('customer_HO') === 'Y'
          ? localStorage.getItem('customer_HOID')
          : localStorage.getItem('Customer_Log')
      }`,
      {
        headers: {
          Authorization: Authtoken,

          'Content-Type': 'application/json',
        },
      },
    );
    ////console.log(product.data)
    setqty('');
    setnetamount('');
    setamount('');
    for (const data of product.data) {
      //console.log(data,'productss')
      setamount(data.Rate);
      setproductname(data.Product_Details_Description);
      setdiscount(data.DisPer);

      settax(data.GSTPer);

      setIgst(data.IGSTPer);
      setcgst(data.CGSTPer);
      setsgst(data.SGSTPer);
      setDiscount(data.Discount);
      settaxid(data.Tax_Id);
      setigstid(data.IGSTId);
      setsgstid(data.SGSTId);
      setcgstid(data.SGSTId);
      setumoid(data.UOM_Id);
      setuom(data.UOM_Description);
      setdisper(data.DisPer);
      setdisamt(data.DisAmt);
      setDuty_Id(data.Duty_Id);
      setDutyPer(data.DutyPer);
      setTotal_cgst(data.Total_cgstamt);
      setTotal_sgst(data.Total_sgstamt);
      setTotal_Amount(data.Total_Amount);
    }
  };

  //fg
  const amountcal = async amt => {
    setqty(amt);

    if (discount != 0) {
      var amounvalu = amt * amount;
      setamount1(amounvalu);
      var discounts = (amounvalu * discount) / 100;
      console.log(amounvalu, discounts);
      setdisamt(discounts);

      var valueofdis = amounvalu - discounts;
      //console.log(valueofdis,Statecodeee)
      var gstinfo =
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? Igst
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? tax
          : Igst;
      var gstcal = valueofdis * gstinfo;
      var gstvalcal = gstcal / 100;
      //console.log(gstcal)
      var gstvalue = valueofdis + gstvalcal;
      const valueformat = parseFloat(gstvalue);
      //console.log(gstvalue,'test')
      setnetamount(valueformat.toFixed(2));

      var sgstamt = valueofdis * sgst;
      var sgstcal = sgstamt / 100;
      ////////console.log(sgstcal)
      // var sgstvalue =  amounvalu + sgstcal
      // const sgstamts =  sgstvalue
      // //////console.log(sgstcal)
      setsgstamt(sgstcal);

      var cgstamt = valueofdis * cgst;
      var cgstcal = cgstamt / 100;
      // var cgstvalue =  amounvalu + cgstcal
      // const cgstamts = cgstvalue
      ////////console.log(cgstcal)
      setcgstamt(cgstcal);
      //////console.log(cgstcal)
      setigst(0);
    } else {
      //////console.log(Igst)
      var amounvalu = amt * amount;
      console.log(amounvalu, 'amount');
      setamount1(amounvalu);

      var gstinfo =
        Statecodeee === localStorage.getItem('COMPANY_STATECODE') ? tax : Igst;
      console.log('taxes', Igst);
      console.log('igst', tax);
      console.log('tax', gstinfo);
      var gstcal = amounvalu * gstinfo;
      console.log(gstcal);
      var gstvalcal = gstcal / 100;
      var gstvalue = amounvalu + gstvalcal;
      const valueformat = parseFloat(gstvalue);
      console.log(valueformat, 'dd');
      setnetamount(valueformat.toFixed(2));

      var sgstamt = amounvalu * sgst;
      var sgstcal = sgstamt / 100;
      ////////console.log(sgstcal)
      // var sgstvalue =  amounvalu + sgstcal
      // const sgstamts =  sgstvalue
      // //////console.log(sgstcal)
      setsgstamt(sgstcal);

      var cgstamt = amounvalu * cgst;
      var cgstcal = cgstamt / 100;
      // var cgstvalue =  amounvalu + cgstcal
      // const cgstamts = cgstvalue
      ////////console.log(cgstcal)
      setcgstamt(cgstcal);
      //////console.log(cgstcal)
      setigst(0);
    }
  };
  const productarray = async () => {
    //AsyncStorage.removeItem('Products')

    if (selectedValue.length != 0 && qty.length != 0) {
      let product = [];

      let prod = localStorage.getItem('Products');
      // ////console.log(prod)
      if (localStorage.getItem('Products')) {
        const getdata = JSON.parse(prod);
        for (const data of getdata) {
          //////console.log(data)
          product.push(data);
        }
      }

      product.push({
        Sno: product.length + 1,
        Product_Id: parseInt(selectedValue),
        Order_Qty: parseFloat(qty),
        Rate: amount,
        TaxId:
          localStorage.getItem('IGSTApplicable') === 'Y' &&
          localStorage.getItem('RegisterType') === 'SEZ'
            ? 0
            : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
            ? parseInt(taxid)
            : 0,
        GSTPer: tax,
        VAT_Percentage:
          localStorage.getItem('IGSTApplicable') === 'Y' &&
          localStorage.getItem('RegisterType') === 'SEZ'
            ? 0
            : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
            ? tax / 2
            : 0,
        IGSTPer:
          localStorage.getItem('IGSTApplicable') === 'Y' &&
          localStorage.getItem('RegisterType') === 'SEZ'
            ? tax
            : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
            ? 0
            : tax,
        SGSTPer:
          localStorage.getItem('IGSTApplicable') === 'Y' &&
          localStorage.getItem('RegisterType') === 'SEZ'
            ? 0
            : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
            ? tax / 2
            : 0,
        Discount: discount,
        // Amount:netamount ,
        Amount: amount1,
        Product_Details_Description: productname,
        UOM_Id: umoid,
        DisPer: discount,
        DisAmt: disamt,
        SGSTId:
          localStorage.getItem('IGSTApplicable') === 'Y' &&
          localStorage.getItem('RegisterType') === 'SEZ'
            ? 0
            : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
            ? sgstid
            : 0,
        IGSTId:
          localStorage.getItem('IGSTApplicable') === 'Y' &&
          localStorage.getItem('RegisterType') === 'SEZ'
            ? igstid
            : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
            ? 0
            : igstid,
        ConQty: 1,
        DutyPer: DutyPer,
        Duty_Id: Duty_Id,
        Total_Amount: parseInt(qty * amount + tax / 2 + tax),
        Total_cgstamt: cgstamt,
        UOM_Description: uom,
        Total_sgstamt: sgstamt,
      });

      const unique = [];
      product.map(x =>
        unique.filter(a => a.Product_Id == x.Product_Id).length > 0
          ? null
          : unique.push(x),
      );

      //console.log(product,'product')

      localStorage.setItem('Products', JSON.stringify(unique));

      let Getprod = localStorage.getItem('Products');

      let prodvalues = JSON.parse(Getprod);
      //console.log(prodvalues)
      setprovalue(prodvalues);
      let qtytotal = [];

      for (const data of prodvalues) {
        qtytotal.push(data.Order_Qty);
      }
      var qtyvalue = 0;
      for (let i = 0; i < qtytotal.length; i++) {
        qtyvalue += qtytotal[i];
      }
      settotalqty(qtyvalue);

      let taxtotal = [];
      for (const data of prodvalues) {
        taxtotal.push(data.GSTPer);
      }
      var taxvalue = 0;
      for (let i = 0; i < taxtotal.length; i++) {
        taxvalue += taxtotal[i];
      }
      //AsyncStorage.setItem('Toataltax', taxvalue.toString())
      let totalnetamount = [];
      for (const data of prodvalues) {
        totalnetamount.push(parseFloat(data.Amount));
      }
      var totalnetcount = 0;
      for (let i = 0; i < totalnetamount.length; i++) {
        totalnetcount += totalnetamount[i];
      }
      settotalamt(totalnetcount);
      //AsyncStorage.setItem('Totalamt', totalnetcount.toString())

      let totalcgstamt = [];
      for (const data of prodvalues) {
        totalcgstamt.push(
          ((data.Rate * data.Order_Qty - data.DisAmt) * data.SGSTPer) / 100,
        );
      }
      var totalcgstvalu = 0;
      for (let i = 0; i < totalcgstamt.length; i++) {
        totalcgstvalu += totalcgstamt[i];
      }
      //console.log("taxvalue",totalcgstvalu)
      settotaltax(totalcgstvalu + totalcgstvalu);

      ///AsyncStorage.setItem('Totalcgst', totalcgstvalu.toString())

      let totaltamt = [];
      for (const data of prodvalues) {
        totaltamt.push(data.Rate * data.Order_Qty);
      }
      var totalamt = 0;
      for (let i = 0; i < totaltamt.length; i++) {
        totalamt += totaltamt[i];
      }
      setTotalamountheader(totalamt);
      settotalamountvaluedata(totalamt);
      //AsyncStorage.setItem('Total_Amount', totalamt.toString())

      let totaltdisamt = [];
      for (const data of prodvalues) {
        totaltdisamt.push(data.DisAmt);
      }
      //////console.log(totaltdisamt)
      var totalamutdis = 0;
      for (let i = 0; i < totaltdisamt.length; i++) {
        totalamutdis += totaltdisamt[i];
      }
      //////console.log(totalamutdis)
      setTotal_discount_amt(totalamutdis);

      let totalIgstamt = [];
      for (const data of prodvalues) {
        totalIgstamt.push(
          ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
        );
        //////console.log('igst', data.IGSTPer)
      }
      var totalIgstvalu = 0;
      for (let i = 0; i < totalIgstamt.length; i++) {
        totalIgstvalu += totalIgstamt[i];
      }

      console.log(prodvalues, 'product');
      console.log(Productcollection, 'Productcollection');

      let res2 = [];
      res2 = Productcollection.filter(el => {
        return !prodvalues.find(element => {
          console.log(
            element.Product_Id == el.value,
            'element.ProductId === el.value ',
          );
          return element.Product_Id == el.value;
        });
      });
      console.log(res2, 'resFilteratty7');
      setProductcollection(res2);

      // const totalnetamt1=0;
      // let  totalnetamount1 = []
      // for(const data of prodvalues) {
      //   totalnetamount1.push(parseFloat(data.Total_Amount) )
      // }
      // var totalnetcount1 = 0
      // for(let i =0; i< totalnetamount1.length; i++) {
      //   totalnetcount1 += totalnetamount1[i]
      // }
      // settotatlhdrnetamt(totalnetamount1)

      //////console.log(totalIgstvalu)
      //settotaltax(totalcgstvalu +totalcgstvalu)
      setTOtaligstamt(totalIgstvalu);
      // //console.log(selectInputRef.current.select.commonProps.setValue({label:'Select...', value:''}))
      //onClear()
      // setcategorydefaultvalue({label:'Select...', value:''})
      setSelectedValue('');
      setqty('');
      setamount('');
      settax('');
      setsgstamt('');
      setigstamt('');
      setcgstamt('');
      setIgst('');
      setuom('');

      onClear();
      setdiscount('');
      setnetamount('');

      // setremark1("")

      // setProductcollection("")

      // setselectedtext('Select Product')
      //////console.log(unique.length, product.length)
      if (unique.length === product.length) {
        setloading(true);
        setopen(true);
        //localStorage.removeItem('Product')
      } else {
        setSelectedValue('');
        setqty('');
        setamount('');
        settax('');
        setsgstamt('');
        setigstamt('');
        setcgstamt('');
        setnetamount('');
        //setselectedtext('Select Product')

        //const totalamtvalueget =  await AsyncStorage.getItem('Totalamt')

        setopen3(true);
      }

      //settotalamt(totalamtvalueget)
    } else {
      if (selectedValue.length === 0) {
        setproducterror('please select product');
      }
      if (qty.length === 0) {
        setqtyerror('please enter qty');
      }
    }
    setTimeout(() => {
      setproducterror('');
      setqtyerror('');
    }, 3000);
    // setSelectedValue('')

    //setselectedtext('Select Product')
  };

  const deleteproduct = async id => {
    let productsvalue = localStorage.getItem('Products');
    var items = JSON.parse(productsvalue);
    // //////console.log(items)
    for (var i = 0; i < items.length; i++) {
      // var items = JSON.parse(items[i]);
      ////////console.log(items[i].Product_Id)
      if (items[i].Product_Id == id) {
        const deletedata = items.splice(i, 1);
        ////////console.log(deletedata)
      }
    }
    ////////console.log(items)
    let prod = JSON.stringify(items);

    localStorage.setItem('Products', prod);
    const getdelteddate = localStorage.getItem('Products');

    let removeproducts = JSON.parse(getdelteddate);
    const indexofnum = removeproducts.map((items, index) => ({
      index,
      ...items,
    }));
    let qtytotal = [];

    for (const data of removeproducts) {
      qtytotal.push(data.Order_Qty);
    }
    var qtyvalue = 0;
    for (let i = 0; i < qtytotal.length; i++) {
      qtyvalue += qtytotal[i];
    }
    settotalqty(qtyvalue);

    let taxtotal = [];
    for (const data of removeproducts) {
      taxtotal.push(data.GSTPer);
    }
    var taxvalue = 0;
    for (let i = 0; i < taxtotal.length; i++) {
      taxvalue += taxtotal[i];
    }
    //AsyncStorage.setItem('Toataltax', taxvalue.toString())
    let totalnetamount = [];
    for (const data of removeproducts) {
      totalnetamount.push(parseFloat(data.Amount));
    }
    var totalnetcount = 0;
    for (let i = 0; i < totalnetamount.length; i++) {
      totalnetcount += totalnetamount[i];
    }
    settotalamt(totalnetcount);
    //AsyncStorage.setItem('Totalamt', totalnetcount.toString())

    let totalcgstamt = [];
    for (const data of removeproducts) {
      totalcgstamt.push(
        ((data.Rate * data.Order_Qty - data.DisAmt) * data.SGSTPer) / 100,
      );
    }
    var totalcgstvalu = 0;
    for (let i = 0; i < totalcgstamt.length; i++) {
      totalcgstvalu += totalcgstamt[i];
    }

    let totaltamt = [];
    for (const data of removeproducts) {
      totaltamt.push(data.Rate * data.Order_Qty);
    }
    var totalamt = 0;
    for (let i = 0; i < totaltamt.length; i++) {
      totalamt += totaltamt[i];
    }

    let totaltdisamt = [];
    for (const data of removeproducts) {
      totaltdisamt.push(data.DisAmt);
    }
    //////console.log(totaltdisamt)
    var totalamutdis = 0;
    for (let i = 0; i < totaltdisamt.length; i++) {
      totalamutdis += totaltdisamt[i];
    }

    let totalIgstamt = [];
    for (const data of removeproducts) {
      totalIgstamt.push(
        ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
      );
      //////console.log('igst', data.IGSTPer)
    }
    var totalIgstvalu = 0;
    for (let i = 0; i < totalIgstamt.length; i++) {
      totalIgstvalu += totalIgstamt[i];
    }
    //////console.log(totalIgstvalu)
    //settotaltax(totalcgstvalu +totalcgstvalu)
    setTOtaligstamt(totalIgstvalu);

    //////console.log(totalamutdis)
    setTotal_discount_amt(totalamutdis);
    setTotalamountheader(totalamt);
    settotalamountvaluedata(totalamt);
    ////////console.log(totalcgstvalu)
    settotaltax(totalcgstvalu + totalcgstvalu);
    //////console.log(indexofnum)
    setprovalue(removeproducts);
  };
  const deleteweb = async id => {
    if (window.confirm('Are You sure delete this product?')) {
      let productsvalue = localStorage.getItem('Products');
      var items = JSON.parse(productsvalue);
      // //////console.log(items)
      for (var i = 0; i < items.length; i++) {
        // var items = JSON.parse(items[i]);
        ////////console.log(items[i].Product_Id)
        if (items[i].Product_Id == id) {
          const deletedata = items.splice(i, 1);
          ////////console.log(deletedata)
        }
      }
      ////////console.log(items)
      let prod = JSON.stringify(items);

      localStorage.setItem('Products', prod);
      const getdelteddate = localStorage.getItem('Products');

      let removeproducts = JSON.parse(getdelteddate);
      const indexofnum = removeproducts.map((items, index) => ({
        index,
        ...items,
      }));
      let qtytotal = [];

      for (const data of removeproducts) {
        qtytotal.push(data.Order_Qty);
      }
      var qtyvalue = 0;
      for (let i = 0; i < qtytotal.length; i++) {
        qtyvalue += qtytotal[i];
      }
      settotalqty(qtyvalue);

      let taxtotal = [];
      for (const data of removeproducts) {
        taxtotal.push(data.GSTPer);
      }
      var taxvalue = 0;
      for (let i = 0; i < taxtotal.length; i++) {
        taxvalue += taxtotal[i];
      }
      //AsyncStorage.setItem('Toataltax', taxvalue.toString())
      let totalnetamount = [];
      for (const data of removeproducts) {
        totalnetamount.push(parseFloat(data.Amount));
      }
      var totalnetcount = 0;
      for (let i = 0; i < totalnetamount.length; i++) {
        totalnetcount += totalnetamount[i];
      }
      settotalamt(totalnetcount);
      //AsyncStorage.setItem('Totalamt', totalnetcount.toString())

      let totalcgstamt = [];
      for (const data of removeproducts) {
        totalcgstamt.push(
          ((data.Rate * data.Order_Qty - data.DisAmt) * data.SGSTPer) / 100,
        );
      }
      var totalcgstvalu = 0;
      for (let i = 0; i < totalcgstamt.length; i++) {
        totalcgstvalu += totalcgstamt[i];
      }

      let totaltamt = [];
      for (const data of removeproducts) {
        totaltamt.push(data.Rate * data.Order_Qty);
      }
      var totalamt = 0;
      for (let i = 0; i < totaltamt.length; i++) {
        totalamt += totaltamt[i];
      }

      let totaltdisamt = [];
      for (const data of removeproducts) {
        totaltdisamt.push(data.DisAmt);
      }
      //////console.log(totaltdisamt)
      var totalamutdis = 0;
      for (let i = 0; i < totaltdisamt.length; i++) {
        totalamutdis += totaltdisamt[i];
      }

      let totalIgstamt = [];
      for (const data of removeproducts) {
        totalIgstamt.push(
          ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
        );
        //////console.log('igst', data.IGSTPer)
      }
      var totalIgstvalu = 0;
      for (let i = 0; i < totalIgstamt.length; i++) {
        totalIgstvalu += totalIgstamt[i];
      }
      //////console.log(totalIgstvalu)
      //settotaltax(totalcgstvalu +totalcgstvalu)
      setTOtaligstamt(totalIgstvalu);

      //////console.log(totalamutdis)
      setTotal_discount_amt(totalamutdis);
      setTotalamountheader(totalamt);
      settotalamountvaluedata(totalamt);
      ////////console.log(totalcgstvalu)
      settotaltax(totalcgstvalu + totalcgstvalu);
      //////console.log(indexofnum)
      setprovalue(removeproducts);
      setopen2(true);
    }
  };
  const deleteconformation1 = id => {
    Alert.alert('Are you sure delete this Product ?', '', [
      { text: 'Yes', onPress: () => deleteproduct(id) },
      { text: 'Cancel', onPress: console.log('') },
    ]);
  };

  const Updateget = async (id, id1) => {
    //console.log(id)
    setindexalueofupdate(id1);

    setProductonecollect([]);
    setvisible(true);
    setvtaper(false);
    setTimeout(() => {
      setVisiblespinner(false);
    }, 2000);
    const datavalue = provalue.filter(a => a.Product_Id === id);
    setProductonecollect(datavalue);
    for (const data of datavalue) {
      //console.log(data)

      setupdatedqty(data.Order_Qty);
      setupdatedamt(data.Rate);
      setupdattax(data.GSTPer);
      setupdatesgst(data.SGSTPer);
      setupdateproductid(data.Product_Id);
      setupdatson(data.Sno);
      setUomDesp(data.UOM_Description);
      setupdatenetamt(data.Amount);
      setproudctnameupdate(data.Product_Details_Description);
      settaxidupdate(data.Tax_Id);
      setIgstperupdate(data.IGSTPer);
      setigstupdate(data.IGSTId);
      setsgstupdatid(data.SGSTId);
      setupdatecgst(data.SGSTId);
      setuomupdateid(data.UOM_Id);
      setdisperupdate(data.DisPer);
      setdisamtupdate(data.DisAmt);
      setdutyidupdate(data.Duty_Id);
      setdutyperupdateid(data.DutyPer);
      setTotal_cgst(data.Total_cgstamt);
      setTotal_sgst(data.Total_sgstamt);
      setTotal_Amount(data.Total_Amount);
    }
  };
  const toggleOverlay = async () => {
    setvisible(false);
  };
  const items = [
    // name key is must. It is to show the text in front
    { id: 1, name: 'angellist' },
    { id: 2, name: 'codepen' },
    { id: 3, name: 'envelope' },
    { id: 4, name: 'etsy' },
    { id: 5, name: 'facebook' },
    { id: 6, name: 'foursquare' },
    { id: 7, name: 'github-alt' },
    { id: 8, name: 'github' },
    { id: 9, name: 'gitlab' },
    { id: 10, name: 'instagram' },
  ];

  const editforproduct = async amt => {
    setupdatedqty(amt);
    if (disperupdate != 0) {
      var amounvalu = amt * updatedamt;
      console.log(amounvalu, 'amounvalu');

      var discount = (amounvalu * disperupdate) / 100;
      var discouamt = amounvalu - discount;
      setdisamtupdate(discount);
      var gstof =
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? Igstperupdate
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? updattax
          : Igstperupdate;
      var gstcal = discouamt * gstof;
      var gstvalcal = gstcal / 100;
      var gstvalue = discouamt + gstvalcal;
      console.log(gstvalue, 'gstvalue');
      const valueformat = gstvalue;

      setupdatenetamt(valueformat);
      ////////console.log(valueformat)
      var sgstval = updattax / 2;
      //////console.log(sgstval)
      var sgstamt = discouamt * sgstval;
      var sgstcal = sgstamt / 100;
      var sgstvalue = discouamt + sgstcal;
      const sgstamts = numeral(sgstvalue).format('0,0.00');
      //setsgstamt(sgstamts)
      setupdatesgst(sgstcal);
      //////console.log(sgstcal)
      var cgstval = updattax / 2;
      var cgstamt = discouamt * cgstval;
      var cgstcal = cgstamt / 100;
      var cgstvalue = discouamt + cgstcal;
      const cgstamts = numeral(cgstvalue).format('0,0.00');
      //setcgstamt(cgstamts)
      setupdatecgst(cgstcal);
      //////console.log(cgstvalue)
    } else {
      var amounvalu = amt * updatedamt;
      console.log(amounvalu, 'amo');
      var gstof =
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? Igstperupdate
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? updattax
          : Igstperupdate;
      var gstcal = amounvalu * gstof;
      var gstvalcal = gstcal / 100;
      var gstvalue = amounvalu + gstvalcal;
      const valueformat = gstvalue;

      // setupdatenetamt(valueformat)
      setupdatenetamt(amounvalu);

      ////////console.log(valueformat)
      var sgstval = updattax / 2;
      //////console.log(sgstval)
      var sgstamt = amounvalu * sgstval;
      var sgstcal = sgstamt / 100;
      var sgstvalue = amounvalu + sgstcal;
      const sgstamts = numeral(sgstvalue).format('0,0.00');
      //setsgstamt(sgstamts)
      setupdatesgst(sgstcal);
      //////console.log(sgstcal)
      var cgstval = updattax / 2;
      var cgstamt = amounvalu * cgstval;
      var cgstcal = cgstamt / 100;
      var cgstvalue = amounvalu + cgstcal;
      const cgstamts = numeral(cgstvalue).format('0,0.00');
      //setcgstamt(cgstamts)
      setupdatecgst(cgstcal);
      //////console.log(cgstvalue)
    }
  };
  const updateproduct = async () => {
    setspinnerforsingleupdate(true);
    let product = [];
    let productsvalue = localStorage.getItem('Products');

    ////////console.log(items)
    // //////console.log(items != null  )
    if (productsvalue != null) {
      const getdata = JSON.parse(productsvalue);
      for (const data of getdata) {
        // //////console.log(data)
        product.push(data);
      }
    }
    //////console.log(parseInt( updatedqty))
    const totlaamoutns = localStorage.getItem('Total_Amount');
    const updateddatevalue = {
      Sno: updatson,
      Product_Id: parseInt(updateproductid),
      Order_Qty: parseInt(updatedqty),
      Rate: parseFloat(updatedamt),
      TaxId:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? 0
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? parseInt(taxid)
          : 0,
      GSTPer:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? 0
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? updattax
          : 0,
      VAT_Percentage:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? 0
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? updattax / 2
          : 0,
      IGSTPer:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? Igstperupdate
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? 0
          : Igstperupdate,
      SGSTPer:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? 0
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? updattax / 2
          : 0,
      Discount: 0,
      Amount: updatenetamt,
      Product_Details_Description: proudctnameupdate,
      UOM_Id: uomupdateid,
      DisPer: disperupdate === 0 ? 0 : disperupdate,
      DisAmt: disamtupdate,
      SGSTId:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? 0
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? sgstupdatid
          : 0,
      IGSTId:
        localStorage.getItem('IGSTApplicable') === 'Y' &&
        localStorage.getItem('RegisterType') === 'SEZ'
          ? igstupdateid
          : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
          ? igstupdateid
          : 0,
      ConQty: 1,
      DutyPer: dutyperupdateid,
      Duty_Id: dutyidupdate,
      Total_Amount: totlaamoutns,
      Total_cgst: (totlaamoutns * updattax) / 100 / 2,
      Total_sgst: (totlaamoutns * updattax) / 100 / 2,
      UOM_Description: UomDesp,
    };
    product[parseInt(indexalueofupdate) - 1] = updateddatevalue;
    //////console.log(product)
    localStorage.setItem('Products', JSON.stringify(product));
    let Getprod = localStorage.getItem('Products');
    // setprovalue(Getprod)
    const getdelteddate = localStorage.getItem('Products');
    let removeproducts = JSON.parse(getdelteddate);
    //////console.log(removeproducts)
    let qtytotal = [];

    for (const data of removeproducts) {
      qtytotal.push(data.Order_Qty);
    }
    var qtyvalue = 0;
    for (let i = 0; i < qtytotal.length; i++) {
      qtyvalue += qtytotal[i];
    }
    settotalqty(qtyvalue);

    let taxtotal = [];
    for (const data of removeproducts) {
      taxtotal.push(data.GSTPer);
    }
    var taxvalue = 0;
    for (let i = 0; i < taxtotal.length; i++) {
      taxvalue += taxtotal[i];
    }
    //AsyncStorage.setItem('Toataltax', taxvalue.toString())
    let totalnetamount = [];
    for (const data of removeproducts) {
      totalnetamount.push(parseFloat(data.Amount));
    }
    var totalnetcount = 0;
    for (let i = 0; i < totalnetamount.length; i++) {
      totalnetcount += totalnetamount[i];
    }
    settotalamt(totalnetcount);
    //AsyncStorage.setItem('Totalamt', totalnetcount.toString())

    let totalcgstamt = [];
    for (const data of removeproducts) {
      totalcgstamt.push(
        ((data.Rate * data.Order_Qty - data.DisAmt) * data.SGSTPer) / 100,
      );
    }
    var totalcgstvalu = 0;
    for (let i = 0; i < totalcgstamt.length; i++) {
      totalcgstvalu += totalcgstamt[i];
    }
    ////////console.log(totalcgstvalu)
    settotaltax(totalcgstvalu + totalcgstvalu);

    let totaltamt = [];
    for (const data of removeproducts) {
      totaltamt.push(data.Rate * data.Order_Qty);
    }
    var totalamt = 0;
    for (let i = 0; i < totaltamt.length; i++) {
      totalamt += totaltamt[i];
    }
    setTotalamountheader(totalamt);
    settotalamountvaluedata(totalamt);

    let totaltdisamt = [];
    for (const data of removeproducts) {
      totaltdisamt.push(data.DisAmt);
    }
    //////console.log(totaltdisamt)
    var totalamutdis = 0;
    for (let i = 0; i < totaltdisamt.length; i++) {
      totalamutdis += totaltdisamt[i];
    }
    //////console.log(totalamutdis)
    setTotal_discount_amt(totalamutdis);
    let totalIgstamt = [];
    for (const data of removeproducts) {
      totalIgstamt.push(
        ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
      );
      //////console.log('igst', data.IGSTPer)
    }
    var totalIgstvalu = 0;
    for (let i = 0; i < totalIgstamt.length; i++) {
      totalIgstvalu += totalIgstamt[i];
    }
    //////console.log(totalIgstvalu)
    //settotaltax(totalcgstvalu +totalcgstvalu)
    setTOtaligstamt(totalIgstvalu);

    // onClear()

    setcategorydefaultvalue({ label: 'Select...', value: '' });

    let prodvalues = JSON.parse(Getprod);
    //////console.log(prodvalues)
    setprovalue(prodvalues);

    setspinnerforsingleupdate(false);
    setupdated(true);
    setTimeout(() => {
      setupdated(false);
    }, 2000);
    setvisible(false);
    setupdatedqty('');
    setupdatedamt('');
    setupdattax('');
    setupdatesgst('');
    setupdateproductid('');
    //setupdatecgst(data.IGSTPer)
    setupdatenetamt('');
    setproudctnameupdate('');
    settaxidupdate('');
    setIgstperupdate('');
    setigstupdate('');
    setsgstupdatid('');
    setupdatecgst('');
    setuomupdateid('');
    setdisperupdate('');
    setdisamtupdate('');
    setdutyidupdate('');
    setdutyperupdateid('');
    setTotal_cgst('');
    setTotal_sgst('');
    setTotal_Amount('');
    setvtaper(true);
    setvisible(false);
  };

  const spinerss = () => {
    setsavespinners(true);

    setTimeout(() => {
      setopeecreate1(true);

      setsavespinners(false);
      setTimeout(() => {
        history.push('/viewpo');
        setopeecreate1(false);
      }, 1000);
    }, 2000);
  };

  const spinerss1 = () => {
    setsavespinners(true);

    setTimeout(() => {
      setopeecreate(true);

      setsavespinners(false);
      setTimeout(() => {
        history.push('/viewpo');
        setopeecreate(false);
      }, 1000);
    }, 2000);
  };

  const pdfcreate = async id => {
    const tokent = localStorage.getItem('authtoken');
    const branccc = await axios.instance.get(`/Createpdf/${id}`, {
      headers: { Authorization: tokent, 'Content-Type': 'application/json' },
    });
    ////console.log(branccc.data)
  };
  const postatusupdate = async id => {
    const token = localStorage.getItem('AuthToken');

    await axios.instance
      .post(
        `/PODtl1`,
        {
          Orderid: id,
          CustomerId: localStorage.getItem('Customer_Log'),
          PoStatus: 'Stage 1 Pending',
          PoStatusDate: new Date(),
          CreatedBy: localStorage.getItem('Userid'),
          CreatedDate: new Date(),
          // ModifyBy:"",
          // ModifyDate:
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        setpoinsert(res.data);
        //console.log(poinsert,"insert")
      });
  };

  const save = async () => {
    //console.log(localStorage.getItem('balance') > 0)

    if (provalue.length != 0) {
      if (localStorage.getItem('balance') > 0) {
        let prodvalue = [];
        const token = localStorage.getItem('AuthToken');

        const productsvalue = localStorage.getItem('Products');
        let product = JSON.parse(productsvalue);
        //console.log(productsvalue,"productsvalue");

        prodvalue.push(product);

        const customerid = localStorage.getItem('Customer_Log');
        const Branchlog = localStorage.getItem('Branch_Log');
        const TOTALQTY = localStorage.getItem('Totalqty');
        const TOTALTAX = localStorage.getItem('Toataltax');
        const TOTALAMT = localStorage.getItem('Totalamt');
        const netamountvalue = numeral(TOTALAMT).format('0');

        const totalnetamt = localStorage.getItem('TotalnetMT');
        const statecode = localStorage.getItem('StateCode');
        const stateid = localStorage.getItem('StateId');
        const createdby = localStorage.getItem('Userid');
        const companyid = localStorage.getItem('Companyid');
        const statename = localStorage.getItem('Statename');
        const companybranchid = localStorage.getItem('combranch');
        const cgstamtvalues = localStorage.getItem('Totalcgst');
        const sgstamtvalues = localStorage.getItem('Totalsgst');
        const igstamtvalues = localStorage.getItem('Totaligst');

        const Total_Amount = localStorage.getItem('Total_Amount');

        const createpohed = axios.instance
          .post(
            '/POHdr',
            {
              // Order_Id:hdrpono,
              Order_Date: new Date(),
              Delivery_Date: toodate,
              Company_id: companyid,
              Customer_Id: customerid,
              Remarks: remark.length != 0 ? remark : '',
              Total_Amount: Totalamountheader,
              Vat_Amount:
                localStorage.getItem('IGSTApplicable') === 'Y' &&
                localStorage.getItem('RegisterType') === 'SEZ'
                  ? 0
                  : localStorage.getItem('StateCode') ==
                    localStorage.getItem('COMPANY_STATECODE')
                  ? totaltax / 2
                  : 0,
              Discount_Amount: Total_discount_amt,
              Net_Amount:
                localStorage.getItem('IGSTApplicable') === 'Y' &&
                localStorage.getItem('RegisterType') === 'SEZ'
                  ? TOtaligstamt + totalamt
                  : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                  ? totaltax + totalamt
                  : TOtaligstamt + totalamt,
              Created_by: createdby,
              Created_on: fromdatetr,
              Cus_Branchid: Branchlog,
              CurrencyId: 1,
              Branch_Id: Branchlog,
              CBranch_Id: companybranchid,
              StateId: Statecodeee,
              PlaceofSupply: 'tamilnadu',
              StateCode: Statecodeee,
              SGSTAmt:
                localStorage.getItem('IGSTApplicable') === 'Y' &&
                localStorage.getItem('RegisterType') === 'SEZ'
                  ? 0
                  : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                  ? totaltax / 2
                  : 0,
              IGSTAmt:
                localStorage.getItem('IGSTApplicable') === 'Y' &&
                localStorage.getItem('RegisterType') === 'SEZ'
                  ? TOtaligstamt
                  : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                  ? 0
                  : TOtaligstamt,
              Indent_id: '',
              Contract_id: localStorage.getItem('contract_ID'),
              Remark: remark1,
            },
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            },
          )
          .then(res => {
            //console.log(res.data,"orderid");
            //console.log(totaltax,"taxamt");
            console.log(res.data, 'pohdr');

            spinerss();

            for (const data of res.data) {
              //console.log(data,'posave')
              let orderid = data.Order_Id;
              localStorage.setItem('Order_Id', orderid);

              postatusupdate(data.Order_Id);
              localStorage.setItem('ponos', data.Order_No);

              // //console.log(data.Order_No)
              // setpono('')
              // SendMail(data.Order_No)
              SetMailforQutotation(data.Order_Id);

              //  setorder_no(data.Order_No)
              //  //console.log(data.Order_No,"orderno");
            }
          })
          .then(async () => {
            const Orderid = localStorage.getItem('Order_Id');

            for (const data of product) {
              const productcoll = Object.assign(data, {
                Order_Id: parseInt(Orderid),
                OpType: 'New',
              });

              const createpohed = await axios.instance
                .post(
                  '/PODtl',
                  productcoll,

                  {
                    headers: {
                      Authorization: token,
                      'Content-Type': 'application/json',
                    },
                  },
                )
                .then(res => {
                  //console.log(res.data,"test");
                });
            }

            setTotalamountheader('');
            settotaltax('');
            settotalqty('');
            settotalamt('');
          })
          .then(() => {});
        //pdfcreate(localStorage.getItem('Order_Id'))

        purchasepo();

        // if(localStorage.getItem('Approval2') === 'N' && localStorage.getItem('Approval3') === 'N' && localStorage.getItem('AdminUser') === 'N') {
        //   SendMail()
        //  }

        localStorage.removeItem('Products');
        setprovalue([]);
        //console.log(provalue,"provalues");
        settodatetr(new Date());
        setremark('');

        // //console.log('wefq');

        setTimeout(() => {
          setPoshow(true);
        }, 2000);
        //

        setTimeout(() => {
          setopeecreate1(false);
        }, 2000);
      } else {
        setOutoffRange(true);
        setTimeout(() => {
          setOutoffRange(false);
        }, 2000);
      }
    } else {
      setopen4(true);
      setTimeout(() => {
        setopen4(false);
      }, 2000);
    }
  };
  const save1 = async () => {
    //console.log(remarks)
    if (provalue.length != 0) {
      let prodvalue = [];
      const token = localStorage.getItem('AuthToken');

      const productsvalue = localStorage.getItem('Products');
      let product = JSON.parse(productsvalue);
      // //////////console.log(product)
      prodvalue.push(product);

      const customerid = localStorage.getItem('Customer_Log');
      const Branchlog = localStorage.getItem('Branch_Log');
      const TOTALQTY = localStorage.getItem('Totalqty');
      const TOTALTAX = localStorage.getItem('Toataltax');
      const TOTALAMT = localStorage.getItem('Totalamt');
      const totalnetamt = localStorage.getItem('TotalnetMT');
      const statecode = localStorage.getItem('StateCode');
      const stateid = localStorage.getItem('StateId');
      const createdby = localStorage.getItem('Userid');
      const companyid = localStorage.getItem('Companyid');
      const statename = localStorage.getItem('Statename');
      const companybranchid = localStorage.getItem('combranch');
      ////////////console.log(stateid)
      const cgstamtvalues = localStorage.getItem('Totalcgst');
      const sgstamtvalues = localStorage.getItem('Totalsgst');
      const igstamtvalues = localStorage.getItem('Totaligst');
      // const productcollectionvalue =  await AsyncStorage.setItem('Products')
      // let products =  JSON.parse(productcollectionvalue)
      const Totalamt = localStorage.getItem('Total_Amount');
      const createpohed = await axios.instance
        .put(
          `/POHdr/${props.match.params.id}`,
          {
            Order_Id: hdrpono,
            Order_Date: hdrorderdate,
            Delivery_Date: hdrdeliverydate,
            Company_id: customerid,
            Customer_Id: customerid,
            Remarks: hdrremarks != null ? hdrremarks : ' ',
            Total_Amount: totalamountvaluedata,
            Vat_Amount:
              localStorage.getItem('IGSTApplicable') === 'Y' &&
              localStorage.getItem('RegisterType') === 'SEZ'
                ? 0
                : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                ? totaltax / 2
                : 0,
            Discount_Amount: Total_discount_amt,
            Net_Amount:
              localStorage.getItem('IGSTApplicable') === 'Y' &&
              localStorage.getItem('RegisterType') === 'SEZ'
                ? TOtaligstamt + totalamt
                : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                ? totaltax + totalamt
                : TOtaligstamt + totalamt,
            Created_by: createdby,
            Created_on: fromdatee,
            Cus_Branchid: Branchlog,
            CurrencyId: 0,
            Branch_Id: Branchlog,
            CBranch_Id: companybranchid,
            StateId: Statecodeee,
            PlaceofSupply: 'tamilnadu',
            StateCode: Statecodeee,
            SGSTAmt:
              localStorage.getItem('IGSTApplicable') === 'Y' &&
              localStorage.getItem('RegisterType') === 'SEZ'
                ? 0
                : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                ? totaltax / 2
                : 0,
            IGSTAmt:
              localStorage.getItem('IGSTApplicable') === 'Y' &&
              localStorage.getItem('RegisterType') === 'SEZ'
                ? TOtaligstamt
                : Statecodeee === localStorage.getItem('COMPANY_STATECODE')
                ? 0
                : TOtaligstamt,
            Modified_by: 1,
            Modified_on: 1,
            Indent_id: '',
            Contract_id: parseInt(localStorage.getItem('contract_ID')),
            Remark: remark1,
            OpType: 'Edit',
          },
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async res => {
          // setupdated(true)

          //setprovalue([])
          // const productsvalue =  await  AsyncStorage.getItem('Products')
          // let product =  JSON.parse(productsvalue)
          ////////console.log(res.data)
          const deleteproduct = await axios.instance.delete(
            `/PoDeltedtl/${props.match.params.id}`,
          );
          const productsvalue = localStorage.getItem('Products');
          const Orderid = localStorage.getItem('Order_Id');
          let product = JSON.parse(productsvalue);

          for (const data of product) {
            //console.log(product,'test')

            const productcoll = Object.assign(data, {
              Order_Id: parseInt(props.match.params.id),
              OpType: 'New',
            });

            //console.log(productcoll)

            const createpohed = await axios.instance
              .post(
                `/PODtl`,
                productcoll,

                {
                  headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then(res => {
                //console.log(res.data,'details')
                // localStorage.removeItem('Products')
              });

            // //////////console.log(createpohed.data)
          }
        })
        .then(() => {});

      spinerss1();

      setloading(true);
      purchasepo();
      if (
        localStorage.getItem('Approval2') === 'N' &&
        localStorage.getItem('Approval3') === 'N' &&
        localStorage.getItem('AdminUser') === 'N'
      ) {
        // SendMail()
        //  SetMailforQutotation()
      }

      settodate(new Date());
      setopeecreate(true);

      setTimeout(() => {
        setloading(false);
        setPoshow(true);
        setopeecreate(false);
      }, 3000);
    } else {
      setopen4(true);
      setTimeout(() => {
        setopen4(false);
      }, 2000);
    }
  };

  const backtopoview = () => {
    setPoshow(true);
    setremark('');
    setprovalue([]);
    settotalamt('');
    setselectedtext('Select Product');
    setTOtaligstamt('');
    settotalqty('');
    settotaltax('');
    setTotal_discount_amt('');
    localStorage.removeItem('Products');
  };
  const addscreenview = () => {
    setPoshow(false);
    setPoshowadd(true);
    setremark('');
    setprovalue([]);
    settotalamt('');
    setselectedtext('Select Product');
    setTOtaligstamt('');
    settotalqty('');
    settotaltax('');
    setSelectedValue('');
    setqty('');
    setamount('');
    settax('');
    setsgstamt('');
    setigstamt('');
    setcgstamt('');
    setnetamount('');
    setTotal_discount_amt('');

    localStorage.removeItem('Products');
  };

  const updatescreenview = id => {
    setloading(true);

    setPoshow(false);
    setPoshowadd(false);
    setremark('');
    setSelectedValue('');
    setqty('');
    setamount('');
    settax('');
    setsgstamt('');
    setigstamt('');
    setcgstamt('');
    setnetamount('');
    setprovalue([]);
    Getorderhdr(id);
    getprodctdel(id);
    setIsVisible(false);
    settotalamt('');
    setselectedtext('Select Product');
    setTOtaligstamt('');
    settotalqty('');
    settotaltax('');

    localStorage.removeItem('Products');
    setTotal_discount_amt('');
    setTimeout(() => {
      setloading(false);
    }, 3000);
  };

  const ponodate = async id => {
    await axios.instance.get(`/POHDRPONODATE/${id}`).then(res => {
      //console.log(res.data,'ponodate')
      for (const data of res.data) {
        sethdrpono(data.Order_No);
        sethdrorderdate(data.Order_Date);
        sethdrdeliverydate(data.Delivery_Date);
        sethdrremarks(data.Remarks);
        sethdrnetamt(data.Net_Amount);
        setremark1(data.Remark);
      }

      const totalnetamt1 = 0;
      let totalnetamount1 = [];
      for (const data of res.data) {
        totalnetamount1.push(parseFloat(data.Net_Amount));
      }
      var totalnetcount1 = 0;
      for (let i = 0; i < totalnetamount1.length; i++) {
        totalnetcount1 += totalnetamount1[i];
      }
      settotatlhdrnetamt(totalnetamount1);
    });
  };
  const highlightedRowStyle = {
    backgroundColor: '#58A7AA', // Set your desired background color here
    fontWeight: 'bold', // You can apply any other styles you want for the highlighted row
  };

  // const IGSTAMT= ((localStorage.getItem("IGSTApplicable")==='Y') && (localStorage.getItem("RegisterType")==="SEZ"))?numeral(provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00'):poraisecustomerstatecode === companystatecode? 0: numeral(provalue.reduce((accumulator, currentValue) => accumulator + (((currentValue.Rate * currentValue.Order_Qty)-((currentValue.Rate * currentValue.Order_Qty)*(currentValue.DisPer)/100))*(currentValue.IGSTPer))/100, 0)).format('0,0.00')
  // console.log(IGSTAMT)

  return (
    <>
      {!props.match.params.id ? (
        <div>
          <Backdrop open={savespinners} className={classes.backdrop}>
            <Spinner name="ball-spin-fade-loader" color="#fafafa" />
          </Backdrop>
          <Card className="titledefects">
            <CardBody>
              <h6>Purchase Order</h6>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="titledefects">
            <CardBody>
              {localStorage.getItem('editflag') === 1 ? (
                <h6> Update Purchase Order</h6>
              ) : (
                <h6> Purchase Order View</h6>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {!props.match.params.id ? (
        <div>
          <Card className="hedercard">
            <div className="InspectionReportForm">
              <div className="poss">
                <span>PO No:</span>
              </div>
              {/* <Input  className="Todates" type='text' style={{width:'50px'}}  disabled />  */}

              <label className="poss1">
                <span>PO Date</span>
              </label>
              <div className="Todate">
                <Input type="date" value={todate1} id="fromdate" disabled />
              </div>
              <div className="Deliveryss">
                <lable>
                  <span>Delivery Date</span>
                </lable>
              </div>
              <div className="Todate">
                <Input
                  type="date"
                  // min={Mindate}
                  min={'1900-01-01'}
                  maxLength="4"
                  max={'9999-12-31'}
                  value={toodate}
                  id="fromdate"
                  onChange={e => settoodate(e.target.value)}
                />
              </div>
              <div className="tearmsconditions">
                <Label className="termslables" for="exampleDate">
                  <span>Terms&conditions</span>
                </Label>
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
            {vtaper && (
              <Card className="subcard">
                <div className="headersub">
                  <div className="closebutton"></div>
                </div>

                <form id="subfom">
                  <CardBody>
                    <div className="cardcontent">
                      <div className="cardwidhdd"></div>

                      <div className="major18">
                        <label>Product </label>
                        <Select
                          options={Productcollection}
                          ref={selectInputRef}
                          defaultValue={categorydefaultvalue}
                          width={150}
                          onChange={value => {
                            getoneproduct(value.value);
                            console.log(value.value, 'id');
                            setproductno(value.value);
                          }}
                        />
                        <p style={{ color: 'red', fontSize: 15 }}>
                          {producterror}
                        </p>
                      </div>
                      <div className="major14">
                        <label>Qty </label>
                        <input
                          type="number"
                          value={qty}
                          onChange={e => amountcal(e.target.value)}
                          placeholder="Qty"
                          className="pleacadu"
                        />
                        <p style={{ color: 'red', fontSize: 15 }}>{qtyerror}</p>
                      </div>
                      <div className="major14">
                        <label> Uom </label>
                        <input
                          type="text"
                          value={uom}
                          disabled
                          placeholder="Uom"
                          className="pleacadu"
                        />
                      </div>
                      <div className="major15">
                        <label>Rate</label>
                        <input
                          type="number"
                          disabled
                          value={amount}
                          placeholder=" Rate"
                        />
                      </div>
                      <div className="major15">
                        <label>Dis%</label>
                        <input
                          type="number"
                          value={discount}
                          disabled
                          placeholder=" Dis%"
                        />
                      </div>
                      <div className="major15">
                        <label>Tax%</label>
                        <input
                          type="number"
                          value={
                            localStorage.getItem('IGSTApplicable') === 'Y' &&
                            localStorage.getItem('RegisterType') === 'SEZ'
                              ? tax
                              : Statecodeee ===
                                localStorage.getItem('COMPANY_STATECODE')
                              ? tax
                              : tax
                          }
                          disabled
                          placeholder=" Tax%"
                        />
                      </div>
                      <div className="major15">
                        <label>Amount</label>
                        <input
                          style={{ width: '150px' }}
                          type="number"
                          disabled
                          value={netamount}
                          placeholder="Amount"
                        />
                      </div>
                      <div></div>
                      <div className="adbutons">
                        <Button1
                          onClick={productarray}
                          color="primary"
                          className="adbtn2"
                        >
                          Add
                        </Button1>
                      </div>
                      <div className="adbutons">
                        <Button1
                          onClick={() => {
                            {
                              save();
                              // SetMailforQutotation()
                            }
                          }}
                          color="success"
                          className="adbtn2"
                        >
                          Save
                        </Button1>
                      </div>
                    </div>
                    <div>
                      <Row>
                        <div className="major15">
                          <label style={{ marginLeft: '75px' }}>Remarks</label>
                          <textarea
                            style={{ width: '250px', marginLeft: '75px' }}
                            value={remark1}
                            onChange={e => setremark1(e.target.value)}
                            type="text"
                          ></textarea>
                        </div>

                        <div
                          style={{
                            width: '200px',
                            marginTop: '2px',
                            marginLeft: '15px',
                          }}
                        >
                          <Label>Stock</Label>

                          <Input
                            type="text"
                            // value={Stock}
                            disabled
                          />
                        </div>
                      </Row>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {/* <p style={{color:'red', marginLeft:100, fontSize:15}}>{producterror}</p> */}
                      {/* <p style={{color:'red', marginLeft:50, fontSize:15}}>{qtyerror}</p> */}
                    </div>
                  </CardBody>
                </form>
              </Card>
            )}
            {visible && (
              <Card className="subcard">
                <div className="headersub">
                  <div className="closebutton"></div>
                </div>
                <form id="subfom">
                  <CardBody>
                    <div className="cardcontent">
                      {Productonecollect.map(data => (
                        <div className="cardwidhdd">
                          <div className="major18">
                            <label for="exampleSelect" className>
                              <b>Product</b>
                            </label>

                            {/* <Select  defaultInputValue='' options={Productcollection}  defaultValue={{ 'label': "Select product", 'value': '' }}  width={50} onChange={(value) => getoneproduct(value.value)}  /> */}
                            <input
                              style={{ width: '230px' }}
                              className="mt-1"
                              type="text"
                              value={data.Product_Details_Description}
                              disabled
                              placeholder=" Tax%"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="major14">
                        <label>
                          <b>Qty</b>{' '}
                        </label>
                        <input
                          type="number"
                          value={updatedqty}
                          onChange={e => editforproduct(e.target.value)}
                          placeholder="Qty"
                          className="pleacadu"
                        />
                      </div>
                      {Productonecollect.map(data => (
                        <div className="major14">
                          <label>
                            {' '}
                            <b>Uom</b>{' '}
                          </label>
                          <input
                            type="text"
                            value={data.UOM_Description}
                            disabled
                            placeholder="Uom"
                            className="pleacadu"
                          />
                        </div>
                      ))}
                      {Productonecollect.map(data => (
                        <div className="major15">
                          <label>
                            <b>Rate</b>
                          </label>
                          <input
                            type="number"
                            disabled
                            value={data.Rate}
                            placeholder=" Rate"
                          />
                        </div>
                      ))}
                      {Productonecollect.map(data => (
                        <div className="major15">
                          <label>
                            <b>Dis%</b>
                          </label>
                          <input
                            type="number"
                            value={disperupdate}
                            disabled
                            placeholder=" Dis%"
                          />
                        </div>
                      ))}
                      {Productonecollect.map(data => (
                        <div className="major15">
                          <label>
                            <b>Tax%</b>
                          </label>
                          <input
                            type="number"
                            value={
                              localStorage.getItem('IGSTApplicable') === 'Y' &&
                              localStorage.getItem('RegisterType') === 'SEZ'
                                ? data.IGSTPer
                                : Statecodeee ===
                                  localStorage.getItem('COMPANY_STATECODE')
                                ? data.GSTPer
                                : data.IGSTPer
                            }
                            disabled
                            placeholder=" Tax%"
                          />
                        </div>
                      ))}

                      <div className="major15">
                        <label>
                          <b>Amount</b>
                        </label>
                        <input
                          style={{ width: '150px' }}
                          type="number"
                          disabled
                          value={updatenetamt}
                          placeholder="Amount"
                        />
                      </div>

                      <div></div>

                      <div className="adbutons">
                        <Button1
                          onClick={updateproduct}
                          color="primary"
                          className="adbtn2"
                        >
                          Update
                        </Button1>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <p style={{ color: 'red', marginLeft: 10, fontSize: 15 }}>
                        {producterror}
                      </p>
                      <p style={{ color: 'red', marginLeft: 10, fontSize: 15 }}>
                        {qtyerror}
                      </p>
                    </div>
                  </CardBody>
                </form>
              </Card>
            )}
          </Paper>
          <Paper>
            <div style={{ marginTop: '10px', marginLeft: '15px' }}>
              <TableContainer className="">
                {/* <Toolbar className="serchdiv">
           <div className="search" style={{display: 'none'}}>
           <input className="inpusearch" placeholder="search"    width= "750px" />
           <SearchIcon />
           </div> */}
                {/* <div className='savebutt'>
           <Button1   onClick={()=>{{
            save()
            // SetMailforQutotation()
            
           }
            
            }} color="success" className="adbtn2"  >
   Save
</Button1>
</div> */}
                {/* </Toolbar> */}
                <Table
                  style={{ marginTop: '10px' }}
                  className="Qacats"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">S.no</TableCell>

                      <TableCell align="center">Products</TableCell>
                      <TableCell align="center">Qty</TableCell>
                      <TableCell align="center">Uom</TableCell>
                      <TableCell align="center">Rate</TableCell>
                      <TableCell align="center">Dis%</TableCell>
                      <TableCell align="center">Tax%</TableCell>
                      <TableCell align="center">Amount</TableCell>

                      {/* <TableCell align="left">Edit</TableCell>
<TableCell align="left">
Delete
</TableCell> */}
                      <TableCell align="center">Action</TableCell>
                      {/* <TableCell align="left">

</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {provalue.length != 0
                      ? changepage().map((data, index) => (
                          <TableRow>
                            <TableCell width="100px" align="left">
                              {index + 1}
                            </TableCell>
                            <TableCell width="400px" align="left">
                              {data.Product_Details_Description}
                            </TableCell>

                            <TableCell width="100px" align="center">
                              {data.Order_Qty}
                            </TableCell>
                            <TableCell width="100px" align="center">
                              {data.UOM_Description}
                            </TableCell>
                            <TableCell width="150" align="right">
                              {numeral(data.Rate).format('0,0.00')}
                            </TableCell>

                            <TableCell width="100px" color="red" align="center">
                              {data.DisPer}
                            </TableCell>

                            <TableCell color="red" align="center" width="100">
                              {data.GSTPer != 0 ? data.GSTPer : data.IGSTPer}%
                            </TableCell>

                            <TableCell color="red" align="right" width="150">
                              {numeral(data.Amount).format('0,0.00')}
                            </TableCell>
                            <TableCell color="red" align="center" width="100">
                              <IconButton
                                size="small"
                                color="primaty"
                                onClick={() =>
                                  Updateget(data.Product_Id, data.Sno)
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              {/* </TableCell>
              <TableCell  color="red"  align="center" width="100"    > */}
                              <IconButton
                                onClick={e => {
                                  deleteweb(data.Product_Id, e);
                                  // setdeleted(true)
                                }}
                                size="small"
                                color="secondary"
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              color="red"
                              align="center"
                              width="100"
                            ></TableCell>
                          </TableRow>
                        ))
                      : null}

                    <TableRow>
                      <TableCell align="left"></TableCell>

                      <TableCell align="left">
                        <b>Total Qty</b>
                      </TableCell>
                      <TableCell align="center" style={{ color: 'red' }}>
                        {totalqty}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'red' }}
                      ></TableCell>
                      <TableCell className="text-nowrap" align="center">
                        <b>Total Amount</b>
                      </TableCell>
                      <TableCell align="right" style={{ color: 'red' }}>
                        {numeral(totalamt).format('0,0.00')}
                      </TableCell>

                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table>
                  <TableRow>
                    <TableCell
                      className="text-nowrap"
                      align="center"
                    ></TableCell>

                    <TableCell className="text-nowrap" align="left">
                      <Badge
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          backgroundColor: '#58A7AA',
                        }}
                      >
                        Discount
                      </Badge>
                    </TableCell>

                    <TableCell className="text-nowrap" align="left">
                      <b>{Total_discount_amt}</b>
                    </TableCell>
                    <TableCell className="text-nowrap" align="left">
                      <Badge
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          backgroundColor: '#58A7AA',
                        }}
                      >
                        SGST
                      </Badge>{' '}
                      :{' '}
                      <b>
                        {localStorage.getItem('IGSTApplicable') === 'Y' &&
                        localStorage.getItem('RegisterType') === 'SEZ'
                          ? 0
                          : Statecodeee ===
                            localStorage.getItem('COMPANY_STATECODE')
                          ? numeral(
                              provalue.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    (currentValue.GSTPer / 2)) /
                                    100,
                                0,
                              ),
                            ).format('0,0.00')
                          : 0}
                      </b>
                    </TableCell>
                    <TableCell className="text-nowrap" align="left">
                      <Badge
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          backgroundColor: '#58A7AA',
                        }}
                      >
                        CGST
                      </Badge>{' '}
                      :{' '}
                      <b>
                        {localStorage.getItem('IGSTApplicable') === 'Y' &&
                        localStorage.getItem('RegisterType') === 'SEZ'
                          ? 0
                          : Statecodeee ===
                            localStorage.getItem('COMPANY_STATECODE')
                          ? numeral(
                              provalue.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    (currentValue.GSTPer / 2)) /
                                    100,
                                0,
                              ),
                            ).format('0,0.00')
                          : 0}
                      </b>
                    </TableCell>
                    <TableCell className="text-nowrap" align="left">
                      <Badge
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          backgroundColor: '#58A7AA',
                        }}
                      >
                        IGST
                      </Badge>{' '}
                      :{' '}
                      <b>
                        {localStorage.getItem('IGSTApplicable') === 'Y' &&
                        localStorage.getItem('RegisterType') === 'SEZ'
                          ? numeral(
                              provalue.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    currentValue.IGSTPer) /
                                    100,
                                0,
                              ),
                            ).format('0,0.00')
                          : Statecodeee ===
                            localStorage.getItem('COMPANY_STATECODE')
                          ? 0
                          : numeral(
                              provalue.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    currentValue.IGSTPer) /
                                    100,
                                0,
                              ),
                            ).format('0,0.00')}
                      </b>
                    </TableCell>
                    {Statecodeee ===
                    localStorage.getItem('COMPANY_STATECODE') ? (
                      <>
                        <TableCell className="text-nowrap" align="left">
                          <Badge
                            style={{
                              color: 'white',
                              fontSize: '14px',
                              backgroundColor: '#58A7AA',
                            }}
                          >
                            NET_AMT
                          </Badge>
                        </TableCell>
                        <TableCell className="text-nowrap" align="left">
                          <b>
                            {numeral(
                              provalue.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  currentValue.Amount +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    (currentValue.GSTPer / 2)) /
                                    100 +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    (currentValue.GSTPer / 2)) /
                                    100,
                                0,
                              ) - Total_discount_amt,
                            ).format('0,0.00')}
                          </b>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-nowrap" align="left">
                          <b>NET_AMT</b>
                        </TableCell>
                        <TableCell className="text-nowrap" align="left">
                          <b>
                            {numeral(
                              provalue.reduce(
                                (accumulator, currentValue) =>
                                  accumulator +
                                  currentValue.Amount +
                                  ((currentValue.Rate * currentValue.Order_Qty -
                                    (currentValue.Rate *
                                      currentValue.Order_Qty *
                                      currentValue.DisPer) /
                                      100) *
                                    currentValue.IGSTPer) /
                                    100,
                                0,
                              ) - Total_discount_amt,
                            ).format('0,0.00')}
                          </b>
                        </TableCell>
                      </>
                    )}
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
          </Snackbar>

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
          </Snackbar>
          <Backdrop open={spinnerforpo} className={classes.backdrop}>
            <Spinner name="ball-spin-fade-loader" color="#fafafa" />
            <p style={{ marginTop: '50px' }}>Po is processing...</p>
          </Backdrop>

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={opeecreate1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Po added successfully"
          />
        </div>
      ) : (
        <div>
          <Backdrop open={savespinners} className={classes.backdrop}>
            <Spinner name="ball-spin-fade-loader" color="#fafafa" />
          </Backdrop>
          <Card className="hedercard">
            <div className="InspectionReportForm">
              <div className="poss">
                <span>PO No:</span>
                <b>
                  {' '}
                  <Input
                    type="text"
                    value={hdrpono}
                    id="fromdate"
                    disabled
                    style={{ width: '80px' }}
                  />
                </b>
              </div>
              <label className="poss1">
                <span>PO Date</span>
              </label>
              <div className="Todate">
                <Input
                  type="date"
                  value={moment(hdrorderdate).format('YYYY-MM-DD')}
                  id="fromdate"
                  disabled
                />
              </div>
              <div className="Deliveryss">
                <lable>
                  <span>Delivery Date</span>
                </lable>
              </div>
              <div className="Todate">
                <Input
                  type="date"
                  min={'1900-01-01'}
                  maxLength="4"
                  max={'9999-12-31'}
                  value={moment(hdrdeliverydate).format('YYYY-MM-DD')}
                  // value={hdrdeliverydate}
                  id="fromdate"
                  onChange={e => sethdrdeliverydate(e.target.value)}
                />
              </div>
              <div className="tearmsconditions">
                <Label className="termslables" for="exampleDate">
                  <span>Terms&conditions1</span>
                </Label>
                <Input
                  value={hdrremarks}
                  onChange={e => sethdrremarks(e.target.value)}
                  id="exampleDate"
                  placeholder="Terms&conditions"
                />
              </div>
            </div>
          </Card>
          <Paper>
            {vtaper && (
              <Card className="subcard">
                <div className="headersub">
                  <div className="closebutton"></div>
                </div>
                <form id="subfom">
                  {parseInt(localStorage.getItem('editflag')) === 1 && (
                    <CardBody>
                      <div className="cardcontent">
                        {/* <div className='cardwidhdd'>
          <label for="exampleSelect" className ><b>Products</b></label>
         
          <Select  defaultInputValue='' options={Productcollection}  defaultValue={{ 'label': "Select product", 'value': '' }}  width={50} onChange={(value) => getoneproduct(value.value)}  />
     
</div> */}
                        <div className="major18">
                          <label>
                            <span>Product</span>{' '}
                          </label>
                          <Select
                            ref={selectInputRef}
                            options={Productcollection}
                            defaultValue={categorydefaultvalue}
                            width={50}
                            onChange={value => getoneproduct(value.value)}
                          />
                          <p style={{ color: 'red', fontSize: 15 }}>
                            {producterror}
                          </p>
                        </div>
                        <div className="major14">
                          <label>
                            <span>Qty</span>{' '}
                          </label>
                          <input
                            type="number"
                            value={qty}
                            onChange={e => amountcal(e.target.value)}
                            placeholder="Qty"
                            className="pleacadu"
                          />
                          <p style={{ color: 'red', fontSize: 15 }}>
                            {qtyerror}
                          </p>
                        </div>
                        <div className="major14">
                          <label>
                            {' '}
                            <span>Uom</span>{' '}
                          </label>
                          <input
                            type="text"
                            value={uom}
                            disabled
                            placeholder="Uom"
                            className="pleacadu"
                          />
                        </div>
                        <div className="major15">
                          <label>
                            <span>Rate</span>
                          </label>
                          <input
                            type="number"
                            disabled
                            value={amount}
                            placeholder=" Rate"
                          />
                        </div>
                        <div className="major15">
                          <label>
                            <span>Dis%</span>
                          </label>
                          <input
                            type="number"
                            value={discount}
                            disabled
                            placeholder=" Dis%"
                          />
                        </div>
                        <div className="major15">
                          <label>
                            <span>Tax%</span>
                          </label>
                          <input
                            type="number"
                            value={
                              localStorage.getItem('StateCode') === '33'
                                ? tax
                                : tax
                            }
                            disabled
                            placeholder=" Tax%"
                          />
                        </div>
                        <div className="major15">
                          <label>
                            <span>Amount</span>
                          </label>
                          <input
                            type="number"
                            disabled
                            value={netamount.toLocaleString()}
                            placeholder="Amount"
                          />
                        </div>
                        <div></div>
                        <div className="adbutons">
                          <Button1
                            onClick={productarray}
                            color="primary"
                            className="adbtn2"
                          >
                            Add
                          </Button1>
                        </div>
                      </div>
                      {/* <div className='major15'>
          <label>
            Remarks
          </label>
          <input style={{width:"200px"}} onChange={(e)=>setremark1(e.target.value)} type="text"></input>
        </div> */}
                      <div className="major15">
                        <label style={{ marginLeft: '-26px' }}>Remarks</label>
                        <textarea
                          style={{ width: '250px', marginLeft: '-26px' }}
                          value={remark1}
                          onChange={e => setremark1(e.target.value)}
                          type="text"
                        ></textarea>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {/* <p style={{color:'red', marginLeft:10, fontSize:15}}>{producterror}</p>
  <p style={{color:'red', marginLeft:45,   fontSize:15}}>{qtyerror}</p> */}
                      </div>
                    </CardBody>
                  )}
                </form>
              </Card>
            )}
            {visible && (
              <Card className="subcard">
                <div className="headersub">
                  <div className="closebutton"></div>
                </div>
                <form id="subfom">
                  {parseInt(localStorage.getItem('editflag')) === 1 && (
                    <CardBody>
                      <div className="cardcontent">
                        {Productonecollect.map(data => (
                          <div className="major18">
                            <label for="exampleSelect">
                              <span>Product</span>
                            </label>

                            {/* <Select  defaultInputValue='' options={Productcollection}  defaultValue={{ 'label': "Select product", 'value': '' }}  width={50} onChange={(value) => getoneproduct(value.value)}  /> */}
                            <input
                              style={{ width: '250px' }}
                              className="mt-1"
                              type="text"
                              value={data.Product_Details_Description}
                              disabled
                              placeholder=" Tax%"
                            />
                          </div>
                        ))}
                        <div className="major14">
                          <label>
                            <span>Qty</span>{' '}
                          </label>
                          <input
                            type="number"
                            value={updatedqty}
                            onChange={e => editforproduct(e.target.value)}
                            placeholder="Qty"
                            className="pleacadu"
                          />
                        </div>
                        {Productonecollect.map(data => (
                          <div className="major14">
                            <label>
                              {' '}
                              <span>Uom</span>{' '}
                            </label>
                            <input
                              type="text"
                              value={data.UOM_Description}
                              disabled
                              placeholder="Uom"
                              className="pleacadu"
                            />
                          </div>
                        ))}
                        {Productonecollect.map(data => (
                          <div className="major15">
                            <label>
                              <span>Rate</span>
                            </label>
                            <input
                              type="number"
                              disabled
                              value={data.Rate}
                              placeholder=" Rate"
                            />
                          </div>
                        ))}
                        {Productonecollect.map(data => (
                          <div className="major15">
                            <label>
                              <span>Dis%</span>
                            </label>
                            <input
                              type="number"
                              value={discount}
                              disabled
                              placeholder=" Dis%"
                            />
                          </div>
                        ))}
                        {Productonecollect.map(data => (
                          <div className="major15">
                            <label>
                              <span>Tax%</span>
                            </label>
                            <input
                              type="number"
                              value={
                                localStorage.getItem('IGSTApplicable') ===
                                  'Y' &&
                                localStorage.getItem('RegisterType') === 'SEZ'
                                  ? data.IGSTPer
                                  : Statecodeee ===
                                    localStorage.getItem('COMPANY_STATECODE')
                                  ? data.GSTPer
                                  : data.IGSTPer
                              }
                              disabled
                              placeholder=" Tax%"
                            />
                          </div>
                        ))}

                        <div className="major15">
                          <label>
                            <span>Amount</span>
                          </label>
                          <input
                            type="number"
                            disabled
                            value={updatenetamt}
                            placeholder="Amount"
                          />
                        </div>

                        <div></div>

                        <div className="adbutons">
                          <Button1
                            onClick={() => {
                              updateproduct();
                            }}
                            color="primary"
                            className="adbtn2"
                          >
                            Update
                          </Button1>
                        </div>
                      </div>
                      <div className="major15">
                        <label style={{ marginLeft: '-26px' }}>Remarks</label>
                        <textarea
                          style={{ width: '250px', marginLeft: '-26px' }}
                          value={remark1}
                          onChange={e => setremark1(e.target.value)}
                          type="text"
                        ></textarea>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p
                          style={{
                            color: 'red',
                            marginLeft: -10,
                            fontSize: 15,
                          }}
                        >
                          {producterror}
                        </p>
                        <p
                          style={{ color: 'red', marginLeft: 40, fontSize: 15 }}
                        >
                          {qtyerror}
                        </p>
                      </div>
                    </CardBody>
                  )}
                </form>
              </Card>
            )}
          </Paper>
          <Paper>
            <div style={{ marginTop: '5px', marginLeft: '15px' }}>
              <TableContainer className="">
                <Toolbar className="serchdiv">
                  <div className="search" style={{ display: 'none' }}>
                    <input
                      className="inpusearch"
                      placeholder="search"
                      width="750px"
                    />
                    <SearchIcon />
                  </div>
                  <div className="savebutt">
                    {parseInt(localStorage.getItem('editflag')) === 1 ? (
                      <Button1
                        onClick={() => {
                          save1();
                          // setupdated(true)
                        }}
                        color="success"
                        className="adbtn2"
                      >
                        Update
                      </Button1>
                    ) : null}
                  </div>
                </Toolbar>
                {parseInt(localStorage.getItem('editflag')) === 1 ? (
                  <Table className="Qacats" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">S.no</TableCell>
                        <TableCell align="center">Products</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="center">Uom</TableCell>
                        <TableCell align="center">Rate</TableCell>
                        <TableCell align="center">Dis%</TableCell>
                        <TableCell align="center">Tax%</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        {/* <TableCell  align="left" >Net_Amount</TableCell>   */}
                        <TableCell align="center">Action</TableCell>
                        {/* <TableCell align="left">
Delete
</TableCell> */}
                        {/* <TableCell align="left">

</TableCell> */}
                      </TableRow>
                    </TableHead>
                    {provalue.length != 0
                      ? changepage().map((data, index) => (
                          <TableBody>
                            <TableRow>
                              <TableCell color="red" align="left" width="100px">
                                {index + 1}
                              </TableCell>
                              <TableCell
                                className="text-nowrap"
                                width="300px"
                                align="left"
                              >
                                {data.Product_Details_Description}
                              </TableCell>

                              <TableCell width="200px" align="center">
                                {data.Order_Qty}
                              </TableCell>
                              <TableCell width="200px" align="center">
                                {data.UOM_Description}
                              </TableCell>
                              <TableCell width="170" align="right">
                                {numeral(data.Rate).format('0,0.00')}
                              </TableCell>

                              <TableCell color="red" align="center" width="100">
                                {data.DisPer}
                              </TableCell>

                              <TableCell color="red" align="center" width="170">
                                {data.GSTPer != 0 ? data.GSTPer : data.IGSTPer}%
                              </TableCell>

                              <TableCell color="red" align="right" width="100">
                                {numeral(data.Amount).format('0,0.00')}
                              </TableCell>
                              <TableCell color="red" align="center" width="150">
                                <IconButton
                                  size="small"
                                  color="primaty"
                                  onClick={() =>
                                    Updateget(data.Product_Id, data.Sno)
                                  }
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                {/* </TableCell>
            <TableCell  color="red"  align="center" width="100"    > */}
                                <IconButton
                                  onClick={e => deleteweb(data.Product_Id, e)}
                                  size="small"
                                  color="secondary"
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                              <TableCell
                                color="red"
                                align="center"
                                width="100"
                              ></TableCell>
                            </TableRow>
                          </TableBody>
                        ))
                      : null}
                    <TableRow>
                      <TableCell align="left"></TableCell>

                      <TableCell align="center">
                        <b>TotalQty</b>
                      </TableCell>
                      <TableCell align="center" style={{ color: 'red' }}>
                        {totalqty}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'red' }}
                      ></TableCell>
                      <TableCell align="center">
                        <b>TotalAmount</b>
                      </TableCell>
                      <TableCell align="right" style={{ color: 'red' }}>
                        {numeral(totalamt).format('0,0.00')}
                      </TableCell>

                      <TableCell align="left"></TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell  align="left"></TableCell> */}
                      <TableCell></TableCell>

                      <TableCell align="center">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          Discount
                        </Badge>
                      </TableCell>
                      <TableCell className="text-nowrap" align="center">
                        {' '}
                        <b>{Total_discount_amt}</b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        {' '}
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          {' '}
                          SGST
                        </Badge>{' '}
                        :{' '}
                        <b>
                          {localStorage.getItem('IGSTApplicable') === 'Y' &&
                          localStorage.getItem('RegisterType') === 'SEZ'
                            ? 0
                            : Statecodeee ===
                              localStorage.getItem('COMPANY_STATECODE')
                            ? numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      (currentValue.GSTPer / 2)) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')
                            : 0}
                        </b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          {' '}
                          CGST
                        </Badge>{' '}
                        :{' '}
                        <b>
                          {localStorage.getItem('IGSTApplicable') === 'Y' &&
                          localStorage.getItem('RegisterType') === 'SEZ'
                            ? 0
                            : Statecodeee ===
                              localStorage.getItem('COMPANY_STATECODE')
                            ? numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      (currentValue.GSTPer / 2)) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')
                            : 0}
                        </b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          IGST
                        </Badge>{' '}
                        :{' '}
                        <b>
                          {localStorage.getItem('IGSTApplicable') === 'Y' &&
                          localStorage.getItem('RegisterType') === 'SEZ'
                            ? numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      currentValue.IGSTPer) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')
                            : Statecodeee ===
                              localStorage.getItem('COMPANY_STATECODE')
                            ? 0
                            : numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      currentValue.IGSTPer) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')}
                        </b>
                      </TableCell>
                      {Statecodeee ===
                      localStorage.getItem('COMPANY_STATECODE') ? (
                        <>
                          <TableCell className="text-nowrap" align="left">
                            <Badge
                              style={{
                                color: 'white',
                                fontSize: '14px',
                                backgroundColor: '#58A7AA',
                              }}
                            >
                              NET_AMT
                            </Badge>
                          </TableCell>
                          <TableCell className="text-nowrap" align="left">
                            <b>
                              {numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    currentValue.Amount +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      (currentValue.GSTPer / 2)) /
                                      100 +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      (currentValue.GSTPer / 2)) /
                                      100,
                                  0,
                                ) - Total_discount_amt,
                              ).format('0,0.00')}
                            </b>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="text-nowrap" align="left">
                            <Badge
                              style={{
                                color: 'white',
                                fontSize: '14px',
                                backgroundColor: '#58A7AA',
                              }}
                            >
                              NET_AMT
                            </Badge>
                          </TableCell>
                          <TableCell className="text-nowrap" align="left">
                            <b>
                              {numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    currentValue.Amount +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      currentValue.IGSTPer) /
                                      100,
                                  0,
                                ) - Total_discount_amt,
                              ).format('0.0,00')}
                            </b>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </Table>
                ) : (
                  <Table className="Qacats" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">S.no</TableCell>
                        <TableCell align="left">Products</TableCell>
                        <TableCell align="left">Qty</TableCell>
                        <TableCell align="left">Uom</TableCell>
                        <TableCell align="left">Rate</TableCell>
                        <TableCell align="left">Dis%</TableCell>
                        <TableCell align="left">Tax%</TableCell>
                        <TableCell align="left">Amounts</TableCell>

                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {provalue.length != 0
                        ? changepage().map((data, index) => (
                            <TableRow>
                              <TableCell
                                color="red"
                                align="left"
                                style={{ width: '100px' }}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell width="300px" align="left">
                                {data.Product_Details_Description}
                              </TableCell>

                              <TableCell width="200px" align="left">
                                {data.Order_Qty}
                              </TableCell>
                              <TableCell width="200px" align="left">
                                {data.UOM_Description}
                              </TableCell>
                              <TableCell width="170" align="left">
                                {numeral(data.Rate).format('0,0.00')}
                              </TableCell>

                              <TableCell color="red" align="left" width="170">
                                {data.DisPer}
                              </TableCell>

                              <TableCell color="red" align="left" width="170">
                                {data.GSTPer != 0 ? data.GSTPer : data.IGSTPer}%
                              </TableCell>

                              <TableCell color="red" align="left" width="100">
                                {numeral(data.Amount).format('0,0.00')}
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>

                    <TableRow>
                      <TableCell align="left"></TableCell>

                      <TableCell align="left">
                        <b>TotalQty</b>
                      </TableCell>
                      <TableCell align="left" style={{ color: 'red' }}>
                        {totalqty}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'red' }}
                      ></TableCell>
                      <TableCell align="left">
                        <b>TotalAmount</b>
                      </TableCell>
                      <TableCell align="left" style={{ color: 'red' }}>
                        {numeral(totalamt).format('0,0.00')}
                      </TableCell>

                      <TableCell align="left"></TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell  align="left"></TableCell> */}

                      <TableCell align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          Discount
                        </Badge>
                      </TableCell>

                      <TableCell className="text-nowrap" align="left">
                        <b>{Total_discount_amt}</b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          SGST
                        </Badge>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <b>
                          {localStorage.getItem('IGSTApplicable') === 'Y' &&
                          localStorage.getItem('RegisterType') === 'SEZ'
                            ? 0
                            : poraisecustomerstatecode === companystatecode
                            ? numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      (currentValue.GSTPer / 2)) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')
                            : 0}
                        </b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          CGST
                        </Badge>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <b>
                          {localStorage.getItem('IGSTApplicable') === 'Y' &&
                          localStorage.getItem('RegisterType') === 'SEZ'
                            ? 0
                            : poraisecustomerstatecode === companystatecode
                            ? numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      (currentValue.GSTPer / 2)) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')
                            : 0}
                        </b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          IGST
                        </Badge>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <b>
                          {localStorage.getItem('IGSTApplicable') === 'Y' &&
                          localStorage.getItem('RegisterType') === 'SEZ'
                            ? numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      currentValue.IGSTPer) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')
                            : poraisecustomerstatecode === companystatecode
                            ? 0
                            : numeral(
                                provalue.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    ((currentValue.Rate *
                                      currentValue.Order_Qty -
                                      (currentValue.Rate *
                                        currentValue.Order_Qty *
                                        currentValue.DisPer) /
                                        100) *
                                      currentValue.IGSTPer) /
                                      100,
                                  0,
                                ),
                              ).format('0,0.00')}
                        </b>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <Badge
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: '#58A7AA',
                          }}
                        >
                          NET_AMT
                        </Badge>
                      </TableCell>
                      <TableCell className="text-nowrap" align="left">
                        <b>
                          {numeral(hdrnetamt - Total_discount_amt).format(
                            '0,0.00',
                          )}
                        </b>
                      </TableCell>
                    </TableRow>
                  </Table>
                )}
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
                open={opeecreate1}
                autoHideDuration={2000}
                onClose={handleClose}
                message="PO added successfully"
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
                message="PO Updated successfully"
              />
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open1}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Purchase Order   updated successfully"
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
          </Snackbar>

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
          <Backdrop open={spinnerforsingleupdate} className={classes.backdrop}>
            <Spinner name="ball-spin-fade-loader" color="#fafafa" />
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
              Atleast add one Product to complete a Po
            </Alert>
          </Snackbar>
          {updated ? (
            <SweetAlert
              title=" Updated Successfully"
              timeout={2000}
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showCloseButton={false}
              showConfirm={false}
              success
              onConfirm={() => {
                setupdated(false);
              }}
            ></SweetAlert>
          ) : null}

          {added ? (
            <SweetAlert
              title=" Added Successfully"
              timeout={2000}
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showCloseButton={false}
              showConfirm={false}
              success
              onConfirm={() => {
                setadded(false);
              }}
            ></SweetAlert>
          ) : null}
        </div>
      )}
    </>
  );
}

export default ChartPage;

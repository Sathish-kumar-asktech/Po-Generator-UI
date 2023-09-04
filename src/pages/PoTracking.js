import React, { useEffect, useRef, useState } from 'react';
//import './widgetpage.css'
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';
import Backdrop from '@material-ui/core/Backdrop';

import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';
import './purchasetracking.css';
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
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Badge,
  Row,
  Container,
} from 'reactstrap';
import numeral from 'numeral';
import moment from 'moment';
import Select from 'react-select';
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
import axios from '../axios';
import Button1 from 'reactstrap/lib/Button';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Spinner from 'react-spinkit';
import { saveAs } from 'file-saver';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet,
} from 'react-device-detect';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function POTRACKING(props) {
  const history = useHistory();

  const classes = useStyles();
  const [category, setcategory] = useState('');
  const [updateCategory, setupdateCategory] = useState('');
  const [defact1, setdefact1] = useState([]);
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [open3, setopen3] = useState(false);
  const [Acive, setAcive] = useState('yes');
  const updatecatee = useRef('');
  const activeref = useRef('');
  const [{ user }, dispatch] = useStateValue();
  const [userinf, setuserinf] = useState([]);
  const idref = useRef('');
  const pages = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 400, 500,
    600, 700, 800, 900, 1000,
  ];
  const [page, setpage] = useState(0);
  const [rowsperpage, setrowsperpage] = useState(pages[page]);

  const pages1 = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 400, 500,
    600, 700, 800, 900, 1000,
  ];
  const [page1, setpage1] = useState(0);
  const [rowsperpage1, setrowsperpage1] = useState(pages1[page1]);
  const [erros, seterros] = useState(false);
  const [errors1, seterrors1] = useState(false);
  const [fromdatee, setfromdatee] = useState('');
  const [todate1, settodate1] = useState('');
  const [toodate, settoodate] = useState('');
  const [show1, setShow1] = useState(false);
  const [sharename, setsharename] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [cutomer, setcutomer] = useState([]);
  const [deletingid, setdeletingid] = useState('');
  const [PonoHelp, setPonoHelp] = useState([]);
  const [deleteconfirmstatus, setdeleteconfirmstatus] = useState('');
  const [customerss, setcustomerss] = useState('');
  const [usertype, setusertype] = useState('');
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
  const [alertforpodelete, setalertforpodelete] = useState(false);
  const [todate, settodate] = useState('');
  const [printconditions, setprintconditions] = useState(false);
  const [DeliveryInfoDtl, setDeliveryInfoDtl] = useState([]);
  const [SalesINvoiceInfo, setSalesINvoiceInfo] = useState([]);
  ///new UseState
  const [PoorderTrackingDate, setPoorderTrackingDate] = useState([]);
  const [PoHdrValue, setPoHdrValue] = useState([]);
  const [PoDtlValue, setPoDtlValue] = useState([]);
  const [Pono1, setPono1] = useState({ label: 'All', value: '' });
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return PoorderTrackingDate.slice(
      page * rowsperpage,
      (page + 1) * rowsperpage,
    );
  };

  const handleChangePage1 = (event, newPage) => {
    setpage1(newPage);
  };

  const handleChangeRowsPerPage1 = event => {
    setrowsperpage1(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage1 = () => {
    return PoDtlValue.slice(page1 * rowsperpage1, (page1 + 1) * rowsperpage1);
  };

  useEffect(() => {
    const getusertype = async () => {
      const type = localStorage.getItem('AdminUser');

      setusertype(type);
      ////console.log(type)
    };
    const custtt = async () => {
      const custt = localStorage.getItem('Customer_Log');
      setcustt(custt);
      ////console.log(custt)
    };
    const branch = async () => {
      const branch = localStorage.getItem('Branch_Log');
      setbracnch(branch);
      ////console.log(branch)
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
    GetPurchaseOrderTracking();

    branchet();

    setfromdatee(moment(firstday).format('YYYY-MM-DD'));
    settoodate(moment(lastday).format('YYYY-MM-DD'));
    settodate1(moment(lastdays).format('YYYY-MM-DD'));
    GetCustomerPoNO();
  }, []);

  const GetCustomerPoNO = async () => {
    const custt = localStorage.getItem('Customer_Log');
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const createdby = localStorage.getItem('Userid');
    const ordeheader = await axios.instance
      .get(
        `/GetCustomerPono/${custt}/${
          localStorage.getItem('AdminUser') === 'Y'
            ? localStorage.getItem('AdminUser')
            : localStorage.getItem('Approval2')
        }/${createdby}`,
        { Authorization: tokent, 'Content-Type': 'application/json' },
      )
      .then(res => {
        const data = res.data;
        const options = data.map(b => ({
          label: b.Order_No,
          value: b.Order_Id,
        }));
        options.push({ label: 'All', value: '0' });
        console.log(options);
        setPonoHelp(options);
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
        // //////console.log(res.data)
        for (const data of res.data) {
          //////console.log(new Date(data.Delivery_Date))
          settodate(new Date(data.Delivery_Date));
          setdeliverdate(data.Order_Date);
          setohdate(new Date(data.Delivery_Date));
          //console.log(data.Order_Date)
          setremarks(data.REMARKS);
          setpono(data.PO_No);
          //console.log('remarks', data.REMARKS)
        }
      });
  };

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
        ////////console.log(qtyvalue)
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
          totalnetamount.push(data.Amount);
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
        //console.log(totaltdisamt)
        var totalamutdis = 0;
        for (let i = 0; i < totaltdisamt.length; i++) {
          totalamutdis += totaltdisamt[i];
        }
        //console.log(totalamutdis)
        setTotal_discount_amt(totalamutdis);

        let totalIgstamt = [];
        for (const data of res.data) {
          totalIgstamt.push((data.Rate * data.Order_Qty * data.IGSTPer) / 100);
          //console.log('igst', data.IGSTPer)
        }
        var totalIgstvalu = 0;
        for (let i = 0; i < totalIgstamt.length; i++) {
          totalIgstvalu += totalIgstamt[i];
        }
        //console.log(totalIgstvalu)
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
    console.log(branchid, custoemrid, Usertype);
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
    const branccc = await axios.instance
      .get(`/BranchHelp/${cuslog}/${branch}/${type}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        setbranchfornoadmin(res.data);
        //console.log('test',res.data)
      });
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
    //console.log('testone',cusadmin.data)
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
          // console.log( res.data)
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
          ////console.log( res.data)
        });
    }
  };
  const getnoadminpo = async () => {
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    const customers = await axios.instance
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
        //console.log()
      });
  };

  const customerget = async () => {
    if (All === '0') {
    }
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    console.log('test', type);
    const customers = await axios.instance
      .get(
        `/POOdrview/${cuslog}/${type === 'N' ? branch : '0'}/${moment(
          fromdatee,
        ).format('YYYYMMDD')}/${moment(toodate).format('YYYYMMDD')}/${type}`,
        {
          headers: {
            Authorization: tokent,

            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setpurchase(res.data);
        //console.log( res.data)
      });
    //setbranchesadmin(customers.data)
  };

  const deletepo = async () => {
    const tokent = localStorage.getItem('authtoken');
    //console.log('deleteid',deletingid )
    const podel = await axios.instance.delete(`/POdelete/${deletingid}`, {
      headers: { Authorization: tokent, 'Content-Type': 'application/json' },
    });
    purchasepo();
  };
  const deletepoforweb = async (id, id2) => {
    if (id2 === 'Not Approved') {
      if (window.confirm('Are You Sure You Want To Delete This Po ?')) {
        setopen(true);
        const tokent = localStorage.getItem('authtoken');
        // console.log('deleteid',deletingid )
        const podel = await axios.instance.delete(`/POdelete/${id}`, {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        });
        purchasepo();
        setopen1(true);
        setTimeout(() => {
          setopen(false);
          setopen1(false);
        }, 2000);
      }
    } else {
    }
  };

  const deleteconformation = () => {
    setIsVisible(false);
    if (deleteconfirmstatus === 'Not Approved') {
      Alert.alert('Are you sure delete this Purchase', '', [
        { text: 'Yes', onclick: () => deletepo() },
        { text: 'Cancel', onPress: console.log('') },
      ]);
    }
  };
  const deleteform = (id, status, po) => {
    //console.log(status)
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
  const [Visiblespinner, setVisiblespinner] = useState(false);
  const [vtaper, setvtaper] = useState('');
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
  useEffect(() => {
    localStorage.setItem('Products', '');
    const getstateid = async () => {
      const statecode = localStorage.getItem('StateCode');
      const customerid = localStorage.getItem('Customer_Log');
      const token = localStorage.getItem('AuthToken');
      setCustomerlog(customerid);
      setAuthtoken(token);
      setStatecodeee(statecode);
    };
    // getprodct()
    getstateid();
  }, []);

  const getprodct = async () => {
    const token = localStorage.getItem('AuthToken');
    const userid = localStorage.getItem('Userid');
    const companyid = localStorage.getItem('Companyid');
    const customerid = localStorage.getItem('Customer_Log');
    //  console.log('compid', companyid)
    // console.log('customerid',customerid )
    const prod = await axios.instance.get(
      `/Product/${companyid}/${customerid}`,
      { headers: { Authorization: token, 'Content-Type': 'application/json' } },
    );

    const data = prod.data;

    const optionvalue = data.map(f => ({
      label: f.Product_Details_Description,
      value: f.Product_Details_Id,
    }));

    setProductcollection(optionvalue);
  };

  const getoneproduct = async (id, name) => {
    setSelectedValue(id);
    setselectedtext(name);

    const product = await axios.instance.get(
      `/Productone/${id}/${Customerlog}`,
      {
        headers: {
          Authorization: Authtoken,
          'Content-Type': 'application/json',
        },
      },
    );
    //  console.log(product.data)
    setqty('');
    setnetamount('');
    for (const data of product.data) {
      setamount(data.Rate);
      setproductname(data.Product_Details_Description);
      setdiscount(data.DisPer);

      settax(data.CGSTPer + data.SGSTPer);

      setIgst(data.IGSTPer);
      setcgst(data.CGSTPer);
      setsgst(data.SGSTPer);
      setDiscount(data.Discount);
      settaxid(data.TaxId);
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
  const amountcal = async amt => {
    setqty(amt);

    if (discount != 0) {
      var amounvalu = amt * amount;
      var discounts = (amounvalu * discount) / 100;

      setdisamt(discounts);

      var valueofdis = amounvalu - discounts;
      var gstinfo = Statecodeee === '33' ? tax : Igst;
      var gstcal = valueofdis * gstinfo;
      var gstvalcal = gstcal / 100;
      var gstvalue = valueofdis + gstvalcal;
      const valueformat = gstvalue;
      setnetamount(valueformat);

      var sgstamt = valueofdis * sgst;
      var sgstcal = sgstamt / 100;
      ////console.log(sgstcal)
      // var sgstvalue =  amounvalu + sgstcal
      // const sgstamts =  sgstvalue
      // //console.log(sgstcal)
      setsgstamt(sgstcal);

      var cgstamt = valueofdis * cgst;
      var cgstcal = cgstamt / 100;
      // var cgstvalue =  amounvalu + cgstcal
      // const cgstamts = cgstvalue
      ////console.log(cgstcal)
      setcgstamt(cgstcal);
      //console.log(cgstcal)
      setigst(0);
    } else {
      //console.log(Igst)
      var amounvalu = amt * amount;
      var gstinfo = Statecodeee === '33' ? tax : Igst;
      //console.log('taxes', Igst)
      //console.log('igst', tax)
      var gstcal = amounvalu * gstinfo;

      var gstvalcal = gstcal / 100;
      var gstvalue = amounvalu + gstvalcal;
      const valueformat = gstvalue;
      setnetamount(valueformat);

      var sgstamt = amounvalu * sgst;
      var sgstcal = sgstamt / 100;
      ////console.log(sgstcal)
      // var sgstvalue =  amounvalu + sgstcal
      // const sgstamts =  sgstvalue
      // //console.log(sgstcal)
      setsgstamt(sgstcal);

      var cgstamt = amounvalu * cgst;
      var cgstcal = cgstamt / 100;
      // var cgstvalue =  amounvalu + cgstcal
      // const cgstamts = cgstvalue
      ////console.log(cgstcal)
      setcgstamt(cgstcal);
      //console.log(cgstcal)
      setigst(0);
    }
  };
  const productarray = async () => {
    //AsyncStorage.removeItem('Products')

    if (selectedValue.length != 0 && qty.length != 0) {
      let product = [];

      let prod = localStorage.getItem('Products');
      // console.log(prod)
      if (localStorage.getItem('Products')) {
        const getdata = JSON.parse(prod);
        for (const data of getdata) {
          // //console.log(data)
          product.push(data);
        }
      }

      product.push({
        Order_no: product.length + 1,
        Product_Id: parseInt(selectedValue),
        Order_Qty: parseFloat(qty),
        Rate: amount,
        TaxId: Statecodeee === '33' ? parseInt(taxid) : 0,
        GSTPer: Statecodeee === '33' ? tax : 0,
        VAT_Percentage: Statecodeee === '33' ? cgst : 0,
        IGSTPer: Statecodeee === '33' ? 0 : Igst,
        SGSTPer: Statecodeee === '33' ? sgst : 0,
        Discount: discount,
        Amount: netamount,
        Product_Details_Description: productname,
        UOM_Id: umoid,
        DisPer: discount,
        DisAmt: disamt,
        SGSTId: Statecodeee === '33' ? sgstid : 0,
        IGSTId: Statecodeee === '33' ? 0 : igstid,
        ConQty: 1,
        DutyPer: DutyPer,
        Duty_Id: Duty_Id,
        Total_Amount: parseInt(qty * amount),
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
      //const indexofnum =unique.map((items, index) => ({index, ...items}))
      //console.log(unique.length , product.length)

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
        totalnetamount.push(data.Amount);
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
      ////console.log(totalcgstvalu)
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
      //console.log(totaltdisamt)
      var totalamutdis = 0;
      for (let i = 0; i < totaltdisamt.length; i++) {
        totalamutdis += totaltdisamt[i];
      }
      //console.log(totalamutdis)
      setTotal_discount_amt(totalamutdis);

      let totalIgstamt = [];
      for (const data of prodvalues) {
        totalIgstamt.push(
          ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
        );
        //console.log('igst', data.IGSTPer)
      }
      var totalIgstvalu = 0;
      for (let i = 0; i < totalIgstamt.length; i++) {
        totalIgstvalu += totalIgstamt[i];
      }
      //console.log(totalIgstvalu)
      //settotaltax(totalcgstvalu +totalcgstvalu)
      setTOtaligstamt(totalIgstvalu);

      setSelectedValue('');
      setqty('');
      setamount('');
      settax('');
      setsgstamt('');
      setigstamt('');
      setcgstamt('');
      setIgst('');
      setuom('');

      setdiscount('');
      setnetamount('');
      setopen(true);
      setselectedtext('Select Product');
      //console.log(unique.length, product.length)
      if (unique.length === product.length) {
        localStorage.removeItem('Product');
      } else {
        setSelectedValue('');
        setqty('');
        setamount('');
        settax('');
        setsgstamt('');
        setigstamt('');
        setcgstamt('');
        setnetamount('');
        setselectedtext('Select Product');

        //const totalamtvalueget =  await AsyncStorage.getItem('Totalamt')
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
  };

  const deleteproduct = async id => {
    let productsvalue = localStorage.getItem('Products');
    var items = JSON.parse(productsvalue);
    // //console.log(items)
    for (var i = 0; i < items.length; i++) {
      // var items = JSON.parse(items[i]);
      ////console.log(items[i].Product_Id)
      if (items[i].Product_Id == id) {
        const deletedata = items.splice(i, 1);
        ////console.log(deletedata)
      }
    }
    ////console.log(items)
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
      totalnetamount.push(data.Amount);
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
    //console.log(totaltdisamt)
    var totalamutdis = 0;
    for (let i = 0; i < totaltdisamt.length; i++) {
      totalamutdis += totaltdisamt[i];
    }

    let totalIgstamt = [];
    for (const data of removeproducts) {
      totalIgstamt.push(
        ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
      );
      //console.log('igst', data.IGSTPer)
    }
    var totalIgstvalu = 0;
    for (let i = 0; i < totalIgstamt.length; i++) {
      totalIgstvalu += totalIgstamt[i];
    }
    //console.log(totalIgstvalu)
    //settotaltax(totalcgstvalu +totalcgstvalu)
    setTOtaligstamt(totalIgstvalu);

    //console.log(totalamutdis)
    setTotal_discount_amt(totalamutdis);
    setTotalamountheader(totalamt);
    settotalamountvaluedata(totalamt);
    ////console.log(totalcgstvalu)
    settotaltax(totalcgstvalu + totalcgstvalu);
    //console.log(indexofnum)
    setprovalue(removeproducts);
  };
  const deleteweb = async id => {
    if (window.confirm('Are You sure delete this product?')) {
      let productsvalue = localStorage.getItem('Products');
      var items = JSON.parse(productsvalue);
      // //console.log(items)
      for (var i = 0; i < items.length; i++) {
        // var items = JSON.parse(items[i]);
        ////console.log(items[i].Product_Id)
        if (items[i].Product_Id == id) {
          const deletedata = items.splice(i, 1);
          ////console.log(deletedata)
        }
      }
      ////console.log(items)
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
        totalnetamount.push(data.Amount);
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
      //console.log(totaltdisamt)
      var totalamutdis = 0;
      for (let i = 0; i < totaltdisamt.length; i++) {
        totalamutdis += totaltdisamt[i];
      }

      let totalIgstamt = [];
      for (const data of removeproducts) {
        totalIgstamt.push(
          ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
        );
        //console.log('igst', data.IGSTPer)
      }
      var totalIgstvalu = 0;
      for (let i = 0; i < totalIgstamt.length; i++) {
        totalIgstvalu += totalIgstamt[i];
      }
      //console.log(totalIgstvalu)
      //settotaltax(totalcgstvalu +totalcgstvalu)
      setTOtaligstamt(totalIgstvalu);

      //console.log(totalamutdis)
      setTotal_discount_amt(totalamutdis);
      setTotalamountheader(totalamt);
      settotalamountvaluedata(totalamt);
      ////console.log(totalcgstvalu)
      settotaltax(totalcgstvalu + totalcgstvalu);
      //console.log(indexofnum)
      setprovalue(removeproducts);
    }
  };
  const deleteconformation1 = id => {
    Alert.alert('Are you sure delete this Product ?', '', [
      { text: 'Yes', onPress: () => deleteproduct(id) },
      { text: 'Cancel', onPress: console.log('') },
    ]);
  };

  const Updateget = async (id, id1) => {
    setindexalueofupdate(id1);
    setProductonecollect([]);
    setvisible(true);
    setVisiblespinner(true);
    setTimeout(() => {
      setVisiblespinner(false);
    }, 2000);
    const datavalue = provalue.filter(a => a.Product_Id === id);
    setProductonecollect(datavalue);
    for (const data of datavalue) {
      setupdatedqty(data.Order_Qty);
      setupdatedamt(data.Rate);
      setupdattax(data.GSTPer);
      setupdatesgst(data.SGSTPer);
      setupdateproductid(data.Product_Id);
      //setupdatecgst(data.IGSTPer)
      setupdatenetamt(data.Amount);
      setproudctnameupdate(data.Product_Details_Description);
      settaxidupdate(data.TaxId);
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

      var discount = (amounvalu * disperupdate) / 100;
      var discouamt = amounvalu - discount;
      setdisamtupdate(discount);
      var gstof = Statecodeee === '33' ? updattax : Igstperupdate;
      var gstcal = discouamt * gstof;
      var gstvalcal = gstcal / 100;
      var gstvalue = discouamt + gstvalcal;
      const valueformat = gstvalue;

      setupdatenetamt(valueformat);
      ////console.log(valueformat)
      var sgstval = updattax / 2;
      //console.log(sgstval)
      var sgstamt = discouamt * sgstval;
      var sgstcal = sgstamt / 100;
      var sgstvalue = discouamt + sgstcal;
      const sgstamts = numeral(sgstvalue).format('0,0.00');
      //setsgstamt(sgstamts)
      setupdatesgst(sgstcal);
      //console.log(sgstcal)
      var cgstval = updattax / 2;
      var cgstamt = discouamt * cgstval;
      var cgstcal = cgstamt / 100;
      var cgstvalue = discouamt + cgstcal;
      const cgstamts = numeral(cgstvalue).format('0,0.00');
      //setcgstamt(cgstamts)
      setupdatecgst(cgstcal);
      //console.log(cgstvalue)
    } else {
      var amounvalu = amt * updatedamt;
      var gstof = Statecodeee === '33' ? updattax : Igstperupdate;
      var gstcal = amounvalu * gstof;
      var gstvalcal = gstcal / 100;
      var gstvalue = amounvalu + gstvalcal;
      const valueformat = gstvalue;

      setupdatenetamt(valueformat);
      ////console.log(valueformat)
      var sgstval = updattax / 2;
      //console.log(sgstval)
      var sgstamt = amounvalu * sgstval;
      var sgstcal = sgstamt / 100;
      var sgstvalue = amounvalu + sgstcal;
      const sgstamts = numeral(sgstvalue).format('0,0.00');
      //setsgstamt(sgstamts)
      setupdatesgst(sgstcal);
      //console.log(sgstcal)
      var cgstval = updattax / 2;
      var cgstamt = amounvalu * cgstval;
      var cgstcal = cgstamt / 100;
      var cgstvalue = amounvalu + cgstcal;
      const cgstamts = numeral(cgstvalue).format('0,0.00');
      //setcgstamt(cgstamts)
      setupdatecgst(cgstcal);
      //console.log(cgstvalue)
    }
  };
  const updateproduct = async () => {
    let product = [];
    let productsvalue = localStorage.getItem('Products');

    ////console.log(items)
    // //console.log(items != null  )
    if (productsvalue != null) {
      const getdata = JSON.parse(productsvalue);
      for (const data of getdata) {
        // //console.log(data)
        product.push(data);
      }
    }
    //console.log(parseInt( updatedqty))
    const totlaamoutns = localStorage.getItem('Total_Amount');
    const updateddatevalue = {
      Order_no: 1,
      Product_Id: parseInt(updateproductid),
      Order_Qty: parseInt(updatedqty),
      Rate: parseInt(updatedamt),
      TaxId: Statecodeee === '33' ? parseInt(taxidupdate) : 0,
      GSTPer: Statecodeee === '33' ? updattax : 0,
      VAT_Percentage: Statecodeee === '33' ? updattax / 2 : 0,
      IGSTPer: Statecodeee === '33' ? 0 : Igstperupdate,
      SGSTPer: Statecodeee === '33' ? updattax / 2 : 0,
      Discount: 0,
      Amount: updatenetamt,
      Product_Details_Description: proudctnameupdate,
      UOM_Id: uomupdateid,
      DisPer: disperupdate,
      DisAmt: disamtupdate,
      SGSTId: Statecodeee === '33' ? sgstupdatid : 0,
      IGSTId: Statecodeee === '33' ? igstupdateid : 0,
      ConQty: 1,
      DutyPer: dutyperupdateid,
      Duty_Id: dutyidupdate,
      Total_Amount: totlaamoutns,
      Total_cgst: (totlaamoutns * updattax) / 100 / 2,
      Total_sgst: (totlaamoutns * updattax) / 100 / 2,
    };
    product[indexalueofupdate] = updateddatevalue;
    //console.log(product)
    localStorage.setItem('Products', JSON.stringify(product));
    let Getprod = localStorage.getItem('Products');
    // setprovalue(Getprod)
    const getdelteddate = localStorage.getItem('Products');
    let removeproducts = JSON.parse(getdelteddate);
    //console.log(removeproducts)
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
      totalnetamount.push(data.Amount);
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
    ////console.log(totalcgstvalu)
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
    //console.log(totaltdisamt)
    var totalamutdis = 0;
    for (let i = 0; i < totaltdisamt.length; i++) {
      totalamutdis += totaltdisamt[i];
    }
    //console.log(totalamutdis)
    setTotal_discount_amt(totalamutdis);
    let totalIgstamt = [];
    for (const data of removeproducts) {
      totalIgstamt.push(
        ((data.Rate * data.Order_Qty - data.DisAmt) * data.IGSTPer) / 100,
      );
      //console.log('igst', data.IGSTPer)
    }
    var totalIgstvalu = 0;
    for (let i = 0; i < totalIgstamt.length; i++) {
      totalIgstvalu += totalIgstamt[i];
    }
    //console.log(totalIgstvalu)
    //settotaltax(totalcgstvalu +totalcgstvalu)
    setTOtaligstamt(totalIgstvalu);

    let prodvalues = JSON.parse(Getprod);
    //console.log(prodvalues)
    setprovalue(prodvalues);

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
  };

  const save = async () => {
    if (provalue.length != 0) {
      let prodvalue = [];
      const token = localStorage.getItem('AuthToken');

      const productsvalue = localStorage.getItem('Products');
      let product = JSON.parse(productsvalue);
      // //console.log(product)
      prodvalue.push(product);

      const customerid = localStorage.getItem('Customer_Log');
      const Branchlog = localStorage.getItem('Branch_Log');
      const TOTALQTY = localStorage.getItem('Totalqty');
      const TOTALTAX = localStorage.getItem('Toataltax');
      const TOTALAMT = localStorage.getItem('Totalamt');
      const netamountvalue = numeral(TOTALAMT).format('0');
      //console.log(parseInt(netamountvalue))

      const totalnetamt = localStorage.getItem('TotalnetMT');
      const statecode = localStorage.getItem('StateCode');
      const stateid = localStorage.getItem('StateId');
      const createdby = localStorage.getItem('Userid');
      const companyid = localStorage.getItem('Companyid');
      const statename = localStorage.getItem('Statename');
      //console.log(stateid)
      const cgstamtvalues = localStorage.getItem('Totalcgst');
      const sgstamtvalues = localStorage.getItem('Totalsgst');
      const igstamtvalues = localStorage.getItem('Totaligst');

      const Total_Amount = localStorage.getItem('Total_Amount');
      const createpohed = axios.instance
        .post(
          '/POHdr',
          {
            Order_Date: new Date(),
            Delivery_Date: todatetr,
            Company_id: companyid,
            Customer_Id: customerid,
            Remarks: remark.length != 0 ? remark : '0',
            Total_Amount: Totalamountheader,
            Vat_Amount: Statecodeee === '33' ? totaltax / 2 : 0,
            Discount_Amount: Total_discount_amt,
            Net_Amount: totalamt,
            Created_by: createdby,
            Created_on: fromdatetr,
            Cus_Branchid: Branchlog,
            CurrencyId: 1,
            Branch_Id: 0,
            CBranch_Id: 0,
            StateId: stateid,
            PlaceofSupply: statename,
            StateCode: statecode,
            SGSTAmt: Statecodeee === '33' ? totaltax / 2 : 0,
            IGSTAmt: Statecodeee === '33' ? 0 : TOtaligstamt,
          },
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          //console.log(res.data)
          for (const data of res.data) {
            let orderid = data.Order_Id.toString();
            localStorage.setItem('Order_Id', orderid);
            //console.log(orderid)
          }
        })
        .then(async () => {
          // const productsvalue =  await  AsyncStorage.getItem('Products')
          // let product =  JSON.parse(productsvalue)
          const productsvalue = localStorage.getItem('Products');
          const Orderid = localStorage.getItem('Order_Id');
          let product = JSON.parse(productsvalue);

          for (const data of product) {
            const productcoll = Object.assign(data, {
              Order_Id: parseInt(Orderid),
              OpType: 'New',
            });
            //  console.log('prod',productcoll)
            const createpohed = await axios.instance.post(
              '/PODtl',
              productcoll,

              {
                headers: {
                  Authorization: token,
                  'Content-Type': 'application/json',
                },
              },
            );
            // console.log('products',createpohed.data)
          }
          setTotalamountheader('');
          settotaltax('');
          settotalqty('');
          settotalamt('');
        })
        .then(() => {});

      purchasepo();

      localStorage.removeItem('Products');
      setprovalue([]);
      settodatetr(new Date());
      setremark('');

      setloading(true);

      setTimeout(() => {
        setPoshow(true);
        setloading(false);
      }, 2000);
    } else {
    }
  };
  const save1 = async () => {
    if (provalue.length != 0) {
      let prodvalue = [];
      const token = localStorage.getItem('AuthToken');

      const productsvalue = localStorage.getItem('Products');
      let product = JSON.parse(productsvalue);
      // //////console.log(product)
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
      ////////console.log(stateid)
      const cgstamtvalues = localStorage.getItem('Totalcgst');
      const sgstamtvalues = localStorage.getItem('Totalsgst');
      const igstamtvalues = localStorage.getItem('Totaligst');
      // const productcollectionvalue =  await AsyncStorage.setItem('Products')
      // let products =  JSON.parse(productcollectionvalue)
      const Totalamt = localStorage.getItem('Total_Amount');
      const createpohed = await axios.instance
        .put(
          `/POHdr/${deletingid}`,
          {
            Order_Id: deletingid,
            Order_Date: deliverdate,
            Delivery_Date: todate,
            Company_id: customerid,
            Customer_Id: customerid,
            Remarks: remarks.length != 0 ? remarks : '0',
            Total_Amount: totalamountvaluedata,
            Vat_Amount: Statecodeee === '33' ? totaltax / 2 : 0,
            Discount_Amount: Total_discount_amt,
            Net_Amount: totalamt,
            Created_by: createdby,
            Created_on: fromdatee,
            Cus_Branchid: Branchlog,
            CurrencyId: 0,
            Branch_Id: 0,
            CBranch_Id: 0,
            StateId: stateid,
            PlaceofSupply: statename,
            StateCode: statecode,
            SGSTAmt: Statecodeee === '33' ? totaltax / 2 : 0,
            IGSTAmt: Statecodeee === '33' ? 0 : TOtaligstamt,
            Modified_by: 1,
            Modified_on: 1,
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
          setprovalue([]);
          // const productsvalue =  await  AsyncStorage.getItem('Products')
          // let product =  JSON.parse(productsvalue)
          ////console.log(res.data)
          const deleteproduct = await axios.instance.delete(
            `/PoDeltedtl/${deletingid}`,
          );
          const productsvalue = localStorage.getItem('Products');
          const Orderid = localStorage.getItem('Order_Id');
          let product = JSON.parse(productsvalue);

          for (const data of product) {
            const productcoll = Object.assign(data, {
              Order_Id: parseInt(deletingid),
              OpType: 'New',
            });
            //////console.log('test')

            //////console.log(productcoll)

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
                localStorage.removeItem('Products');
              });

            // //////console.log(createpohed.data)
          }
        })
        .then(() => {});

      setloading(true);
      purchasepo();

      settodate(new Date());
      setTimeout(() => {
        setloading(false);
        setPoshow(true);
      }, 2000);
    } else {
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

  const updatescreenview = () => {
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
    Getorderhdr(deletingid);
    //getprodctdel(deletingid)
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

  const updatepagess = (id, id2) => {
    history.push(`/Purchaseorder/${id}`);
    localStorage.setItem('editflag', id2);
  };
  const addpages = () => {
    history.push(`/Purchaseorder`);
  };
  const downloadpdfreoprt = async (id, id2, id3) => {
    if (
      id3 === 'Approved' ||
      id3 === 'Accepted' ||
      id3 === 'Bill Raised' ||
      id3 === 'DC Raised' ||
      id3 === 'Sales order Raised'
    ) {
      setopen(true);

      await axios.instance
        .get(`/Createpdf/${id}`)
        .then(() =>
          axios.instance.get('/Purchaseorder', { responseType: 'blob' }),
        )

        .then(res => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          saveAs(pdfBlob, `Purchaseorder-${id2}.pdf`);
        });
      setTimeout(() => {
        setopen(false);
      }, 2000);
    } else {
      setprintconditions(true);
      setTimeout(() => {
        setprintconditions(false);
      }, 2000);
    }
  };

  const GetPurchaseOrderTracking = async () => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .post(
        `/PurchaseOrderTracking/${localStorage.getItem('customer_HO')}`,
        {
          Cusid: localStorage.getItem('Customer_Log'),
          Branchid:
            localStorage.getItem('AdminUser') === 'Y'
              ? All
              : localStorage.getItem('Branch_Log'),
          fromdate: moment(fromdatee).format('YYYYMMDD'),
          todate: moment(toodate).format('YYYYMMDD'),
          Admin: localStorage.getItem('AdminUser'),
          Order_Id: Pono1.value,
          Created_by: localStorage.getItem('Userid'),
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        console.log(res.data);
        setPoorderTrackingDate(res.data);
      });
  };

  const toggle3 = () => {
    if (modal3) {
      setModal3(false);
    } else {
      setModal3(true);
    }
  };

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const toggle1 = () => {
    if (modal1) {
      setModal1(false);
    } else {
      setModal1(true);
    }
  };

  const toggle2 = () => {
    if (modal2) {
      setModal2(false);
    } else {
      setModal2(true);
    }
  };
  const GetPohdr = async id => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .get(`/POOrdr/${localStorage.getItem('customer_HO')}/${id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        setPoHdrValue(res.data);
      });
  };

  const GetDeliveryInfo = async id => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .get(`/GetDeliveryChalleninfo/${id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data);
        setDeliveryInfoDtl(res.data);
      });
  };
  const GetDeliveryInfobillref = async id => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .get(`/GetDeliveryChalleninfobyBillref/${id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data);
        setDeliveryInfoDtl(res.data);
      });
  };

  const GetsalesInvoiceINfo = async id => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .get(`/GetSalesInvoiceInfo/${id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data);
        setSalesINvoiceInfo(res.data);
        if (res.data.length === 0) {
          GetDeliveryInfo(id);
        }
      });
  };

  const GetPoDtl = async id => {
    setPoDtlValue([]);
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .get(`/GetoneSales/${id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        setPoDtlValue(res.data);
      });
  };
  return (
    <>
      <div>
        <Container fluid={true}>
          <h6 className="monthwisetitle">Purchase Order Tracking</h6>
          <Modal isOpen={modal} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle} tag="h4">
              Po Detail
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col lg="2">
                  <label>
                    <b>PO No</b>
                  </label>
                  {PoHdrValue.map(data => (
                    <p>{data.PO_No}</p>
                  ))}
                </Col>
                <Col lg="2">
                  <label>
                    <b>PO Date</b>
                  </label>
                  {PoHdrValue.map(data => (
                    <p>{moment(data.Order_Date).format('DD-MM-YYYY')}</p>
                  ))}
                </Col>
                <Col lg="3">
                  {localStorage.getItem('customer_HO') === 'N' ? (
                    <>
                      <label>
                        <b>Branch</b>
                      </label>
                      {PoHdrValue.map(data => (
                        <p>{data.Branch_Name}</p>
                      ))}
                    </>
                  ) : (
                    <>
                      <label>
                        <b>Customer</b>
                      </label>
                      {PoHdrValue.map(data => (
                        <p>{data.Customer_Name}</p>
                      ))}
                    </>
                  )}
                </Col>
                <Col lg="3">
                  <label>
                    <b>Delivery Date</b>
                  </label>
                  {PoHdrValue.map(data => (
                    <p>{moment(data.Delivery_Date).format('DD-MM-YYYY')}</p>
                  ))}
                </Col>
                <Col lg="2">
                  <label>
                    <b>PO Value</b>
                  </label>
                  {PoHdrValue.map(data => (
                    <p>
                      {numeral(data.NET_AMOUNT - data.Discount_Amount).format(
                        '0,0.00',
                      )}
                    </p>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <div className="Tabelinspection">
                    <TableContainer>
                      <Table className="InspectionTbl">
                        <TableHead>
                          <TableRow>
                            <TableCell>S. No</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Uom </TableCell>
                            <TableCell>PO Value</TableCell>

                            <TableCell>Delivered Qty</TableCell>
                            <TableCell>Balance Qty</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {PoDtlValue.length != 0 ? (
                            changepage1().map((data, index) => (
                              <TableRow key={data.Order_Id}>
                                <TableCell
                                  align="left"
                                  style={{ cursor: 'pointer', width: '75px' }}
                                >
                                  {data.Sno}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{ width: '250px' }}
                                >
                                  {data.Product_Details_Description}
                                </TableCell>
                                <TableCell align="left">
                                  {data.Order_Qty}
                                </TableCell>
                                <TableCell align="left">
                                  {data.UOM_Description}
                                </TableCell>
                                <TableCell align="left">
                                  <b>₹</b>
                                  {numeral(data.Amount).format('0,0.00')}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  style={{ width: '100px' }}
                                >
                                  {data.UpdateInvoiceQty > data.UPdateDcQty
                                    ? data.UpdateInvoiceQty
                                    : data.UPdateDcQty}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{ width: '100px' }}
                                >
                                  {(data.UpdateInvoiceQty > data.UPdateDcQty
                                    ? data.Order_Qty - data.UpdateInvoiceQty
                                    : data.Order_Qty - data.UPdateDcQty) > 0
                                    ? data.UpdateInvoiceQty > data.UPdateDcQty
                                      ? data.Order_Qty - data.UpdateInvoiceQty
                                      : data.Order_Qty - data.UPdateDcQty
                                    : 0}
                                </TableCell>
                                {/* 
    <TableCell align="left">{(data.User_Name)}</TableCell>   */}
                              </TableRow>
                            ))
                          ) : (
                            <TableCell align="left">NO Data Found</TableCell>
                          )}

                          {/* { purchase.map((data)=>( 
    <TableRow >

    <TableCell align="left">{data.Order_No}</TableCell>
    <TableCell align="left" >{data.Order_Date}</TableCell> 
    <TableCell align="left">{data.Branch_Name}</TableCell>
    <TableCell align="left" >{data.Status}</TableCell>
    <TableCell align="left">{data.NET_AMOUNT}</TableCell>



    <TableCell align="left">
      <IconButton size="small"    >
          <EditIcon fontSize="small" />
        </IconButton  >
        </TableCell>
      
        <TableCell align="left">
        <IconButton size="small"   >
            <VisibilityIcon fontSize="small"  />
          </IconButton  >
          </TableCell>   
      
          <TableCell align="left">
          
            <IconButton size="small"   >

            <DeleteIcon fontSize= "small"  />
          </IconButton  >
          
          
        
          </TableCell>
        
          <TableCell align="left">
      <IconButton size="small"   >
          <PrintIcon fontSize="small" />
        </IconButton  >
        </TableCell>

    </TableRow>
    ))}
    <TableCell align="left">NO Data Found</TableCell> */}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      component="div"
                      rowsPerPageOptions={pages1}
                      count={PoDtlValue.length}
                      rowsPerPage={rowsperpage1}
                      page={page1}
                      onChangePage={handleChangePage1}
                      onChangeRowsPerPage={handleChangeRowsPerPage1}
                    />
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>

          <Modal isOpen={modal1} toggle={toggle1} size="lg">
            g
            <ModalHeader toggle={toggle1} tag="h4">
              Delivery Challan Detail
            </ModalHeader>
            <ModalBody>
              {/* <Row>
                  <Col lg="2">
                    <label><b>Po No</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{data.PO_No}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Po Date</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{moment(data.Order_Date).format('DD-MM-YYYY')}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Branch</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{data.PO_No}</p>
                    ))}
                  
                  </Col>
                  <Col lg="3">
                    <label><b>Delivery Date</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{moment(data.Delivery_Date).format('DD-MM-YYYY')}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Po Value</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{numeral(data.NET_AMOUNT).format('0,0.00')}</p>
                    ))}
                  
                  </Col>
                </Row> */}
              <Row>
                <Col lg="12">
                  <div className="Tabelinspection">
                    <TableContainer>
                      <Table className="InspectionTbl">
                        <TableHead>
                          <TableRow>
                            <TableCell>Dc No</TableCell>
                            <TableCell align="left">Dc Date</TableCell>
                            <TableCell>Dc Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {DeliveryInfoDtl.length != 0 ? (
                            DeliveryInfoDtl.map((data, index) => (
                              <TableRow key={data.Delivery_Chellan_Id}>
                                <TableCell
                                  align="left"
                                  style={{ cursor: 'pointer' }}
                                  onClick={toggle3}
                                >
                                  {data.Delivery_Chellan_No}
                                </TableCell>
                                <TableCell align="left">
                                  {data.Delivery_Chellan_Date}
                                </TableCell>
                                <TableCell align="left">
                                  {numeral(data.TotalAmount).format('0,0.00')}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableCell align="left">NO Data Found</TableCell>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          <Modal isOpen={modal3} toggle={toggle3} size="lg">
            g
            <ModalHeader toggle={toggle3} tag="h4">
              Delivery Challan
            </ModalHeader>
            <ModalBody>
              {/* <Row>
                  <Col lg="2">
                    <label><b>Po No</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{data.PO_No}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Po Date</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{moment(data.Order_Date).format('DD-MM-YYYY')}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Branch</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{data.PO_No}</p>
                    ))}
                  
                  </Col>
                  <Col lg="3">
                    <label><b>Delivery Date</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{moment(data.Delivery_Date).format('DD-MM-YYYY')}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Po Value</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{numeral(data.NET_AMOUNT).format('0,0.00')}</p>
                    ))}
                  
                  </Col>
                </Row> */}
              <Row>
                <Col lg="12">
                  <div className="Tabelinspection">
                    <TableContainer>
                      <Table className="InspectionTbl">
                        <TableHead>
                          <TableRow>
                            <TableCell>Dc No</TableCell>
                            <TableCell align="left">Dc Date</TableCell>
                            <TableCell>Dc Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {DeliveryInfoDtl.length != 0 ? (
                            DeliveryInfoDtl.map((data, index) => (
                              <TableRow key={data.Delivery_Chellan_Id}>
                                <TableCell
                                  align="left"
                                  style={{ cursor: 'pointer' }}
                                  onClick={toggle3}
                                >
                                  {data.Delivery_Chellan_No}
                                </TableCell>
                                <TableCell align="left">
                                  {data.Delivery_Chellan_Date}
                                </TableCell>
                                <TableCell align="left">
                                  {numeral(data.TotalAmount).format('0,0.00')}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableCell align="left">NO Data Found</TableCell>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>

          <Modal isOpen={modal2} toggle={toggle2} size="lg">
            <ModalHeader toggle={toggle2} tag="h4">
              Sales Invoice Detail
            </ModalHeader>
            <ModalBody>
              {/* <Row>
                  <Col lg="2">
                    <label><b>Po No</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{data.PO_No}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Po Date</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{moment(data.Order_Date).format('DD-MM-YYYY')}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Branch</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{data.PO_No}</p>
                    ))}
                  
                  </Col>
                  <Col lg="3">
                    <label><b>Delivery Date</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{moment(data.Delivery_Date).format('DD-MM-YYYY')}</p>
                    ))}
                  
                  </Col>
                  <Col lg="2">
                    <label><b>Po Value</b></label>
                    {PoHdrValue.map((data) => (
                        <p>{numeral(data.NET_AMOUNT).format('0,0.00')}</p>
                    ))}
                  
                  </Col>
                </Row> */}
              <Row>
                {SalesINvoiceInfo.length != 0 ? (
                  <Col lg="12">
                    <div className="Tabelinspection">
                      <TableContainer>
                        <Table className="InspectionTbl">
                          <TableHead>
                            <TableRow>
                              <TableCell>SI No</TableCell>
                              <TableCell align="left">SI Date</TableCell>
                              <TableCell>SI Value</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {SalesINvoiceInfo.length != 0 ? (
                              SalesINvoiceInfo.map((data, index) => (
                                <TableRow key={data.Sales_Bill_Id}>
                                  <TableCell
                                    align="left"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {data.Sales_Bill_No}
                                  </TableCell>
                                  <TableCell align="left">
                                    {data.Sales_Bill_Date}
                                  </TableCell>
                                  <TableCell align="left">
                                    {numeral(data.Net_Amount).format('0,0.00')}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableCell align="left">NO Data Found</TableCell>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Col>
                ) : (
                  <Col lg="12">
                    <div className="Tabelinspection">
                      <TableContainer>
                        <Table className="InspectionTbl">
                          <TableHead>
                            <TableRow>
                              <TableCell>SI No</TableCell>
                              <TableCell align="left">SI Date</TableCell>
                              <TableCell>SI Value</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {DeliveryInfoDtl.length != 0 ? (
                              DeliveryInfoDtl.map((data, index) => (
                                <TableRow key={data.Delivery_Chellan_Id}>
                                  <TableCell
                                    align="left"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {data.Delivery_Chellan_No}
                                  </TableCell>
                                  <TableCell align="left">
                                    {data.Delivery_Chellan_Date}
                                  </TableCell>
                                  <TableCell align="left">
                                    {numeral(data.TotalAmount).format('0,0.00')}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableCell align="left">NO Data Found</TableCell>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Col>
                )}
              </Row>
            </ModalBody>
          </Modal>
          <Card>
            <CardBody>
              <div className="InspectionReportForm">
                <div className="DefectType col-md-6 col-lg-2 col-sm-12">
                  {localStorage.getItem('customer_HO') === 'N' ? (
                    <lable>
                      <b>Branch</b>
                    </lable>
                  ) : (
                    <label></label>
                  )}

                  {usertype === 'Y' ? (
                    <select onChange={e => getbranchasehelp(e.target.value)}>
                      <option selected value="0">
                        All
                      </option>

                      {branchesadmin.map(data => (
                        <option value={data.Branch_Id}>
                          {data.Branch_Name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div>
                      {branchfornoadmin.map(data => (
                        <p style={{ marginTop: 15, color: 'red' }}>
                          {data.Branch_Name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="fromdates col-md-6 col-lg-2 col-sm-12">
                  <lable>
                    <b>PO NO</b>
                  </lable>
                  <Select
                    value={Pono1}
                    options={PonoHelp}
                    onChange={value => {
                      setPono1(value);
                    }}
                  />
                </div>

                <div className="fromdates col-md-6 col-lg-2 col-sm-12">
                  <lable>
                    <b>From Date</b>
                  </lable>

                  <input
                    type="date"
                    value={fromdatee}
                    id="fromdate"
                    onChange={e => setfromdatee(e.target.value)}
                  />
                </div>

                <div className="Todates col-md-6 col-lg-2 col-sm-12">
                  <lable>
                    <b>To Date</b>
                  </lable>
                  <input
                    type="date"
                    value={toodate}
                    id="todate"
                    onChange={e => settoodate(e.target.value)}
                  />
                </div>
                {/* <div className="DefectType">
            <lable><b>Status</b></lable>
                <select  >
              
              
          <option selected value={All}  >All</option>
        
            
                    <option  value="Approved">Approved</option>
                    
                    <option  value="NotApproved">NotApproved</option>

                </select>
            
            </div> */}
                <div className="submitbtn">
                  <Button1
                    color="primary"
                    className="adbtn2 "
                    onClick={() => GetPurchaseOrderTracking()}
                  >
                    View
                  </Button1>
                </div>
              </div>
            </CardBody>
          </Card>
          <div>
            <Card className="">
              <CardBody>
                <div className="Tabelinspection">
                  <TableContainer>
                    <Table className="InspectionTbl">
                      <TableHead>
                        <TableRow>
                          <TableCell>PO No</TableCell>
                          <TableCell align="left">PO Date</TableCell>
                          {localStorage.getItem('customer_HO') === 'N' ? (
                            <TableCell>Branch Name</TableCell>
                          ) : (
                            <TableCell>Customer Name</TableCell>
                          )}

                          <TableCell>PO Value </TableCell>
                          <TableCell>PO Status</TableCell>

                          <TableCell>Dc Status</TableCell>
                          <TableCell>Sl Status</TableCell>
                          {/* <TableCell>Dispatch Status</TableCell> */}
                          <TableCell>Created By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {PoorderTrackingDate.length != 0 ? (
                          changepage().map(data => (
                            <TableRow key={data.Order_Id}>
                              <TableCell
                                align="left"
                                style={{
                                  cursor: 'pointer',
                                  textDecoration: ' underline',
                                }}
                                onClick={() => {
                                  GetPohdr(data.Order_Id);
                                  GetPoDtl(data.Order_Id);
                                  toggle();
                                }}
                              >
                                {data.PoNo}
                              </TableCell>
                              <TableCell align="left">{data.PoDate}</TableCell>
                              {localStorage.getItem('customer_HO') === 'N' ? (
                                <TableCell align="left">
                                  {data.Branch}
                                </TableCell>
                              ) : (
                                <TableCell align="left">
                                  {data.Customer_Name}
                                </TableCell>
                              )}

                              <TableCell align="left">
                                <b>₹</b>
                                {numeral(
                                  data.PoValue - data.Discount_Amount,
                                ).format('0,0.00')}
                              </TableCell>

                              {data.PoStatus === 'Bill Raised' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#e6f037' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === 'Accepted' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#41ef35' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === 'Sales order Raised' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#37cbef' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === 'Not Approved' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: 'red' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === 'Approved' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#008001' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === 'DC Raised' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#d30c8b' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === 'Stage 1 completed' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#d30c8b' }}
                                  align="left"
                                >
                                  {data.PoStatus}
                                </TableCell>
                              ) : data.PoStatus === '' ? (
                                <TableCell
                                  color="red"
                                  style={{ color: '#d30c8b' }}
                                  align="left"
                                >
                                  Stage 1 Pending
                                </TableCell>
                              ) : (
                                <TableCell align="left"></TableCell>
                              )}

                              <TableCell
                                align="left"
                                style={{ cursor: 'pointer', fontSize: '16px' }}
                                onClick={() => {
                                  if (data.UpdatedDc != 0) {
                                    GetDeliveryInfo(data.SalesOrderid);
                                    toggle1();
                                  } else {
                                    // GetDeliveryInfobillref(data.Sales_Bill_Id)
                                    // toggle1()
                                  }
                                }}
                              >
                                {data.UpdatedDc != 0 ? (
                                  data.UpdatedDc === 0 ? (
                                    <Badge pill color="danger">
                                      Pending
                                    </Badge>
                                  ) : data.UpdatedDc > 0 &&
                                    data.OrderQty > data.UpdatedDc ? (
                                    <Badge pill color="primary">
                                      Processing
                                    </Badge>
                                  ) : data.UpdatedDc === data.OrderQty ? (
                                    <Badge pill color="success">
                                      Completed
                                    </Badge>
                                  ) : (
                                    <Badge pill color="success">
                                      Completed
                                    </Badge>
                                  )
                                ) : data.Update_DN_Qty === 0 ? (
                                  <Badge pill color="danger">
                                    Pending
                                  </Badge>
                                ) : data.Update_DN_Qty > 0 &&
                                  data.OrderQty > data.Update_DN_Qty ? (
                                  <Badge pill color="primary">
                                    Processing
                                  </Badge>
                                ) : data.Update_DN_Qty === data.OrderQty ? (
                                  <Badge pill color="success">
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge pill color="success">
                                    Completed
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell
                                style={{ cursor: 'pointer', fontSize: '16px' }}
                                onClick={() => {
                                  if (data.UpdatedSalesInvoice != 0) {
                                    GetsalesInvoiceINfo(data.SalesOrderid);
                                    toggle2();
                                  }
                                }}
                              >
                                {data.UpdatedSalesInvoice === 0 ? (
                                  <Badge pill color="danger">
                                    Pending
                                  </Badge>
                                ) : data.UpdatedSalesInvoice > 0 &&
                                  data.OrderQty > data.UpdatedSalesInvoice ? (
                                  <Badge pill color="primary">
                                    Processing
                                  </Badge>
                                ) : data.UpdatedSalesInvoice ===
                                  data.OrderQty ? (
                                  <Badge pill color="success">
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge pill color="success">
                                    Completed
                                  </Badge>
                                )}
                              </TableCell>
                              {/* <TableCell align="left"></TableCell>   */}

                              <TableCell align="left">
                                {data.User_Name}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableCell align="left">NO Data Found</TableCell>
                        )}

                        {/* { purchase.map((data)=>( 
                <TableRow >
              
                <TableCell align="left">{data.Order_No}</TableCell>
                <TableCell align="left" >{data.Order_Date}</TableCell> 
                <TableCell align="left">{data.Branch_Name}</TableCell>
                <TableCell align="left" >{data.Status}</TableCell>
                <TableCell align="left">{data.NET_AMOUNT}</TableCell>
                
              
              
                <TableCell align="left">
                  <IconButton size="small"    >
                      <EditIcon fontSize="small" />
                    </IconButton  >
                    </TableCell>
                  
                    <TableCell align="left">
                    <IconButton size="small"   >
                        <VisibilityIcon fontSize="small"  />
                      </IconButton  >
                      </TableCell>   
                  
                      <TableCell align="left">
                      
                        <IconButton size="small"   >

                        <DeleteIcon fontSize= "small"  />
                      </IconButton  >
                      
                      
                    
                      </TableCell>
                    
                      <TableCell align="left">
                  <IconButton size="small"   >
                      <PrintIcon fontSize="small" />
                    </IconButton  >
                    </TableCell>
            
                </TableRow>
    ))}
    <TableCell align="left">NO Data Found</TableCell> */}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    component="div"
                    rowsPerPageOptions={pages}
                    count={PoorderTrackingDate.length}
                    rowsPerPage={rowsperpage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </div>
                {/* <Backdrop  open={open} >
        
              
    <Spinner name="ball-spin-fade-loader"  color='#fafafa' />
    <p style={{marginTop: '50px'}}>downloading Pdf...</p>

    </Backdrop> */}
              </CardBody>
            </Card>
            <Backdrop open={open} className={classes.backdrop}>
              <Spinner name="ball-spin-fade-loader" color="#fafafa" />
              <p style={{ marginTop: '50px' }}></p>
            </Backdrop>

            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open1}
              autoHideDuration={2000}
              onClose={handleClose}
              message="Po is  deleted successfully"
            />
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={alertforpodelete}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Po is approved can't be deleted
              </Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={printconditions}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Po is Not Approved can't be Download print
              </Alert>
            </Snackbar>
          </div>
        </Container>
      </div>
    </>
  );
}

export default POTRACKING;

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
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import Buttons from 'reactstrap/lib/Button';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useRef, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Button1 from 'reactstrap/lib/Button';
import numeral from 'numeral';
import moment from 'moment';
import './cardpage.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from '../axios';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import { useStateValue } from '../StateProvider';
import Spinner from 'react-spinkit';
import Backdrop from '@material-ui/core/Backdrop';
import CropDinIcon from '@material-ui/icons/CropDin';
//mport Switch from '@mui/material/Switch';
import Switch from '@material-ui/core/Switch';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DoneAll from '@material-ui/icons/DoneAll';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
}));
function CardPage() {
  const history = useHistory();
  const classes = useStyles();
  const [pices, setpices] = useState([]);
  const [sample, setsample] = useState([]);
  const [branchfornoadmin, setbranchfornoadmin] = useState([]);
  const [getqaparams, setgetqaparams] = useState([]);
  const [PieceForAudits, setPieceForAudits] = useState('');
  const [PieceforAuditmin, setPieceforAuditmin] = useState('');
  const [pieceforAudictmax, setpieceforAudictmax] = useState('');
  const [SamplePiece, setSamplePiece] = useState('');
  const [MajorAQL15, setMajorAQL15] = useState('');
  const [MajorAQL25, setMajorAQL25] = useState('');
  const [MajorAQL40, setMajorAQL40] = useState('');
  const [MinorAQL15, setMinorAQL15] = useState('');
  const [MinorAQL25, setMinorAQL25] = useState('');
  const [MinorAQL40, setMinorAQL40] = useState('');
  const [upPieceForAudits, setupPieceForAudits] = useState('');
  const [upSamplePiece, setupSamplePiece] = useState('');
  const [upMajorAQL15, setupMajorAQL15] = useState('');
  const [upMajorAQL25, setupMajorAQL25] = useState('');
  const [upMajorAQL40, setupMajorAQL40] = useState('');
  const [upMinorAQL15, setupMinorAQL15] = useState('');
  const [upMinorAQL25, setupMinorAQL25] = useState('');
  const [upMinorAQL40, setupMinorAQL40] = useState('');
  const [Active, setActive] = useState('yes');
  const [uservalue, setuservalue] = useState([]);
  const [upActive, setupActive] = useState('');
  const [daas, setdaas] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [error, seterror] = useState(false);
  const ref1 = useRef('');
  const ref2 = useRef('');
  const ref3 = useRef('');
  const ref4 = useRef('');
  const ref5 = useRef('');
  const ref6 = useRef('');
  const ref7 = useRef('');
  const ref8 = useRef('');
  const ref9 = useRef('');
  const ref10 = useRef();
  const activeref = useRef('');
  const ref11 = useRef();
  const pages = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 400, 500,
    600, 700, 800, 900, 1000,
  ];
  const [page, setpage] = useState(0);
  const [rowsperpage, setrowsperpage] = useState(pages[page]);
  const [erros1, seterros1] = useState(false);
  const [erros2, seterros2] = useState(false);
  const [erros3, seterros3] = useState(false);
  const [erros4, seterros4] = useState(false);
  const [erros5, seterros5] = useState(false);
  const [erros7, seterros7] = useState(false);
  const [erros8, seterros8] = useState(false);
  const [erros9, seterros9] = useState(false);
  const [erros6, seterros6] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [cutomer, setcutomer] = useState([]);
  const [deletingid, setdeletingid] = useState('');
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [fromdatee, setfromdatee] = useState('');
  const [toodate, settoodate] = useState(new Date());
  const [customerss, setcustomerss] = useState('');
  const [Approvedid, setApprovedid] = useState('');
  const [usertype, setusertype] = useState('');
  const [custt, setcustt] = useState('');
  const [bracnch, setbracnch] = useState('');
  const [branches, setbranches] = useState([]);
  const [branchesadmin, setbranchesadmin] = useState([]);
  const [branchnon, setbranchnon] = useState([]);
  const [purchase, setpurchase] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [approvereq, setapprovereq] = useState('');

  const [loading, setloading] = useState(false);

  const [sss, setsss] = useState(false);
  const [one, setone] = useState(false);
  const [two, settwo] = useState(false);
  const [threee, setthreee] = useState(false);
  const [four, setfour] = useState(false);
  const [All, setAll] = useState('0');
  const [five, setfive] = useState(false);
  const [isSelected, setSelection] = useState(false);
  //  const toggleSwitch = () => setIsEnabled(previousState => !previousState)
  const [getpendigs, setgetpendigs] = useState([]);
  const [status, setstatus] = useState('Y');
  const [deliverydate, setdeliverydate] = useState(new Date());
  const [pos, setpos] = useState('Accepted');
  const [Approvelpage, setApprovelpage] = useState(true);
  const [Approvelviewpage, setApprovelviewpage] = useState(false);

  const [provalue, setprovalue] = useState([]);
  const [totaltax, settotaltax] = useState('');
  const [totaltaxamt, settotaltaxamt] = useState('');
  const [totalamt, settotalamt] = useState('');
  const [totalqty, settotalqty] = useState('');
  const [orderdate, setorderdate] = useState('');
  const [deliverydate1, setdeliverydate1] = useState('');
  const [remarks, setremarks] = useState('');
  const [pono, setpono] = useState('');
  const [orderhederdata, setorderhederdata] = useState([]);
  const [Frommail, setFrommail] = useState('');
  const [Tomail, setTomail] = useState('');
  const [smptport, setsmptport] = useState('');
  const [SMTPServer, setSMTPServer] = useState('');
  const [mailpassword, setmailpassword] = useState('');
  const [Statuscalll, setStatuscalll] = useState('');
  const [ccmail, setccmail] = useState('');
  const [mailloginnames, setmailloginnames] = useState('');

  const [customername, setcustomername] = useState('');
  const [branchname, setbranchname] = useState('');
  const [Contact_Person, setContact_Person] = useState('');
  const [cus_name, setcus_name] = useState('');
  const [usersmptserver, setusersmptserver] = useState('');
  const [usersmptport, setusersmptport] = useState('');
  const [usermailpassword, setusermailpassword] = useState('');
  const [spinnersforapprove, setspinnersforapprove] = useState(false);
  const [createdbyid, setcreatedbyid] = useState('');

  //po raise base setstatecodes
  const [poraisecustomerstatecode, setporaisecustomerstatecode] = useState('');
  const [companystatecode, setcompanystatecode] = useState('');

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return getpendigs.slice(page * rowsperpage, (page + 1) * rowsperpage);
  };

  // const deleteqaparams  = async(deit, e) => {
  //   if(window.confirm('Are you  sure delete this QA parameter?')){
  //     const dlteparam  = await axios.instance.delete(`/qaparameter/${deit}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
  //     'Content-Type': 'application/json'
  //     }} )

  //     .then(res => {
  //       const delpam =  getqaparams.filter(qa => qa.QAParameterID)
  //     })

  //     getQaparameter1()
  //      setopen2(true)
  //   }

  // }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen(false);
    setopen1(false);
    setopen2(false);
  };

  useEffect(() => {
    getnameofemail();
    const getusertype = async () => {
      const type = localStorage.getItem('AdminUser');

      setusertype(type);
      //console.log(type)
    };
    const custtt = async () => {
      const custt = localStorage.getItem('Customer_Log');
      const APROVEREQ = localStorage.getItem('approvereq');
      setapprovereq(APROVEREQ);
      setcustt(custt);
      //console.log(custt)
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
    // var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)

    setfromdatee(moment(firstday).format('YYYY-MM-DD'));
    settoodate(moment(new Date()).format('YYYY-MM-DD'));

    const branch = async () => {
      const branch = localStorage.getItem('Branch_Log');
      setbracnch(branch);
      //console.log(branch)
    };
    getusertype();
    custtt();
    branch();

    customeradmin();

    getdataview();
    //getdataview1()
    branchet();
  }, []);

  //  const close = () => {
  //   document.getElementById('qa').style.display = "none"
  // }
  const getnameofemail = async () => {
    const tokent = localStorage.getItem('authtoken');
    const cuslog = localStorage.getItem('Customer_Log');
    const aprovvas = await axios.instance
      .get(`/Cus/${cuslog}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        for (const data of res.data) {
          setmailloginnames(data.Customer_Name);
        }
      });
  };
  const purchasessspndings = async () => {
    if (All === '0') {
      const tokent = localStorage.getItem('authtoken');
      const type = localStorage.getItem('AdminUser');
      const branch = localStorage.getItem('Branch_Log');
      const cuslog = localStorage.getItem('Customer_Log');
      const aprovvas = await axios.instance.get(
        `/completeapprovals/${cuslog}/0/${moment(fromdatee).format(
          'YYYYMMDD',
        )}/${moment(toodate).format('YYYYMMDD')}/${localStorage.getItem(
          'Userid',
        )}/${localStorage.getItem('customer_HO')}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      );
      setgetpendigs(aprovvas.data);
      // console.log('tets',aprovvas.data)
    } else {
      const tokent = localStorage.getItem('authtoken');
      const type = localStorage.getItem('AdminUser');
      const branch = localStorage.getItem('Branch_Log');
      const cuslog = localStorage.getItem('Customer_Log');
      const aprovvas = await axios.instance.get(
        `/completeapprovals/${cuslog}/${branch}/${moment(fromdatee).format(
          'YYYY-MM-DD',
        )}/${moment(toodate).format('YYYY-MM-DD')}/${localStorage.getItem(
          'Userid',
        )}/${localStorage.getItem('customer_HO')}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      );
      setgetpendigs(aprovvas.data);
      //console.log('tet',aprovvas.status)
    }
  };

  const complteapproves = async () => {
    // console.log('called')

    //setfromdate(new Date(firstday))

    settoodate(new Date());
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    const aprovvas = await axios.instance.get(
      `/completeapprovals/${cuslog}/${branch}/${fromdatee}/${moment(
        toodate,
      ).format('DD-MM-YYYY')}/${localStorage.getItem(
        'Userid',
      )}/${localStorage.getItem('customer_HO')}`,
      {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      },
    );
    setgetpendigs(aprovvas.data);
    //console.log(aprovvas.data)
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
    //console.log(branccc.data)
  };

  const customeradmin = async () => {
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');

    const cusadmin = await axios.instance.get(
      `/BranchHelp/${cuslog}/${branch}/${
        localStorage.getItem('Approval2') === 'Y' ||
        localStorage.getItem('Approval3') === 'Y' ||
        localStorage.getItem('AdminUser') === 'Y'
          ? 'Y'
          : type
      }`,
      {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      },
    );
    setbranchesadmin(cusadmin.data);
    //console.log(cusadmin.data)
  };
  const getbranchasehelp = async id => {
    setAll(id);
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    if (isEnabled === true) {
      const customers = await axios.instance
        .get(
          `/completeapprovals/${cuslog}/${id}/${moment(fromdatee).format(
            'YYYYMMDD',
          )}/${moment(toodate).format('YYYYMMDD')}/${localStorage.getItem(
            'Userid',
          )}/${localStorage.getItem('customer_HO')}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
          //console.log( res.data)
        });
    } else {
      const customers = await axios.instance
        .get(
          `/Pending/${cuslog}/${id}/${moment(fromdatee).format(
            'YYYYMMDD',
          )}/${moment(toodate).format('YYYYMMDD')}/${localStorage.getItem(
            'Userid',
          )}/${localStorage.getItem('customer_HO')}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
          //console.log( res.data)
          for (const data of res.data) {
            setcreatedbyid(data.createdby_id);
          }
        });
    }
  };
  const approvals = async (id, status) => {
    // console.log(status)
    setApprovelpage(false);
    setStatuscalll(status);
    setApprovedid(id);
    /// navigation.navigate('Approvelview', {orderid: id, Status: status})
    getprodctdel(id);
    Getorderhdr(id);
    pdfcreate(id);
    Mailcontent(id);
  };

  const getdats = async data => {
    setIsEnabled(data);
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    if (data === true) {
      const customers = await axios.instance
        .get(
          `/completeapprovals/${cuslog}/${type === 'Y' ? All : branch}/${moment(
            fromdatee,
          ).format('YYYYMMDD')}/${moment(toodate).format(
            'YYYYMMDD',
          )}/${localStorage.getItem('Userid')}/${localStorage.getItem(
            'customer_HO',
          )}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
          console.log(res.data);
        });
    } else {
      const customers = await axios.instance
        .get(
          `/Pending/${cuslog}/${type === 'Y' ? All : branch}/${moment(
            fromdatee,
          ).format('YYYYMMDD')}/${moment(toodate).format(
            'YYYYMMDD',
          )}/${localStorage.getItem('Userid')}/${localStorage.getItem(
            'customer_HO',
          )}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
          //  console.log( res.data)
          for (const data of res.data) {
            setcreatedbyid(data.createdby_id);
          }
        });
    }
  };

  const getdataview = async () => {
    var date = new Date();
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    const tokent = localStorage.getItem('authtoken');

    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    if (isEnabled === true) {
      const customers = await axios.instance
        .get(
          `/completeapprovals/${cuslog}/${type === 'Y' ? All : branch}/${moment(
            firstday,
          ).format('YYYYMMDD')}/${moment(toodate).format(
            'YYYYMMDD',
          )}/${localStorage.getItem('Userid')}/${localStorage.getItem(
            'customer_HO',
          )}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
        });
    } else {
      const customers = await axios.instance
        .get(
          `/Pending/${cuslog}/${type === 'Y' ? All : branch}/${moment(
            firstday,
          ).format('YYYYMMDD')}/${moment(toodate).format(
            'YYYYMMDD',
          )}/${localStorage.getItem('Userid')}/${localStorage.getItem(
            'customer_HO',
          )}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
          // console.log('pendings', res.data)
          for (const data of res.data) {
            setcreatedbyid(data.createdby_id);
          }
        });
    }
  };

  const getdataview1 = async () => {
    var date = new Date();
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    const tokent = localStorage.getItem('authtoken');

    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    if (isEnabled === true) {
      const customers = await axios.instance
        .get(
          `/completeapprovals/${cuslog}/${type === 'Y' ? All : branch}/${moment(
            fromdatee,
          ).format('YYYYMMDD')}/${moment(toodate).format(
            'YYYYMMDD',
          )}/${localStorage.getItem('Userid')}/${localStorage.getItem(
            'customer_HO',
          )}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
        });
    } else {
      const customers = await axios.instance
        .get(
          `/Pending/${cuslog}/${branch}/${moment(fromdatee).format(
            'YYYYMMDD',
          )}/${moment(toodate).format('YYYYMMDD')}/${localStorage.getItem(
            'Userid',
          )}/${localStorage.getItem('customer_HO')}`,
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setgetpendigs(res.data);
          // console.log('pendings', res.data)
          for (const data of res.data) {
            setcreatedbyid(data.createdby_id);
          }
        });
    }
  };

  const Approve = async () => {
    //console.log('called')
    // console.log('server',SMTPServer)
    // console.log('port',smptport)
    // console.log('frommail',Frommail)
    // console.log('password',mailpassword)
    //  console.log('tomaiil',Tomail)
    //  console.log('name',mailloginnames)
    //  console.log('cc', ccmail)
    const tokent = localStorage.getItem('authtoken');
    const Username = localStorage.getItem('Username');
    const userId = localStorage.getItem('Userid');
    const approvs = await axios.instance
      .put(
        `/Approve/${Approvedid}`,
        {
          ApproveDate: new Date(),
          Approve: 'Y',
          Confirmed_Status: 'Y',
          POStatus: 'Approved',
          ApproveBy: userId,
        },
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async res => {
        // console.log(res.data)

        const mailsend = await axios.instance.post(
          'mail',
          {
            host: SMTPServer,
            port: smptport,
            username: Frommail,
            password: mailpassword,
            tomail: ccmail,
            cc: ccmail,
            sub: 'PO is approved',
            orderno: `${pono}`,
            loginname: Username,
            customernme: customername,
          },
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        );
        // console.log('test',mailsend.status)

        const mailsend1 = await axios.instance.post(
          'mailforsupplier',
          {
            host: SMTPServer,
            port: smptport,
            username: Frommail,
            password: mailpassword,
            tomail: Tomail,

            sub: 'Po to supply material',
            orderno: `${pono}`,
            loginname: Username,
            customernme: customername,
            ContactPerson: Contact_Person,
            BranchName: branchname,
            Cus_name: cus_name,
          },
          {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          },
        );
        //console.log('test',mailsend1.status)

        getdataview();
        setApprovelpage(true);
      });
  };

  const Getorderhdr = async id => {
    const tokent = localStorage.getItem('authtoken');
    const ordeheader = await axios.instance
      .get(`/POOrdr/${id}`, {
        Authorization: tokent,
        'Content-Type': 'application/json',
      })
      .then(res => {
        //console.log('test',res.data)
        setorderhederdata(res.data);
        for (const data of res.data) {
          setorderdate(data.Order_Date);
          setdeliverydate1(data.Delivery_Date);
          setremarks(data.REMARKS);
          setpono(data.PO_No);
          setporaisecustomerstatecode(data.CUSTOMER_STATECODE);
          setcompanystatecode(data.COMPANY_STATECODE);

          // console.log(data.Status)
        }
      });
  };

  const getprodctdel = async id => {
    const tokent = localStorage.getItem('authtoken');
    const prod = await axios.instance
      .get(`/POOrdrDtl/${id}`, {
        Authorization: tokent,
        'Content-Type': 'application/json',
      })
      .then(async res => {
        localStorage.setItem('Products', JSON.stringify(res.data));
        setprovalue(res.data);
        // console.log('approve', res.data)
        for (const data of res.data) {
          //  console.log(data.Status)
        }
        let totalnetamt = [];
        for (const data of res.data) {
          totalnetamt.push(data.Amount);
          var amounvalu = data.Order_Qty * data.Rate;
          localStorage.setItem('Total_Amount', amounvalu.toString());
          var sgstamt = amounvalu * data.SGSTPer;
          var sgstcal = sgstamt / 100;
          //console.log(sgstcal)
          localStorage.setItem('Totalsgst', sgstcal.toString());
          var cgstamt = amounvalu * data.VAT_Percentage;
          var cgstcal = cgstamt / 100;
          //console.log(cgstcal)
          localStorage.setItem('Totalcgst', cgstcal.toString());
        }

        var totalnetamtvalue = 0;
        for (let i = 0; i < totalnetamt.length; i++) {
          totalnetamtvalue += totalnetamt[i];
        }
        //console.log(totalnetamtvalue)
        let qtytotal = [];

        for (const data of res.data) {
          qtytotal.push(data.Order_Qty);
        }
        var qtyvalue = 0;
        for (let i = 0; i < qtytotal.length; i++) {
          qtyvalue += qtytotal[i];
        }
        ////console.log(qtyvalue)
        localStorage.setItem('Totalqty', qtyvalue.toString());

        let totalcgstamt = [];
        for (const data of res.data) {
          totalcgstamt.push(data.VAT_Percentage);
        }
        var totalcgstvalu = 0;
        for (let i = 0; i < totalcgstamt.length; i++) {
          totalcgstvalu += totalcgstamt[i];
        }
        //console.log(totalcgstvalu)
        //AsyncStorage.setItem('Totalcgst', totalcgstvalu.toString())

        let totalsgstamt = [];
        for (const data of res.data) {
          totalsgstamt.push(data.SGSTPer);
        }
        var totalsgstvalu = 0;
        for (let i = 0; i < totalsgstamt.length; i++) {
          totalsgstvalu += totalsgstamt[i];
        }
        localStorage.setItem('Totalamt', totalnetamtvalue.toString());
        //AsyncStorage.setItem('Totalsgst', totalsgstvalu.toString())
        for (const data of res.data) {
          const totlqty = localStorage.getItem('Totalqty');
          const tlamt = localStorage.getItem('Totalamt');
          const totalamount = localStorage.getItem('Total_Amount');
          const cgst = localStorage.getItem('Totalcgst');
          const sgst = localStorage.getItem('Totalsgst');
          const product = [];
          let prod = Object.assign(data, {
            Total_Amount: totalamount,
            Total_cgst: cgst,
            Total_sgst: sgst,
          });
          let products = product.push(prod);
          //console.log(product.push(prod))
          //console.log('my products',prod)
          localStorage.setItem('Products', JSON.stringify(prod));
          settotalqty(totlqty);
          settotalamt(tlamt);
          settotaltax(parseFloat(sgst) + parseFloat(cgst));
        }
      });
  };

  const Mailcontent = async id => {
    // console.log('mail')
    const tokent = localStorage.getItem('authtoken');

    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    const branccc = await axios.instance
      .get(`/mailHelp/${cuslog}/${id}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        //console.log('mail',res.status)
        for (const data of res.data) {
          setFrommail(data.frommail);
          setTomail(data.Tomail);
          setsmptport(data.SMTPPort);
          setSMTPServer(data.SMTPServer);
          setmailpassword(data.mailpassword);
          setccmail(data.ccmail);
          // console.log(data.ccmail)
          setcustomername(data.customername);
          // console.log('mailname',data.customername)
          setContact_Person(data.Contact_Person);
          setbranchname(data.Branch_Name);
          setcus_name(data.Customer_Name);
          setusersmptport(data.usersmptport);
          setusersmptserver(data.usersmptsever);
          setusermailpassword(data.useremailpassword);
        }
      });
  };

  const pdfcreate = async id => {
    const tokent = localStorage.getItem('authtoken');
    const branccc = await axios.instance.get(`/Createpdf/${id}`, {
      headers: { Authorization: tokent, 'Content-Type': 'application/json' },
    });
    // console.log(branccc.data)
  };
  const handleChange = e => {
    setIsEnabled(e.target.checked);
    //(event.target.value)
    // console.log(isEnabled)
  };
  const viewapprovals = id => {
    history.push(`/approvalview/${id}`);
  };

  return (
    <>
      <div>
        <Backdrop open={spinnersforapprove} className={classes.backdrop}>
          <Spinner name="ball-spin-fade-loader" color="#fafafa" />
        </Backdrop>
        <Card>
          <CardBody>
            {localStorage.getItem('approvereq') === 'Y' ? (
              <h6 style={{ fontSize: 20 }} className="titleviewinspections">
                Send PO
              </h6>
            ) : (
              <h6 className="titleviewinspections">PO Approval</h6>
            )}
            <div className="InspectionReportForms">
              {localStorage.getItem('customer_HO') === 'N' && (
                <div className="DefectTypes">
                  <lable>
                    <b>Branch</b>
                  </lable>
                  {localStorage.getItem('AdminUser') === 'Y' ? (
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
              )}
              <div className="Todates11">
                <lable>
                  <b>From Date</b>
                </lable>

                <Input
                  type="date"
                  value={fromdatee}
                  id="fromdate"
                  onChange={e => setfromdatee(e.target.value)}
                />
              </div>

              <div className="Todates11">
                <lable>
                  <b>To Date</b>
                </lable>
                <Input
                  type="date"
                  value={toodate}
                  id="todate"
                  onChange={e => settoodate(e.target.value)}
                />
              </div>

              <div className="submitbtns">
                <Button1
                  color="primary"
                  className="adbtn2"
                  onClick={getdataview1}
                >
                  View
                </Button1>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '30px',
                  marginTop: '30px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    marginTop: '-5px',
                  }}
                >
                  {isEnabled ? (
                    <p style={{ color: 'green', marginTop: 5 }}>
                      {approvereq === 'Y' ? <p>Sended Po </p> : <p>Approved</p>}
                    </p>
                  ) : (
                    <p style={{ color: 'red', marginTop: 5 }}>
                      {approvereq === 'Y' ? (
                        <p>Send Po </p>
                      ) : (
                        <p>Un Approved</p>
                      )}
                    </p>
                  )}
                  <Switch
                    checked={isEnabled}
                    onChange={e => getdats(e.target.checked)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <div>
          <Card className="">
            <CardBody>
              <div className="Tabelinspections">
                <TableContainer>
                  <Table className="InspectionTbls">
                    <TableHead>
                      <TableRow>
                        <TableCell>PO No</TableCell>
                        <TableCell align="left">PO Date</TableCell>
                        <TableCell align="left">Contract No</TableCell>

                        <TableCell>Department</TableCell>
                        <TableCell>Designation</TableCell>
                        {localStorage.getItem('customer_HO') === 'Y' ? (
                          <TableCell>Customer Name</TableCell>
                        ) : (
                          <TableCell>Branch Name</TableCell>
                        )}

                        <TableCell>Status</TableCell>
                        <TableCell>Created By </TableCell>
                        <TableCell>Total Amount</TableCell>

                        {isEnabled ? (
                          <TableCell>
                            {approvereq === 'Y' ? 'Sended Po' : 'Approved'}
                          </TableCell>
                        ) : (
                          <TableCell>
                            {approvereq === 'Y' ? 'Send Po' : ' Un Approved'}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {getpendigs.length !=0 ?  (     changepage().map((data,index) => (

             
<TableRow >
<TableCell align="left">#{data.Order_No}</TableCell>
            <TableCell align="left" >{data.Order_Date}</TableCell> 
            <TableCell  align="left">{data.Branch_Name}</TableCell>
            {data.Status === 'Not Approved' ? (
            <TableCell  align="left" style={{color:'red'}}>{data.Status}</TableCell>
            ):     <TableCell  align="left" style={{color:'#14930E'}}>{data.Status}</TableCell>
}
            <TableCell color='red' style={{color:'#e6f037'}} align="left" >{data.NET_AMOUNT}</TableCell>
     
    
      
     
    
</TableRow>
)) ) : (
<TableCell align="left">NO Data Found</TableCell>
)} */}

                      {getpendigs.length != 0 ? (
                        changepage().map(data => (
                          <TableRow key={data.Order_Id}>
                            <TableCell align="left">{data.Order_No}</TableCell>

                            <TableCell align="left">
                              {data.Order_Date}
                            </TableCell>
                            <TableCell align="left">
                              {localStorage.getItem('Contract_Detail_No')}
                            </TableCell>
                            <TableCell>{data.Department}</TableCell>
                            <TableCell>{data.Designation}</TableCell>
                            <TableCell align="left">
                              {localStorage.getItem('customer_HO') === 'Y'
                                ? data.CustomerName
                                : data.Branch_Name == ''
                                ? localStorage.getItem('CustomerName')
                                : data.Branch_Name}
                            </TableCell>
                            {data.Status === 'Stage 1 pending' ? (
                              <TableCell align="left" style={{ color: 'red' }}>
                                <Badge
                                  style={{
                                    fontSize: '13px',
                                    backgroundColor: '#CB1033',
                                  }}
                                  pill
                                >
                                  {data.Status}
                                </Badge>
                              </TableCell>
                            ) : (
                              <TableCell
                                align="left"
                                style={{ color: '#14930E' }}
                              >
                                <Badge
                                  style={{
                                    fontSize: '13px',
                                    backgroundColor: '#14930E',
                                  }}
                                  pill
                                >
                                  {data.Status}
                                </Badge>
                              </TableCell>
                            )}
                            <TableCell>{data.User_Name} </TableCell>
                            <TableCell
                              color="red"
                              style={{ color: 'black' }}
                              align="left"
                            >
                              <b>₹</b>
                              {numeral(
                                data.NET_AMOUNT - data.Discount_Amount,
                              ).format('0,0.00')}
                            </TableCell>

                            {data.Status === 'Stage 1 pending' ? (
                              <TableCell>
                                <IconButton
                                  onClick={e => viewapprovals(data.Order_Id, e)}
                                >
                                  <CropDinIcon />
                                </IconButton>
                              </TableCell>
                            ) : data.Status === 'Stage 1 completed' &&
                              localStorage.getItem('Approval3') === 'N' &&
                              localStorage.getItem('AdminUser') === 'Y' ? (
                              <TableCell>
                                <IconButton
                                  onClick={e => viewapprovals(data.Order_Id, e)}
                                >
                                  <CropDinIcon />
                                </IconButton>
                              </TableCell>
                            ) : data.Status === 'Stage 2 complete' &&
                              localStorage.getItem('AdminUser') === 'Y' ? (
                              <TableCell>
                                <IconButton
                                  onClick={e => viewapprovals(data.Order_Id, e)}
                                >
                                  <CropDinIcon />
                                </IconButton>
                              </TableCell>
                            ) : (
                              <TableCell>
                                <IconButton>
                                  <DoneAll style={{ color: 'green' }} />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      ) : (
                        <TableCell align="left">NO Data Found</TableCell>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  rowsPerPageOptions={pages}
                  count={getpendigs.length}
                  rowsPerPage={rowsperpage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
              <Backdrop open={open}>
                <Spinner name="ball-spin-fade-loader" color="#fafafa" />
                <p style={{ marginTop: '50px' }}></p>
              </Backdrop>
            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Transaction  deleted successfully"
          />
        </div>
      </div>
    </>
  );
}

export default CardPage;

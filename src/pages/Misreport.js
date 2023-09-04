import React, { useEffect, useMemo, useState } from 'react';
//import './widgetpage.css'
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';
import Backdrop from '@material-ui/core/Backdrop';
import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';
import Select from 'react-select';

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';
import './InspectionEdit.css';
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
import moment from 'moment';

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
// import FileSaver, {saveAs} from 'file-saver'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet,
} from 'react-device-detect';
import { Fragment } from 'react';
import * as Xl from 'excel4node';
import FileSaver from 'file-saver';
import tableContainer from '../Common/TableContainer';

const misreport1 = () => {
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [usertype, setusertype] = useState('');
  const [createdby, setcreatedby] = useState('');
  const [tabledatas, settabledatas] = useState([]);
  const [popupstatus, setpopupstatus] = useState([]);
  const [modal, setModal] = useState(false);
  const pages = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 400, 500,
    600, 700, 800, 900, 1000,
  ];
  const [page, setpage] = useState(0);
  const [rowsperpage, setrowsperpage] = useState(pages[page]);

  const [createdbyvalue, setcreatedbyvalue] = useState({
    label: 'All',
    value: '0',
  });
  const [createdbyhelps, setcreatedbyhelps] = useState([]);

  //branchhelp
  const [branchvalue, setbranchvalue] = useState({ label: 'All', value: '0' });
  const [branchhelp, setbranchhelp] = useState([]);

  //Total PO Count
  const [toatalpocount, settoatalpocount] = useState('');
  //TotalPoValue
  const [totalpovalue, settotalpovalue] = useState('');

  const [contractno, setcontractno] = useState('');

  // const [nodatafound,setnodatafound]= useState('false')

  const [approvedbyvalue, setapprovedbyvalue] = useState({
    label: 'All',
    value: '0',
  });
  const [approvedbyhelp, setapprovedbyhelp] = useState([]);

  //customerhelp
  const [customerhelp, setcustomerhelp] = useState([]);
  const [customervalue, setcustomervalue] = useState({
    label: 'All',
    value: '0',
  });
  const toggle = () => setModal(!modal);

  const changepage = () => {
    return tabledatas.slice(page * rowsperpage, (page + 1) * rowsperpage);
  };

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  useEffect(() => {
    var date = new Date();

    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);

    var lastday = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    setfromdate(moment(firstday).format('YYYY-MM-DD'));
    settodate(moment(lastday).format('YYYY-MM-DD'));

    const usertypes = localStorage.getItem('AdminUser');
    setusertype(usertypes);
    console.log(usertypes, 'usertype');

    const createdbys = localStorage.getItem('Userid');
    setcreatedby(createdbys);
    console.log(createdbys, 'createdby');

    const contractdtlno = localStorage.getItem('Contract_Detail_No');
    setcontractno(contractdtlno);

    createdbyhelp();
    BranchHelp();
    customerhelps();
    tabledatanew();
    approvedbyhelps();
    console.log(localStorage.getItem('Customer_Log'), 'Customer_Log');
  }, []);

  // const tabledata=async()=>{
  //     await axios.instance.get(`/Report1/${usertype}/${createdby}/${moment(fromdate).format("YYYYMMDD")}/${moment(todate).format("YYYYMMDD")}`)
  //     .then ((res)=>{
  //         settabledatas(res.data)
  //         console.log(res.data,"tabledatas");

  //         // let time=[]
  //         // for(const data of res.data)
  //         // time.push(data.date)
  //         // console.log((moment(time[0]).utcOffset(0).format("HH:mm:ss")),"time");
  //         // console.log(time[0]);

  //     })

  // }

  let TotalPo = [];
  let TotalPoValue = [];
  //useeffect not working so this method use
  const Getfromdateset = async value => {
    // if(parseInt(moment(new Date('01 January 0 00:00:00 ')).format('YYYY')) <  parseInt(moment(new Date(value)).format('YYYY') )) {

    setfromdate(value);

    if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'N'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem(
            'Branch_Log',
          )}/${localStorage.getItem('Userid')}/${moment(value).format(
            'YYYYMMDD',
          )}/${moment(todate).format('YYYYMMDD')}/${0}/${localStorage.getItem(
            'customer_HO',
          )}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'Y'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem('Branch_Log')}/${
            createdbyvalue.value
          }/${moment(value).format('YYYYMMDD')}/${moment(todate).format(
            'YYYYMMDD',
          )}/${0}/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ||
            localStorage.getItem('Approval2') === 'Y'
              ? 1
              : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else {
      await axios.instance
        .get(
          `/PoReportNew/${
            localStorage.getItem('customer_HO') === 'N'
              ? branchvalue.value
              : customervalue.value
          }/${createdbyvalue.value}/${moment(value).format(
            'YYYYMMDD',
          )}/${moment(todate).format('YYYYMMDD')}/${
            approvedbyvalue.value
          }/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    }
  };

  const Gettodateset = async value => {
    // if(parseInt(moment(new Date('01 January 0 00:00:00 ')).format('YYYY')) <  parseInt(moment(new Date(value)).format('YYYY') )) {

    settodate(value);

    if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'N'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem(
            'Branch_Log',
          )}/${localStorage.getItem('Userid')}/${moment(fromdate).format(
            'YYYYMMDD',
          )}/${moment(value).format('YYYYMMDD')}/${0}/${localStorage.getItem(
            'customer_HO',
          )}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'Y'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem('Branch_Log')}/${
            createdbyvalue.value
          }/${moment(fromdate).format('YYYYMMDD')}/${moment(value).format(
            'YYYYMMDD',
          )}/${0}/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ||
            localStorage.getItem('Approval2') === 'Y'
              ? 1
              : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else {
      await axios.instance
        .get(
          `/PoReportNew/${
            localStorage.getItem('customer_HO') === 'N'
              ? branchvalue.value
              : customervalue.value
          }/${createdbyvalue.value}/${moment(fromdate).format(
            'YYYYMMDD',
          )}/${moment(value).format('YYYYMMDD')}/${
            approvedbyvalue.value
          }/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    }
  };

  const tabledatanew = async () => {
    var date = new Date();

    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    //////////////////console.log(moment(firstday).format)
    // var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)
    var lastday = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );

    if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'N'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem(
            'Branch_Log',
          )}/${localStorage.getItem('Userid')}/${moment(firstday).format(
            'YYYYMMDD',
          )}/${moment(lastday).format('YYYYMMDD')}/${0}/${localStorage.getItem(
            'customer_HO',
          )}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'Y'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem('Branch_Log')}/${
            createdbyvalue.value
          }/${moment(firstday).format('YYYYMMDD')}/${moment(lastday).format(
            'YYYYMMDD',
          )}/${0}/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ||
            localStorage.getItem('Approval2') === 'Y'
              ? 1
              : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else {
      await axios.instance
        .get(
          `/PoReportNew/${
            localStorage.getItem('customer_HO') === 'N'
              ? branchvalue.value
              : customervalue.value
          }/${createdbyvalue.value}/${moment(firstday).format(
            'YYYYMMDD',
          )}/${moment(lastday).format('YYYYMMDD')}/${
            approvedbyvalue.value
          }/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    }
  };

  const tabledatanew1 = async () => {
    if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'N'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem(
            'Branch_Log',
          )}/${localStorage.getItem('Userid')}/${moment(fromdate).format(
            'YYYYMMDD',
          )}/${moment(todate).format('YYYYMMDD')}/${0}/${localStorage.getItem(
            'customer_HO',
          )}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else if (
      localStorage.getItem('AdminUser') == 'N' &&
      localStorage.getItem('Approval3') == 'N' &&
      localStorage.getItem('Approval2') == 'Y'
    ) {
      await axios.instance
        .get(
          `/PoReportNew/${localStorage.getItem('Branch_Log')}/${
            createdbyvalue.value
          }/${moment(fromdate).format('YYYYMMDD')}/${moment(todate).format(
            'YYYYMMDD',
          )}/${0}/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ||
            localStorage.getItem('Approval2') === 'Y'
              ? 1
              : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    } else {
      await axios.instance
        .get(
          `/PoReportNew/${
            localStorage.getItem('customer_HO') === 'N'
              ? branchvalue.value
              : customervalue.value
          }/${createdbyvalue.value}/${moment(fromdate).format(
            'YYYYMMDD',
          )}/${moment(todate).format('YYYYMMDD')}/${
            approvedbyvalue.value
          }/${localStorage.getItem('customer_HO')}/${
            localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
          }/${localStorage.getItem('Customer_Log')}`,
        )
        .then(res => {
          settabledatas(res.data);
          console.log(res.data, 'newtabledata');
          for (const data of res.data) {
            TotalPo.push(data.Order_No);
          }
          // console.log(res.data,'dataaaa')
          // console.log(res.data.length,'dataaaalength')
          console.log(TotalPo.length, 'Podatalength');
          settoatalpocount(TotalPo.length, 'Podatalength');
          for (const data of res.data) {
            TotalPoValue.push(data.NET_AMOUNT);
          }
          let sumoftotalpovalue = 0;
          for (var i = 0; i < TotalPoValue.length; i++) {
            sumoftotalpovalue += TotalPoValue[i];
          }
          settotalpovalue(sumoftotalpovalue);
        });
    }
  };

  const status = async data => {
    console.log(data, 'tabledata');
    await axios.instance.get(`/Status/${data.Order_Id}`).then(res => {
      toggle();
      console.log(res.data, 'status');
      setpopupstatus(res.data);
    });
  };

  const createdbyhelp = async () => {
    await axios.instance
      .get(
        `/CreatedByHelp/${localStorage.getItem('customer_HO')}/${
          localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
        }/${localStorage.getItem('Customer_Log')}/${
          localStorage.getItem('Approval2') === 'Y'
            ? localStorage.getItem('Branch_Log')
            : 0
        }`,
      )
      .then(res => {
        console.log(res.data, 'createdbyhelp');
        const data = res.data;
        const option = data.map(row => ({
          label: row.User_Name,
          value: row.User_Id,
        }));
        option.push({ label: 'All', value: '0' });
        setcreatedbyhelps(option, 'createdbyhelp');
        console.log(option, 'createdbyhelp');
      });
  };

  const BranchHelp = async () => {
    await axios.instance
      .get(`/BranchHelp/${localStorage.getItem('Customer_Log')}`)
      .then(res => {
        console.log(res.data, 'BranchHelp');
        const data = res.data;
        const option = data.map(row => ({
          label: row.Branch_Name,
          value: row.Branch_Id,
        }));
        option.push({ label: 'All', value: '0' });
        setbranchhelp(option, 'branchhelp');
        console.log(option, 'branchhelp');
      });
  };

  const customerhelps = async () => {
    await axios.instance
      .get(
        `CustomerHelp/${localStorage.getItem('customer_HO')}/${
          localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
        }/${localStorage.getItem('Customer_Log')}`,
      )
      .then(res => {
        const data = res.data;
        const options = data.map(row => ({
          label: row.Customer_Name,
          value: row.Customer_Id,
        }));
        options.push({ label: 'All', value: '0' });
        setcustomerhelp(options);
        console.log(options, 'customerhelp');
      });
  };

  const approvedbyhelps = async () => {
    await axios.instance
      .get(
        `/ApprovedByHelp/${localStorage.getItem('customer_HO')}/${
          localStorage.getItem('AdminUser') === 'Y' ? 1 : 0
        }/${localStorage.getItem('Customer_Log')}`,
      )
      .then(res => {
        console.log(res.data, 'approvedbyhelp');
        const data = res.data;
        const option = data.map(row => ({
          label: row.User_Name,
          value: row.User_Id,
        }));
        option.push({ label: 'All', value: '0' });
        setapprovedbyhelp(option, 'approvedbyhelp');
        console.log(option, 'approvedbyhelp');
      });
  };
  // const data=tabledatas;

  const ExportToexcel = () => {
    let misreport1 = [];
    const columns = [
      'PO NO',
      'PO Date',
      'Contract No',
      'PO Value',
      'PO Status',
      'Created By',
    ];

    tabledatas.map(data => {
      misreport1.push({
        PONO: data.Order_No.toString(),
        PODate: data.Order_Date,
        ContractNo: contractno.toString(),
        POValue: data.NET_AMOUNT.toString(),
        POStatus: data.Status,
        CreatedBy: data.User_Name,
      });
    });

    const wb = new Xl.Workbook();
    const ws = wb.addWorksheet('Month Wise Order Status');

    var headings = wb.createStyle({
      font: {
        bold: true,
        size: 12,
        vertAlign: 'center',
        width: 20,
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: '#ddd9c3',
      },
    });

    ws.cell(1, 1, 1, 15, true)
      .string('Month Wise Order Status')
      .style(headings);

    ws.cell(3, 2).string('From Date').style(headings);
    ws.cell(3, 3).string(moment(fromdate).format('DD-MM-yyyy')).style(headings);

    ws.cell(3, 5).string('To Date').style(headings);
    ws.cell(3, 6).string(moment(todate).format('DD-MM-yyyy')).style(headings);

    let headingColumnIndex = 1;
    columns.forEach(heading => {
      ws.column(headingColumnIndex).setWidth(30);
      ws.cell(8, headingColumnIndex++).string(heading).style(headings);
    });

    var heading1 = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });

    var headingLeft = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'left',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });
    var headingRight = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'right',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });

    let rowIndex = 9;
    misreport1.forEach(record => {
      let columnIndex = 1;
      Object.keys(record).forEach(columnName => {
        console.log(columnName);
        ws.column(columnIndex).setWidth(30);

        columnIndex === 5 || columnIndex === 6
          ? ws.cell(rowIndex, columnIndex).style(headingRight)
          : ws.cell(rowIndex, columnIndex).style(headingLeft);

        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        // console.log(record[columnName],"")
      });
      rowIndex++;
    });

    wb.writeToBuffer().then(function (buffer) {
      //console.log(buffer)
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
      //console.log(datas)

      FileSaver.saveAs(data, 'Monthwiseorderstatus' + '.xlsx');
    });
  };

  const ExportToexcel1 = () => {
    let misreport1 = [];
    const columns = [
      'PO NO',
      'PO Date',
      'Contract No',
      'PO Value',
      'PO Status',
      'Created By',
    ];

    tabledatas.map(data => {
      misreport1.push({
        PONO: data.Order_No.toString(),
        PODate: data.Order_Date,
        ContractNo: contractno.toString(),
        POValue: data.NET_AMOUNT.toString(),
        POStatus: data.Status,
        CreatedBy: data.User_Name,
      });
    });

    const wb = new Xl.Workbook();
    const ws = wb.addWorksheet('Month Wise Order Status');

    var headings = wb.createStyle({
      font: {
        bold: true,
        size: 12,
        vertAlign: 'center',
        width: 20,
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: '#ddd9c3',
      },
    });

    ws.cell(1, 1, 1, 15, true)
      .string('Month Wise Order Status')
      .style(headings);

    ws.cell(3, 2).string('From Date').style(headings);
    ws.cell(3, 3).string(moment(fromdate).format('DD-MM-yyyy')).style(headings);

    ws.cell(3, 5).string('To Date').style(headings);
    ws.cell(3, 6).string(moment(todate).format('DD-MM-yyyy')).style(headings);

    ws.cell(5, 2).string('Crteated By').style(headings);
    ws.cell(5, 3).string(createdbyvalue.label).style(headings);

    let headingColumnIndex = 1;
    columns.forEach(heading => {
      ws.column(headingColumnIndex).setWidth(30);
      ws.cell(8, headingColumnIndex++).string(heading).style(headings);
    });

    var heading1 = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });

    var headingLeft = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'left',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });
    var headingRight = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'right',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });

    let rowIndex = 9;
    misreport1.forEach(record => {
      let columnIndex = 1;
      Object.keys(record).forEach(columnName => {
        console.log(columnName);
        ws.column(columnIndex).setWidth(30);

        columnIndex === 5 || columnIndex === 6
          ? ws.cell(rowIndex, columnIndex).style(headingRight)
          : ws.cell(rowIndex, columnIndex).style(headingLeft);

        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        // console.log(record[columnName],"")
      });
      rowIndex++;
    });

    wb.writeToBuffer().then(function (buffer) {
      //console.log(buffer)
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
      //console.log(datas)

      FileSaver.saveAs(data, 'Monthwiseorderstatus' + '.xlsx');
    });
  };

  const ExportToexcel2 = () => {
    let misreport1 = [];
    const columns = [
      'PO NO',
      'PO Date',
      'Contract No',
      'PO Value',
      'PO Status',
      'Branch Name',
      'Approved By',
      'Created By',
    ];

    tabledatas.map(data => {
      misreport1.push({
        PONO: data.Order_No.toString(),
        PODate: data.Order_Date,
        ContractNo: contractno.toString(),
        POValue: data.NET_AMOUNT.toString(),
        POStatus: data.Status,
        BranchName: data.Branch_Name,
        ApprovedBy: data.Stage1CompletedPerson,
        CreatedBy: data.User_Name,
      });
    });

    const wb = new Xl.Workbook();
    const ws = wb.addWorksheet('Month Wise Order Status');

    var headings = wb.createStyle({
      font: {
        bold: true,
        size: 12,
        vertAlign: 'center',
        width: 20,
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: '#ddd9c3',
      },
    });

    ws.cell(1, 1, 1, 15, true)
      .string('Month Wise Order Status')
      .style(headings);

    ws.cell(3, 1).string('Branch').style(headings);
    ws.cell(3, 2).string(branchvalue.label).style(headings);

    ws.cell(3, 4).string('From Date').style(headings);
    ws.cell(3, 5).string(moment(fromdate).format('DD-MM-yyyy')).style(headings);

    ws.cell(3, 7).string('To Date').style(headings);
    ws.cell(3, 8).string(moment(todate).format('DD-MM-yyyy')).style(headings);

    ws.cell(5, 1).string('Crteated By').style(headings);
    ws.cell(5, 2).string(createdbyvalue.label).style(headings);

    ws.cell(5, 4).string('Approved By').style(headings);
    ws.cell(5, 5).string(approvedbyvalue.label).style(headings);

    let headingColumnIndex = 1;
    columns.forEach(heading => {
      ws.column(headingColumnIndex).setWidth(30);
      ws.cell(8, headingColumnIndex++).string(heading).style(headings);
    });

    var heading1 = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });

    var headingLeft = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'left',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });
    var headingRight = wb.createStyle({
      font: {
        bold: false,
        size: 12,
        vertAlign: 'center',
      },
      alignment: {
        horizontal: 'right',
        vertical: 'center',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    });

    let rowIndex = 9;
    misreport1.forEach(record => {
      let columnIndex = 1;
      Object.keys(record).forEach(columnName => {
        console.log(columnName);
        ws.column(columnIndex).setWidth(30);

        columnIndex === 5 ||
        columnIndex === 6 ||
        columnIndex === 7 ||
        columnIndex === 8
          ? ws.cell(rowIndex, columnIndex).style(headingRight)
          : ws.cell(rowIndex, columnIndex).style(headingLeft);

        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        // console.log(record[columnName],"")
      });
      rowIndex++;
    });

    wb.writeToBuffer().then(function (buffer) {
      //console.log(buffer)
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
      //console.log(datas)

      FileSaver.saveAs(data, 'Monthwiseorderstatus' + '.xlsx');
    });
  };

  // const column = useMemo(
  //     () => [
  //       {
  //         Header: "PO NO",
  //         accessor:(row=>(<div className='text-start'>{row.Order_No}</div>)),
  //         filterable: false,

  //       },
  //       {
  //         Header: "PO Date",
  //         accessor:(row=>(<div className='text-start'>{row.Order_Date}</div>)),
  //         filterable: false,

  //       },
  //       {
  //         Header: "Contract No",
  //         accessor: (row=>(<div className='text-end'>{row.contractdtlno}</div>)),
  //         filterable: false,

  //       },
  //       {
  //         Header: "PO Value",
  //         accessor: (row=>(<div className='text-start'>{row.NET_AMOUNT}</div>)),
  //         filterable: false,

  //       },
  //       {
  //         Header: "PO Status",
  //         accessor: (row=>(<div className='text-end'>{row.Status}</div>)),
  //         filterable: false,
  //       },
  //       {
  //         Header: "Created By",
  //         accessor: (row)=>(
  //             (<div className='text-end'>{row.User_Name}</div>)),
  //         filterable: false,

  //       },

  //     ]
  // )
  // const data=tabledatas

  return (
    <React.Fragment>
      <div>
        {' '}
        <Container fluid={true}>
          <h6 className="monthwisetitle">Month Wise Order Status</h6>

          <Card style={{ backgroundColor: 'white' }}>
            {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                                            Month Wise Order Status
                                </CardTitle> */}
            <CardBody>
              {localStorage.getItem('AdminUser') == 'N' &&
                localStorage.getItem('Approval3') == 'N' &&
                localStorage.getItem('Approval2') == 'N' && (
                  <>
                    <Row className="d-flex justify-content-center">
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ width: '200px', marginTop: '2px' }}>
                          <Label>
                            <b>From Date</b>
                          </Label>

                          <Input
                            type="date"
                            value={fromdate}
                            id="fromdate"
                            onChange={e => Getfromdateset(e.target.value)}
                            min={'1900-01-01'}
                            maxLength="4"
                            max={'9999-12-31'}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ width: '200px', marginTop: '2px' }}>
                          <Label>
                            <b>To Date</b>
                          </Label>
                          <Input
                            type="date"
                            value={todate}
                            id="todate"
                            onChange={e => Gettodateset(e.target.value)}
                            min={'1900-01-01'}
                            maxLength="4"
                            max={'9999-12-31'}
                          />
                        </div>
                      </Col>

                      <Col sm={12} lg={2} md={6} style={{ marginTop: '25px' }}>
                        <p>
                          <span className="text-primary">Total PO :</span>
                          <div>{toatalpocount}</div>
                        </p>
                      </Col>

                      <Col sm={12} lg={2} md={6} style={{ marginTop: '25px' }}>
                        <p>
                          <span className="text-primary">Total PO Value :</span>
                          <div>{numeral(totalpovalue).format('0,0.00')}</div>
                        </p>
                      </Col>
                      <Col sm={12} lg={2} md={6} style={{ marginTop: '33px' }}>
                        <Button1
                          color="primary"
                          className="adbtn2 "
                          onClick={tabledatanew1}
                        >
                          View
                        </Button1>

                        {tabledatas != '' ? (
                          // <div >
                          <Button1
                            style={{ marginLeft: '8px' }}
                            color="primary"
                            className="adbtn2 "
                            onClick={() => {
                              if (
                                localStorage.getItem('AdminUser') == 'N' &&
                                localStorage.getItem('Approval3') == 'N' &&
                                localStorage.getItem('Approval2') == 'N'
                              ) {
                                ExportToexcel();
                              } else if (
                                localStorage.getItem('AdminUser') == 'Y' &&
                                localStorage.getItem('Approval3') == 'N' &&
                                localStorage.getItem('Approval2') == 'Y'
                              ) {
                                ExportToexcel1();
                              } else {
                                ExportToexcel2();
                              }
                            }}
                          >
                            Export
                          </Button1>
                        ) : // </div>
                        null}
                      </Col>
                    </Row>
                    {/* <Row style={{marginTop:'10px'}}> */}

                    {/* </Row> */}
                  </>
                )}
              {localStorage.getItem('AdminUser') == 'N' &&
                localStorage.getItem('Approval3') == 'N' &&
                localStorage.getItem('Approval2') == 'Y' && (
                  <>
                    <Row className="d-flex justify-content-center">
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ width: '200px', marginTop: '2px' }}>
                          <Label for="fromdate">
                            <b>From Date</b>
                          </Label>

                          <Input
                            type="date"
                            value={fromdate}
                            id="fromdate"
                            onChange={e => setfromdate(e.target.value)}
                            min={'1900-01-01'}
                            maxLength="4"
                            max={'9999-12-31'}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ width: '200px', marginTop: '2px' }}>
                          <Label>
                            <b>To Date</b>
                          </Label>
                          <Input
                            type="date"
                            value={todate}
                            id="todate"
                            onChange={e => settodate(e.target.value)}
                            min={'1900-01-01'}
                            maxLength="4"
                            max={'9999-12-31'}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div
                          className="DefectType"
                          style={{ width: '200px', marginTop: '2px' }}
                        >
                          <Label style={{ marginLeft: '5px' }}>
                            <b>Created By</b>
                          </Label>
                          <Select
                            value={createdbyvalue}
                            name="created by"
                            options={createdbyhelps}
                            onChange={value => {
                              setcreatedbyvalue(value);
                              console.log(value, 'values');
                            }}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <Button1
                          style={{ marginTop: '32px' }}
                          color="primary"
                          className="adbtn2 "
                          onClick={tabledatanew1}
                        >
                          View
                        </Button1>

                        {tabledatas != '' ? (
                          // <div >
                          <Button1
                            style={{ marginLeft: '8px', marginTop: '32px' }}
                            color="primary"
                            className="adbtn2 "
                            onClick={() => {
                              if (
                                localStorage.getItem('AdminUser') == 'N' &&
                                localStorage.getItem('Approval3') == 'N' &&
                                localStorage.getItem('Approval2') == 'N'
                              ) {
                                ExportToexcel();
                              } else if (
                                localStorage.getItem('AdminUser') == 'Y' &&
                                localStorage.getItem('Approval3') == 'N' &&
                                localStorage.getItem('Approval2') == 'Y'
                              ) {
                                ExportToexcel1();
                              } else {
                                ExportToexcel2();
                              }
                            }}
                          >
                            Export
                          </Button1>
                        ) : // </div>
                        null}
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ marginLeft: '8px' }}>
                          <p>
                            <span className="text-primary">Total PO :</span>
                            <div>{toatalpocount}</div>
                          </p>
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div>
                          <p>
                            <span className="text-primary">
                              Total PO Value :
                            </span>
                            <div>{numeral(totalpovalue).format('0,0.00')}</div>
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              {localStorage.getItem('AdminUser') == 'Y' &&
                localStorage.getItem('Approval3') == 'N' &&
                localStorage.getItem('Approval2') == 'N' && (
                  <>
                    <Row className="d-flex justify-content-center">
                      <Col sm={12} lg={3} md={6}>
                        {localStorage.getItem('customer_HO') === 'N' ? (
                          <div
                            className="DefectType"
                            style={{ width: '200px', marginTop: '2px' }}
                          >
                            <Label style={{ marginLeft: '5px' }}>
                              <b>Branch</b>
                            </Label>
                            <Select
                              value={branchvalue}
                              name="Branch Help"
                              options={branchhelp}
                              onChange={value => {
                                setbranchvalue(value);
                                console.log(value, 'values');
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            className="DefectType"
                            style={{ width: '200px', marginTop: '2px' }}
                          >
                            <Label style={{ marginLeft: '5px' }}>
                              <b>Customer</b>
                            </Label>
                            <Select
                              value={customervalue}
                              name="Branch Help"
                              options={customerhelp}
                              onChange={value => {
                                setcustomervalue(value);
                                console.log(value, 'values');
                              }}
                            />
                          </div>
                        )}
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ width: '200px', marginTop: '2px' }}>
                          <Label>
                            <b>From Date</b>
                          </Label>

                          <Input
                            type="date"
                            value={fromdate}
                            id="fromdate"
                            onChange={e => setfromdate(e.target.value)}
                            min={'1900-01-01'}
                            maxLength="4"
                            max={'9999-12-31'}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ width: '200px', marginTop: '2px' }}>
                          <Label>
                            <b>To Date</b>
                          </Label>
                          <Input
                            type="date"
                            value={todate}
                            id="todate"
                            onChange={e => settodate(e.target.value)}
                            min={'1900-01-01'}
                            maxLength="4"
                            max={'9999-12-31'}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div
                          className="DefectType"
                          style={{ width: '200px', marginTop: '2px' }}
                        >
                          <Label style={{ marginLeft: '5px' }}>
                            <b>Created By</b>
                          </Label>
                          <Select
                            value={createdbyvalue}
                            name="created by"
                            options={createdbyhelps}
                            onChange={value => {
                              setcreatedbyvalue(value);
                              console.log(value, 'values');
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                      <Col sm={12} lg={3} md={6}>
                        <div
                          className="DefectType"
                          style={{ width: '200px', marginTop: '2px' }}
                        >
                          <Label style={{ marginLeft: '5px' }}>
                            <b>Approved By</b>
                          </Label>
                          <Select
                            value={approvedbyvalue}
                            name="Approved By"
                            options={approvedbyhelp}
                            onChange={value => {
                              setapprovedbyvalue(value);
                              console.log(value, 'values');
                            }}
                          />
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ marginTop: '30px' }}>
                          <p>
                            <span className="text-primary">Total PO :</span>
                            <div>{toatalpocount}</div>
                          </p>
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ marginTop: '30px' }}>
                          <p>
                            <span className="text-primary">
                              Total PO Value :
                            </span>
                            <div>{numeral(totalpovalue).format('0,0.00')}</div>
                          </p>
                        </div>
                      </Col>
                      <Col sm={12} lg={3} md={6}>
                        <div style={{ marginLeft: '10px', marginTop: '30px' }}>
                          <Button1
                            color="primary"
                            className="adbtn2 "
                            onClick={tabledatanew1}
                          >
                            View
                          </Button1>

                          {tabledatas != '' ? (
                            // <div >
                            <Button1
                              style={{ marginLeft: '8px' }}
                              color="primary"
                              className="adbtn2 "
                              onClick={() => {
                                if (
                                  localStorage.getItem('AdminUser') == 'N' &&
                                  localStorage.getItem('Approval3') == 'N' &&
                                  localStorage.getItem('Approval2') == 'N'
                                ) {
                                  ExportToexcel();
                                } else if (
                                  localStorage.getItem('AdminUser') == 'Y' &&
                                  localStorage.getItem('Approval3') == 'N' &&
                                  localStorage.getItem('Approval2') == 'Y'
                                ) {
                                  ExportToexcel1();
                                } else {
                                  ExportToexcel2();
                                }
                              }}
                            >
                              Export
                            </Button1>
                          ) : // </div>
                          null}
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              <TableContainer style={{ marginTop: '20px' }}>
                <Table className="InspectionTbl">
                  <TableHead>
                    <TableRow>
                      <TableCell>PO NO</TableCell>
                      <TableCell>PO Date</TableCell>
                      <TableCell>Contract No</TableCell>
                      <TableCell>PO Value</TableCell>
                      <TableCell>PO Status</TableCell>
                      {localStorage.getItem('AdminUser') == 'Y' &&
                        localStorage.getItem('Approval3') == 'N' &&
                        localStorage.getItem('Approval2') == 'N' && (
                          <>
                            <TableCell>
                              {' '}
                              {localStorage.getItem('customer_HO') == 'Y'
                                ? 'Customer Name'
                                : 'Branch Name'}
                            </TableCell>

                            <TableCell>Stage 1 Approved By</TableCell>
                            <TableCell>Approved By</TableCell>
                          </>
                        )}
                      {localStorage.getItem('AdminUser') == 'Y' ||
                      localStorage.getItem('Approval2') == 'Y' ? (
                        <TableCell>Created By</TableCell>
                      ) : null}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tabledatas.length != 0 ? (
                      changepage().map(data => (
                        // {tabledatas.map((data,index)=>(
                        <TableRow>
                          <TableCell>
                            <a
                              style={{ color: 'red', cursor: 'pointer' }}
                              onClick={() => {
                                status(data);
                              }}
                            >
                              {data.Order_No}
                            </a>
                          </TableCell>
                          <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                              PO Raised Detail
                            </ModalHeader>
                            <ModalBody>
                              <Table className="InspectionTbl">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>DATE</TableCell>
                                    <TableCell>TIME</TableCell>
                                    <TableCell>STATUS</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {popupstatus.map((data, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        {moment(data.CreatedDate).format(
                                          'DD-MM-YYYY',
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {moment(data.CreatedDate)
                                          .utcOffset(0)
                                          .format('hh:mm:A')}
                                      </TableCell>
                                      {data.PoStatus == 'Stage 1 Pending' ? (
                                        <TableCell>
                                          <span style={{ color: 'red' }}>
                                            {data.PoStatus}
                                          </span>
                                        </TableCell>
                                      ) : (
                                        <TableCell>
                                          <span style={{ color: 'green' }}>
                                            {data.PoStatus}
                                          </span>
                                        </TableCell>
                                      )}
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </ModalBody>
                            <ModalFooter>
                              {/* <Button color="primary" onClick={toggle}>
                                                                Do Something
                                                            </Button>{' '} */}
                              {/* <Button color="secondary" onClick={toggle}>
                                                                Cancel
                                                            </Button> */}
                            </ModalFooter>
                          </Modal>

                          <TableCell>{data.Order_Date}</TableCell>
                          <TableCell>
                            {localStorage.getItem('Contract_Detail_No')}
                          </TableCell>
                          <TableCell>
                            {data.NET_AMOUNT - data.Discount_Amount}
                          </TableCell>
                          {data.Status === 'Bill Raised' ? (
                            <TableCell
                              color="red"
                              style={{ color: '#FFC100' }}
                              align="center"
                            >
                              <Badge
                                pill
                                style={{
                                  fontSize: '13px',
                                  backgroundColor: '#FC5C7D',
                                }}
                              >
                                {data.Status}
                              </Badge>
                            </TableCell>
                          ) : data.Status == 'Stage 1 completed' ? (
                            <TableCell
                              color="#008001"
                              style={{ color: '#41ef35' }}
                              align="center"
                            >
                              <Badge
                                pill
                                style={{
                                  fontSize: '13px',
                                  backgroundColor: '#008001',
                                }}
                              >
                                {data.Status}
                              </Badge>
                            </TableCell>
                          ) : data.Status === 'Accepted' ? (
                            <TableCell
                              color="red"
                              style={{ color: '#41ef35' }}
                              align="center"
                            >
                              <Badge
                                pill
                                style={{
                                  fontSize: '13px',
                                  backgroundColor: '#41ef35',
                                }}
                              >
                                {data.Status}
                              </Badge>
                            </TableCell>
                          ) : data.Status === 'Sales order Raised' ? (
                            <TableCell
                              color="red"
                              style={{ color: '#37cbef' }}
                              align="center"
                            >
                              <Badge
                                pill
                                style={{
                                  fontSize: '13px',
                                  backgroundColor: '#37cbef',
                                }}
                              >
                                {data.Status}
                              </Badge>
                            </TableCell>
                          ) : data.Status === 'Stage 1 pending' ? (
                            <TableCell
                              color="red"
                              style={{ color: 'red' }}
                              align="center"
                            >
                              <Badge
                                style={{
                                  fontSize: '13px',
                                  backgroundColor: '#CB1033',
                                }}
                                pill
                              >
                                {data.Status}
                              </Badge>{' '}
                            </TableCell>
                          ) : data.Status === '' ? (
                            <TableCell
                              color="red"
                              style={{ color: 'red' }}
                              align="center"
                            >
                              {data.Status === '' ? (
                                <Badge
                                  pill
                                  style={{
                                    fontSize: '13px',
                                    backgroundColor: '#CB1033',
                                  }}
                                >
                                  Stage 1 pending
                                </Badge>
                              ) : (
                                ''
                              )}
                            </TableCell>
                          ) : data.Status === 'Approved' ? (
                            <TableCell
                              color="red"
                              style={{ color: '#008001' }}
                              align="center"
                            >
                              <Badge
                                style={{
                                  fontSize: '13px',
                                  backgroundColor: '#008001',
                                }}
                                pill
                              >
                                {data.Status}
                              </Badge>
                            </TableCell>
                          ) : data.Status === 'DC Raised' ? (
                            <TableCell
                              color="#F7F700"
                              style={{ color: '#F7F700' }}
                              align="center"
                            >
                              <Badge
                                color="#d30c8b"
                                pill
                                style={{
                                  color: '#F50000',
                                  fontSize: '12px',
                                  backgroundColor: '#F7F700',
                                }}
                              >
                                {data.Status}
                              </Badge>
                            </TableCell>
                          ) : (
                            <TableCell align="center"></TableCell>
                          )}
                          {localStorage.getItem('AdminUser') == 'Y' &&
                            localStorage.getItem('Approval3') == 'N' &&
                            localStorage.getItem('Approval2') == 'N' && (
                              <TableCell>
                                {localStorage.getItem('customer_HO') === 'Y'
                                  ? data.Customer_Name
                                  : data.Branch_Name}
                              </TableCell>
                            )}
                          {localStorage.getItem('AdminUser') == 'Y' &&
                            localStorage.getItem('Approval3') == 'N' &&
                            localStorage.getItem('Approval2') == 'N' && (
                              <>
                                <TableCell>
                                  {data.Stage1CompletedPerson}
                                </TableCell>
                                <TableCell>
                                  {data.Status === 'Stage 1 completed'
                                    ? data.Stage1CompletedPerson ===
                                      '                       '
                                      ? '-'
                                      : data.Stage1CompletedPerson
                                    : data.ApprovedPerson ===
                                      '                       '
                                    ? '-'
                                    : data.ApprovedPerson}
                                </TableCell>
                              </>
                            )}
                          {localStorage.getItem('AdminUser') == 'Y' ||
                          localStorage.getItem('Approval2') == 'Y' ? (
                            <TableCell>{data.User_Name}</TableCell>
                          ) : null}
                        </TableRow>
                        // ))}
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
                count={tabledatas.length}
                rowsPerPage={rowsperpage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default misreport1;

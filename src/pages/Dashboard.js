import axios from '../axios';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { makeStyles } from '@material-ui/core/styles';
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
  Grid,
} from '@material-ui/core';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//import './dashboard.css'
import './dashboard.css';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
// import Stack from '@mui/material/Stack';
import Col from 'reactstrap/lib/Col';
import SweetAlert from 'react-bootstrap-sweetalert';
import AppWidgetSummary from './AppWidgetSummary';
import { Grow, Slide } from '@mui/material';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
    },
  },
});
function Dashboard() {
  const [dashboarddata, setdashboarddata] = useState([]);
  const [pendingcount, setpendingcount] = useState('');
  const [usertype, setusertype] = useState('');
  const classes = useStyles();
  const [Norecordfd, setNorecordfd] = useState(false);

  const Getdashboarddata = () => {
    document.getElementById('card213').className = 'card133bd';

    const token = localStorage.getItem('AuthToken');
    const customerid = localStorage.getItem('Customer_Log');
    ////console.log(customerid)
    const getdash = axios.instance
      .get(`/Cus/${customerid}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        for (const data of res.data) {
          localStorage.setItem('Companyid', data.Company_Id);

          localStorage.setItem('combranch', data.combranch);
          localStorage.setItem('StateId', data.StateId);
          localStorage.setItem('Statename', data.State);
          localStorage.setItem('StateCode', data.StateCode);
          localStorage.setItem('COMPANY_STATECODE', data.COMPANY_STATECODE);
          localStorage.setItem('IGSTApplicable', data.IGSTApplicable);
          localStorage.setItem('RegisterType', data.RegisterType);

          //console.log('test', data.StateCode)
        }
      });
  };

  const getDashboardvalues = async () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const Dash = axios.instance.get(`/Pending/${Customerid}/${Branchid}`, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    //console.log(Dash.data.length)
    setdashboarddata(Dash.data);
    console.log(Dash.data, 'getDashboardvalues');
    //setpendingcount(Dash.data.length)
  };

  const Getdatafordashboard = () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser = localStorage.getItem('AdminUser');
    //  console.log('CUS',Customerid)
    // console.log('brn',Branchid)
    setusertype(AdminUser);
    if (AdminUser === 'Y') {
      const Dash = axios.instance
        .get(
          `/PoDashview/${Customerid}/Y/${Branchid}/N/${localStorage.getItem(
            'Userid',
          )}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setdashboarddata(res.data);
          console.log(res.data, 'setdashboarddata');
          setpendingcount(res.data.length);
        });
      // console.log(Dash.data)
      // console.log('gg',AdminUser)
      // console.log('cus',Customerid)
      //setpendingcount(Dash.data.length)
    } else {
      const Dash = axios.instance
        .get(
          `/PoDashview/${Customerid}/${AdminUser}/${Branchid}/${paymenttype}/${localStorage.getItem(
            'Userid',
          )}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setdashboarddata(res.data);

          console.log(res.data, 'setdashboarddata');
          ///setpendingcount(Dash.data.length)
          setpendingcount(res.data.length);
        });
    }
  };
  const Getdatafordashboard1 = () => {
    setcard1(true);
    setcard2(false);
    setcard3(false);
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser = localStorage.getItem('AdminUser');
    /// console.log('CUS',Customerid)
    //  console.log('brn',Branchid)
    setusertype(AdminUser);
    if (AdminUser === 'Y') {
      const Dash = axios.instance
        .get(
          `/PoDashview/${Customerid}/Y/${Branchid}/N/${localStorage.getItem(
            'Userid',
          )}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setdashboarddata(res.data);
          console.log(res.data, 'setdashboarddata');
          setpendingcount(res.data.length);
        });
      // console.log(Dash.data)
      //  console.log('gg',AdminUser)
      //  console.log('cus',Customerid)
      //setpendingcount(Dash.data.length)
    } else {
      const Dash = axios.instance
        .get(
          `/PoDashview/${Customerid}/${AdminUser}/${Branchid}/${paymenttype}/${localStorage.getItem(
            'Userid',
          )}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setdashboarddata(res.data);
          console.log(res.data, 'setdashboarddata');
          //console.log(Dash.data)
          ///setpendingcount(Dash.data.length)
          setpendingcount(res.data.length);
        });
    }
  };

  const Getdatafordashboard3 = () => {
    setcard1(false);
    setcard2(true);
    setcard3(false);
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser = localStorage.getItem('AdminUser');
    /// console.log('CUS',Customerid)
    //  console.log('brn',Branchid)
    setusertype(AdminUser);
    if (AdminUser === 'Y') {
      const Dash = axios.instance
        .get(
          `/PoDashview/${Customerid}/Y/${Branchid}/Y/${localStorage.getItem(
            'Userid',
          )}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setdashboarddata(res.data);
          console.log(res.data, 'setdashboarddata');
          setpendingcount(res.data.length);
        });
      // console.log(Dash.data)
      //  console.log('gg',AdminUser)
      //  console.log('cus',Customerid)
      //setpendingcount(Dash.data.length)
    } else {
      const Dash = axios.instance
        .get(
          `/PoDashview/${Customerid}/${AdminUser}/${Branchid}/Y/${localStorage.getItem(
            'Userid',
          )}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setdashboarddata(res.data);
          console.log(res.data, 'setdashboarddata');
          //console.log(Dash.data)
          ///setpendingcount(Dash.data.length)
          setpendingcount(res.data.length);
        });
    }
  };
  const [username, setusername] = useState('');
  const [paymenttype, setpaymenttype] = useState('N');
  const [state, setstate] = useState('');
  const pages = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100];
  const [page, setpage] = useState(0);
  const [rowsperpage, setrowsperpage] = useState(pages[page]);
  const [completecouts, setcompletecouts] = useState('');
  const [statuscounsts, setstatuscounsts] = useState('');
  const [card1, setcard1] = useState(false);
  const [card2, setcard2] = useState(false);
  const [card3, setcard3] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [Todate, setTodate] = useState(new Date());

  const [poraised, setporaised] = useState(0);
  const [popending, setpopending] = useState(0);
  const [poapproved, setpoapproved] = useState(0);

  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    GetnoadminData1();
    GetnoadminData();
    GetnoadminData2();
    Getdashboarddata();
    const getusername = () => {
      const user = localStorage.getItem('Username');
      const Admiuseruser = localStorage.getItem('AdminUser');
      const reequser = localStorage.getItem('approvereq');
      // if(Admiuseruser === 'Y') {
      //   navigation.navigate('Approval')
      // }
      // else{
      //   navigation.navigate('purchase')
      // }
      setusername(user);
    };

    getusername();

    //if(localStorage.getItem('Approval2') === 'N' && localStorage.getItem('Approval3') ==='N' && localStorage.getItem('AdminUser') === 'N')  {
    if (localStorage.getItem('Approval2') === 'Y') {
      GetnoadminData1();
    }
    if (localStorage.getItem('Approval3') === 'Y') {
      GetnoadminData2();
    }

    if (localStorage.getItem('AdminUser') === 'Y') {
      GetnoadminData();
      GetnoadminData1();
      GetnoadminData2();
    }

    //   }else {
    // // complteapproves()
    // //   Getdatafordashboard()
    // //  getdsh()
    // //   purchasepo()

    //   }

    Getbalancen();
    PoCount();
  }, []);

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return dashboarddata.slice(page * rowsperpage, (page + 1) * rowsperpage);
  };

  const complteapproves = async () => {
    // //console.log('called')
    var date = new Date();
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log(firstday);
    const tokent = localStorage.getItem('authtoken');
    const type = localStorage.getItem('AdminUser');
    const branch = localStorage.getItem('Branch_Log');
    const cuslog = localStorage.getItem('Customer_Log');
    //console.log('ee',cuslog)
    // console.log('rr',branch)
    const aprovvas = await axios.instance
      .get(
        `/completeapprovals/${cuslog}/${branch}/${moment(firstday).format(
          'YYYYMMDD',
        )}/${moment(new Date()).format('YYYYMMDD')}/${localStorage.getItem(
          'Userid',
        )}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setdashboarddata(res.data);
        console.log(res.data, 'setdashboarddata');

        // console.log('complet',res.data)
      });
  };

  const getdsh = async () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser = localStorage.getItem('AdminUser');

    const Dash = await axios.instance
      .get(
        `/PoDashview/${Customerid}/${AdminUser}/${Branchid}/Y/${localStorage.getItem(
          'Userid',
        )}`,
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        // setdashboarddata(res.data)
        setcompletecouts(res.data.length);
      });

    //setpendingcount(Dash.data.length)
  };

  const Getbalancen = async () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser = localStorage.getItem('AdminUser');

    const Dash = await axios.instance
      .get(`/contractChkbal/${localStorage.getItem('contract_ID')}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        for (const Data2 of res.data) {
          localStorage.setItem('Contract_Value', Data2.Contract_Value);
          localStorage.setItem('PO_Value', Data2.PO_Value);
          localStorage.setItem('balance', Data2.balance);
        }
      });

    //setpendingcount(Dash.data.length)
  };

  const GetnoadminData = async () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser =
      localStorage.getItem('AdminUser') === 'N' &&
      localStorage.getItem('Approval3') === 'N'
        ? 'N'
        : 'Y';
    // const AdminUser  =  localStorage.getItem('AdminUser')

    const Dash = await axios.instance
      .get(
        `/PoDashviewUser/${1}/${Customerid}/${Branchid}/${localStorage.getItem(
          'Userid',
        )}/${AdminUser}/${localStorage.getItem('Approval2')}`,
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        setdashboarddata(res.data);
        setpopending(res.data.length, 'popending');
        //setpendingcount(res.data.length)
        console.log(res.data, 'level1');
      });
    setcard1(true);
    setcard2(false);
    setcard3(false);
    setpage(0);
  };

  const GetnoadminData1 = async () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser =
      localStorage.getItem('AdminUser') === 'N' &&
      localStorage.getItem('Approval3') === 'N'
        ? 'N'
        : 'Y';
    // const AdminUser  =  localStorage.getItem('AdminUser')

    const Dash = await axios.instance
      .get(
        `/PoDashviewUser/${2}/${Customerid}/${Branchid}/${localStorage.getItem(
          'Userid',
        )}/${AdminUser}/${localStorage.getItem('Approval2')}`,
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        setdashboarddata(res.data);
        setpoapproved(res.data.length, 'poapproved');
        //setstatuscounsts(res.data.length)
        console.log(res.data, 'level2');
      });
    setcard1(false);
    setcard2(true);
    setcard3(false);
    setpage(0);
  };

  const GetnoadminData2 = async () => {
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser =
      localStorage.getItem('AdminUser') === 'N' &&
      localStorage.getItem('Approval3') === 'N'
        ? 'N'
        : 'Y';
    // const AdminUser  =  localStorage.getItem('AdminUser')

    const Dash = await axios.instance
      .get(
        `/PoDashviewUser/${4}/${Customerid}/${localStorage.getItem(
          'Branch_Log',
        )}/${localStorage.getItem(
          'Userid',
        )}/${AdminUser}/${localStorage.getItem('Approval2')}`,
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        setdashboarddata(res.data);
        setporaised(res.data.length, 'poraised');
        console.log(res.data.length, 'poraised');
        //  setcompletecouts(res.data.length)
        console.log(res.data, 'level3');
      });
    setcard1(false);
    setcard2(false);
    setcard3(true);
    setpage(0);
  };

  const getdsh1 = async () => {
    // document.getElementById("card212").className = "card133bd"
    // console.log()
    const Customerid = localStorage.getItem('Customer_Log');
    const Branchid = localStorage.getItem('Branch_Log');
    const token = localStorage.getItem('AuthToken');
    const AdminUser = localStorage.getItem('AdminUser');

    const Dash = await axios.instance
      .get(
        `/PoDashview/${Customerid}/${AdminUser}/${Branchid}/Y/${localStorage.getItem(
          'Userid',
        )}`,
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      )
      .then(res => {
        setdashboarddata(res.data);
        console.log(res.data, 'setdashboarddata');
        //  setcompletecouts(res.data.length)
      });
    setcard1(false);
    setcard2(false);
    setcard3(true);
    //setpendingcount(Dash.data.length)
  };
  const purchasepo = async () => {
    const tokent = localStorage.getItem('authtoken');
    const branchid = localStorage.getItem('Branch_Log');
    const custoemrid = localStorage.getItem('Customer_Log');
    const AdminUser = localStorage.getItem('AdminUser');
    ////console.log(branchid,custoemrid,Usertype)
    const purchases = await axios.instance
      .get(
        `/PoDashview/${custoemrid}/${AdminUser}/${branchid}/Y/${localStorage.getItem(
          'Userid',
        )}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        //setpurchase(purchases.data)
        setstatuscounsts(res.data.length);
      });
  };
  const PoCount = async () => {
    const tokent = localStorage.getItem('authtoken');
    const custoemrid = localStorage.getItem('Customer_Log');
    const branchid = localStorage.getItem('Branch_Log');
    const purchases = await axios.instance
      .get(`/PoCount/${1}/${custoemrid}/${branchid}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'coutns');
        for (const Data of res.data) {
          setcompletecouts(Data.PoStatus);
        }
      })
      .then(async res => {
        const custoemrid = localStorage.getItem('Customer_Log');
        const purchases = await axios.instance
          .get(`/PoCount/${2}/${custoemrid}/${branchid}`, {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            for (const Data of res.data) {
              setpendingcount(Data.Pending);
            }
          });
      })
      .then(async res => {
        const custoemrid = localStorage.getItem('Customer_Log');
        const purchases = await axios.instance
          .get(`/PoCount/${3}/${custoemrid}/${branchid}`, {
            headers: {
              Authorization: tokent,
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            for (const Data of res.data) {
              setstatuscounsts(Data.Approved);
            }
          });
      });
  };
  const handleMouseEnter = () => {
    setShowFullText(true);
  };

  const handleMouseLeave = () => {
    setShowFullText(false);
  };

  return (
    <div>
      <div>
        <div>
          <Container fluid={true}>
            <h6 className="titleviewinspection">Dashboard</h6>
            <Card>
              <CardBody>

                <Grow in={true} timeout={1000}>      
                {/* <Slide direction="down" in={true} mountOnEnter unmountOnExit>            */}
                  <div className="threecard" id="threecard">
                    <Row>
                      {card3 ? (
                        <Col lg={23} md={26} sm={26} xs={12}>
                          <Card
                            style={{ border: 'none' }}
                            className="card1"
                            onClick={GetnoadminData2}
                          >
                            <CardBody className="card133bd" id="card211">
                              <PendingActionsIcon
                                size="large"
                                style={{ fontSize: '60px' }}
                              />
                              <p>PO Status</p>{' '}
                              <b style={{ fontSize: '1.4rem' }}>{poraised}</b>
                              <ArrowDropDownIcon fontSize="5px" />
                            </CardBody>
                          </Card>
                        </Col>
                      ) : (
                        <Col lg={23} md={26} sm={26} xs={12}>
                          <Card
                            style={{ border: 'none' }}
                            className="card1"
                            id="card211"
                            onClick={GetnoadminData2}
                          >
                            <CardBody
                              className="card12bd"
                              style={{ borderRadius: '20px' }}
                            >
                              <PendingActionsIcon
                                size="large"
                                style={{ fontSize: '60px' }}
                              />
                              <p>PO Status</p>{' '}
                              <b style={{ fontSize: '2rem' }}>{poraised}</b>
                            </CardBody>
                          </Card>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      {card1 ? (
                        <Col lg={23} md={26} sm={26} xs={12}>
                          <Card
                            style={{
                              border: 'none',
                              backgroundColor: 'white',
                              boxShadow: 'none',
                            }}
                            className="cardyellow"
                            onClick={GetnoadminData}
                          >
                            <CardBody className="card133bd" id="card213">
                              <EmojiObjectsIcon
                                size="large"
                                style={{ fontSize: '60px' }}
                              />
                              <p>Pending</p>{' '}
                              <b style={{ fontSize: '1.4rem' }}>{popending}</b>
                              <ArrowDropDownIcon fontSize="5px" />
                            </CardBody>
                          </Card>
                        </Col>
                      ) : (
                        <Col lg={23} md={26} sm={26} xs={12}>
                          <Card
                            style={{ border: 'none', backgroundColor: 'white' }}
                            className="card1"
                            id="card213"
                            onClick={GetnoadminData}
                          >
                            <CardBody
                              className="card1bd"
                              style={{ borderRadius: '20px' }}
                            >
                              <EmojiObjectsIcon
                                size="large"
                                style={{ fontSize: '60px' }}
                              />
                              <p>Pending </p>{' '}
                              <b style={{ fontSize: '2rem' }}>{popending}</b>
                            </CardBody>
                          </Card>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      {card2 ? (
                        <Col lg={23} md={26} sm={26} xs={12}>
                          <Card
                            style={{ border: 'none', backgroundColor: 'white' }}
                            className="card1"
                            onClick={GetnoadminData1}
                          >
                            <CardBody className="card133bd" id="card212">
                              <DomainVerificationIcon
                                size="large"
                                style={{ fontSize: '60px' }}
                              />
                              <p>Approved</p>{' '}
                              <b style={{ fontSize: '1.4rem' }}>{poapproved}</b>
                              <ArrowDropDownIcon fontSize="5px" />
                            </CardBody>
                          </Card>
                        </Col>
                      ) : (
                        <Col lg={23} md={26} sm={26} xs={12}>
                          <Card
                            style={{ border: 'none', backgroundColor: 'white' }}
                            className="card1"
                            onClick={GetnoadminData1}
                          >
                            <CardBody
                              className="card13bd"
                              style={{ borderRadius: '20px' }}
                              id="card212"
                            >
                              <DomainVerificationIcon
                                size="large"
                                style={{ fontSize: '60px' }}
                              />
                              <p>Approved</p>{' '}
                              <b style={{ fontSize: '2rem' }}>{poapproved}</b>
                            </CardBody>
                          </Card>
                        </Col>
                      )}
                    </Row>
                  </div>
                  {/* </Slide> */}
                </Grow>

                <div className="Tabelinspections">
                  <TableContainer
                    style={{
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                      boxShadow:
                        'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                    }}
                  >
                    <Table className="InspectionTbls1">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">PO No</TableCell>
                          <TableCell align="center">PO Date</TableCell>
                          <TableCell align="center">Contract No</TableCell>
                          {localStorage.getItem('customer_HO') === 'Y' ? (
                            <TableCell align="center">Customer Name</TableCell>
                          ) : (
                            <TableCell align="center">Branch</TableCell>
                          )}
                          <TableCell align="center">Department</TableCell>
                          <TableCell align="center">Designation</TableCell>
                          <TableCell align="right">
                            <b>₹</b> Amount
                          </TableCell>
                          <TableCell align="center">Status </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dashboarddata.length != 0 ? (
                          changepage().map((data, index) => (
                            <TableRow
                              sx={{
                                backgroundColor: 'yellow',
                                borderBottom: '2px solid black',
                                '& th': {
                                  fontSize: '1.25rem',
                                  color: 'rgba(96, 96, 96)',
                                },
                              }}
                            >
                              <TableCell align="center">
                                {data.Order_No}
                              </TableCell>
                              <TableCell align="center">
                                {data.Order_Date}
                              </TableCell>
                              <TableCell align="center">
                                {localStorage.getItem('Contract_Detail_No')}
                              </TableCell>

                              <TableCell align="center">
                                {localStorage.getItem('customer_HO') === 'Y'
                                  ? data.CustomerName
                                  : data.Branch_Name === null
                                  ? data.CustomerName
                                  : data.Branch_Name}
                              </TableCell>
                              <TableCell align="center">
                                {data.Department}
                              </TableCell>
                              <TableCell align="center">
                                {data.Designation}
                              </TableCell>
                              <TableCell align="right">
                                {numeral(
                                  data.NET_AMOUNT - data.Discount_Amount,
                                ).format('0,0.00')}
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
                            </TableRow>
                          ))
                        ) : (
                          <>
                            {/* <TableCell style={{marginLeft:}}>NO Data Found</TableCell> */}
                            {Norecordfd ? (
                              <SweetAlert
                                title=" No Data Found"
                                timeout={2000}
                                style={{
                                  position: 'absolute',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                showCloseButton={false}
                                showConfirm={false}
                                warning
                                onConfirm={() => {
                                  setNorecordfd(false);
                                }}
                              ></SweetAlert>
                            ) : null}
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    component="div"
                    rowsPerPageOptions={pages}
                    count={dashboarddata.length}
                    rowsPerPage={rowsperpage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

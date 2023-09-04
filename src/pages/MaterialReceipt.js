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
import { makeStyles } from '@material-ui/core/styles';
import { fa, tr } from 'faker/lib/locales';
import SweetAlert from 'react-bootstrap-sweetalert';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function MaterialReceipt(props) {
  const [UpdateMessage, setUpdateMessage] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [OrderId, setOrderId] = useState('');
  const [pohelp, setpohelp] = useState([]);
  const [pono, setpono] = useState({ label: '', value: '0' });
  const [date, setdate] = useState('');
  const [getonedata, setgetonedata] = useState([]);
  const [ProductError, setProductError] = useState(false);
  //hdrpoiddate
  const [poiddate, setpoiddate] = useState([]);
  const [ReceiveQty, setReceiveQty] = useState('');
  //materialhdrdata
  const [materialhdrdata, setmaterialhdrdata] = useState([]);
  const [Productid, setProductid] = useState('');
  const [ReceiptDetail, setReceiptDetail] = useState('');

  // console.log(pohelp);
  console.log(pono.value);

  //receiveqtyerr
  const [ReceiveQtyErr, setReceiveQtyErr] = useState(false);
  const [ReceiveQtyErr1, setReceiveQtyErr1] = useState(false);
  const [DeleteMessage, setDeleteMessage] = useState(false);
  const [ReceiveQtyErr2, setReceiveQtyErr2] = useState(false);

  const [orderqty, setorderqty] = useState('');
  const [updatedcqty, setupdatedcqty] = useState('');

  const [receiptno, setreceiptno] = useState('');
  useEffect(() => {
    var date = new Date();

    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);

    var lastday = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    setfromdate(moment(firstday).format('YYYY-MM-DD'));
    settodate(moment(lastday).format('YYYY-MM-DD'));

    GetPOHelp();
    console.log(props.match.params.id);

    if (props.match.params.id) {
      GetoneMaterialDtl();
      GetoneMaterialhdr();
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setReceiveQtyErr(false);
    setReceiveQtyErr1(false);
    setReceiveQtyErr2(false);
    setProductError(false);
  };

  const history = useHistory();
  const addpages = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      history.push(`/ViewMaterialReceipt`);
    }, 2000);
  };
  const classes = useStyles();

  const [savespinners, setsavespinners] = useState(false);

  const spinners = () => {
    // setsavespinners(true)
    // setTimeout(() => {
    //   setsavespinners(false)
    //   setTimeout(() => {
    //     history.push('/ViewMaterialReceipt')
    //   }, 1000);
    // }, 2000);
  };

  const GetPOHelp = async () => {
    await axios.instance
      .get(
        `GetDcNoHelp/${localStorage.getItem(
          'Customer_Log',
        )}/${localStorage.getItem('Branch_Log')}/${localStorage.getItem(
          'customer_HO',
        )}`,
      )
      .then(res => {
        const data = res.data;
        setpoiddate(data);
        console.log(data, 'dchelp');
        const option = data.map(row => ({
          label: row.Delivery_Chellan_No,
          value: row.Delivery_Chellan_Id,
        }));
        option.push({ label: '', value: '0' });
        setpohelp(option);
        console.log(option, 'options');
      });
  };

  const GetDateHelp = async id => {
    await axios.instance.get(`GetDcDateHelp/${id}`).then(res => {
      console.log(res.data, 'date');
      for (let data of res.data) {
        setfromdate(moment(data.Delivery_Chellan_Date).format('YYYY-MM-DD'));
        console.log(date);
      }
    });
  };

  // const formatdate=(moment(date).format("YYYY-MM-DD"))
  //console.log(formatdate);

  const GetOneHelp = async id => {
    await axios.instance.get(`getonematerialdtl/${id}`).then(res => {
      console.log(res.data, 'getonehelp');
      setgetonedata(res.data);
      for (const data of res.data) {
        setorderqty(data.Order_Qty);
        setupdatedcqty(data.Update_DC_Qty);
      }
    });
  };

  const DeleteAsk = (Receiptid, productid) => {
    if (window.confirm('Are You Sure Delete This Record ?')) {
      DeleteProductDetail(Receiptid, productid);
    } else {
    }
  };
  console.log(ReceiveQty <= orderqty ? true : false);
  const InsertMaterialHdr = async () => {
    //   if(getonedata.filter((i) => i.Received_Qty >0).length!=0
    //   //&& getonedata.filter((i) => parseFloat(i.Rec_Qty) !=0).length  !=0
    // ///&& getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0

    //   ){
    if (ReceiveQty <= updatedcqty) {
      console.log('Save');
      let Receiptid = 0;
      const token = localStorage.getItem('AuthToken');
      const get = await axios.instance
        .post(
          `InsertMaterialHdr`,
          {
            ReceiptDate: todate,
            POId: pono.value,
            PODate: new Date(),
            CompanyId: localStorage.getItem('Companyid'),
            BranchId: localStorage.getItem('Branch_Log'),
            CustomerId: localStorage.getItem('Customer_Log'),
            CustomerHoId: localStorage.getItem('customer_HOID'),
            CreatedBy: localStorage.getItem('Userid'),
            CreatedDate: new Date(),
          },
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          console.log(res.data, 'insertmaterialhdr');
          setmaterialhdrdata(res.data);
          for (const data of res.data) {
            Receiptid = data.ReceiptId;
            InsertMaterialDtl(data.ReceiptId);
          }
          addpages();
        });
    } else {
      //  if(getonedata.filter((i) => i.Received_Qty <=0).length !=0 ) {
      setReceiveQtyErr(true);
      //  }
      // if(getonedata.filter((i) => i.Received_Qty <=0).length !=0){
      //   if(getonedata.filter(number => number.Received_Qty  <= number.DcQty).length !=0) {
      //     setReceiveQtyErr2(true)
      //    }
      //   }

      //  if((getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0)){
      //   setReceiveQtyErr2(true)
      //  }

      //}
    }
  };

  const InsertMaterialDtl = async id => {
    console.log();

    if (props.match.params.id) {
      console.log(
        getonedata.filter(i => parseFloat(i.Rec_Qty) <= i.DcQty),
        getonedata,
      );
      // if(ReceiveQty<=updatedcqty
      if (
        getonedata.filter(i => parseFloat(i.Rec_Qty) <= i.DcQty).length != 0
        //   //&& getonedata.filter((i) => parseFloat(i.Rec_Qty) !=0).length  !=0
        //   //&& getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0
      ) {
        const token = localStorage.getItem('AuthToken');
        for (let data of getonedata) {
          const productcollection = Object.assign(data, {
            ProductId: data.ProductId,
            POId: pono.value,
            ReceiptId: props.match.params.id,
            Uomid: data.Uomid,
            // Taxid:data.Taxid,
            // TaxPer:data.GSTPer,
            // TaxAmount:data.Amount,
            // DisPer:data.DisPer,
            Rate: data.Rate,
            Amount: data.Order_Qty * data.Order_Qty,
            POQty: data.Order_Qty,
            ReceivedQty: data.Rec_Qty,
            AlreadyReceivedQty: data.Alrdy_Rec_Qty,
            BalanceQty: data.Order_Qty - data.Rec_Qty + data.Alrdy_Rec_Qty,
            CreatedBy: localStorage.getItem('Userid'),
            CreatedDate: new Date(),
          });
          console.log(productcollection, 'productcollection');

          const get = await axios.instance
            .post(`InsertMaterialDlt`, productcollection, {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            })
            .then(res => {
              console.log(res.data, 'insertmaterialdtl');
              setUpdateMessage(true);
              setTimeout(() => {
                history.push(`/ViewMaterialReceipt`);
              }, 2000);
            });
        }
      } else {
        setReceiveQtyErr(true);
      }
      // else{
      //   if(getonedata.filter((i) => i.Rec_Qty <=0).length !=0 ) {
      //   setReceiveQtyErr(true)
      //   }
      //  if(getonedata.filter((i) => i.Rec_Qty === "").length===0){
      //    if(getonedata.filter((i) => parseFloat(i.Rec_Qty) === 0).length !=0) {
      //      setReceiveQtyErr(true)
      //     }

      //     if((getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0)){
      //      setReceiveQtyErr2(true)
      //     }

      //  }
    }

    // else {
    //  if(getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Order_Qty))).length != 0

    //             ){

    //  (ReceiveQty<=updatedcqty)
    else if (
      getonedata.filter(i => parseFloat(i.Received_Qty) <= i.Update_DC_Qty)
        .length != 0
    ) {
      console.log(ReceiveQty, 'receiveqty');
      const token = localStorage.getItem('AuthToken');
      for (let data of getonedata) {
        const productcollection = Object.assign(data, {
          ProductId: data.Product_Details_Id,
          POId: pono.value,
          ReceiptId: id,
          Uomid: data.UOM_Id,
          // Taxid:data.TaxId,
          // TaxPer:data.GSTPer,
          // TaxAmount:data.Amount,
          // DisPer:data.DisPer,
          Rate: data.Rate,
          Amount: data.Amount,
          POQty: data.Order_Qty,
          ReceivedQty: data.Received_Qty,
          AlreadyReceivedQty: data.Alrdy_Rec_Qty,
          BalanceQty: data.Order_Qty - data.Received_Qty + data.Alrdy_Rec_Qty,
          CreatedBy: localStorage.getItem('Userid'),
          CreatedDate: new Date(),
        });
        console.log(productcollection, 'productcollection');

        const get = await axios.instance
          .post(`InsertMaterialDlt`, productcollection, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(res => {});
      }
      //     }else {

      //  if(getonedata.filter((i) => i.Received_Qty <=0).length !=0 ) {
      //           setReceiveQtyErr1(true)
      //           }
      //         //  if(getonedata.filter((i) => i.Rec_Qty === "").length===0){
      //         //    if(getonedata.filter((i) => parseFloat(i.Rec_Qty) === 0).length !=0) {
      //         //      setReceiveQtyErr(true)
      //         //     }

      //             // if((getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0)){
      //             //  setReceiveQtyErr2(true)
      //             // }

      //         //  }

      //     }
    } else {
      setReceiveQtyErr1(true);
    }
  };

  const GetoneMaterialDtl = async () => {
    const token = localStorage.getItem('AuthToken');
    const get = await axios.instance
      .get(`GetoneReceiptDetail/${props.match.params.id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        setgetonedata(res.data);
      });
  };

  const NewmodeDelete = productid => {
    if (window.confirm('Are You Sure Delete This Record ?')) {
      setgetonedata(getonedata.filter(i => i.Product_Id !== productid));
    } else {
    }
  };

  const GetoneMaterialhdr = async () => {
    const token = localStorage.getItem('AuthToken');
    const get = await axios.instance
      .get(`GetoneReceiptHeader/${props.match.params.id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'getonematerialhdr');
        for (const data of res.data) {
          setpono({
            label: data.Delivery_Chellan_No,
            value: data.Delivery_Chellan_Id,
          });
          setfromdate(moment(data.Delivery_Chellan_Date).format('YYYY-MM-DD'));
          settodate(moment(data.ReceiptDate).format('YYYY-MM-DD'));
          setreceiptno(data.ReceiptNo);
        }
      });
  };

  const DeleteHdr = async () => {
    console.log(pono.value, 'OrderId');
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .delete(`editmodedeletedtl/${props.match.params.id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'deleted');
      });

    //GetOneHelp(pono.value)
    setTimeout(() => {
      InsertMaterialDtl(props.match.params.id);
    }, 3000);
  };

  const DeleteProductDetail = async (Id, id1) => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .delete(`deletematerialdtl/${Id}/${id1}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'deleted');
      });
    setDeleteMessage(true);
    setTimeout(() => {
      GetoneMaterialDtl(props.match.params.id);
    }, 2000);
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <Card style={{ backgroundColor: 'white' }}>
            <CardTitle
              tag="h5"
              className="d-flex justify-content-center mt-3"
              style={{ color: '#58A7AA' }}
            >
              Material Receipt
            </CardTitle>
            <CardBody>
              <Row>
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>MR No</b>
                    </Label>
                    {props.match.params.id ? (
                      <Input type="text" value={receiptno} disabled />
                    ) : (
                      <Input type="text" disabled />
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>DC No</b>
                    </Label>

                    <Select
                      type="text"
                      value={pono}
                      options={pohelp}
                      onChange={value => {
                        setpono(value);
                        console.log(value, 'pono');
                        GetDateHelp(value.value);
                        GetOneHelp(value.value);
                        setOrderId(value.value);
                      }}
                    />
                  </div>
                </Col>
                {/* <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px',marginTop:"2px" }}>
                    <Label><b>DC Date</b></Label>

                    <Input type='date' 
                        value={ fromdate} 
                        id="fromdate" 
                    /> 
                  </div>
                </Col> */}
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>Receipt Date</b>
                    </Label>
                    <Input
                      type="date"
                      value={todate}
                      id="fromdate"
                      onChange={e => settodate(e.target.value)}
                      min={'1900-01-01'}
                      maxLength="4"
                      max={'9999-12-31'}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="d-flex gap-4 " style={{ marginTop: '35px' }}>
                    {/* <Button1    color="primary"   >
                      View
                    </Button1> */}
                    <Button1
                      className="mx-3"
                      color="success"
                      onClick={() => {
                        //console.log(props.match.params.id?true:false);
                        if (getonedata.length != 0) {
                          if (props.match.params.id) {
                            DeleteHdr();
                          } else {
                            InsertMaterialHdr();
                          }
                        } else {
                          setProductError(true);
                        }
                      }}
                    >
                      {props.match.params.id ? 'Update' : 'Save'}
                    </Button1>
                  </div>
                </Col>
              </Row>
              <TableContainer style={{ marginTop: '20px' }}>
                <Table className="InspectionTbl">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.NO</TableCell>
                      <TableCell>PO No</TableCell>
                      <TableCell>PRODUCTS</TableCell>
                      <TableCell>UOM</TableCell>
                      <TableCell>PO QTY</TableCell>
                      <TableCell>Already Rec Qty</TableCell>
                      <TableCell>Received Qty</TableCell>
                      <TableCell>Balance Qty</TableCell>
                      {/* <TableCell>RATE</TableCell>
                          <TableCell>DISC%</TableCell>
                          <TableCell>TAX%</TableCell>
                          <TableCell>AMOUNT</TableCell> */}
                      {/* <TableCell>EDIT</TableCell> */}
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getonedata.map((data, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.PoNo}</TableCell>
                        <TableCell>
                          {data.Product_Details_Description}
                        </TableCell>
                        <TableCell>{data.UOM_Description}</TableCell>
                        <TableCell
                          style={{ width: '100px', textAlign: 'center' }}
                        >
                          {data.Order_Qty}
                        </TableCell>
                        <TableCell
                          style={{ width: '100px', textAlign: 'center' }}
                        >
                          {/* <Input 
                          type="number"
                          value={data.Alrdy_Rec_Qty}
                          onChange={(e)=> {
                            const newInputValues = [...getonedata];
                            newInputValues[index].Alrdy_Rec_Qty = e.target.value;
                            setgetonedata(newInputValues);
                          }}
                        /> */}
                          {data.Alrdy_Rec_Qty}
                        </TableCell>
                        <TableCell style={{ width: '120px' }}>
                          <Input
                            style={{ width: '100px' }}
                            key={index}
                            type="number"
                            value={
                              props.match.params.id
                                ? data.Rec_Qty
                                : data.Received_Qty
                            }
                            onChange={e => {
                              const newInputValues = [...getonedata];
                              setReceiveQty(e.target.value);
                              if (props.match.params.id) {
                                console.log(data.DcQty);
                                if (
                                  parseFloat(e.target.value) >
                                  parseFloat(data.DcQty)
                                ) {
                                  setReceiveQtyErr2(true);
                                }
                                if (parseFloat(e.target.value) <= 0) {
                                  setReceiveQtyErr(true);
                                }
                                newInputValues[index].Rec_Qty = parseFloat(
                                  e.target.value,
                                );
                                setgetonedata(newInputValues);
                              } else {
                                console.log(data.DcQty);
                                if (
                                  parseFloat(e.target.value) >
                                  parseFloat(data.DcQty)
                                ) {
                                  setReceiveQtyErr2(true);
                                }

                                if (parseFloat(e.target.value) <= 0) {
                                  setReceiveQtyErr(true);
                                }
                                newInputValues[index].Received_Qty = parseFloat(
                                  e.target.value,
                                );
                                setgetonedata(newInputValues);
                              }
                            }}
                          />
                          {/* {
                          ReceiveQtyErr && index+1===parseFloat(data.Sno) ?<p style={{color:"red",fontSize:'12px'}}>  Enter Valid Qty</p>:null
                        }

                          { 
                          ReceiveQtyErr1 && index+1===parseFloat(data.Sno) ?<p style={{color:"red",fontSize:'12px'}}> please Enter Qty</p>:null
                        }
                         { 
                          ReceiveQtyErr2&& index+1===parseFloat(data.Sno)  ?<p style={{color:"red",fontSize:'12px'}}>     Qty Out Of range</p>:null
                        }
                        */}
                          {/* {props.match.params.id ?   
                        data.Rec_Qty :
                        data.Received_Qty
                      
                      } */}
                        </TableCell>
                        <TableCell
                          style={{ width: '100px', textAlign: 'center' }}
                        >
                          {/* <Input 
                          type="number"
                          value={data.Bal_Qty}
                          onChange={(e)=> {
                            const newInputValues = [...getonedata];
                            newInputValues[index].Bal_Qty = e.target.value;
                            setgetonedata(newInputValues);
                            console.log(getonedata)
                          }}
                        /> */}
                          {props.match.params.id
                            ? data.Order_Qty -
                              (data.Alrdy_Rec_Qty + data.Rec_Qty)
                            : data.Order_Qty -
                              (data.Alrdy_Rec_Qty + data.Received_Qty)}
                        </TableCell>
                        {/* <TableCell>{data.Rate}</TableCell>
                      <TableCell>{data.DisPer}</TableCell>
                      <TableCell>{data.GSTPer}</TableCell>
                      <TableCell>{data.Amount}</TableCell> */}
                        {/* <TableCell>
                        <IconButton size="small"   >
                          <EditIcon fontSize="small" />
                        </IconButton  >
                      </TableCell> */}
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => {
                              if (props.match.params.id) {
                                DeleteAsk(data.ReceiptDetailId, data.ProductId);
                              } else {
                                NewmodeDelete(data.Product_Id);
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Container>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={ReceiveQtyErr}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Enter Valid Qty
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={ReceiveQtyErr2}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Qty Out Of range
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={ReceiveQtyErr1}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          please Enter Qty
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={ProductError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Please Add Atleast One Product
        </Alert>
      </Snackbar>
      {SuccessMessage && (
        <SweetAlert
          title=" MaterialReceipt Add SuccessFully"
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
            setSuccessMessage(false);
          }}
        ></SweetAlert>
      )}
      {UpdateMessage && (
        <SweetAlert
          title=" MaterialReceipt Updated SuccessFully"
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
            setUpdateMessage(false);
          }}
        ></SweetAlert>
      )}

      {DeleteMessage && (
        <SweetAlert
          title="Product  Deleted SuccessFully"
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
            setDeleteMessage(false);
          }}
        ></SweetAlert>
      )}
    </React.Fragment>
  );
}

export default MaterialReceipt;

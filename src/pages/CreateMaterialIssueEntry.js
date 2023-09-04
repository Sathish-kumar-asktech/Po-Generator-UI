import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
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
import { tr } from 'faker/lib/locales';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Height } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function MaterialReceipt(props) {
  const [balances, setbalances] = useState('');

  const [ProductData, setProductData] = useState([]);
  const [Stock, setStock] = useState(0);
  const [UpdateMessage, setUpdateMessage] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ProductError, setProductError] = useState(false);
  const [DeleteMessage, setDeleteMessage] = useState(false);
  const [Product, setProduct] = useState({ label: '', value: '' });
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [OrderId, setOrderId] = useState('');
  const [pohelp, setpohelp] = useState([]);
  const [pono, setpono] = useState({ label: '', value: '' });
  const [Department, setDepartment] = useState({ label: '', value: '' });
  const [date, setdate] = useState('');
  const [getonedata, setgetonedata] = useState([]);
  const [DepartmentCollection, setDepartmentCollection] = useState([]);
  const [ContactPerson, setContactPerson] = useState('');
  //hdrpoiddate
  const [poiddate, setpoiddate] = useState([]);
  //materialhdrdata
  const [materialhdrdata, setmaterialhdrdata] = useState([]);
  const [Productid, setProductid] = useState('');
  const [ReceiptDetail, setReceiptDetail] = useState('');
  // console.log(pohelp);
  // console.log(pono.value)

  //receiveqtyerr
  const [ReceiveQtyErr, setReceiveQtyErr] = useState(false);
  const [ReceiveQtyErr1, setReceiveQtyErr1] = useState(false);
  const [ReceiveQtyErr2, setReceiveQtyErr2] = useState(false);
  const [DepartmentError, setDepartmentError] = useState(false);
  const [ContactPersonerror, setContactPersonerror] = useState(false);
  const [ProductCollection, setProductCollection] = useState([]);
  const [ProductCollection1, setProductCollection1] = useState([]);
  const [ProductLoad, setProductLoad] = useState([]);

  const [materialissueid, setmaterialissueid] = useState('');

  const [editmodestock, seteditmodestock] = useState('');

  useEffect(() => {
    if (props.match.params.id) {
      GetoneMaterialDtl();
      GetoneMaterialhdr();
    }
  }, []);

  useEffect(() => {
    var date = new Date();

    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);

    var lastday = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    setfromdate(moment(firstday).format('YYYY-MM-DD'));
    settodate(moment(lastday).format('YYYY-MM-DD'));

    GetPOHelp();

    if (!props.match.params.id) {
      GetOneHelp();
    }
    console.log(props.match.params.id);
    GetDepartMentCollection();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setReceiveQtyErr(false);
    setReceiveQtyErr1(false);
    setReceiveQtyErr2(false);
  };

  const history = useHistory();
  const addpages = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      history.push(`/MaterialIssueEntry`);
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
        `GetReceiptHelp/${localStorage.getItem(
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
          label: row.ReceiptNo,
          value: row.ReceiptId,
        }));
        option.push({ label: '', value: '0' });
        setpohelp(option);
        console.log(option, 'options');
      });
  };

  useLayoutEffect(() => {
    if (props.match.params.id) {
      GetOneHelp();
    }
  }, []);

  const GetDepartMentCollection = async () => {
    await axios.instance
      .get(`/GetllDepartment/${localStorage.getItem('Customer_Log')}`)
      .then(res => {
        const data = res.data;
        const option = data.map(row => ({
          label: row.DepartmentDesc,
          value: row.Departmentid,
        }));
        setDepartmentCollection(option);
      });
  };

  const GetDateHelp = async id => {
    await axios.instance.get(`GetoneReceiptHeader/${id}`).then(res => {
      console.log(res.data, 'date');
      for (let data of res.data) {
        // setdate(data.ReceiptDate)
        settodate(moment(data.ReceiptDate).format('YYYY-MM-DD'));
        console.log(date);
      }
    });
  };

  // const formatdate=(moment(date).format("YYYY-MM-DD"))
  // console.log(formatdate);

  const GetOneHelp = useCallback(
    async getone => {
      if (!props.match.params.id) {
        await axios.instance
          .get(
            `GetoneReceiptDtlinfo/${localStorage.getItem(
              'Customer_Log',
            )}/0/${localStorage.getItem('Companyid')}/${localStorage.getItem(
              'Branch_Log',
            )}/${localStorage.getItem('customer_HO')}/Y`,
          )
          .then(res => {
            const data = res.data;
            const option = data.map((row, index) => ({
              label: row.Product_Details_Description,
              value: row.ProductId,
              index: index,
            }));
            setProductCollection(option);
            setProductCollection1(option);
            console.log(option);
            setProductData(res.data);
          });
      } else {
        let data1;
        const token = localStorage.getItem('AuthToken');
        const get = await axios.instance
          .get(`GetoneIssueentrydtl/${props.match.params.id}`, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            data1 = res.data;
          });
        await axios.instance
          .get(
            `GetoneReceiptDtlinfo/${localStorage.getItem(
              'Customer_Log',
            )}/0/${localStorage.getItem('Companyid')}/${localStorage.getItem(
              'Branch_Log',
            )}/${localStorage.getItem('customer_HO')}/Y`,
          )
          .then(res => {
            const data = res.data;
            console.log(data1, data);
            let removedata = data1.map(i => parseInt(i.ProductId));
            console.log(removedata, data1);
            let filtereddata = data.filter(
              i => !removedata.includes(parseInt(i.ProductId)),
            );
            console.log(filtereddata);
            const option = filtereddata.map((row, index) => ({
              label: row.Product_Details_Description,
              value: row.ProductId,
              index: index,
            }));
            setProductCollection(option);
            setProductCollection1(option);
            console.log(option);
            const option1 = res.data.map((row, index) => ({
              label: row.Product_Details_Description,
              value: row.ProductId,
              index: index,
            }));
            setProductData(option1);
          });
      }
    },
    [ProductCollection],
  );

  const GetOneHelp1 = async id => {
    await axios.instance
      .get(
        `GetoneReceiptDtlinfo/${localStorage.getItem(
          'Customer_Log',
        )}/${id}/${localStorage.getItem('Companyid')}/${localStorage.getItem(
          'Branch_Log',
        )}/${localStorage.getItem('customer_HO')}/N`,
      )
      .then(res => {
        console.log(res.data, 'getonehelp');
        for (const data of res.data) {
          setStock(data.Balance);
        }

        setgetonedata(getonedata.concat(res.data));

        //   let productvalues = [...getonedata]
        //  const newProductHelp = ProductCollection1.filter(entry1 => {
        //   return productvalues.some(entry2 => entry1.value !== entry2.ProductId);
        // });
        // console.log(newProductHelp)
        setProduct({
          label: '',
          value: '',
        });
      });
  };

  const DeleteAsk = useCallback(
    (Receiptid, ProductId) => {
      // console.log(i)
      if (window.confirm('Are You Sure Delete This Record')) {
        DeleteProductDetail(Receiptid);
        console.log(ProductData, ProductId);
        const updatedData = ProductData.filter(
          (row, index) => parseInt(row.value) == parseInt(ProductId),
        );
        console.log(updatedData, 'final');
        setProductCollection(ProductCollection.concat(updatedData));

        setgetonedata(
          getonedata.filter(i => parseInt(i.ProductId) !== parseInt(ProductId)),
        );
        // setDeleteMessage(true)
      }
    },
    [ProductData, ProductCollection],
  );

  const InsertMaterialHdr = async () => {
    console.log(Department.value.length, ContactPerson.length);
    if (Department.value.length != 0 && ContactPerson.length != 0) {
      console.log('Save');
      let Receiptid = 0;
      const token = localStorage.getItem('AuthToken');
      const get = await axios.instance
        .post(
          `InsertMaterialIssueEntry`,
          {
            // ReceiptId:pono.value,
            // POId:pono.value,
            // PODate:new Date(),
            // CompanyId:localStorage.getItem("Companyid"),
            // BranchId:localStorage.getItem("Branch_Log"),
            // CustomerId:localStorage.getItem("Customer_Log"),
            // CustomerHoId:localStorage.getItem("customer_HOID"),
            // CreatedBy:localStorage.getItem("Userid"),
            // CreatedDate:new Date(),
            ReceiptId: pono.value,
            MIEDate: todate,
            Departmentid: Department.value,
            Stock: Stock,
            Contact_person: ContactPerson,
            CompanyId: localStorage.getItem('Companyid'),
            Customerid: localStorage.getItem('Customer_Log'),
            BranchId: localStorage.getItem('Branch_Log'),
            Customerhoid: localStorage.getItem('customer_HOID'),
            Created_By: localStorage.getItem('Userid'),
            Created_Date: new Date(),
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
            Receiptid = data.MaterialIsssueheaderid;
            InsertMaterialDtl(data.MaterialIsssueheaderid);
          }
          addpages();
        });
    } else {
      if (Department.value.length === 0) {
        setDepartmentError(true);
      }
      if (ContactPerson.length === 0) {
        setContactPersonerror(true);
      }

      setTimeout(() => {
        setDepartmentError(false);
        setContactPersonerror(false);
      }, 2000);
    }
  };

  const InsertMaterialDtl = async id => {
    if (props.match.params.id) {
      // if(getonedata.filter((i) => i.Rec_Qty != "").length!=0 && getonedata.filter((i) => parseFloat(i.Rec_Qty) !=0).length  !=0
      // && getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0

      //   ){

      UpdateHeader(props.match.params.id);
      const token = localStorage.getItem('AuthToken');
      for (let data of getonedata) {
        const productcollection = Object.assign(data, {
          MaterialIsssueheaderid: props.match.params.id,
          ProductId: data.ProductId,
          Uomid: data.Uomid,
          Taxid: 0,
          TaxPer: 0,
          TaxAmount: data.Rate,
          DisPer: data.Rate,
          Rate: data.Rate,
          Amount: data.Rate,
          MaterailQty: data.Rec_Qty,
          ReceivedQty: data.Rec_Qty,
          ReceiptId: pono.value,
          AlreadyReceivedQty: 0,
          BalanceQty: 0,
          CreatedBy: localStorage.getItem('Userid'),
          CreatedDate: new Date(),
        });
        console.log(productcollection, 'productcollection');

        const get = await axios.instance
          .post(`InsertMaterialIssueEntrydtl`, productcollection, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            console.log(res.data, 'insertmaterialdtl');
            setUpdateMessage(true);
            setTimeout(() => {
              history.push(`/MaterialIssueEntry`);
            }, 2000);
          });
      }
      // }
      // else{
      //   if(getonedata.filter((i) => i.Rec_Qty === "").length !=0 ) {
      //   setReceiveQtyErr1(true)
      //   }
      //  if(getonedata.filter((i) => i.Rec_Qty === "").length===0){
      //    if(getonedata.filter((i) => parseFloat(i.Rec_Qty) === 0).length !=0) {
      //      setReceiveQtyErr(true)
      //     }

      //     if((getonedata.filter((i) => (parseFloat(i.Rec_Qty) <= parseFloat( i.Bal_Qty))).length != 0)){
      //      setReceiveQtyErr2(true)
      //     }

      //  }

      // }
    } else {
      const token = localStorage.getItem('AuthToken');
      for (let data of getonedata) {
        setbalances(data.Balances);
        const productcollection = Object.assign(data, {
          MaterialIsssueheaderid: id,
          ProductId: data.ProductId,
          Uomid: data.Uomid,
          Taxid: 0,
          TaxPer: 0,
          TaxAmount: data.Rate,
          DisPer: data.Rate,
          Rate: data.Rate,
          Amount: data.Rate,
          MaterailQty: 0,
          ReceivedQty: data.Balances,
          ReceiptId: pono.value,
          AlreadyReceivedQty: 0,
          BalanceQty: 0,
          CreatedBy: localStorage.getItem('Userid'),
          CreatedDate: new Date(),
        });
        console.log(productcollection, 'productcollection');

        const get = await axios.instance
          .post(`InsertMaterialIssueEntrydtl`, productcollection, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            console.log(res.data, 'insertmaterialdtl');
          });
      }
    }
  };

  const GetoneMaterialDtl = async () => {
    const token = localStorage.getItem('AuthToken');
    const get = await axios.instance
      .get(`GetoneIssueentrydtl/${props.match.params.id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        let products = [];
        setgetonedata(res.data);
        console.log(ProductCollection);
        for (const data of res.data) {
          //let newvalue  = [...ProductLoad, parseFloat(value.value)]
          setProductLoad([data.ProductId]);
          //  setProductCollection    Product_Details_Description
          //   let data1 =  ProductCollection.filter((item,index) => item.value != data.ProductId)

          //   products.push(data1)

          // }
          //   console.log(products)
          // setProductCollection(products)
          // setProductCollection1(products)
        }

        //    let res2= []
        //  res2 =
        //  ProductCollection.filter(el => {
        //    return !res.data.find(element => {
        //     console.log(element.ProductId === el.value,"element.ProductId === el.value ");
        //      return element.ProductId === el.value
        //    })
        //  })
        //  console.log(res2,"Res2");
        //  setProductCollection(res2)
      });
  };

  const NewmodeDelete = ProductId => {
    if (window.confirm('Are You Sure Delete This Record ?')) {
      //console.log(ProductId);
      let Prodfilter = ProductLoad.filter(i => i !== parseFloat(ProductId));

      const filteredArray1 = ProductCollection1.filter(item1 => {
        return !Prodfilter.some(item2 => item2 === parseFloat(item1.value));
      });
      console.log(Prodfilter, ProductId, filteredArray1);
      //console.log(filteredArray1);
      if (filteredArray1.length != 0) {
        setProductCollection(filteredArray1);
      } else {
        setProductCollection(ProductCollection1);
      }

      setProductLoad(Prodfilter);
      setgetonedata(getonedata.filter(i => i.ProductId !== ProductId));
      setDeleteMessage(true);
    } else {
    }
  };

  const GetoneMaterialhdr = async () => {
    const token = localStorage.getItem('AuthToken');
    const get = await axios.instance
      .get(`GetoneIssueentryhdr/${props.match.params.id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'getonematerialhdr');
        for (const data of res.data) {
          setpono({ label: data.ReceiptNo, value: data.ReceiptId });
          setfromdate(moment(data.MIEDate).format('YYYY-MM-DD'));
          settodate(moment(data.fromdate).format('YYYY-MM-DD'));
          setDepartment({
            label: data.DepartmentDesc,
            value: data.Departmentid,
          });
          setContactPerson(data.Contact_person);
          setmaterialissueid(data.MaterialIsssueheaderid);
          seteditmodestock(data.Stock);
        }
      });
  };

  const DeleteHdr = async () => {
    console.log(pono.value, 'OrderId');
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .delete(`DeleteDtlInEditMode/${props.match.params.id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'deleted');
      });

    setTimeout(() => {
      InsertMaterialDtl(props.match.params.id);
    }, 2000);
    // GetOneHelp1(pono.value)
  };

  const DeleteProductDetail = async Id => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .delete(`DeleteissueEntrydtl/${Id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data, 'deleted');
        setDeleteMessage(true);
      });
    if (!props.match.params.id) {
      GetoneMaterialDtl(props.match.params.id);
    }
  };

  const UpdateHeader = async () => {
    let token = localStorage.getItem('AuthToken');
    await axios.instance.put(
      `/UpdateMaterialIssueEntryhdr/${props.match.params.id}`,
      {
        ReceiptId: pono.value,
        MIEDate: todate,
        Departmentid: Department.value,
        Stock: 0,
        Contact_person: ContactPerson,

        Modify_By: localStorage.getItem('Userid'),
        Modify_Date: new Date(),
      },
      { headers: { Authorization: token, 'Content-Type': 'application/json' } },
    );
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <h6 className="titlemie">Material Issue Entry</h6>
          <Card>
            {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
              Material Issue Entry
            </CardTitle> */}
            <CardBody>
              <Row>
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>MI NO</b>
                    </Label>

                    {/* <Select type='text' 
                    
                       value={pono}
                       options={pohelp}
                       onChange={(value)=> {
                        setpono(value)
                        console.log(value,"pono");
                        GetDateHelp(value.value)
                        GetOneHelp(value.value)
                        setOrderId(value.value)
                       }}
                    />  */}
                    {props.match.params.id ? (
                      <Input type="text" value={materialissueid} disabled />
                    ) : (
                      <Input
                        // type="text"
                        // value={materialissueid}

                        disabled
                      />
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>MI Date</b>
                    </Label>
                    {props.match.params.id ? (
                      <Input
                        type="date"
                        value={fromdate}
                        id="fromdate"
                        onChange={e => {
                          settodate(e.target.value);
                        }}
                      />
                    ) : (
                      <Input
                        type="date"
                        value={todate}
                        id="fromdate"
                        onChange={e => {
                          settodate(e.target.value);
                        }}
                      />
                    )}
                  </div>
                </Col>

                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>Department</b>
                    </Label>

                    <Select
                      type="text"
                      value={Department}
                      options={DepartmentCollection}
                      onChange={value => {
                        // GetDateHelp(value.value)
                        // GetOneHelp(value.value)
                        // setOrderId(value.value)
                        setDepartment(value);
                      }}
                    />
                    {DepartmentError && (
                      <p style={{ color: 'red' }}>Please Select Department </p>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>Contact Person</b>
                    </Label>

                    <Input
                      type="text"
                      value={ContactPerson}
                      onChange={e => {
                        setContactPerson(e.target.value);
                      }}
                    />
                    {ContactPersonerror && (
                      <p style={{ color: 'red' }}>
                        Please Enter Contact Person{' '}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12} lg={3} md={6}>
                  <div style={{ width: '200px', marginTop: '2px' }}>
                    <Label>
                      <b>Stock</b>
                    </Label>
                    {props.match.params.id ? (
                      <Input type="text" value={Stock} disabled />
                    ) : (
                      <Input type="text" value={Stock} disabled />
                    )}
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

                        if (getonedata.length !== 0) {
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
              <TableContainer style={{ marginTop: '20px', height: '400px' }}>
                <Table className="InspectionTbl">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.NO</TableCell>

                      <TableCell>PRODUCTS</TableCell>
                      <TableCell>UOM</TableCell>
                      {/* <TableCell>Already Issued QTY</TableCell> */}
                      <TableCell>Issued QTY</TableCell>

                      <TableCell>DELETE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getonedata.map((data, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell
                          onClick={() => {
                            console.log(data);
                            if (props.match.params.id) {
                              setStock(data.stock);
                            } else {
                              setStock(data.Balance);
                            }
                          }}
                        >
                          {data.Product_Details_Description}
                        </TableCell>
                        <TableCell>{data.UOM_Description}</TableCell>
                        {/* <TableCell>{props.match.params.id ?  data.Alrdy_Rec_Qty:data.UpdateIssueQty}</TableCell>
                         */}

                        <TableCell style={{ width: '150px' }}>
                          {/* {props.match.params.id ?
                        (data.Order_Qty-(data.Alrdy_Rec_Qty+data.Rec_Qty))
                        :(data.Order_Qty-(data.Alrdy_Rec_Qty+data.Received_Qty))
                        } */}

                          <Input
                            style={{ width: '150px' }}
                            key={index}
                            type="number"
                            value={
                              props.match.params.id
                                ? data.Rec_Qty
                                : data.Balances
                            }
                            onFocus={() => {
                              if (props.match.params.id) {
                                setStock(data.Balance);
                              } else {
                                setStock(data.Balance);
                              }
                            }}
                            onChange={e => {
                              const newInputValues = [...getonedata];
                              if (props.match.params.id) {
                                if (
                                  parseFloat(e.target.value) >
                                  parseFloat(data.Balance)
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
                                if (
                                  parseFloat(e.target.value) >
                                  parseFloat(data.Balance)
                                ) {
                                  setReceiveQtyErr2(true);
                                }

                                if (parseFloat(e.target.value) <= 0) {
                                  setReceiveQtyErr(true);
                                }
                                newInputValues[index].Balances = parseFloat(
                                  e.target.value,
                                );
                                setgetonedata(newInputValues);
                              }
                            }}
                          />
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
                                console.log(data);
                                // const material = getonedata.filter((row,index) => parseInt(row.MaterialIsssueDetailid) == parseInt(data.MaterialIsssueDetailid));
                                // if(material.length !== 0){
                                DeleteAsk(
                                  data.MaterialIsssueDetailid,
                                  data.ProductId,
                                );
                                // } else {
                                //   DeleteAsk1(data.ProductId)
                                // }
                              } else {
                                NewmodeDelete(data.ProductId);
                              }
                              // console.log(ProductLoad,'ids');
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <Select
                          //isSearchable
                          value={Product}
                          options={ProductCollection}
                          onChange={value => {
                            //let data =  ProductData.filter(item => item.ProductId === value.value)
                            GetOneHelp1(value.value);
                            let newvalue = [
                              ...ProductLoad,
                              parseFloat(value.value),
                            ];
                            setProductLoad(newvalue);
                            //  console.log(value)
                            // console.log(ProductCollection,'olddata')

                            // let res2= []
                            //     res2 =
                            // forwarderinvoicenocollection.filter(el => {
                            //       return !data.find(element => {
                            //         return element.InvoiceId === el.value
                            //       })
                            //     })

                            let data = ProductCollection.filter(
                              (item, index) => item.value != value.value,
                            );
                            // console.log(data,'newdata');
                            // setProductCollection1(data)
                            setProductCollection(data);
                          }}
                        />
                      </TableCell>
                      <TableCell></TableCell>

                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
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
          title=" Material Issued Added SuccessFully"
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
          title=" Material Issued Updated SuccessFully"
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

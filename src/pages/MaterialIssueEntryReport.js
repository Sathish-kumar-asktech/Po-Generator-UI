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
import SweetAlert from 'react-bootstrap-sweetalert';
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

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const misreport1 = () => {
  const [dialogbox, setdialogbox] = useState(false);
  const classes = useStyles();
  const [buyerordererror, setbuyerordererror] = useState(false);
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
  const [tokent, settokent] = useState(
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudGxpc3QiOlt7IlVzZXJJRCI6IjEiLCJMb2dpbkNvZGUiOiIwMSIsIkxvZ2luTmFtZSI6IkFkbWluIiwiRW1haWxJZCI6ImFkbWluQGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiQURNSU4ifV0sImlhdCI6MTYzODM1NDczMX0.ZW6zEHIXTxfT-QWEzS6-GuY7bRupf2Jc_tp4fXIRabQ',
  );

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
  const [materialissueentrycollection, setmaterialissueentrycollection] =
    useState([]);
  const [departmentcollections, setdepartmentcollections] = useState([]);
  const [departmentid, setdepartmentid] = useState('0');
  const [materialissuenocollection, setmaterialissuenocollection] = useState(
    [],
  );
  const [materialid, setmaterialid] = useState('0');
  const [productcollection, setproductcollection] = useState([]);
  const [productid, setproductid] = useState('0');
  const [mrnovalue, setmrnovalue] = useState('');
  const [dcvalue, setdcvalue] = useState('');
  const [productvalue, setproductvalue] = useState('');
  const [departmentvalue, setdepartmentvalue] = useState('');
  const toggle = () => setModal(!modal);

  const changepage = () => {
    return materialissueentrycollection.slice(
      page * rowsperpage,
      (page + 1) * rowsperpage,
    );
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

    console.log(localStorage.getItem('Customer_Log'), 'Customer_Log');

    Getalldepartment();
    Getamaterilissueno();
    Getallproductsmaterialise();
  }, []);

  const Getalldepartment = async () => {
    const get = await axios.instance
      .get(`/GetllDepartment/${localStorage.getItem('Customer_Log')}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        // setallsuppliers(res.data)
        const data = res.data;
        const options = data.map(b => ({
          label: b.DepartmentDesc,
          value: b.Departmentid,
        }));
        setdepartmentcollections(options);
        options.push({ label: 'All', value: '0' });

        for (const data of res.data) {
          setdepartmentvalue(data.DepartmentDesc);
        }
      });
  };

  const Getamaterilissueno = async () => {
    const get = await axios.instance
      .get(
        `/GetallMaterialissueNo/${localStorage.getItem(
          'Customer_Log',
        )}/${localStorage.getItem('customer_HOID')}`,
        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        // setallsuppliers(res.data)
        const data = res.data;
        const options = data.map(b => ({
          label: b.MaterialIsssueheaderid,
          value: b.MaterialIsssueheaderid,
        }));
        setmaterialissuenocollection(options);
        options.push({ label: 'All', value: '0' });
        for (const data of res.data) {
          setmrnovalue(data.mino);
        }
      });
  };

  const Getallproductsmaterialise = async () => {
    const get = await axios.instance
      .get('/Getallmaterilissueproduct', {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        // setallsuppliers(res.data)
        const data = res.data;
        const options = data.map(b => ({
          label: b.Product_Details_Description,
          value: b.ProductId,
        }));
        setproductcollection(options);
        options.push({ label: 'All', value: '0' });
      });
  };
  const GetReport = async () => {
    //console.log('st',statius )

    const dataa = await axios.instance
      .post(
        `/GetMaterialissueReport`,

        // ${statius}/${allbuyerss}/${buyerid}/${moment(fromdate).format('YYYYMMDD')}/${moment(todate).format('YYYYMMDD')}`,
        {
          AllMino: materialid,
          AllProductId: productid,
          AllDepartmentid: departmentid,
          FromDate: moment(fromdate).format('YYYYMMDD'),
          Todate: moment(todate).format('YYYYMMDD'),
          CustomerHoId: localStorage.getItem('customer_HOID'),
          customerid: localStorage.getItem('Customer_Log'),
        },

        {
          headers: {
            Authorization: tokent,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        let qtytotal = [];
        setmaterialissueentrycollection(res.data);

        for (const data of res.data) {
          qtytotal.push(data.ReceivedQty);
        }
        let sumoftotalpovalue = 0;
        for (var i = 0; i < qtytotal.length; i++) {
          sumoftotalpovalue += qtytotal[i];
        }
        settotalpovalue(sumoftotalpovalue);
        if (res.data.length === 0) {
          setbuyerordererror(true);
          setdialogbox(true);
        } else {
        }
      });
    setTimeout(() => {
      setdialogbox(false);
    }, 2000);
  };

  const ExportToexcel1 = () => {
    let misreport1 = [];
    const columns = [
      'MI NO',
      'MI Date',
      'Department',
      'Product',
      'UOM',
      'Issued Qty',
      'Contact Person',
      'Remarks',
    ];

    materialissueentrycollection.map(data => {
      console.log(data, 'fdd');
      misreport1.push({
        'MI NO': data.mino,
        'MI Date': moment(data.MIEDate).format('DD-MM-YYYY'),
        Department: data.DepartmentDesc,
        Product: data.Product_Details_Description,
        UOM: data.UOM_Description,
        'Issued Qty': data.ReceivedQty.toString(),
        'Contact Person': data.Contact_person,
        Remarks: '',
      });
    });

    const wb = new Xl.Workbook();
    const ws = wb.addWorksheet('Material Issue Report');

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
    console.log(materialid, 'df');
    ws.cell(1, 1, 1, 15, true).string('Material Issue Report').style(headings);
    ws.cell(3, 1).string('MI NO').style(headings);
    ws.cell(3, 2)
      .string(materialid == '0' ? 'ALL' : mrnovalue)
      .style(headings);

    ws.cell(3, 4).string('From Date').style(headings);
    ws.cell(3, 5).string(moment(fromdate).format('DD-MM-yyyy')).style(headings);

    ws.cell(3, 7).string('To Date').style(headings);
    ws.cell(3, 8).string(moment(todate).format('DD-MM-yyyy')).style(headings);

    ws.cell(5, 1).string('Product').style(headings);
    ws.cell(5, 2)
      .string(productid == '0' ? 'ALL' : productvalue)
      .style(headings);

    ws.cell(5, 4).string('Department').style(headings);
    ws.cell(5, 5)
      .string(departmentid == '0' ? 'ALL' : departmentvalue)
      .style(headings);

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

      FileSaver.saveAs(data, 'Materil Issue Report' + '.xlsx');
    });
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <h6 className="monthwisetitle">Material Issue Report</h6>
          <Card style={{ backgroundColor: 'white' }}>
            {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                                            Material Issue Report
                                </CardTitle> */}
            <CardBody>
              <Row>
                <Col sm={12} lg={3} md={6}>
                  <div
                    className="DefectType"
                    style={{ width: '200px', marginTop: '2px' }}
                  >
                    <Label style={{ marginLeft: '5px' }}>
                      <b>MI NO</b>
                    </Label>
                    <Select
                      options={materialissuenocollection}
                      onChange={value => {
                        setmaterialid(value.value);
                      }}
                      defaultValue={{ label: 'All', value: '0' }}
                    />
                  </div>
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
                      onChange={e => {
                        setfromdate(e.target.value);
                      }}
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
                      onChange={e => {
                        settodate(e.target.value);
                      }}
                      min={'1900-01-01'}
                      maxLength="4"
                      max={'9999-12-31'}
                    />
                  </div>
                </Col>
                <Col sm={12} lg={3} md={6}>
                  <div
                    className="DefectType"
                    style={{ width: '275px', marginTop: '2px' }}
                  >
                    <Label style={{ marginLeft: '5px' }}>
                      <b>Product</b>
                    </Label>
                    <Select
                      options={productcollection}
                      onChange={value => {
                        setproductvalue(value.label);
                        setproductid(value.value);
                        GetReport();
                      }}
                      defaultValue={{ label: 'All', value: '0' }}
                    />
                  </div>
                </Col>
                <Col sm={12} lg={3} md={6}>
                  <div
                    className="DefectType"
                    style={{ width: '200px', marginTop: '2px' }}
                  >
                    <Label style={{ marginLeft: '5px' }}>
                      <b>Department</b>
                    </Label>
                    <Select
                      name="created by"
                      options={departmentcollections}
                      onChange={value => {
                        setdepartmentid(value.value);
                      }}
                      defaultValue={{ label: 'All', value: '0' }}
                    />
                  </div>
                </Col>
                {/* <Col sm={12} lg={2} md={6} style={{marginTop:"33px"}}>
                                            
                                           
                                                <Button1    color="primary" className="adbtn2 " onClick={GetReport}  >
                                                    View
                                                </Button1>
                                            
                                           
                                   
                                        
                                        </Col> */}
                <Col
                  sm={12}
                  lg={2}
                  md={6}
                  style={{ marginTop: '33px', marginLeft: '10px' }}
                >
                  <Button1
                    color="primary"
                    className="adbtn2 "
                    onClick={GetReport}
                  >
                    View
                  </Button1>
                  {materialissueentrycollection != '' ? (
                    // <div >
                    <Button1
                      style={{ marginLeft: '8px' }}
                      color="primary"
                      className="adbtn2 "
                      onClick={() => {
                        ExportToexcel1();
                      }}
                    >
                      Export
                    </Button1>
                  ) : // </div>
                  null}
                </Col>
                {productid != '0' ? (
                  <Col sm={12} lg={3} md={6} style={{ marginTop: '33px' }}>
                    <div>
                      <p>
                        <span
                          style={{ marginLeft: '100px', fontSize: '20px' }}
                          className="text-primary"
                        >
                          Total Qty : {totalpovalue}
                        </span>
                      </p>
                    </div>
                  </Col>
                ) : null}
              </Row>

              <TableContainer style={{ marginTop: '20px' }}>
                <Table className="InspectionTbl">
                  <TableHead>
                    <TableRow>
                      <TableCell>MI NO</TableCell>
                      <TableCell>MI Date</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>UOM</TableCell>

                      <TableCell>Issue Qty </TableCell>

                      <TableCell>Contact Person</TableCell>
                      {/* <TableCell>Remarks</TableCell> */}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {materialissueentrycollection.length != 0 ? (
                      changepage().map(data => (
                        <TableRow>
                          <TableCell>{data.MaterialIsssueheaderid}</TableCell>
                          <TableCell>
                            {moment(data.MIEDate).format('DD-MM-YYYY')}
                          </TableCell>
                          <TableCell>{data.DepartmentDesc}</TableCell>
                          <TableCell>
                            {data.Product_Details_Description}
                          </TableCell>
                          <TableCell>{data.UOM_Description}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            {data.ReceivedQty}
                          </TableCell>
                          <TableCell>{data.Contact_person}</TableCell>
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
                count={materialissueentrycollection.length}
                rowsPerPage={rowsperpage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardBody>
          </Card>
        </Container>
      </div>

      {buyerordererror ? (
        <SweetAlert
          title="No Data Found..."
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
            setbuyerordererror(false);
          }}
        ></SweetAlert>
      ) : null}

      <Backdrop open={dialogbox} className={classes.backdrop}>
        <Spinner name="ball-spin-fade-loader" color="#fafafa" />
      </Backdrop>
    </React.Fragment>
  );
};

export default misreport1;

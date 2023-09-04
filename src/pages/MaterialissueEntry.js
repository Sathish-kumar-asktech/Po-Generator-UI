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
import { useLayoutEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

function ViewMaterialReceipt() {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setDeleteMessage(false);
  };
  const [fromdate, setfromdate] = useState('');
  const [DeleteMessage, setDeleteMessage] = useState(false);
  const [deleteerror, setdeleteerror] = useState(false);
  const [todate, settodate] = useState('');
  //getmaterialhsr
  const [getmaterialhdr, setgetmaterialhdr] = useState([]);

  useEffect(() => {
    var date = new Date();

    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);

    var lastday = new Date(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    setfromdate(moment(firstday).format('YYYY-MM-DD'));
    settodate(moment(lastday).format('YYYY-MM-DD'));
    GetMaterialHdr(firstday, lastday);
  }, []);

  const history = useHistory();
  const addpages = () => {
    history.push(`/CreateMaterialIssueEntry`);
  };
  const updatepages = id => {
    history.push(`/CreateMaterialIssueEntry/${id}`);
  };
  const deletepoforweb = async id => {
    const token = localStorage.getItem('AuthToken');
    await axios.instance
      .delete(`DeleteissueEntry/${id}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data.length);
        if (res.data.length === 0) {
          setDeleteMessage(true);
          GetMaterialHdr(fromdate, todate);
        } else {
          setdeleteerror(true);
          GetMaterialHdr(fromdate, todate);
        }
      });
  };

  const DeleteAsk = Receiptid => {
    if (window.confirm('Are You Sure Delete This Record ?')) {
      deletepoforweb(Receiptid);
    } else {
    }
  };
  const GetMaterialHdr = async (Fromdate, Todate) => {
    const tokent = localStorage.getItem('authtoken');

    await axios.instance
      .post(
        `/GetallIssueentryhdr`,
        {
          BranchId: localStorage.getItem('Branch_Log'),
          Customer_Id: localStorage.getItem('Customer_Log'),
          fromdate: moment(Fromdate).format('YYYYMMDD'),
          todate: moment(Todate).format('YYYYMMDD'),
          Headoffice: localStorage.getItem('customer_HO'),
        },
        { Authorization: tokent, 'Content-Type': 'application/json' },
      )
      .then(res => {
        setgetmaterialhdr(res.data);
        console.log(getmaterialhdr, 'gethdr');
        console.log(res.data);
      });
  };

  const DeleteProductDetail = async Id => {};

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <h6 className="titlemie">Material Issue Entry</h6>
          <Card style={{ backgroundColor: 'white' }}>
            {/* <CardTitle tag="h5" className="d-flex justify-content-center mt-3" style={{color:'#58A7AA'}}>
                        Material Issue Entry
                    </CardTitle> */}
            <CardBody>
              <Row>
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
                    <Button1
                      color="primary"
                      onClick={() => GetMaterialHdr(fromdate, todate)}
                    >
                      View
                    </Button1>
                    <Button1
                      className="mx-3"
                      color="success"
                      onClick={addpages}
                    >
                      Add
                    </Button1>
                  </div>
                </Col>
              </Row>
              <TableContainer style={{ marginTop: '20px' }}>
                <Table className="InspectionTbl">
                  <TableHead>
                    <TableRow>
                      <TableCell>MI NO</TableCell>
                      <TableCell>MI Date</TableCell>
                      <TableCell>Contract No</TableCell>
                      {localStorage.getItem('customer_HO') === 'Y' ? (
                        <TableCell>Customer Name</TableCell>
                      ) : (
                        <TableCell>Branch Name</TableCell>
                      )}

                      <TableCell>Department</TableCell>
                      {/* <TableCell>Designation</TableCell> */}
                      {/* <TableCell>₹ Total Amount</TableCell> */}
                      <TableCell>Created By</TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getmaterialhdr.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.MINO}</TableCell>
                        <TableCell>
                          {moment(data.MIEDate).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                          {localStorage.getItem('Contract_Detail_No')}
                        </TableCell>
                        {/* <TableCell>{(data.Branch_Name==null)?"":data.Branch_Name}</TableCell> */}
                        {localStorage.getItem('customer_HO') === 'Y' ? (
                          <TableCell>
                            {localStorage.getItem('CustomerName')}
                          </TableCell>
                        ) : (
                          <TableCell>{data.Branch_Name}</TableCell>
                        )}

                        <TableCell>{data.DepartmentDesc}</TableCell>
                        {/* <TableCell>{data.Designation}</TableCell> */}
                        {/* <TableCell>{data.Total_Amount}</TableCell> */}
                        <TableCell>{data.User_Name}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updatepages(data.MaterialIsssueheaderid)
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() =>
                              DeleteAsk(data.MaterialIsssueheaderid)
                            }
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

      {DeleteMessage && (
        <SweetAlert
          title="Material Received  Deleted SuccessFully"
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
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={deleteerror}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Material Issued Can't be Delete
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default ViewMaterialReceipt;

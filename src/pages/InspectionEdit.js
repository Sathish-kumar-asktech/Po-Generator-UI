import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from '../axios';
import Snackbar from '@material-ui/core/Snackbar';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet,
} from 'react-device-detect';
import Button1 from 'reactstrap/lib/Button';
import numeral from 'numeral';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom';
import PrintIcon from '@material-ui/icons/Print';
import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import './outstanding.css';
import FileViewer from 'react-file-viewer';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Col,
  Row,
  Container,
} from 'reactstrap';
import { TablePagination } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from 'react-spinkit';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const filname =
  'http://target.asktek.in/padmahandler/api/getinspectionsummaryinvoice';
const pdf = 'pdf';
function InspectionEdit(props) {
  const classes = useStyles();
  const pages = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 400, 500,
    600, 700, 800, 900, 1000,
  ];
  const [page, setpage] = useState(0);
  const [rowsperpage, setrowsperpage] = useState(pages[page]);
  const [insepctionview, setinsepctionview] = useState([]);
  const [factory, setfactory] = useState([]);
  const history = useHistory();
  const [getbuyer, setgetbuyer] = useState('');
  const [getfactory, setgetfactory] = useState('');
  const [open, setopen] = useState(false);
  const [paynowcheckbox, setpaynowcheckbox] = useState(false);
  const [open1, setopen1] = useState(false);
  const [outstandingvalues, setoutstandingvalues] = useState([]);
  const [balanceaboyaunt, setbalanceaboyaunt] = useState(['']);
  const [totalbalanceamountvalue, settotalbalanceamountvalue] = useState(0);
  const [totalinvoiceaomunt, settotalinvoiceaomunt] = useState(0);
  const [collectionofamount, setcollectionofamount] = useState([]);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return outstandingvalues.slice(
      page * rowsperpage,
      (page + 1) * rowsperpage,
    );
  };

  useEffect(() => {
    getoutstanding();

    // GetinspectionReport()
  }, []);
  const getoutstanding = async () => {
    const tokent = await localStorage.getItem('authtoken');
    const cuslog = await localStorage.getItem('Customer_Log');
    console.log('cuss', cuslog);
    const branccc = await axios.instance
      .get(`/Outstanding/${cuslog}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res.data);
        setoutstandingvalues(res.data);
        let qtytotal = [];

        for (const data of res.data) {
          qtytotal.push(data.Balance);
        }
        var qtyvalue = 0;
        for (let i = 0; i < qtytotal.length; i++) {
          qtyvalue += qtytotal[i];
        }
        setbalanceaboyaunt(qtyvalue);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen1(false);
  };

  const GetOutstandingBillPrint = async id => {
    const tokent = await localStorage.getItem('authtoken');
    console.log(id);
    const InvoicePrint = await axios.instance
      .get(`/GetOutstandingBillPrint/${id}`, {
        headers: { Authorization: tokent, 'Content-Type': 'application/json' },
      })
      .then(async res => {
        const downloadprogress = await axios.instance
          .get('/GetOutstandingBill', { responseType: 'blob' })
          .then(res => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'OutstandingBill.pdf');
          });
      });
  };

  return (
    <div>
      <div>
        <Container fluid={true}>
          <h6 className="monthwisetitle">Out Standing Bill</h6>
          <Card className="">
            <CardBody>
              <Row lg="12" className="checkboxamount">
                {totalinvoiceaomunt != 0 ? (
                  <Col lg={2} style={{ marginTop: '33px' }}>
                    <div>
                      <p>
                        <span className="text-primary">Sum Of Amount:</span>
                        <div>
                          {numeral(totalinvoiceaomunt).format('0,0.00')}
                        </div>
                      </p>
                    </div>
                  </Col>
                ) : null}
                {totalinvoiceaomunt != 0 ? (
                  <Col lg={2} style={{ marginTop: '33px' }}>
                    <div>
                      <p>
                        <span className="text-primary">Balance To Pay:</span>
                        <div>
                          {numeral(totalbalanceamountvalue).format('0,0.00')}
                        </div>
                      </p>
                    </div>
                  </Col>
                ) : null}
                <Col lg={2} style={{ marginTop: '35px' }}>
                  {totalinvoiceaomunt != 0 ? (
                    <p>
                      <a
                        href="https://buy.stripe.com/test_8wMbJydNMa6Ia6k6os"
                        target="_blank"
                      >
                        <Button color="danger"> Pay Now</Button>
                      </a>
                    </p>
                  ) : null}
                </Col>
              </Row>
              <div className="Tabelinspection">
                <TableContainer>
                  <Table className="InspectionTbl">
                    <TableHead>
                      <TableRow>
                        <TableCell>Select </TableCell>
                        <TableCell>S.No </TableCell>
                        <TableCell align="left">Bill No</TableCell>
                        <TableCell>Bill Date</TableCell>
                        <TableCell>Bill Amount</TableCell>
                        <TableCell>Paid Amount</TableCell>
                        <TableCell>Balance Amount</TableCell>
                        <TableCell>Delay days</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {outstandingvalues.length != 0 ? (
                        changepage().map((data, index) => (
                          <TableRow>
                            <TableCell align="left">
                              <input
                                //ref={colorref}

                                // checked={repeatflag}
                                type="checkbox"
                                onClick={e => {
                                  console.log(e.target.checked);

                                  if (e.target.checked) {
                                    setpaynowcheckbox(e.target.checked);
                                    setcollectionofamount(
                                      [...collectionofamount],
                                      data,
                                    );
                                    settotalbalanceamountvalue(
                                      totalbalanceamountvalue + data.Balance,
                                    );
                                    settotalinvoiceaomunt(
                                      parseFloat(
                                        totalinvoiceaomunt + data.Net_Amount,
                                      ),
                                    );
                                    //console.log(totalinvoiceaomunt===0 ,"if")
                                  } else {
                                    setcollectionofamount(
                                      collectionofamount.filter(
                                        value =>
                                          value.Sales_Bill_Id !=
                                          data.Sales_Bill_Id,
                                      ),
                                    );
                                    settotalbalanceamountvalue(
                                      parseFloat(
                                        totalbalanceamountvalue - data.Balance,
                                      ),
                                    );
                                    settotalinvoiceaomunt(
                                      parseFloat(
                                        totalinvoiceaomunt - data.Net_Amount,
                                      ),
                                    );
                                    //console.log(collectionofamount.length===0,'Else')
                                  }
                                  // setpaynowcheckbox(e.target.checked)

                                  collectionofamount.push(
                                    data.Balance,
                                    data.Net_Amount,
                                  );

                                  console.log(data, 'df');
                                  console.log(totalbalanceamountvalue, 'total');
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell
                              style={{ cursor: 'pointer' }}
                              align="left"
                              onClick={() => {
                                console.log(data.Sales_Bill_No);
                                GetOutstandingBillPrint(data.Sales_Bill_Id);
                              }}
                            >
                              {data.Sales_Bill_No}
                            </TableCell>
                            <TableCell align="left">
                              {data.Sales_Bill_Date}
                            </TableCell>
                            <TableCell align="left">
                              {numeral(data.Net_Amount).format('0,0.00')}
                            </TableCell>
                            <TableCell align="left">
                              {numeral(data.Update_Received_Amount).format(
                                '0,0.00',
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {numeral(data.Balance).format('0,0.00')}
                            </TableCell>
                            <TableCell style={{ marginLeft: 20 }}>
                              {data.DelayDays}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableCell align="left">NO Data Found</TableCell>
                      )}
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell style={{ color: 'red' }}>
                          <b>{numeral(balanceaboyaunt).format('0,0.00')}</b>
                        </TableCell>
                        <TableCell></TableCell>

                        {/* <TableCell></TableCell> */}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  rowsPerPageOptions={pages}
                  count={outstandingvalues.length}
                  rowsPerPage={rowsperpage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
              <Backdrop open={open} className={classes.backdrop}>
                <Spinner name="ball-spin-fade-loader" color="#fafafa" />
                <p style={{ marginTop: '50px' }}>downloading Pdf...</p>
              </Backdrop>
            </CardBody>
          </Card>
        </Container>
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
  );
}

export default InspectionEdit;

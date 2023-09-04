import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './InspectionEdit.css'
import axios from '../axios'
import Snackbar from '@material-ui/core/Snackbar';
// import { PDFViewer } from 'react-view-pdf';
//import PDFViewer from 'pdf-viewer-reactjs'
import moment from 'moment'

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import  { useHistory } from  'react-router-dom'
import PrintIcon from '@material-ui/icons/Print';
import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import { PDFReader } from 'reactjs-pdf-reader';
import { MobilePDFReader } from 'reactjs-pdf-reader';

import FileViewer from 'react-file-viewer';
import {
  Card,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';
import {TablePagination }  from '@material-ui/core'; 
import {saveAs} from 'file-saver'
 import { makeStyles } from '@material-ui/core/styles';
 import  Spinner  from 'react-spinkit'
 import { DocumentViewer } from 'react-documents';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    
  },
}));

const filname = 'http://3.109.148.179/padmahandler/api/getinspectionsummaryinvoice'
const pdf = 'pdf'
function InspectionEdit(props) {

   

    return (
        <div>
          <div>
            <Card className="">
              <CardBody>
               
             
            <div style={{ height:'600px',backgroundColor:'white'}}>
            <iframe src="http://3.109.148.179/padmahandler/api/getinspectionsummaryinvoice" type="application/pdf"
  height="100%" width="100%"></iframe>
             
  
       {/* {/* <FileViewer
       
         fileType={pdf}
         filePath={filname}
         
         /> */}


 {/* <DocumentViewer
    queryParams="hl=Nl"
    url={'http://target.asktek.in/padmahandler/api/getinspectionsummaryinvoice'}
   >
  </DocumentViewer>  */}



  {/* <PDFViewer  disableSelect='Fit to Width' url="http://3.109.148.179/padmahandler/api/getinspectionsummaryinvoice" />   */}
   {/* <PDFViewer 
            document={{
                url: 'http://3.109.148.179/padmahandler/api/getinspectionsummaryinvoice',
            }}
        />  */}
  

     </div>
     

</CardBody>
 </Card>
 
          </div>
        </div>
    )
}

export default InspectionEdit

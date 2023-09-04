import React,{useState, useEffect} from 'react';

import './InspectionReport.css';
import {
    Card,
    CardBody,
    CardHeader,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Button,
    
    TabContent, 
    TabPane,
     Nav,
      NavItem, 
      NavLink,  
    CardTitle,
     CardText, 
    Row, Col
  } from 'reactstrap';
  import Select from 'react-select'

  import Table from '@material-ui/core/Table';
  import axios from '../axios'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'
import {TablePagination }  from '@material-ui/core'; 
import Chart from 'react-google-charts'
function InspectionReport() {
 
 

const [factoryinfo, setfactoryinfo] = useState([])
  const [Buyer, setBuyer] = useState([])
  const [factoryid, setfactoryid] = useState('0')
const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
   const [page, setpage] = useState(0)
   const [rowsperpage, setrowsperpage] = useState(pages[page])
   const pages1 = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
   const [page1, setpage1] = useState(0)
   const [rowsperpage1, setrowsperpage1] = useState(pages1[page1])
  const [buyerId, setbuyerId] = useState('0')
  const [griddata, setgriddata] = useState([]) 
  const [critical, setcritical] = useState([])
 
  const [defactdat, setdefactdat] = useState('0')
  const [fromdatee, setfromdatee] = useState('')
  const [toodate, settoodate] = useState('')
 
  const [error1, seterror1] = useState(false)
  const [error2, seterror2] = useState(false)
  const [error5, seterror5] = useState(false)
    const [Allfactory, setAllfactory] = useState('1')
  const [Allbuyer, setAllbuyer] = useState('1')
  const [Alldefect, setAlldefect] = useState('1')
  const [factoryvalueoption, setfactoryvalueoption] = useState([])
  const [Buyeroption, setBuyeroption] = useState([])

  var allbuyer = [
    {All: '0'}
      ];
var allfactory = [
  {All: '0'}
];
var alldefect = [
{All:'0'}
];


  
        
  
const getfactory = async e => {
  const factory = await axios.instance.get('/gen',  { headers: {'Authorization': localStorage.getItem('authtoken'),
  'Content-Type': 'application/json'
  }})
  setfactoryinfo(factory.data)
  
  const data  = factory.data 
  const optionvalue =  data.map(f =>(
   
    {
  
    'label' : f.AccName,
     'value' : f.AccId ,
    
  } 
  
  
  ))
  optionvalue.push({'label': 'All', 'value' : '0'})

  setfactoryvalueoption(optionvalue)
  console.log(optionvalue)
}


useEffect(() => {
 
  getfactory()
}, [])
const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  


  const handleChangeRowsPerPage = (event) => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return griddata.slice(page * rowsperpage, (page + 1) * rowsperpage)
  }

  const handleChangePage1 = (event, newPage) => {
    setpage1(newPage);
  };
  


  const handleChangeRowsPerPage1 = (event) => {
    setrowsperpage1(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage1 = () => {
    return critical.slice(page1 * rowsperpage1, (page1 + 1) * rowsperpage1)
  }

  
  const buyer =async e => {
    const buyers = await axios.instance.get('/Buyer',  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setBuyer(buyers.data)
    const  data =  buyers.data
    const optionvaluebuyer =  data.map(B =>(
   
      {
    
      'label' : B.Buyer,
       'value' : B.BuyerId ,
      
    } 
    
    
    ))
    optionvaluebuyer.push({'label': 'All', 'value' : '0'})
  
    setBuyeroption(optionvaluebuyer)
  }

   
  useEffect(() => {
   
    buyer()
    var date =  new Date()
    var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
    // var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)
    var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());




   setfromdatee(moment(firstday).format('YYYY-MM-DD'))
   settoodate(moment(lastday).format('YYYY-MM-DD'))
  }, [])
  

   const getReport = async e =>{
    if(factoryid === '0') {
         
      setAllfactory('1')
    }else {
      
     setAllfactory('0')
    }
    
    if(buyerId ==='0') {
     
     setAllbuyer('1')
    }else {
     
     setAllbuyer('0')
    }
     if((factoryid.length !=0)&&(buyerId.length !=0)){
     
    
      const getdata = await axios.instance.get(`/GetInsepctionReport/${Allfactory}/${factoryid}/${Allbuyer}/${buyerId}/${moment(fromdatee).format('YYYY-MM-DD')}/${moment(toodate).format('YYYY-MM-DD')}/${localStorage.getItem('usertype')}/${localStorage.getItem('userid')}/${defactdat}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
      }})
  
   if(getdata.data) {
     setgriddata(getdata.data)  
   }
  
   
     }else {
       if(factoryid.length === 0){
        seterror1(true)
       }
       if(buyerId.length === 0){
        seterror2(true)
       }
      
       if(defactdat.length === 0){
        seterror5(true)
       }
     }
   
    
     setTimeout(() => {
      seterror1(false)
      seterror2(false)
      
      seterror5(false)
     }, 2000);
}

const gettables = async (getid, e)  => {
  
  const gettables= await axios.instance.get(`/GetInspectiontables/${Allfactory}/${factoryid}/${Allbuyer}/${buyerId}/${moment(fromdatee).format('YYYY-MM-DD')}/${moment(toodate).format('YYYY-MM-DD')}/${getid}`,  { headers: {'Authorization': localStorage.getItem('authtoken'),
  'Content-Type': 'application/json'
  }})
  
  if (gettables.data) {
    setcritical(gettables.data)
    
  }
}


const changebuyer = (buyerid, e) =>  {
  if(buyerid === '0') {
     setbuyerId(buyerid)
    setAllbuyer('1')
   
  }else  {
   setbuyerId(buyerid)
   setAllbuyer(0)
  }
   
 }
 const changefactory = async (factoryid, e) => {
  
  if(factoryid === '0') {
     setfactoryid(factoryid)
    setAllfactory('1')
  }else  {
    setfactoryid(factoryid)
    setAllfactory('0')
  }
}

 const styles =  ({
   maringTop:20
 })






const changevalue =  async(type, e) => {
  setcritical([])
  setgriddata([])
  setdefactdat(type)
}







    return (
      <div>
        <Card>
        <CardBody>
          <div className="header">
            <h5>Inspection Summary</h5>
          </div>
         <div className="InspectionReportForm">
        <div  className="Factory">
        <lable ><b>Facotry</b></lable>
           
          
           <Select  defaultInputValue=''   defaultValue={{ 'label': "All", 'value': '0' }} options={factoryvalueoption} width={200}  onChange={(value) => changefactory(value.value)} />
            </div>
            <div  className="buyer">
            <lable ><b>Buyer</b></lable>
            <Select  defaultInputValue=''  defaultValue={{ 'label': "All", 'value': '0' }} options={Buyeroption} width={200}  onChange={(value) => changebuyer(value.value)} />
          
               
           
            {error2 ? <p className='errors'>please select Buyer</p> : ''}
        </div>
        <div className="fromdate">
        <lable><b>From Date</b></lable>
    
         <input type='date' value={fromdatee} id="fromdate" onChange={e => setfromdatee(e.target.value)} /> 
        
        </div>
      
        <div className="Todate">
        <lable><b>To Date</b></lable>
        <input type='date' value={toodate} id="todate" onChange={e => settoodate(e.target.value)}  />
       
        </div>
        <div className="DefectType">
        <lable><b>Defect</b></lable>
            <select value={defactdat} onChange={e => changevalue(e.target.value, e)}>
          
                  
            {alldefect.map((data) => (
                   <option selected value={data.All}>All</option>
                ))}
                <option  value="2">Major</option>
                <option value="3">Minor</option>
                <option value="1" >Critical</option>

            </select>
            {error5 ? <p className='errors'>please Defacttype</p> : ''}
        </div>
        <div className="submitbtn">
        <Button size="small" onClick={getReport}  color="primary">
          view
        </Button>
        </div>
        
        </div>
       
      </CardBody>
        </Card>
        
        <Card>
          <CardBody>
          <div class="container">
            <div className="">
            <p>DEFECT DESCRIPTION</p>
         
            
            </div>
  <div className="row">
    <div className="col-sm">
    <div className="Reportresuletbl">
        <TableContainer >
        {defactdat === '0' ? (
          <Table  className="tab1" >
          <TableHead>
            <TableRow className="table">
            <TableCell>Defect descriptions</TableCell>
             <TableCell>Critical</TableCell>
              <TableCell>Major</TableCell> 
                <TableCell >Minor</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
          
          {griddata.length !=0 ?  changepage().map((data) => (
              <TableRow>
                <TableCell >{data.CategoryDescription}</TableCell>
                <TableCell className="cell1" onClick={(e) => gettables(data.CategoryID, e) } >{data.Critical}</TableCell> 
               <TableCell onClick={(e) => gettables(data.CategoryID, e) } >{data.Major}</TableCell> 
                <TableCell onClick={(e) => gettables(data.CategoryID, e) }>{data.Minor}</TableCell> 
    
              </TableRow>
             
             )) : 
             <TableRow>
                <TableCell >No Data found</TableCell>
               
              </TableRow>
          }
          </TableBody>
        </Table>
        ) :
       
          <Table  className="tab1" >
            <TableHead>
              <TableRow className="table">
              <TableCell>Defect descriptions</TableCell>
            {defactdat === '1' ? <TableCell>Critical</TableCell> : ''}
               {defactdat === '2' ? <TableCell>Major</TableCell> : ''}
               {defactdat === '3' ?  <TableCell >Minor</TableCell> : ''}
              </TableRow>
            </TableHead>
            <TableBody>
            
            {griddata.length !=0 ? changepage().map((data) => (
                <TableRow>
                  <TableCell >{   data.CategoryDescription}</TableCell>
                 {defactdat === '1' ?  <TableCell className="cell1" onClick={(e) => gettables(data.CategoryID, e) } >{data.Critical === 0  ? '' :  data.Critical }</TableCell> : ''}
                 {defactdat === '2' ?  <TableCell onClick={(e) => gettables(data.CategoryID, e) } >{data.Major === 0  ?  '' : data.Major}</TableCell> : ''}
                 {defactdat === '3' ?  <TableCell onClick={(e) => gettables(data.CategoryID, e) }>{data.Minor === 0  ? '' : data.Minor}</TableCell> : ''}
      
                </TableRow>
               
               )): 
               
               <TableRow>
               <TableCell >No Data Found</TableCell>
             
             </TableRow>
               }
            </TableBody>
          </Table>
        
        
        
        
        
        
        
        }
   
<TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={griddata.length}
        rowsPerPage={rowsperpage}
        page={page}
        onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
    />


    </TableContainer>
    </div>
  
    </div>
   
   
   
   
    <div className="col-sm">
    <p className="insp">INSPECTION DETAIL</p>
    <div>
     
    </div>
    

      
    <TableContainer >
    {defactdat === 'ALL' ? (
   <Table  className="Reporttb2" >
     <TableHead>
       <TableRow>
       <TableCell >Inspection No</TableCell>
       <TableCell >Date</TableCell>
       <TableCell>Styleno</TableCell> 
       <TableCell>Pono</TableCell> 
       <TableCell >Shipqty</TableCell>
       {/* <TableCell>Style/No</TableCell>  */}
       <TableCell>Critical</TableCell> 
        <TableCell>Major</TableCell> 
         <TableCell >Minor</TableCell> 
     

       </TableRow>
     </TableHead>
     <TableBody>
     {critical.length !=0 ? changepage1().map((data) => (

         <TableRow>
           <TableCell>{data.InspectionCode}</TableCell>
           <TableCell >{data.InspectionDate}</TableCell>
           <TableCell>{data.Styleno}</TableCell>
           <TableCell >{data.Pono}</TableCell>
           <TableCell >{data.Shipqty}</TableCell>
            <TableCell >{data.Critical === 0 ? '' : data.Critical}</TableCell>
            <TableCell>{data.Major === 0 ? '' : data.Major}</TableCell>
              <TableCell>{data.Minor === 0 ? '' : data.Minor}</TableCell>
      
           
         </TableRow>
         )): 
         <TableRow>
         <TableCell >No Data Found</TableCell>
       
       </TableRow>
}
     </TableBody>
    
   </Table>
    ): 
    <Table  className="Reporttb2" >
     <TableHead>
       <TableRow>
       <TableCell >Inspection No</TableCell>
       <TableCell >Date</TableCell>
       <TableCell>Styleno</TableCell> 
       <TableCell>Pono</TableCell> 
       <TableCell >Shipqty</TableCell>
       {/* <TableCell>Style/No</TableCell>  */}
       {defactdat ==='Critical' ? <TableCell>Critical</TableCell> : ''} 
       {defactdat ==='Major' ? <TableCell>Major</TableCell> : ''}
       {defactdat ==='Minor' ?  <TableCell >Minor</TableCell> : ''}
      


       </TableRow>
     </TableHead>
     <TableBody>
     {critical.length !=0 ?  changepage1().map((data) => (

         <TableRow>
           <TableCell>{data.InspectionCode}</TableCell>
           <TableCell >{data.InspectionDate}</TableCell>
           <TableCell>{data.Styleno}</TableCell>
           <TableCell >{data.Pono}</TableCell>
           <TableCell >{data.Shipqty}</TableCell>
           {defactdat ==='Critical' ? <TableCell >{data.Critical === 0 ? '' : data.Critical}</TableCell> : '' }
           {defactdat ==='Major' ? <TableCell>{data.Major ===0 ? '': data.Major}</TableCell> : '' }
           {defactdat ==='Minor' ?  <TableCell>{data.Minor ===0 ? '': data.Minor}</TableCell> : '' }
      
           
         </TableRow>
         )) : 
         <TableRow>
         <TableCell >No Data Found</TableCell>
       
       </TableRow>
         
         
         }
        
     </TableBody>
    
   </Table>
    
    
    
    
    
    
    }

<TablePagination
        component="div"
        rowsPerPageOptions={pages1}
        count={critical.length}
        rowsPerPage={rowsperpage1}
        page={page1}
        onChangePage={handleChangePage1}
       onChangeRowsPerPage={handleChangeRowsPerPage1}
    />
 </TableContainer>
 
    </div>
    
  </div>
</div>
       
          </CardBody>
        </Card>
      
 </div>
    )
}

export default InspectionReport

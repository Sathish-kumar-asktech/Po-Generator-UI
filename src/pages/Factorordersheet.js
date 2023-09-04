import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './Factorordersheet.css';
import { Cancel, Category } from '@material-ui/icons';
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
  import Table from '@material-ui/core/Table';
  import axios from '../axios'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close';
import {TablePagination }  from '@material-ui/core'; 
import Chart from 'react-google-charts'
import Select from 'react-select'
function InspectionReport() {


 
  const [factoryoption, setfactoryoption] = useState([])
  const [buyeroption, setbuyeroption] = useState([])
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
 
  const [defactdat, setdefactdat] = useState('2')
  const [fromdatee, setfromdatee] = useState('')
  const [toodate, settoodate] = useState('')
 
  const [error1, seterror1] = useState(false)
  const [error2, seterror2] = useState(false)
  const [error5, seterror5] = useState(false)
    const [Allfactory, setAllfactory] = useState('1')

    const [Allstyleno, setAllstyleno] = useState('1')
    const [stylenoone, setstylenoone] = useState('0')
  const [Allbuyer, setAllbuyer] = useState('1')
  const [stylecollection, setstylecollection] = useState([])


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
  const data  =  factory.data
  const options = data.map(f => ({
    
      'label': f.AccName,
      'value': f.AccId
    
  }))
  options.push({'label': 'All', 'value': '0'})
  setfactoryoption(options)
}
        
  



useEffect(() => {
  
  getfactory()
}, [])
const handleChangePage1 = (event, newPage) => {
    setpage(newPage);
  };
  


  const handleChangeRowsPerPage = (event) => {
    setrowsperpage(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage = () => {
    return griddata.slice(page * rowsperpage, (page + 1) * rowsperpage)
  }

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  


  const handleChangeRowsPerPage1 = (event) => {
    setrowsperpage1(parseInt(event.target.value, 10));
    // setpage(0);
  };

  const changepage1 = () => {
    return critical.slice(page1 * rowsperpage1, (page1 + 1) * rowsperpage1)
  }

  

  const buyerdata =async e => {
    const buyers = await axios.instance.get('/Buyer',  { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setBuyer(buyers.data)
    const data =  buyers.data
   const  options= data.map(b => ({
     'label' : b.Buyer,
     'value' : b.BuyerId
   }))
   options.push({'label': 'All', 'value' : '0'})
   setbuyeroption(options)
  }
   
  const Geststyleno =  async() => {
    const getstyle =  await axios.instance.get('/style', { headers: {'Authorization': localStorage.getItem('authtoken'),
    'Content-Type': 'application/json'
    }})
    setstylecollection(getstyle.data)
  //   const data =  getstyle.data
  //   const  options= data.map(b => ({
  //     'label' : b.lable,
  //     'value' : b.value
  //   }))
  //  // options.push({'label': 'All', 'value' : '0'})
  //  setstylecollection(options)
  }



  useEffect(() => {
   
    buyerdata()
    var date =  new Date()
    var firstday =  new Date(date.getFullYear(), date.getMonth(),1)
    // var lastday =  new Date(date.getFullYear(), date.getMonth()+1,0)
    var lastday = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());




   setfromdatee(moment(firstday).format('YYYY-MM-DD'))
   settoodate(moment(lastday).format('YYYY-MM-DD'))
   Geststyleno()
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

    if(stylenoone === '0') {
      setAllstyleno('1')
    }
    else {
      setAllstyleno('0')
    }
     if((factoryid.length !=0)&&(buyerId.length !=0)){
     
    
      const getdata = await axios.instance.post('/getfactoryordersheet' , {
        Allfactory: Allfactory,
        FactoryId: factoryid,
        AllBuyer: Allbuyer,
        BuyerId: buyerId,
        Fromdate: moment(fromdatee).format('YYYY-MM-DD'),
        Todate: moment(toodate).format('YYYY-MM-DD'),
        AllStyleno: Allstyleno,
        Styleno: stylenoone} ,
       { headers: {'Authorization': localStorage.getItem('authtoken'),
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


const chagenstyle = (style, e)  => {
 
  if(style.length !=0) {
    setstylenoone(style)
    setAllstyleno('0')
  }else{
    setstylenoone('0')
    setAllstyleno('1')
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

const changevalue =  async(type, e) => {

  setdefactdat(type)
}
const clear = () => {
  document.getElementById('10').value= ''
  setAllstyleno('1')
}

    return (
      <div>
        <Card>
        <CardBody>
          <div className="header">
            <h5>Factory Order Sheet</h5>
          </div>
         <div className="InspectionReportForm">
        <div className="Factory2">
            <lable><b>Factory</b></lable>
            {/* <select value={factoryid}    onChange={e => changefactory(e.target.value, e)}>
            {allfactory.map((data) => (
                   <option selected value={data.All}>All</option>
                ))}
                {factoryinfo.map((data) => (
                      <option value={data.AccId}  >{data.AccName}</option>
                   ))}
            </select> */}
            <Select defaultValue={{'label': 'All', 'value': '0'}} options={factoryoption} onChange={(value)  => changefactory(value.value)} />
            {error1 ? <p className='errors'>please select Factory</p> : ''}
            </div>
            <div className="buyer2">
            <lable><b>Buyer</b></lable>
            <Select defaultValue={{'label': 'All', 'value': '0'}} options={buyeroption} onChange={(value)  => changebuyer(value.value)} />
           
               
                {/* <select value={buyerId}  id="16"    onChange={(e) => changebuyer(e.target.value, e)}  >
                {allbuyer.map((data) => (
                <option selected value={data.All}  >All</option>
                 ))}

                   {Buyer.map((data) => (
                     <option  value={data.BuyerId} >{data.Buyer}</option>
                   ))}

            </select> */}
            {error2 ? <p className='errors'>please select Buyer</p> : ''}
        </div>
                    <div className='styleselect'  >
           
            <lable><b>Style/NO</b></lable>
          
            {/* <Select defaultValue={{'label': 'All', 'value': '0'}} options={stylecollection} onChange={(value)  => changebuyer(value.value)} />
            */}
              


                   

            

          <input className='styleinput'  id='10' placeholder='Select Style' type="text" list="data" onChange={e => chagenstyle(e.target.value)}/>

<datalist id="data" style={{width:'150px'}} >
 

{stylecollection.map((data) => (
                <option  value={data.Styleno} key={data.Styleno} >{data.Styleno}</option>
                 ))}
</datalist>
            {error2 ? <p className='errors'>please select Buyer</p> : ''}
           
        </div>
           <div style={{marginLeft:'50px', marginTop:'30px'}}>
           {stylenoone.length > 1 ? (

            
<IconButton  size="medium" color="secondary" onClick={clear}  >
<CloseIcon fontSize="small"  />
</IconButton>
) : <p></p>}
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
        {/* <lable><b>Insp.Staus</b></lable>
            <select value={defactdat} onChange={e => changevalue(e.target.value, e)}>
          
                  
                
                <option selected value="y">Yes</option>
                <option value="N">No</option>
                

            </select>
            {error5 ? <p className='errors'>please Inspetion Status</p> : ''} */}
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
          <TableContainer >
           {griddata.length !=0  ? (
      <Table  className="tbl1" >
        <TableHead>
          <TableRow className="table">
          <TableCell>s.no</TableCell>
          <TableCell>DATE</TableCell>
          <TableCell>Factory</TableCell>
           <TableCell>Buyer</TableCell> 
             <TableCell >FOS NO</TableCell> 
             <TableCell>Style</TableCell>
             <TableCell>Order qty</TableCell>
             {/* <TableCell>inspStatus</TableCell> */}
            
          </TableRow>
        </TableHead>
        <TableBody>
        {changepage().map((data) => (
             
            <TableRow>
             <TableCell>{data.sno}</TableCell>
             <TableCell>{data.FOSDATE}</TableCell>
             <TableCell className="datecolum">{data.FACTOR}</TableCell>
             <TableCell>{data.Buyer}</TableCell>
             <TableCell>{data.FOSNO}</TableCell>
           
             <TableCell>{data.StyleNo}</TableCell>
             <TableCell className="shipqty">{data.ORDERQTY}</TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
                     </TableRow>
       
           ))}
        </TableBody>
      </Table>
           ) : 
           <Table  className="tbl1" >
           <TableHead>
             <TableRow className="table">
             <TableCell>s.no</TableCell>
             <TableCell>DATE</TableCell>
          <TableCell>Factory</TableCell>
           <TableCell>Buyer</TableCell> 
             <TableCell >FOS NO</TableCell> 
             <TableCell>Style</TableCell>
             <TableCell>Order qty</TableCell>
             
             </TableRow>
           </TableHead>
           <TableBody>
           
               <TableRow>
                <TableCell>No Data found</TableCell>
               
               </TableRow>
        
           </TableBody>
         </Table>
           
           
           }     
           
         </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={griddata.length}
        rowsPerPage={rowsperpage}
        page={page}
        onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
    /> 
          </CardBody>
        </Card>
   </div>
    )
}

export default InspectionReport

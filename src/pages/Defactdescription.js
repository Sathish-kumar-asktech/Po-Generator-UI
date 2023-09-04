import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from '../axios'
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {TablePagination }  from '@material-ui/core';
import './Defectdescription.css'
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

function Defactdescription(props) {

    const [Defactdescription, setDefactdescription] = useState([])
    const pages = [5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,400,500,600,700,800,900,1000]
    const [page, setpage] = useState(0)
    const [rowsperpage, setrowsperpage] = useState(pages[page])
    useEffect(() => {
       
    }, [])
  
    const handleChangePage = (event, newPage) => {
        setpage(newPage);
      };
      
    
    
      const handleChangeRowsPerPage = (event) => {
        setrowsperpage(parseInt(event.target.value, 10));
      };
    
      const changepage = () => {
        if(Defactdescription.length !=0){
          return Defactdescription.slice(page * rowsperpage, (page + 1) * rowsperpage)
        }
       
      }



    return (
        <div>
             <Card>
        <CardBody>
    <TableContainer >
  
         
      <Table  className="defactdescription" >
        <TableHead>
          <TableRow>
          <TableCell>Category</TableCell>
          <TableCell>Subcategory</TableCell>
          <TableCell align="left">Critical</TableCell>
          <TableCell align="left">Major</TableCell>
          <TableCell align="left">Minor</TableCell>
           
            <TableCell align="left">Image1</TableCell>
            <TableCell align="left">Image2</TableCell>
            <TableCell align="left">Image3</TableCell>
            <TableCell align="left">Image4</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
     
            
             {Defactdescription.map((data) => (

            
            <TableRow>
              <TableCell >{data.CategoryDescription}</TableCell>
            
            <TableCell >{data.SubCategoryDescription}</TableCell>
            <TableCell >{data.Critical}</TableCell>
            
              <TableCell >{data.Major}</TableCell>
              <TableCell >{data.Minor}</TableCell>
            
              <TableCell className='defactsimge1' >
              {data.ImageURL1 ===  'No Image Found' ? 'No Image found' : <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL1} />}
                </TableCell>
                <TableCell className='defactsimge2' >
                  {data.ImageURL2 ===  'No Image Found' ? 'No Image found' :  <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL2} />  }
                
              </TableCell>
               <TableCell className='defactsimge3'  >    {data.ImageURL3 ===  'No Image Found' ? 'No Image found' :  <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL3} /> }
               </TableCell>
            
              <TableCell className='defactsimge4' >   {data.ImageURL4 ===  'No Image Found' ? 'No Image found' :    <img src={axios.baseURL+ "GetDefactsimage/" +data.ImageURL4} /> }</TableCell>
            
            </TableRow>
             
            
            
            
             ))}
        </TableBody>
      </Table>
    
         
    </TableContainer>
    <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        count={Defactdescription.length}
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

export default Defactdescription

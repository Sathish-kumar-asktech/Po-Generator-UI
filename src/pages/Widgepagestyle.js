<div>
    
   <div>
          <div>
            <Card className="">
              <CardBody>
                <h6 className="titleviewinspection">Dashboard</h6>
                <div className="threecard" id="threecard">
   <Row>
          
         {card1 ? (

          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card className="card1" onClick={Getdatafordashboard1}>
             
              <CardBody className="card133bd"  id="card213">
              <EmojiObjectsIcon size="large"  />
               <p>Pending-</p> <b>{pendingcount}</b>
              </CardBody>
               
            </Card>

          </Col>

):<Col lg={4} md={6} sm={6} xs={12} className="mb-3">
<Card className="card1" id="card213" onClick={Getdatafordashboard1}>
 
  <CardBody className="card1bd">
  <EmojiObjectsIcon size="large"  />
   <p>Pending </p>  - <b>{pendingcount}</b>
  </CardBody>
   
</Card>

</Col>
}
        </Row>
        <Row>
          
         {card2 ? (

          <Col lg={23} md={26} sm={26} xs={12}>
            <Card className="card1"  onClick={getdsh1}>
             
              <CardBody className="card133bd" id="card212">
              <EmojiObjectsIcon size="large"  />
               <p>Approved</p>  - <b>{completecouts}</b>
              </CardBody>
               
            </Card>

          </Col>
):
<Col lg={23} md={26} sm={26} xs={12}>
            <Card className="card1"  onClick={getdsh1}>
             
              <CardBody className="card13bd" id="card212">
              <EmojiObjectsIcon size="large"  />
               <p>Approved</p>  - <b>{completecouts}</b>
              </CardBody>
               
            </Card>

          </Col> }
         
        </Row>
        <Row>
          
         
{card3 ? (
          <Col lg={23} md={26} sm={26} xs={12}>
            <Card className="card1"  onClick={purchasepo1}>
             
              <CardBody className="card133bd" id="card211">
              <EmojiObjectsIcon size="large"  />
               <p>Po Status</p>  - <b>{statuscounsts}</b>
              </CardBody>
               
            </Card>

          </Col>
): <Col lg={23} md={26} sm={26} xs={12}>
<Card className="card1" id="card211" onClick={purchasepo1}>
 
  <CardBody className="card12bd">
  <EmojiObjectsIcon size="large"  />
   <p>Po Status</p>  - <b>{statuscounsts}</b>
  </CardBody>
   
</Card>

</Col>}
         
        </Row>
 
 

   </div>
            <div className="Tabelinspections">

             
            <TableContainer >

      <Table  className="InspectionTbls1" >
        <TableHead>
      
          <TableRow>
         
         
          <TableCell>#</TableCell>
            <TableCell align="left">Po Date</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell> Amount</TableCell>
            <TableCell>Status </TableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
      
            
        {dashboarddata.length !=0 ?  (     changepage().map((data,index) => (

             
            <TableRow >
            <TableCell align="left" >{data.Order_No}</TableCell>
            <TableCell align="left" >{data.Order_Date}</TableCell>
            <TableCell align="left" >{data.Branch_Name}</TableCell>
            <TableCell align="left">₹{numeral(data.NET_AMOUNT).format('0,0.00')}</TableCell>
            {data.Status ==='Bill Raised' ? (
            <TableCell color='red' style={{color:'#e6f037'}} align="left" >{data.Status}</TableCell>
            ):(data.Status ==='Accepted' ?  (            
               <TableCell color='red' style={{color:'#41ef35'}} align="left" >{data.Status}</TableCell>
            ): (data.Status ==='SO Raised' ?  ( 
              <TableCell color='red' style={{color:'#37cbef'}} align="left" >{data.Status}</TableCell>
            ):(data.Status ==='Not Approved' ? (
            <TableCell color='red' style={{color:'red'}} align="left" >{data.Status}</TableCell>
            ):(data.Status ==='Approved' ?  (
              <TableCell color='red' style={{color:'#008001'}} align="left" >{data.Status}</TableCell>
            ): (data.Status ==='DC Raised' ?  (
              <TableCell color='red' style={{color:'#d30c8b'}} align="left" >{data.Status}</TableCell>
            ): <TableCell align="left"></TableCell>)))))}
            
                
                  
                 
                
            </TableRow>
 )) ) : (
  <TableCell align="left">NO Data Found</TableCell>
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
     {/* <Backdrop  open={open} className={classes.backdrop} >
    
           
<Spinner name="ball-spin-fade-loader"  color='#fafafa' />
<p style={{marginTop: '50px'}}>downloading Pdf...</p>

</Backdrop> */}
</CardBody>
 </Card>
 {/* <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Transaction  deleted successfully"

          /> */}
          </div>
        </div>
    </div>
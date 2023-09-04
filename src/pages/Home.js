import React, { useEffect } from 'react'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import logoqa from '../../src/assets/img/sidebar/homepagebanner.jpg'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    isTablet
  } from "react-device-detect";
function Home() {
    useEffect(() => {
      const  handleSidebarControlButton = event => {
           
        
            document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
          };
          if(isTablet || isMobile) {
              handleSidebarControlButton()
          }
    }, [])
    return (
        <div style={{}} >
          <Card>
              <CardBody>
                   <img  src={logoqa} width='100%' height="90%"  />
                   </CardBody>
                   </Card>
        </div>
    )
}

export default Home

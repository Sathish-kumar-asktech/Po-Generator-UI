import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logoqa from '../../assets/img/sidebar/lodjdjd.png'
import SourceLink from 'components/SourceLink';
import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './Sidebar.css'
import {
  MdAddShoppingCart,
  MdPerson,
  MdToc,
  MdCreate,
  MdExtension,
  MdPageview,
  MdInsertDriveFile,
  MdKeyboardArrowDown,
  MdDashboard,
  MdShoppingCart,
  MdExitToApp
} from 'react-icons/md';
import {GiFactory} from 'react-icons/gi'
import { NavLink } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet
} from "react-device-detect";
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { AiFillTag,AiFillTags , AiFillSignal } from "react-icons/ai";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};






const navItemss = [
 
 
  { to: '/Dashboard', name: 'Dashboard', exact: false, Icon: MdDashboard,  },
  
 
 
 
];

const navComponents = [
  // { to: '/inspection', name: 'Create Inspection', exact: false, Icon: MdCreate },
  { to: '/outstanding', name: 'OutStanding', exact: false, Icon: MdPageview },
  //  { to: '/inspectionsummary', name: 'inspection SUMMARY', exact: false, Icon: MdInsertDriveFile },
  //  { to: '/inspectionReport', name: 'inspection REPORT', exact: false, Icon: BsReverseLayoutTextWindowReverse },
  //  {to: '/Factoryordersheet', name: 'Factor Order Sheet', exact: false, Icon: GiFactory},
   {to: '/logout', name: 'log out', exact: false, Icon: MdExitToApp}

];

const navItems = [
  { to: '/viewpo', name: 'Purchase Order', exact: false, Icon: AiFillTags },

  { to: '/Approval', name: 'Send Po', exact: false, Icon: AiFillSignal }, 


 
 
 
];




const navItemss1 = [
  // { to: '/Home', name: 'Home', exact: false, Icon: MdDashboard },
  { to: '/Dashboard', name: 'Dashboard', exact: false, Icon: MdDashboard },

 
 
 
];


const navComponents1 = [
  // { to: '/inspection', name: 'Create Inspection', exact: false, Icon: MdCreate },
 
   { to: '/outstanding', name: 'OutStanding', exact: false, Icon: MdPageview },
 
  //  { to: '/inspectionsummary', name: 'inspection SUMMARY', exact: false, Icon: MdInsertDriveFile },
  //  { to: '/inspectionReport', name: 'inspection REPORT', exact: false, Icon: BsReverseLayoutTextWindowReverse },
  //  {to: '/Factoryordersheet', name: 'Factor Order Sheet', exact: false, Icon: GiFactory},
  { to: '/Monthwiseorder', name: 'MIS', exact: false, Icon: AiFillSignal },
   {to: '/logout', name: 'log out', exact: false, Icon: MdExitToApp},
   
  
  ];

const navItems1 = [

  { to: '/viewpo', name: 'Purchase Order', exact: false, Icon: AiFillTags },
   { to: '/Approval', name: 'Po Approval', exact: false, Icon: AiFillSignal }, 
   

 
 
];

const navItemss2 = [
  // { to: '/Home', name: 'Home', exact: false, Icon: MdDashboard },
  { to: '/Dashboard', name: 'Dashboard', exact: false, Icon: MdDashboard },
  

 
 
 
];

const navComponents2 = [
  // { to: '/inspection', name: 'Create Inspection', exact: false, Icon: MdCreate },
   { to: '/outstanding', name: 'OutStanding', exact: false, Icon: MdPageview },

 
  //  { to: '/inspectionsummary', name: 'inspection SUMMARY', exact: false, Icon: MdInsertDriveFile },
  //  { to: '/inspectionReport', name: 'inspection REPORT', exact: false, Icon: BsReverseLayoutTextWindowReverse },
  //  {to: '/Factoryordersheet', name: 'Factor Order Sheet', exact: false, Icon: GiFactory},
  { to: '/Monthwiseorder', name: 'MIS', exact: false, Icon: AiFillSignal },
   {to: '/logout', name: 'log out', exact: false, Icon: MdExitToApp},
   

  ];

const navItems2 = [
 // { to: '/Purchaseorder', name: 'Purchase Order ', exact: false, Icon: AiFillTag },
  { to: '/viewpo', name: 'Purchase Order', exact: false, Icon: AiFillTags },
  //  { to: '/Approval', name: 'Po Approval', exact: false, Icon: AiFillSignal }, 
  
 
 
];

const navItems3 = [
  { to: '/PoAccept', name: 'Po Accept ', exact: false, Icon: AiFillTag },
  { to: '/salesorder', name: 'Sale Order ', exact: false, Icon: AiFillTag },
   
  
  
 ];
 const navComponents3 = [
  // { to: '/inspection', name: 'Create Inspection', exact: false, Icon: MdCreate },
  
  
 
  //  { to: '/inspectionsummary', name: 'inspection SUMMARY', exact: false, Icon: MdInsertDriveFile },
  //  { to: '/inspectionReport', name: 'inspection REPORT', exact: false, Icon: BsReverseLayoutTextWindowReverse },
  //  {to: '/Factoryordersheet', name: 'Factor Order Sheet', exact: false, Icon: GiFactory},
  { to: '/Monthwiseorder', name: 'MIS', exact: false, Icon: AiFillSignal },
   {to: '/logout', name: 'log out', exact: false, Icon: MdExitToApp},
   

  ];

  // const navcomponents4=[
  //   { to: '/Monthwiseorder', name: 'MIS', exact: false, Icon: AiFillSignal }
  // ]


const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => (event) => {
   
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];
      return {
        [`isOpen${name}`]: !isOpen,
      };
    }); 
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };


  


  render() {
 


    return (
      
        
      
          
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        {localStorage.getItem('approvereq') ==='Y' && localStorage.getItem('AdminUser') === 'N' ?  (
        <div className={bem.e('content')}>
          <Navbar>
          
          
              {/* <span className="text-white">
               <img src={logoqa} height="120px" width="200px"  />
              </span> */}
        
          </Navbar>
          {  isMobile || isTablet ? (

          
          <Nav vertical>
          {navItemss.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')} onClick={this.handleSidebarControlButton}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              {/* <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Master</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink> */}
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navItems.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')} onClick={this.handleSidebarControlButton}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {navComponents.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}  onClick={this.handleSidebarControlButton}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
              
            ))}
          </Nav>
        ) : 
          <Nav vertical>
          {navItemss.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
            
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navItems.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')} >
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {navComponents.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
              
            ))}
          </Nav> }
        </div>
         ):
         localStorage.getItem('Special_User1') ==='Y' || localStorage.getItem('AdminUser1') === 'Y' ? (
<div className={bem.e('content')}>
          <Navbar>
          
          
              {/* <span className="text-white">
               <img src={logoqa} height="120px" width="200px"  />
              </span> */}
        
          </Navbar>
          {  isMobile || isTablet ? (

          
          <Nav vertical>
        
        <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
            
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navItems3.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')} >
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {navComponents3.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
              
            ))}
        
        

          </Nav>
        ) : 
          <Nav vertical>
          
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
            
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navItems3.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')} >
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {navComponents3.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
              
            ))}
          </Nav> }
        </div>
         ):
         
         <div className={bem.e('content')}>
         <Navbar>
         
{/*          
             <span className="text-white" >
             <img src={logoqa} height="120px" width="230px" />
              
             </span>
        */}
         </Navbar>
         {isMobile  || isTablet   ? (

         
         <Nav vertical>
         {navItemss1.map(({ to, name, exact, Icon }, index) => (
               <NavItem key={index} className={bem.e('nav-item')} onClick={this.handleSidebarControlButton}>
                 <BSNavLink
                   id={`navItem-${name}-${index}`}
                   className="text-uppercase"
                   tag={NavLink}
                   to={to}
                   activeClassName="active"
                   exact={exact}
                 >
                   <Icon className={bem.e('nav-item-icon')} />
                   <span className="">{name}</span>
                 </BSNavLink>
               </NavItem>
             ))}

           <NavItem
             className={bem.e('nav-item')}
             onClick={this.handleClick('Components')}
           >
            
           </NavItem>
           <Collapse isOpen={this.state.isOpenComponents}>
             {navItems1.map(({ to, name, exact, Icon }, index) => (
               <NavItem key={index} className={bem.e('nav-item')} onClick={this.handleSidebarControlButton}>
                 <BSNavLink
                   id={`navItem-${name}-${index}`}
                   className="text-uppercase"
                   tag={NavLink}
                   to={to}
                   activeClassName="active"
                   exact={exact}
                 >
                   <Icon className={bem.e('nav-item-icon')} />
                   <span className="">{name}</span>
                 </BSNavLink>
               </NavItem>
             ))}
           </Collapse>

           {navComponents1.map(({ to, name, exact, Icon }, index) => (
             <NavItem key={index} className={bem.e('nav-item')} onClick={this.handleSidebarControlButton}>
               <BSNavLink
                 id={`navItem-${name}-${index}`}
                 className="text-uppercase"
                 tag={NavLink}
                 to={to}
                 activeClassName="active"
                 exact={exact}
                 
               >
                 <Icon className={bem.e('nav-item-icon')} />
                 <span className="">{name}</span>
               </BSNavLink>
             </NavItem>
             
           ))}
         </Nav>
         ):
          localStorage.getItem('AdminUser') === 'Y' || localStorage.getItem('Approval2') === 'Y' || localStorage.getItem('Approval3') === 'Y ' ? (
    
         
          <Nav vertical>
          {navItemss1.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
 
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              {/* <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Master</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink> */}
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navItems1.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
 
            {navComponents1.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                  
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
              
            ))}
          </Nav>






          )  :
          localStorage.getItem('AdminUser') === 'N' ? (
          <Nav vertical>
            {navItemss2.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
  
              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('Components')}
              >
                {/* <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    <MdExtension className={bem.e('nav-item-icon')} />
                    <span className=" align-self-start">Master</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenComponents
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink> */}
              </NavItem>
              <Collapse isOpen={this.state.isOpenComponents}>
                {navItems2.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>
  
              {navComponents2.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                    
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
                
              ))}
          </Nav>): <div></div>}
          
       </div>
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         }
      </aside>





     
      
    );
  }
}

export default Sidebar;

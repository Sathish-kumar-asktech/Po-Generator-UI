import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logoqa from '../../assets/img/sidebar/lodjdjd.png';
import SourceLink from 'components/SourceLink';
import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './Sidebar.css';
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
  MdExitToApp,
  MdArrowDropDownCircle,
  MdChromeReaderMode,
  MdAccountCircle,
} from 'react-icons/md';
import { GiFactory } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet,
} from 'react-device-detect';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { AiFillTag, AiFillTags, AiFillSignal } from 'react-icons/ai';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';

const sidebarBackground = {
  // backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'black',
};

const navComponents = [
  { to: '/Dashboard', name: 'Dashboard', exact: false, Icon: MdDashboard },
  {
    to: '/ContractDtl',
    name: 'Contract Detail',
    exact: false,
    Icon: MdChromeReaderMode,
  },
  { to: '/viewpo', name: 'Purchase Order', exact: false, Icon: AiFillTags },
  { to: '/Approval', name: 'Po Approval', exact: false, Icon: AiFillSignal },
  {
    to: '/CustomerUserReg',
    name: 'User Registration',
    exact: false,
    Icon: MdAccountCircle,
  },
  {
    to: '/Department',
    name: 'Department',
    exact: false,
    Icon: MdAccountCircle,
  },
  {
    to: '/ViewMaterialReceipt',
    name: 'Material Receipt',
    exact: false,
    Icon: MdAccountCircle,
  },
  {
    to: '/MaterialIssueEntry',
    name: 'Material Issue',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  // { to: '/outstanding', name: 'OutStanding', exact: false, Icon: MdPageview },
];

const navComponents1 = [
  { to: '/Dashboard', name: 'Dashboard', exact: false, Icon: MdDashboard },
  { to: '/viewpo', name: 'Purchase Order', exact: false, Icon: AiFillTags },
  // { to: '/outstanding', name: 'OutStanding', exact: false, Icon: MdPageview },
  {
    to: '/ViewMaterialReceipt',
    name: 'Material Receipt',
    exact: false,
    Icon: MdAccountCircle,
  },
  {
    to: '/MaterialIssueEntry',
    name: 'Material Issue',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  {
    to: '/Department',
    name: 'Department',
    exact: false,
    Icon: MdAccountCircle,
  },
];

const navComponents2 = [
  {
    to: '/Monthwiseorder',
    name: 'Month Wise Order Status',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  // { to: '/ViewMaterialReceipt', name: 'Material Receipt', exact: false, Icon: MdAccountCircle},
  {
    to: '/MaterialIssue',
    name: 'Material Issue Report',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: '/Stock', name: 'Stock Report', exact: false, Icon: MdShoppingCart },
  { to: '/outstanding', name: 'OutStanding', exact: false, Icon: MdPageview },
  { to: '/potracking', name: 'Po Tracking', exact: false, Icon: MdPageview },
  {
    to: '/MaterialReceiptReport',
    name: 'Material Receipt Report',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
];

const navComponents3 = [
  { to: '/logout', name: 'log out', exact: false, Icon: MdExitToApp },
  // { to: '/materialreceipt', name: 'Material Receipt', exact: false, Icon: MdAccountCircle},
  // { to: '/ViewMaterialReceipt', name: 'Material Receipt', exact: false, Icon: MdAccountCircle},
];

const navComponents4 = [
  { to: '/PoAccept', name: 'Po Accept ', exact: false, Icon: AiFillTag },
  { to: '/salesorder', name: 'Sale Order ', exact: false, Icon: AiFillTag },
];

// const nav=[
//   {to: '/ContractDtl', name: 'Contract Detail', exact: false, Icon: MdChromeReaderMode},
// ]

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Nav vertical>
            <button class="button">PO GENARATOR</button>
            {localStorage.getItem('AdminUser') == 'N' &&
              localStorage.getItem('Approval3') == 'N' &&
              localStorage.getItem('Approval2') == 'N' && (
                <>
                  {navComponents1.map(({ to, name, exact, Icon }, index) => (
                    <NavItem key={index} className={bem.e('nav-item')}>
                      <BSNavLink
                        style={{height:"40px"}}
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
                </>
              )}
            {localStorage.getItem('AdminUser') == 'Y' &&
              localStorage.getItem('Approval3') == 'N' &&
              localStorage.getItem('Approval2') == 'N' && (
                <>
                  {navComponents.map(({ to, name, exact, Icon }, index) => (
                    <NavItem key={index} className={bem.e('nav-item')}>
                      <BSNavLink
                        style={{height:"40px"}}
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
                </>
              )}
            {localStorage.getItem('AdminUser') == 'N' &&
              localStorage.getItem('Approval3') == 'N' &&
              localStorage.getItem('Approval2') == 'Y' && (
                <>
                  {navComponents.map(({ to, name, exact, Icon }, index) => (
                    <NavItem key={index} className={bem.e('nav-item')}>
                      <BSNavLink
                         style={{height:"40px"}}
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
                </>
              )}
            {localStorage.getItem('Special_User1') == 'Y' ? null : (
              <>
                <NavItem
                  className={bem.e('nav-item')}
                  onClick={this.handleClick('Components')}
                >
                  <BSNavLink className={bem.e('nav-item-collapse')}  style={{height:"40px"}}>
                    <div className="d-flex">
                      {/* <MdExtension className={bem.e('nav-item-icon')} /> */}
                      <span className=" align-self-start">MIS</span>
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
                  </BSNavLink>
                </NavItem>
                <Collapse isOpen={this.state.isOpenComponents}>
                  {navComponents2.map(({ to, name, exact, Icon }, index) => (
                    <NavItem key={index} className={bem.e('nav-item')}>
                      <BSNavLink
                        style={{height:"40px"}}
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
              </>
            )}
            {localStorage.getItem('Special_User1') == 'Y' && (
              <>
                {navComponents4.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                       style={{height:"40px"}}
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
              </>
            )}
            {navComponents3.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                   style={{height:"40px"}}
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
        </div>
      </aside>
    );
  }
}

export default Sidebar;

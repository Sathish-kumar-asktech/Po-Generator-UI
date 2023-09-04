import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React, { useEffect, useState } from 'react';

import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import bn from 'utils/bemnames';
import { useStateValue } from '../../StateProvider';
import './Header.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  Logout = () => {
    localStorage.removeItem('QaInsptid');
    localStorage.removeItem('QainspectId');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('ponum');
    localStorage.removeItem('cateid');
    localStorage.removeItem('usertype');
    localStorage.removeItem('pono');
    localStorage.removeItem('authtoken');
  };

  render() {
    const { isNotificationConfirmed } = this.state;
    // const [{ user } , dispatch] = useStateValue();
    // const [userinf, setuserinf] = useState([])
    // useEffect(() => {
    //  setuserinf(user)
    // }, [user])
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <IconButton
            onClick={this.handleSidebarControlButton}
            sx={{ border: '1px solid',fontWeight:600, borderRadius: '50%' }}
          >
            <MenuOpenRoundedIcon color='info' />
          </IconButton>
        </Nav>

        {/* <Nav navbar className="mr-2">
          <Button onClick={this.handleSidebarControlButton}>
            <MenuOpenIcon sx={{ border: 'none' }} />
          </Button>
        </Nav> */}
        <Nav navbar>
          {/* <SearchInput /> */}

          {localStorage.getItem('Special_User1') === 'Y' ? null : (
            <div>
              <div>Customer : {localStorage.getItem('CustomerName')}</div>
              {localStorage.getItem('customer_HO') === 'N' ? (
                <div>
                  Branch Name :{' '}
                  {localStorage.getItem('Branch_Name') === 'null'
                    ? localStorage.getItem('CustomerName')
                    : localStorage.getItem('Branch_Name')}
                </div>
              ) : (
                <div>HO Name : {localStorage.getItem('CustomerHo_Name')}</div>
              )}
            </div>
          )}
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
              {/* <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              /> */}
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />

              {localStorage.getItem('Username')}
            </NavLink>

            {/* {userinf.map((data) => (
              <p>{data.LoginName}</p>
            ))} */}
            {/* <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            > */}

            {/* <PopoverBody className="p-0 border-light">
                <UserCard
                  title={ localStorage.getItem('username')}
                  subtitle={ localStorage.getItem('email')}
                  
                  className="border-light"
                >
                  <ListGroup flush>
                    <Link to="/">
                    <ListGroupItem tag="button" action className="border-light" onClick={this.Logout}>
                      <MdExitToApp /> Signout
                    </ListGroupItem>

                    </Link>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover> */}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;

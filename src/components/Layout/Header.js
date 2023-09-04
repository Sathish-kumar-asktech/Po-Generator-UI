import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React, { useEffect, useState } from 'react';
import customerprofile from '../../assets/img/customerprofile.png';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
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
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import bn from 'utils/bemnames';
import { useStateValue } from '../../StateProvider';
import './Header.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ComapnyProfile from './ComapnyProfile';
import {
  Box,
  CardMedia,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Block } from '@material-ui/icons';
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

  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    username: '', // Add a new piece of state for the username
  };

  componentDidMount() {
    const storedUsername = localStorage.getItem('Username');
    this.setState({ username: storedUsername });
  }

  render() {
    const storedUsername = localStorage.getItem('Username');
    const { isNotificationConfirmed } = this.state;
    // const [{ user } , dispatch] = useStateValue();
    // const [userinf, setuserinf] = useState([])
    // useEffect(() => {
    //  setuserinf(user)
    // }, [user])
    return (
      <>
        <Navbar light expand className={bem.b('bg-white')}>
          <Nav navbar className="mr-2">
            <IconButton
              onClick={this.handleSidebarControlButton}
              sx={{ border: '1px solid', fontWeight: 600, borderRadius: '50%' }}
            >
              <MenuOpenRoundedIcon color="info" />
            </IconButton>
          </Nav>

          <Nav navbar>
            {localStorage.getItem('Special_User1') === 'Y' ? null : (
              <Stack
                direction={{ md: 'column', sm: 'column' }}
                p={1}
                spacing={0.5}
                alignItems={'flex-start'}
                justifyContent={'center'}
                display={{
                  xl: 'block',
                  lg: 'block',
                  md: 'block',
                  sm: 'block',
                  xs: 'none',
                }}
                borderLeft={0.5}
                pl={2}
                borderColor={'#A2C579'}
              >
                <Typography
                  variant="body1"
                  color="black"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: '400',
                    color: '#17594A',
                  }}
                >
                  Customer : <span>{localStorage.getItem('CustomerName')}</span>
                </Typography>
                {localStorage.getItem('customer_HO') === 'N' ? (
                  <Typography
                    variant="caption"
                    color="secondary"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Branch Name :
                    <span>
                      {localStorage.getItem('Branch_Name') === 'null'
                        ? localStorage.getItem('CustomerName')
                        : localStorage.getItem('Branch_Name')}
                    </span>
                  </Typography>
                ) : (
                  <Typography
                    variant="caption"
                    color="#61677A"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    HO Name :{' '}
                    <span>{localStorage.getItem('CustomerHo_Name')}</span>
                  </Typography>
                )}
              </Stack>
            )}
          </Nav>

          <Nav navbar className={bem.e('nav-right')}>
            <NavItem>
              <NavLink id="Popover2">
                <Stack
                  direction={'row'}
                  component={Paper}
                  justifyContent={'center'}
                  alignItems={'center'}
                  spacing={1}
                  elevation={3}
                  px={2}
                  borderRadius={6}
                >
                  <Avatar
                    onClick={this.toggleUserCardPopover}
                    className="can-click"
                  />
                  <Typography
                    variant="button"
                    color="green"
                    textTransform={'capitalize'}
                  >
                    {storedUsername.toLowerCase()}
                    {/* {localStorage.getItem('Username')} */}
                  </Typography>
                </Stack>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {localStorage.getItem('Special_User1') === 'Y' ? null : (
          <Stack
            component={Paper}
            elevation={4}
            className={bem.b('bg-white')}
            direction={{ md: 'column', sm: 'column' }}
            p={1}
            spacing={0.5}
            alignItems={'center'}
            justifyContent={'center'}
            display={{
              xl: 'none',
              lg: 'none',
              md: 'none',
              sm: 'none',
              xs: 'block',
            }}
            mx={2}
            textAlign={'left'}
            // pl={5}
          >
            <Grid
              container
              spacing={1}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  alt="profile image"
                  image={customerprofile}
                  style={{
                    width: '100%',
                    maxHeight: '10vh',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                  }}
                />
              </Grid>

              <Grid item xs={9} borderLeft={0.5} pl={1} borderColor={'#A2C579'}>
                <Typography
                  variant="body2"
                  color="black"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: '400',
                    color: '#17594A',
                  }}
                >
                  Customer :<br/> <span style={{fontWeight:600}}>{localStorage.getItem('CustomerName')}</span>
                </Typography>
                {localStorage.getItem('customer_HO') === 'N' ? (
                  <Typography
                    variant="caption"
                    color="secondary"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Branch Name :
                    <span>
                      {localStorage.getItem('Branch_Name') === 'null'
                        ? localStorage.getItem('CustomerName')
                        : localStorage.getItem('Branch_Name')}
                    </span>
                  </Typography>
                ) : (
                  <Typography
                    variant="caption"
                    color="#61677A"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    HO Name :{' '}
                    <span>{localStorage.getItem('CustomerHo_Name')}</span>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Stack>
        )}
      </>
    );
  }
}

export default Header;

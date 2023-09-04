import {
  CardMedia,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import loginimg from '../assets/img/loginimage.png';
import './AuthPage.css';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Container maxWidth={'lg'} sx={{ my: { md: 15, sm: 5 } }}>
        <Grid
          container
          spacing={2}
          direction={{ md: 'row', sm: 'column' }}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={{ md: 5, sm: 0 }}
          boxShadow={{ md: 5, sm: 0 }}
          backgroundColor={{ md: 'white', sm: 'none' }}
        >
          <Grid
            md={6}
            sm={12}
            alignContent={'center'}
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
            height={{ md: '70vh', sm: '37vh' }}
            pt={{ md: 7, sm: 3 }}
          >
            <button class="logintext">WELCOME TO PO GENERATOR</button>
            <div
              style={{
                maxWidth: '50vw',
                width: '100%', 
                textAlign: 'center', 
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                margin:'auto'
              }}
            >
              <CardMedia
                component="img"
                alt="login image"
                image={loginimg}
                style={{
                  width: '100%',
                  height: 'auto',
                  margin:'auto',
                  objectFit:'contain',
                  mixBlendMode: 'multiply',
                }}
                className="animated-image"
              />
            </div>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            justifyContent={'center'}
            alignItems={'center'}
          >           
              <AuthForm
                authState={this.props.authState}
                onChangeAuthState={this.handleAuthState}
                onLogoClick={this.handleLogoClick}
              />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default AuthPage;

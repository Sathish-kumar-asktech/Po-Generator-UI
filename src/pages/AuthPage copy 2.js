import { Container, Grid, Paper, Stack } from '@mui/material';
import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import loginimg from '../assets/img/loginimage.png';

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
      <Container maxWidth={'lg'}>
        <Grid
          container
          spacing={2}
          direction={{ md: 'row', sm: 'column' }}
          justifyContent={'center'}
          alignItems={'center'}
          component={Paper}
          elevation={5}
          borderRadius={5}
          my={7}
        >
          <Grid md={6} sm={12} justifyContent={'center'} alignItems={'center'}>
            <button class="button">Welcome to PO GENERATOR</button>
            <img
              src={loginimg}
              alt="login image"
              style={{
                objectFit: 'contain',
                maxWidth: '40vw',
                height: '80%',
                mixBlendMode: 'multiply',
              }}
            />
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <div style={{ height: '80vh' }}>
              <AuthForm
                authState={this.props.authState}
                onChangeAuthState={this.handleAuthState}
                onLogoClick={this.handleLogoClick}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default AuthPage;

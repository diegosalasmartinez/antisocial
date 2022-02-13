import React, { Component } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import colors from './../../theme/colors'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  onChange = (key, isNumeric = false) => (e = {}) => {
    const { user } = this.state;
    let val = isNumeric ? parseInt(e.target.value || '0') : e.target.value;
    let objectUpdated = { ...user };

    const keys = key.split(".");
    if (keys.length > 1) {
      objectUpdated[keys[0]][keys[1]] = val;
    } else {
      objectUpdated[key] = val;
    }
    this.setState({user: objectUpdated});
  }

  onSignUp = () => {
    
  }

  render() {
    const { user } = this.state;
    const { username, password } = user;

    return (
      <Box className='login' sx={{ height: '100vh', pt: '120px'}}>
        <Box className='login-form'>
          <Container maxWidth='xs'>
            <Box className='title jc-c'>
              <Typography variant='h5' noWrap component="div">
                Sign In
              </Typography>
            </Box>
            <Box className='form'>
              <TextField id='username' label='Username' value={username} fullWidth variant='standard' onChange={this.onChange('username')}/>
              <TextField id='password' label='Password' value={password} fullWidth variant='standard' onChange={this.onChange('password')}/>
            </Box>
            <Box className='myButton jc-c'>
              <Button sx={{ my: 2, color: 'white', display: 'block'}} variant='contained'>
                <Typography variant='body1' noWrap component="div">
                  Login
                </Typography>
              </Button>
            </Box>
          </Container>
        </Box>
        <Box className='login-options'>
          <Container maxWidth='xs' className='jc'>
            <Typography variant='body1' noWrap component="div" sx={{mb: 0.5}}>
              Don't have an account? <span className='textLink' onClick={this.onSignUp}>Sign Up</span>
            </Typography>
            <Typography className='textLink' variant='body1' noWrap component="div">
              Forget your account?
            </Typography>
          </Container>
        </Box>
      </Box>
    )
  }
}

import React, { Component } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import UserModel from '../../services/models/UserModel'
import MyTextField from '../../components/MyTextField'
import MyDateField from '../../components/MyDateField'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new UserModel()
    }
  }

  onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
    const { user } = this.state;
    let val = isNumeric ? parseInt(e.target.value || '0') : isDate ? e : e.target.value;
    let objectUpdated = { ...user };
    const keys = key.split(".");
    if (keys.length > 1) {
      objectUpdated[keys[0]][keys[1]] = val;
    } else {
      objectUpdated[key] = val;
    }
    this.setState({user: objectUpdated});
  }

  onSignIn = () => {
    this.props.navigate("/");
  }

  render() {
    const { user } = this.state;
    const { username, password, name, lastName, email, birthday } = user;

    return (
      <Box className='login' sx={{ height: '100vh', pt: '120px'}}>
        <Box className='login-form'>
          <Container maxWidth='xs'>
            <Box className='title jc-c'>
              <Typography variant='h5' noWrap component="div">
                Create your account
              </Typography>
            </Box>
            <Box className='form' component='form' autoComplete="off">
              <Grid container spacing={3} sx={{mt: 0, pt: 0}}>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='name' label='Name' value={name} onChange={this.onChange}/>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='lastName' label='Last Name' value={lastName} onChange={this.onChange}/>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='username' label='Username' value={username} onChange={this.onChange}/>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='password' label='Password' value={password} type='password' onChange={this.onChange}/>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='email' label='Email' value={email} type='email' onChange={this.onChange}/>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyDateField param='birthday' label='Birthday' value={birthday} onChange={this.onChange}/>
                </Grid>
              </Grid>
            </Box>
            <Box className='myButton jc-c' sx={{mb: 2}}>
              <Button sx={{ my: 2, color: 'white', display: 'block'}} variant='contained'>
                <Typography variant='body1' noWrap component="div">
                  Create account
                </Typography>
              </Button>
            </Box>
          </Container>
        </Box>
        <Box className='login-options'>
          <Container maxWidth='xs' className='jc'>
            <Typography variant='body1' noWrap component="div" sx={{mb: 0.5}}>
              Do you have an account? <span className='textLink' onClick={this.onSignIn}>Sign In</span>
            </Typography>
          </Container>
        </Box>
      </Box>
    )
  }
}

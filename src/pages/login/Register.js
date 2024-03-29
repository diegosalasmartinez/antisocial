import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../services/redux/actions/authActions'
import { Box, Container, Grid, Typography } from '@mui/material'
import MyTextField from '../../components/MyTextField'
import MyDateField from '../../components/MyDateField'
import MyButton from '../../components/MyButton'
import UserModel from '../../services/models/UserModel'
import { getInputValue } from 'src/utils/utils'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new UserModel()
    }
  }

  componentDidMount() { 
    const { auth } = this.props;
    if (auth.token) {
      this.props.navigate("/");
    }
  }

  onChange = (key, isNumeric = false, isDate = false) => (e = {}) => {
    const { user } = this.state;
    const userUpdated = getInputValue(user, e, key, isNumeric, isDate);
    this.setState({user: userUpdated});
  }

  onSignIn = () => {
    this.props.navigate("/sign-in");
  }

  onRegister = async () => {
    await this.props.register(this.state.user);
    const { auth } = this.props;

    if (auth.failed) {
      this.props.showNotification(auth.error);
    } else {
      this.props.navigate("/");
    }
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
            <Box className='form' component='form' autoComplete="off" method='post' action=''>
              <Grid container spacing={3} sx={{mt: 0, pt: 0}}>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='name' label='Name' value={name} onChange={this.onChange}/>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} sx={{display: { xs: 'none', md: 'flex' }}}>
                  <MyTextField param='lastName' label='Last name' value={lastName} onChange={this.onChange}/>
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
            <Box className='jc-c' sx={{mb: 2}}>
              <MyButton text='Create account' onClick={this.onRegister}/>
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

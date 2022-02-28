import React, { Component } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../services/redux/actions/authActions'
import UserModel from '../../services/models/UserModel'
import MyTextField from '../../components/MyTextField'
import MyButton from '../../components/MyButton'

class Login extends Component {
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
    this.props.navigate("/sign-up");
  }

  onLogin = async () => {
    await this.props.login(this.state.user);
    const { auth } = this.props;

    if (auth.failed) {
      this.props.showNotification(auth.error);
    } else {
      this.props.navigate("/");
    }
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
              <MyTextField param='username' label='Username' value={username} onChange={this.onChange}/>
              <MyTextField param='password' label='Password' value={password} type='password' onChange={this.onChange}/>
            </Box>
            <Box className='jc-c' sx={{mb: 2}}>
              <MyButton text='Login' onClick={this.onLogin}/>
            </Box>
          </Container>
        </Box>
        <Box className='login-options'>
          <Container maxWidth='xs' className='jc'>
            <Typography variant='body1' noWrap component="div" sx={{mb: 0.5}}>
              Don't have an account? <span className='textLink' onClick={this.onSignUp}>Sign Up</span>
            </Typography>
            <Typography className='textLink' variant='body1' noWrap component="div">
              Forgot your password?
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

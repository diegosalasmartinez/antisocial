import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../services/redux/actions/userActions'
import { Box, Typography } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import Users from '../users/Users'

class RecommendedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    }
  }

  async componentDidMount() { 
    const users = await this.props.getRecommendedUsers();
    const userReducer = this.props.user;
    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({users, loading: false});
    }
  }

  render() {
    const { auth } = this.props
    const { loading, users } = this.state;
    const username = auth.user.username;
    const following = auth.following;

    return (
      <Wrapper loading={loading}>
        <Box className=''>
          <Typography className='title' textAlign="left" sx={{ fontSize: 19 }}>Users to follow</Typography>
          <Users {...this.props} users={users} username={username} following={following}/>
        </Box>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsers)
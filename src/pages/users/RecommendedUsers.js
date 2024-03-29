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

  onSeeProfile = (user) => {
    this.props.navigate("/user/"+user.username);
  }

  onFollow = async (user) => {
    await this.props.followUser(user._id);
    const userReducer = this.props.user;

    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      this.updateAuthor(user._id, user.followersNumber + 1);
    }
  }

  onUnfollow = async (user) => {
    await this.props.unfollowUser(user._id);
    const userReducer = this.props.user;

    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      this.updateAuthor(user._id, user.followersNumber - 1);
    }
  }

  updateAuthor = (userId, numFollowers) => {
    let users = [...this.state.users];
    for (let i=0; i<this.state.users.length; i++) {
      if (this.state.users[i]._id === userId) {
        let user = {...this.state.users[i]};
        user.followersNumber = numFollowers;
        users[i] = user;
      }
    }
    this.setState({users});    
  }

  render() {
    const { auth } = this.props
    const { loading, users } = this.state;
    const username = auth.user.username;
    const following = auth.following;

    return (
      <Wrapper loading={loading}>
        <Box>
          <Typography className='title' textAlign="left" sx={{ fontSize: 19 }}>Users to follow</Typography>
          <Users {...this.props} users={users} username={username} following={following} onSeeProfile={this.onSeeProfile} onFollow={this.onFollow} onUnfollow={this.onUnfollow}/>
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
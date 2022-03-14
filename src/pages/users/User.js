import React, { Component } from 'react'
import { Box } from '@mui/material'
import ProfileBasicInfo from '../profile/ProfileBasicInfo';

export default class User extends Component {
  onSeeProfile = () => {
    this.props.onSeeProfile(this.props.user);
  }

  onFollow = () => {
    this.props.onFollow(this.props.user);
  }

  onUnfollow = () => {
    this.props.onUnfollow(this.props.user);
  }

  render() {
    const { user, username, following } = this.props;
    const isFollowed = following.includes(user._id);

    return (
      <Box className='user'>
        <ProfileBasicInfo profile={user} username={username} isFollowed={isFollowed} onSeeProfile={this.onSeeProfile} onFollow={this.onFollow} onUnfollow={this.onUnfollow}/>
      </Box>
    )
  }
}

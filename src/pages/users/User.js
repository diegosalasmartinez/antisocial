import React, { Component } from 'react'
import { Box } from '@mui/material'
import ProfileBasicInfo from '../profile/ProfileBasicInfo';

export default class User extends Component {
  render() {
    const { user, username, following } = this.props
    const isFollowed = following.includes(user._id);

    return (
      <Box className='user'>
        <ProfileBasicInfo profile={user} username={username} isFollowed={isFollowed} onSeeProfile={this.props.onSeeProfile} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow}/>
      </Box>
    )
  }
}

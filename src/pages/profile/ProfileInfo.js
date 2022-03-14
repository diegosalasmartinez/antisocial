import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import ProfileBasicInfo from './ProfileBasicInfo'

export default class ProfileInfo extends Component {
  onSeeProfile = () => {
    const { profileView } = this.props

    if (!profileView) {
      this.props.onSeeProfile();
    }
  }

  render() {
    const { profile, username, profileView, isFollowed } = this.props;

    return (
      <Box className='profile-info'>
        <ProfileBasicInfo profile={profile} username={username} profileView={profileView} isFollowed={isFollowed} onSeeProfile={this.onSeeProfile} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow}/>
        <Box sx={{display: 'flex', gap: '15px'}}>
          <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
            {profile.postsNumber} Posts
          </Typography>
          <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
            {profile.followersNumber} Followers
          </Typography>
          <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
            {profile.followingNumber} Following
          </Typography>
        </Box>
      </Box>
    )
  }
}

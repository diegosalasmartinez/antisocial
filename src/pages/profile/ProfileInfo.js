import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'

export default class ProfileInfo extends Component {
  onSeeProfile = () => {
    const { profileView } = this.props

    if (!profileView) {
      this.props.onSeeProfile();
    }
  }

  render() {
    const { profile, username, profileView, isFollowed } = this.props;
    const showFollowButton = username !== profile.username;
    const highlight = profileView ? 'dont-underline' : ''; 

    return (
      <Box className='profile-info'>
        <Box className='profile-info-title'>
          <Box>
            <Typography className={'name ' + highlight} textAlign="left" sx={{ fontSize: 20 }} onClick={this.onSeeProfile}>
              {profile.name} {profile.lastName}
            </Typography>
            <Typography className='username' textAlign="left" sx={{ fontSize: 15 }}>
              @{profile.username}
            </Typography>
          </Box>
          <Box className='buttons'>
            { showFollowButton && 
              <Box>
                { isFollowed ? 
                  <MyButton text='Unfollow' variant='secondary' onClick={this.props.onUnfollow}/> 
                  :
                  <MyButton text='Follow' onClick={this.props.onFollow}/> 
                }
              </Box>
            }
          </Box>
        </Box>
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

import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'

export default class ProfileInfo extends Component {
  render() {
    const { profile, username, profileView, isFollowed } = this.props;
    const showFollowButton = username !== profile.username;

    return (
      <Box className='profile-info'>
        <Box className='profile-info-title'>
          <Box>
            <Typography className='name' textAlign="left" sx={{ fontSize: 20 }}>
              {profile.name} {profile.lastName}
            </Typography>
            <Typography className='username' textAlign="left" sx={{ fontSize: 15 }}>
              @{profile.username}
            </Typography>
          </Box>
          <Box className='buttons'>
            { !profileView && 
              <Box>
                <MyButton text='See profile' variant='secondary' onClick={this.props.onSeeProfile}/>
              </Box>
            }
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

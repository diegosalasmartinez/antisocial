import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'

export default class ProfileInfo extends Component {
  render() {
    const { profile, username, profileView, isFollowed } = this.props;
    const showFollowButton = username !== profile.username;
    console.log(isFollowed);
    
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
                <MyButton text='Follow' onClick={this.props.onFollow}/> 
              </Box>
            }
          </Box>
        </Box>
        <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
          {profile.postsNumber} Posts
        </Typography>
      </Box>
    )
  }
}

import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from 'src/components/MyButton';

export default class ProfileInfo extends Component {
  onFollow = () => {

  }

  render() {
    const { profile } = this.props

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
          <Box>
            <MyButton text='Follow' onClick={this.onFollow}/>
          </Box>
        </Box>
        <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
          {profile.postsNumber} Posts
        </Typography>
      </Box>
    )
  }
}

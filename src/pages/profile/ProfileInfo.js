import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'

export default class ProfileInfo extends Component {
  render() {
    const { profile } = this.props

    return (
      <Box className='profile-info'>
        <Typography className='name' textAlign="left" sx={{ fontSize: 20 }}>
          {profile.name} {profile.lastName}
        </Typography>
        <Typography className='username' textAlign="left" sx={{ fontSize: 15 }}>
          @{profile.username}
        </Typography>
      </Box>
    )
  }
}

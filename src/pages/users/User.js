import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'

export default class User extends Component {
  render() {
    const { user } = this.props

    return (
      <Box className='user'>
        <Typography className='name' sx={{ fontSize: 19 }}>
          {user.name} 
        </Typography>
        <Typography className='username' sx={{ fontSize: 15 }} aria-describedby={'idAuthorView'} onClick={this.handleAuthorViewOpen}>
          @{user.username}
        </Typography>
      </Box>
    )
  }
}

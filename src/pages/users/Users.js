import React, { Component } from 'react'
import { Box } from '@mui/material'
import User from './User'

export default class Users extends Component {
  render() {
    const { users, username, following } = this.props;
    
    return (
      <Box className='users'>
        { users.map(u => <User {...this.props} key={u._id} user={u} username={username} following={following}/>) }
      </Box>
    )
  }
}

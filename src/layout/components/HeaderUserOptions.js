import React, { Component } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import userPhoto from '../../assets/img/1.jpg' 

export default class HeaderUserOptions extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='User settings'>
          <IconButton onClick={this.props.handleOpenNavUser} sx={{ p: 0}}>
            <Avatar alt='User' src={userPhoto}/>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={this.props.navUser}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(this.props.navUser)}
          onClose={this.props.handleCloseNavUser}
        >
          { this.props.options.map((o, index) => 
            <MenuItem key={index} onClick={(e) => this.props.handleCloseNavUser(e,o)}>
              <Typography textAlign="center">{o}</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    )
  }
}

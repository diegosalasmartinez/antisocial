import React, { Component } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'

const options = ["Profile", "Settings", "Logout"]

export default class HeaderUserOptions extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='User settings'>
          <IconButton onClick={this.props.handleOpenNavUser} sx={{ p: 0}}>
            <Avatar alt='User' src='./images/avatar/1.jpg'/>
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
          { options.map((o, index) => 
            <MenuItem key={index} onClick={this.props.handleCloseNavUser}>
              <Typography textAlign="center">{o}</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    )
  }
}

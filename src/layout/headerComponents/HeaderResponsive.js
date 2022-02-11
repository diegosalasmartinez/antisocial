import React, { Component } from 'react'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

export default class HeaderResponsive extends Component {
  render() {
    return (
      <>
        <Box component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton 
            size="large" 
            aria-label="account of current user" 
            aria-controls="menu-appbar" 
            aria-haspopup="true" 
            onClick={this.props.handleOpenNavMenu} 
            color="inherit"
          >
            <MenuIcon/>
          </IconButton>
          <Menu 
            id="menu-appbar" 
            anchorEl={this.props.navMenu} 
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
            keepMounted 
            transformOrigin={{vertical: 'top',horizontal: 'left'}} 
            open={Boolean(this.props.navMenu)}
            onClose={e => this.props.handleCloseNavMenu(e)} 
            sx={{display: { xs: 'block', md: 'none' }}}
          >
            { this.props.headerOptions.map((h, index) => 
              <MenuItem key={index} onClick={e => this.props.handleCloseNavMenu(e, h.path)}>
                <Typography textAlign="left">{h.name}</Typography>
              </MenuItem>
            ) }
          </Menu>
        </Box>
        <Box 
          component='div' 
          sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' }, '&:hover': { cursor: 'pointer' } }} 
          onClick={e => this.props.handleCloseNavMenu(e, "/")}
        >
          <Typography variant="h6" noWrap component="div">
            Antisocial
          </Typography>
        </Box>
      </>
    )
  }
}

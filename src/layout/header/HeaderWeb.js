import React, { Component } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

export default class HeaderWeb extends Component {
  render() {
    return (
      <>
        <Box 
          component='div' 
          sx={{mr: 2, display: { xs: 'none', md: 'flex' }, '&:hover': { cursor: 'pointer' } }} 
          onClick={e => this.props.handleCloseNavMenu(e, "/")}
        >
          <Typography variant="h6" noWrap component="div">
            Antisocial
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          { this.props.headerOptions.map((h, index) => 
            <Button key={index} sx={{ my: 2, color: 'white', display: 'block' }} onClick={e => this.props.handleCloseNavMenu(e, h.path)}>
              {h.name}
            </Button>
          ) }
        </Box>
      </>
    )
  }
}

import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'

export default class HeaderWeb extends Component {
  render() {
    return (
      <>
        <Box 
          component='div' 
          sx={{mr: 2, display: { xs: 'none', md: 'flex' }, '&:hover': { cursor: 'pointer' } }} 
          onClick={e => this.props.handleCloseNavMenu(e, "/")}
        >
          <Typography variant="h6" noWrap component="div" sx={{fontWeight: 'bold'}}>
            Antisocial
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        </Box>
      </>
    )
  }
}

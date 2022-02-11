import { Box, Button, Stack, Typography } from '@mui/material'
import React, { Component } from 'react'
import navOptions from './options/navOptions'

export default class Sidebar extends Component {
  selectOption = (e, path) => {
    e.preventDefault();
    if (path) this.props.navigate(path)
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Stack spacing={2}>
          { navOptions.map((h, index) => 
            <Button key={index} sx={{ my: 0.2, color: 'white', display: 'block' }} variant="text">
              <Typography textAlign="left" variant='subtitle1' sx={{textTransform: 'capitalize'}} onClick={e => this.selectOption(e, h.path)}>
                {h.name}
              </Typography>
            </Button>
          ) }
        </Stack>
      </Box>
    )
  }
}

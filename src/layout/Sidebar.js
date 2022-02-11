import React, { Component } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import navOptions from './options/navOptions'

export default class Sidebar extends Component {
  selectOption = (e, path) => {
    e.preventDefault();
    if (path) this.props.navigate(path)
  }

  getVariantText = (h) => {
    const { pathname } = this.props.location; 
    const { path } = h; 
    return pathname === path ? 'contained' : 'text';
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Stack spacing={2} sx={{width: '100%'}}>
          { navOptions.map((h, index) => 
            <Button key={index} sx={{ my: 0.2, color: 'white', display: 'block' }} variant={this.getVariantText(h)} onClick={e => this.selectOption(e, h.path)}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  {h.icon}
                </Grid>
                <Grid item xs={8}>
                  <Typography textAlign="left" variant='subtitle1' sx={{textTransform: 'capitalize'}}>
                    {h.name}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          ) }
        </Stack>
      </Box>
    )
  }
}

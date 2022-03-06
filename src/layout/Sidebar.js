import React, { Component } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import navOptions from './options/navOptions'
import { colors } from '../theme/colors'

export default class Sidebar extends Component {
  selectOption = (e, path) => {
    e.preventDefault();
    if (path) {
      if (path !== '/user') {
        this.props.navigate(path);
      } else {
        this.props.navigate("/user/"+this.props.username);
      }
    }
  }

  getVariantText = (h) => {
    const { pathname } = this.props.location; 
    const { path } = h;
    if (path.length === 1) {
      return pathname === path ? 'contained' : 'text';
    } else {
      return pathname.substring(1).includes(path.substring(1)) ? 'contained' : 'text';
    }
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Stack spacing={1} sx={{width: '100%'}}>
          { navOptions.map((h, index) => 
            <Button key={index} sx={{ my: 0, pb: 0, color: colors.WHITE, display: 'block' }} variant={this.getVariantText(h)} onClick={e => this.selectOption(e, h.path)}>
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

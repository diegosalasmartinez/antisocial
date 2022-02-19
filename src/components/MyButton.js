import React, { Component } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import colors from '../theme/colors'

export default class MyButton extends Component {
  render() {
    const { text = '', my = 2, variant = 'primary', loading } = this.props
    const bgColor = variant === 'primary' ? colors.BLUE : colors.SECONDARY;
    const mr = variant === 'primary' ? '0' : '10px'
    
    return (
      <Button sx={{ mr: mr, my: my, color: colors.WHITE, display: 'block', backgroundColor: bgColor, '&:hover': {backgroundColor: bgColor, filter: 'brightness(1.75)'}}} variant='contained' onClick={this.props.onClick}>
        <Typography variant='body1' noWrap component="div" textTransform='none' sx={{display: 'flex', alignItems: 'center'}}>
          { loading && <CircularProgress size={20} sx={{mr: '10px'}}/> }
          {text}
        </Typography>
      </Button>
    )
  }
}

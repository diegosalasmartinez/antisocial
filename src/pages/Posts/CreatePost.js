import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'

export default class CreatePost extends Component {
  render() {
    return (
      <Box>
        <Typography textAlign="left" variant='h6'>
          Post your idea
        </Typography>
        <Typography textAlign="left" variant='body1'>
          Create your post
        </Typography>
        <Box className='jc-r'>
          <MyButton text='Cancel' variant='secondary' onClick={this.props.onCancel}/>
        </Box>
      </Box>
    )
  }
}

import React, { Component } from 'react'
import { Box, CircularProgress } from '@mui/material';

export default class Wrapper extends Component {
  render() {
    const { loading } = this.props;

    return (
      <>
        { loading ?
          <Box className='jc-c'>
            <CircularProgress size={40} color='info'/>
          </Box>
          :
          <>{this.props.children}</>
        }
      </>
    )
  }
}

import React, { Component } from 'react'
import { Box } from '@mui/material'
import {loading as loadingSprite} from '../theme/loading'

export default class Wrapper extends Component {
  render() {
    const { loading } = this.props;

    return (
      <>
        { loading ?
          <Box className='jc-c'>
            {loadingSprite}
          </Box>
          :
          <>{this.props.children}</>
        }
      </>
    )
  }
}

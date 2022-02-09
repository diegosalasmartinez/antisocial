import React, { Component } from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import colors from '../theme/colors'

export default class Layout extends Component {
  render() {
    return (
      <Box sx={{backgroundColor: colors.BACKGROUND, height: '100vh'}}>
        <Header {...this.props}/>
        <Outlet/>
      </Box>
    )
  }
}

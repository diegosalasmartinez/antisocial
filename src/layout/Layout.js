import React, { Component } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import colors from '../theme/colors'

export default class Layout extends Component {
  render() {
    return (
      <Box sx={{backgroundColor: colors['PRIMARY-LIGHT'], height: '100vh'}}>
        <Header {...this.props}/>
        <Outlet/>
      </Box>
    )
  }
}

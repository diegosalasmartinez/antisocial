import React, { Component } from 'react'
import { Box, Typography, Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default class Layout extends Component {
  render() {
    // console.log(this.props.context.history);
    // console.log(this.props.navigation);
    return (
      <>
        <Header {...this.props}/>
        <Outlet/>
        <div>Footer</div>
      </>
      // <Container maxWidth='lg'>
      //   <Box sx={{my: 4}}>
      //     <Typography variant='h2' component='h2' gutterBottom>
      //       Hola mundo con Material UI
      //     </Typography>
      //   </Box>
      // </Container>
    )
  }
}

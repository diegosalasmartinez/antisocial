import React, { Component } from 'react'
import Container from '@mui/material/Container'
import { Box, Typography } from '@mui/material'

export default class Layout extends Component {
  render() {
    return (
      <Container maxWidth='lg'>
        <Box sx={{my: 4}}>
          <Typography variant='h2' component='h2' gutterBottom>
            Hola mundo con Material UI
          </Typography>
        </Box>
      </Container>
    )
  }
}

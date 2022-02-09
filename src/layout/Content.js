import React from 'react'
import { Box, Container } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Content(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth='xl'>
      <Box sx={{my: 2}}>
        <props.element location={location} navigate={navigate}/>
      </Box>
    </Container>
  )
}

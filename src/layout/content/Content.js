import React from 'react'
import { Container, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Content(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} sx={{mt: 0, pt: 0}}>
        <Grid item xs={2} sx={{pt: 0}}>
          Sidebar
        </Grid>
        <Grid item xs={7} sx={{pt: 0}}>
          <props.element location={location} navigate={navigate}/>
        </Grid>
        <Grid item xs={3} sx={{pt: 0}}>
          Panel Auxiliar
        </Grid>
      </Grid>
    </Container>
  )
}

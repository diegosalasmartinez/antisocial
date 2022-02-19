import React from 'react'
import { Container, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'

export default function Content(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} sx={{mt: 0, pt: 0}}>
        <Grid item xs={0} md={3} xl={2} sx={{pt: 0, display: { xs: 'none', md: 'flex' }}}>
          <Sidebar location={location} navigate={navigate}/>
        </Grid>
        <Grid item xs={8} md={6} xl={7} sx={{pt: 0}}>
          <props.element location={location} navigate={navigate}/>
        </Grid>
        <Grid item xs={4} md={3} xl={3} sx={{pt: 0}}>
          <RightPanel location={location} navigate={navigate}/>
        </Grid>
      </Grid>
    </Container>
  )
}

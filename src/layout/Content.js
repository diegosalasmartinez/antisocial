import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { Container, Grid } from '@mui/material'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import Page from './Page'

export default function Content(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user.username);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} sx={{mt: 0, pt: 0}}>
        <Grid item xs={0} md={3} xl={2} sx={{pt: 0, display: { xs: 'none', md: 'flex' }}}>
          <Sidebar location={location} navigate={navigate} username={username}/>
        </Grid>
        <Grid item xs={8} md={6} xl={7} sx={{pt: 0}}>
          <Page {...props} />
        </Grid>
        <Grid item xs={4} md={3} xl={3} sx={{pt: 0}}>
          <Page element={RightPanel}/>
        </Grid>
      </Grid>
    </Container>
  )
}

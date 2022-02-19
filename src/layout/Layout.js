import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import colors from '../theme/colors'

export default function Layout(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.token){
      navigate("/sign-in")   
    }
  },[auth.token]);

  return (
    <Box sx={{backgroundColor: colors.PRIMARY, height: '100vh'}}>
      <Header {...props}/>
      <Outlet/>
    </Box>
  )
}

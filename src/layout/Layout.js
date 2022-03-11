import React, { useEffect } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../services/redux/actions/categoryActions'
import { following } from '../services/redux/actions/userActions'
import { Box } from '@mui/material'
import Header from './Header'
import { colors } from '../theme/colors'

export default function Layout(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.token){
      navigate("/sign-in")   
    } else {
      dispatch(getCategories());
      dispatch(following());
    }
  },[auth.token]);

  return (
    <Box sx={{backgroundColor: colors.PRIMARY, height: '100vh'}}>
      <Header {...props}/>
      <Outlet/>
    </Box>
  )
}

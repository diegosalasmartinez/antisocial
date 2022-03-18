import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../services/redux/actions/actionTypes/authActionTypes'
import { AppBar, Container, Toolbar } from '@mui/material'
import HeaderWeb from './components/HeaderWeb'
import HeaderResponsive from './components/HeaderResponsive'
import HeaderUserOptions from './components/HeaderUserOptions'
import navOptions from './options/navOptions'

const options = ["Profile", "Settings", "Logout"];

export default function Header(props) {
  const [navMenu, setNavMenu] = React.useState(null);
  const [navUser, setNavUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setNavMenu(event.currentTarget);
  }
  
  const handleCloseNavMenu = (e, path) => {
    e.preventDefault();
    setNavMenu(null);
    if (path) navigate(path)
  }

  const handleOpenNavUser = (event) => {
    setNavUser(event.currentTarget);
  }
  
  const handleCloseNavUser = (e, option) => {
    e.preventDefault();
    setNavUser(null);

    if (option === 'Profile') {
      props.navigate('/user/'+props.username);
    } else if (option === 'Settings') {

    } else if (option === 'Logout') {
      dispatch({type: LOGOUT});
    }
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <HeaderWeb navMenu={navMenu} headerOptions={navOptions} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu}/>
          <HeaderResponsive navMenu={navMenu} headerOptions={navOptions} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu}/>
          <HeaderUserOptions options={options} navUser={navUser} handleOpenNavUser={handleOpenNavUser} handleCloseNavUser={handleCloseNavUser}/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

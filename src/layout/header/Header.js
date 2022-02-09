import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Container, Toolbar } from '@mui/material'
import HeaderWeb from './HeaderWeb'
import HeaderResponsive from './HeaderResponsive'
import HeaderUserOptions from './HeaderUserOptions'

const headerOptions = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'Posts',
    path: '/posts'
  },
]

export default function Header() {
  const [navMenu, setNavMenu] = React.useState(null);
  const [navUser, setNavUser] = React.useState(null);
  const navigate = useNavigate();

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
  
  const handleCloseNavUser = (e, path) => {
    e.preventDefault();
    setNavUser(null);
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <HeaderWeb navMenu={navMenu} headerOptions={headerOptions} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu}/>
          <HeaderResponsive navMenu={navMenu} headerOptions={headerOptions} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu}/>
          <HeaderUserOptions navUser={navUser} handleOpenNavUser={handleOpenNavUser} handleCloseNavUser={handleCloseNavUser}/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

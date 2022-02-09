import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import HeaderWeb from './HeaderWeb'
import HeaderResponsive from './HeaderResponsive'

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

    if (path) {
      navigate(path)
    }
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <HeaderWeb navMenu={navMenu} headerOptions={headerOptions} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu}/>
          <HeaderResponsive navMenu={navMenu} headerOptions={headerOptions} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu}/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

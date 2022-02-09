import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

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

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNavMenu: null
    }
  }

  handleOpenNavMenu = (event) => {
    this.setState({openNavMenu: event.currentTarget});
  }

  handleCloseNavMenu = (e, path) => {
    e.preventDefault();
    this.setState({openNavMenu: null});
    // this.props.history.push(path);
  }

  render() {
    const { openNavMenu } = this.state;

    return (
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              Antisocial
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={this.handleOpenNavMenu} color="inherit">
                <MenuIcon/>
              </IconButton>
              <Menu id="menu-appbar" anchorEl={openNavMenu} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'left'}} open={Boolean(openNavMenu)}
              onClose={this.handleCloseNavMenu} sx={{display: { xs: 'block', md: 'none' }}}>
                { headerOptions.map((h, index) => 
                  <MenuItem key={index} onClick={this.handleCloseNavMenu}>
                    {/* <Link to={h.path}> */}
                      <Typography textAlign="center">{h.name}</Typography>
                    {/* </Link> */}
                  </MenuItem>
                ) }
              </Menu>
            </Box>

            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              Antisocial
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              { headerOptions.map((h, index) => 
                <Button key={index} sx={{ my: 2, color: 'white', display: 'block' }} onClick={e => this.handleCloseNavMenu(e, h.path)}>
                  {/* <Link to={h.path}> */}
                    {h.name}
                  {/* </Link> */}
                </Button>
              ) }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}

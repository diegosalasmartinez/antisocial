import React, { Component } from 'react'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'
import userPhoto from '../../assets/img/1.jpg' 

export default class ProfileBasicInfo extends Component {
  render() {
    const { profile, username, profileView, isFollowed } = this.props;
    const showFollowButton = username !== profile.username;
    const highlight = profileView ? 'dont-underline' : ''; 

    return (
      <Box className='profile-info-title'>
        <Box className='image'>
          <IconButton sx={{p: 0}}>
            <Avatar alt='User Image' src={userPhoto}/>
          </IconButton>
          <Box>
            <Typography className={'name ' + highlight} textAlign="left" sx={{ fontSize: 20 }} onClick={this.props.onSeeProfile}>
              {profile.name} {profile.lastName}
            </Typography>
            <Typography className='username' textAlign="left" sx={{ fontSize: 15 }}>
              @{profile.username}
            </Typography>
          </Box>
        </Box>
        <Box className='buttons'>
          { showFollowButton && 
            <Box>
              { isFollowed ? 
                <MyButton text='Unfollow' variant='secondary' onClick={this.props.onUnfollow}/> 
                :
                <MyButton text='Follow' onClick={this.props.onFollow}/> 
              }
            </Box>
          }
        </Box>
      </Box>
    )
  }
}

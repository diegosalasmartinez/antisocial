import React, { Component } from 'react'
import { Avatar, Box, CardContent, IconButton, Typography } from '@mui/material'
import MyPopover from '../../../components/MyPopover'
import userPhoto from '../../../assets/img/1.jpg' 
import ProfileInfo from '../../../pages/profile/ProfileInfo'

export default class ReplyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorView: null,
    }
  }

  handleAuthorViewOpen = (e) => {
    this.setState({authorView: e.currentTarget});
  }
   
  handleAuthorViewClose = () => {
    this.setState({authorView: null});
  }

  onSeeProfile = () => {
    const { reply } = this.props;
    this.props.navigate("/user/"+reply.author.username);
  }

  render() {
    const { reply } = this.props;
    const { authorView } = this.state;
    const openAuthorView = Boolean(authorView);
    const idAuthorView = 'author-reply-popover';

    return (
      <CardContent>
        <Box className='header'>
          <Box className='image'>
            <IconButton sx={{p: 0}}>
              <Avatar alt='User Image' src={userPhoto}/>
            </IconButton>
          </Box>
          <Box className='author-info'>
            <Box className='author'>
              <Typography className='name' textAlign="left" sx={{ fontSize: 19 }} onClick={this.props.onSeeProfile}>
                {reply.author.name} {reply.author.lastName}
              </Typography>
              <Typography className='username' textAlign="left" sx={{ fontSize: 15 }} onClick={this.handleAuthorViewOpen}>
                @{reply.author.username}
              </Typography>
              <Typography className='date' sx={{ fontSize: 14 }}>
                - {new Date(reply.date).toLocaleString()}
              </Typography>
            </Box>
            <Box className='author-post'>
              <Typography className='username' textAlign="left" sx={{ fontSize: 15 }}>
                Replying to @{reply.author.username}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className='content'>
          <Typography className='message' sx={{ fontSize: 16 }}>
            {reply.message} 
          </Typography>
        </Box>
        <MyPopover id={idAuthorView} open={openAuthorView} anchorEl={authorView} onClose={this.handleAuthorViewClose}>
          <ProfileInfo profile={reply.author} onSeeProfile={this.onSeeProfile} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow}/>
        </MyPopover>
      </CardContent>
    )
  }
}

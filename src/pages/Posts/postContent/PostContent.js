import React, { Component } from 'react'
import { Box, CardContent, Chip, Typography } from '@mui/material'
import MyPopover from '../../../components/MyPopover'
import ProfileInfo from '../../profile/ProfileInfo'
import { getCategoryColors } from '../../../theme/colors'

export default class PostContent extends Component {
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
    const { post } = this.props;
    this.props.navigate("/user/"+post.author.username);
  }

  onSeePost = () => {
    const { post } = this.props;
    this.props.navigate("/post/"+post._id);
  }
  
  render() {
    const { post, authReducer } = this.props;
    const { authorView } = this.state;
    const openAuthorView = Boolean(authorView);
    const idAuthorView = 'author-popover';
    const isFollowed = authReducer.following.includes(post.author._id);

    return (
      <CardContent>
        <Box className='header'>
          <Typography className='title' sx={{ fontSize: 19 }} onClick={this.onSeePost}>
            {post.title} 
          </Typography>
          <Typography className='author' sx={{ fontSize: 15 }} aria-describedby={idAuthorView} onClick={this.handleAuthorViewOpen}>
            @{post.author.username}
          </Typography>
          <MyPopover id={idAuthorView} open={openAuthorView} anchorEl={authorView} onClose={this.handleAuthorViewClose}>
            <ProfileInfo username={authReducer.user.username} profile={post.author} isFollowed={isFollowed} onSeeProfile={this.onSeeProfile} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow}/>
          </MyPopover>
          <Typography className='date' sx={{ fontSize: 14 }}>
            - {new Date(post.date).toLocaleString()}
          </Typography>
        </Box>
        <Box className='category'>
          <Chip label={post.category.name} sx={{backgroundColor: getCategoryColors(post.category.name)}}/>
        </Box>
        <Typography className='body' sx={{ fontSize: 16 }}>
          {post.body}
        </Typography>
      </CardContent>
    )
  }
}

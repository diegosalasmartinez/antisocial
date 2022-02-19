import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from '../components/MyButton';
import CreatePost from '../pages/posts/CreatePost';

export default class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostForm: false
    }
  }

  onShowCreatePost = () => {
    this.setState({showPostForm: true});
  }
  
  onCancelPost = () => {
    this.setState({showPostForm: false});
  }

  onPost = (post) => {
    console.log(post);
  }

  render() {
    const { showPostForm } = this.state

    return (
      <Box className='right-panel'>
        { showPostForm ? 
          <CreatePost onCancel={this.onCancelPost} onPost={this.onPost}/>
          :
          <Box className='jc-r'>
            <MyButton text='Create a post' onClick={this.onShowCreatePost}/>
          </Box>
        }
        <Typography variant='body1' noWrap component="div">
          Create a post
        </Typography>
        <Typography variant='body1' noWrap component="div">
          Create a post
        </Typography>
        <Typography variant='body1' noWrap component="div">
          Create a post
        </Typography>
        <Typography textAlign="left" variant='body1'>
          Create your postegse segsegs hh
        </Typography>
      </Box>
    )
  }
}

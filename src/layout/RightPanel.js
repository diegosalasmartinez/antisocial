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

  onCreatePost = () => {
    this.setState({showPostForm: true});
  }
  
  onCancelPost = () => {
    this.setState({showPostForm: false});
  }

  render() {
    const { showPostForm } = this.state

    return (
      <Box className='right-panel'>
        { showPostForm ? 
          <CreatePost onCancel={this.onCancelPost}/>
          :
          <Box className='jc-r'>
            <MyButton text='Create a post' onClick={this.onCreatePost}/>
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
      </Box>
    )
  }
}

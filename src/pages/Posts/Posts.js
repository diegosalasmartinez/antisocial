import React, { Component } from 'react'
import { Box } from '@mui/material'
import Post from './Post'

export default class Posts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <Box className='posts'>
        { posts.map(p => <Post {...this.props} key={p._id} post={p} updatePosts={this.props.updatePosts}/>) }
      </Box>
    )
  }
}

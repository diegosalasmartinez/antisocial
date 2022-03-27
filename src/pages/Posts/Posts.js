import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import Post from './Post'

export default class Posts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <Box className='posts'>
        { posts.length > 0 ? 
          <>
            { posts.map(p => <Post {...this.props} key={p._id} post={p} updatePosts={this.props.updatePosts} updateAuthor={this.props.updateAuthor}/>) }
          </>
          :
          <Typography className='no-posts' textAlign="center" sx={{ fontSize: 20 }}>
            There aren't posts yet.
          </Typography>
        }
      </Box>
    )
  }
}

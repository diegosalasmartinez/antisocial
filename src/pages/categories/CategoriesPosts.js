import React, { Component } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Posts from '../posts/Posts'
import { getCategoryColors } from '../../theme/colors'

export default class CategoriesPosts extends Component {
  render() {
    const { posts, categoryName } = this.props;

    return (
      <Box className='categories'>
        <Box className='categories-options' sx={{backgroundColor: getCategoryColors(categoryName)}}>
          <IconButton aria-label="back" onClick={this.props.showCategories}>
            <ArrowBack fontSize='small'/>
          </IconButton>
          <Typography className='title' sx={{ fontSize: 19 }}>
            {categoryName}'s Posts
          </Typography>
        </Box>
        <Box className='categories-posts'>
          <Posts {...this.props} posts={posts} updatePosts={this.props.updatePosts}/>
        </Box>
      </Box>
    )
  }
}

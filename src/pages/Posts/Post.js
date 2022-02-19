import React, { Component } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <Box className='jc-c'>
        <Card className='post-card' sx={{ minWidth: 250, width: '75%' }}>
          <CardContent>
            <Typography className='author' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography className='title' sx={{ fontSize: 20 }} component="div">
              {post.title}
            </Typography>
            <Typography className='date' sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography className='body' variant="body2">
              {post.body}
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  }
}

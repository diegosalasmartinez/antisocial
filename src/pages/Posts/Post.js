import React, { Component } from 'react'
import { Box, Card, CardActions, CardContent, Fab, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined'
import moment from 'moment'

export default class Post extends Component {
  onLike = () => {
    this.props.onLike(this.props.post);
  }

  onUnlike = () => {
    this.props.onUnlike(this.props.post);
  }

  onSave = () => {
    this.props.onSave(this.props.post);
  }

  render() {
    const { post, userId } = this.props;
    const date = moment(post.date).format('DD/MM/YYYY');
    const likeClassName = post.likes.includes(userId) ? 'checked' : '';
    const unlikeClassName = post.unlikes.includes(userId) ? 'checked' : '';

    return (
      <Box className='jc-c'>
        <Card className='post' sx={{ minWidth: 250, width: '75%' }}>
          <CardContent>
            <Box className='header'>
              <Typography className='title' sx={{ fontSize: 18 }} component="div">
                {post.title}
              </Typography>
              <Typography className='author' sx={{ fontSize: 15 }} component="div">
                @{post.author.username}
              </Typography>
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                - {date}
              </Typography>
            </Box>
            <Typography className='body' variant="body2">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Box id='like' className={`icon-section ${likeClassName}`}>
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                {post.likes.length}
              </Typography>
              <IconButton aria-label="like" onClick={this.onLike}>
                <ThumbUpIcon fontSize='small'/>
              </IconButton>
            </Box>
            <Box id='unlike' className={`icon-section ${unlikeClassName}`}>
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                {post.unlikes.length}
              </Typography>
              <IconButton aria-label="unlike" onClick={this.onUnlike}>
                <ThumbDownIcon fontSize='small'/>
              </IconButton>
            </Box>
            <Box id='save' className='icon-section'>
              <IconButton aria-label="save" onClick={this.onFav}>
                <BookmarkIcon fontSize='small'/>
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </Box>
    )
  }
}

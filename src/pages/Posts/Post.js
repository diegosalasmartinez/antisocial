import React, { Component } from 'react'
import { Box, Card, CardActions, CardContent, Fab, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined'
import moment from 'moment'

export default class Post extends Component {
  onLike = () => {
    this.props.onLike(this.props.post);
  }

  onUnlike = () => {
    this.props.onUnlike(this.props.post);
  }

  onFav = () => {
    this.props.onFav(this.props.post);
  }

  render() {
    const { post, userId } = this.props;
    const date = moment(post.date).format('DD/MM/YYYY');
    const likeClassName = post.likes.includes(userId) ? 'checked' : '';

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
            <Box id='like' className={`icon-section ${likeClassName}`} >
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                {post.likes.length}
              </Typography>
              <IconButton aria-label="like" onClick={this.onLike}>
                <ThumbUpIcon fontSize='small'/>
              </IconButton>
            </Box>
            <Box id='unlike' className='icon-section'>
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                - {date}
              </Typography>
              <IconButton aria-label="unlike" onClick={this.onUnlike}>
                <ThumbDownIcon fontSize='small'/>
              </IconButton>
            </Box>
            <Box id='fav' className='icon-section'>
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                - {date}
              </Typography>
              <IconButton aria-label="add to favorites" onClick={this.onFav}>
                <FavoriteIcon fontSize='small'/>
              </IconButton>
            </Box>
          </CardActions>
          {/* <CardActions>
            <Box>
              <Fab color={colors.PURPLE} size='small' aria-label="like">
                <AddIcon />
              </Fab>
              <Fab color="primary" size='small' aria-label="add">
                <AddIcon />
              </Fab>
            </Box>
          </CardActions> */}
        </Card>
      </Box>
    )
  }
}

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
    const { post } = this.props;
    const date = moment(post.date).format('DD/MM/YYYY');

    return (
      <Box className='jc-c'>
        <Card className='post' sx={{ minWidth: 250, width: '75%' }}>
          <CardContent>
            <div className='header'>
              <Typography className='title' sx={{ fontSize: 18 }} component="div">
                {post.title}
              </Typography>
              <Typography className='author' sx={{ fontSize: 15 }} component="div">
                @{post.author.username}
              </Typography>
              <Typography className='date' sx={{ fontSize: 15 }} component="div">
                - {date}
              </Typography>
            </div>
            <Typography className='body' variant="body2">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton id='like' aria-label="like" onClick={this.onLike}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton id='unlike' aria-label="unlike" onClick={this.onUnlike}>
              <ThumbDownIcon />
            </IconButton>
            <IconButton id='fav' aria-label="add to favorites" onClick={this.onFav}>
              <FavoriteIcon />
            </IconButton>
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

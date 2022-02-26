import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined'
import moment from 'moment'

class Post extends Component {
  onLike = async () => {
    const { post } = this.props;
    const postUpdated = await this.props.likePost(post);
    const { postReducer } = this.props;

    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.props.updatePosts(postUpdated);
    }
  }

  onUnlike = async () => {
    const { post } = this.props;
    const postUpdated = await this.props.unlikePost(post);
    const { postReducer } = this.props;

    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.props.updatePosts(postUpdated);
    }
  }

  onSave = () => {
    const { post } = this.props;
  }

  render() {
    const { post, authReducer } = this.props;
    const { user } = authReducer;
    const date = moment(post.date).format('DD/MM/YYYY');
    const likeClassName = post.likes.includes(user._id) ? 'checked' : '';
    const unlikeClassName = post.unlikes.includes(user._id) ? 'checked' : '';

    return (
      <Box className='jc-c'>
        <Card className='post' sx={{ minWidth: 250, width: '95%' }}>
          <CardContent>
            <Box className='header'>
              <Typography className='title' sx={{ fontSize: 18 }}>
                {post.title}
              </Typography>
              <Typography className='author' sx={{ fontSize: 15 }}>
                @{post.author.username}
              </Typography>
              <Typography className='date' sx={{ fontSize: 15 }}>
                - {date}
              </Typography>
            </Box>
            <Typography className='body' variant="body2">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Box id='like' className={`icon-section ${likeClassName}`}>
              <Typography className='date' sx={{ fontSize: 15 }}>
                {post.likes.length}
              </Typography>
              <IconButton aria-label="like" onClick={this.onLike}>
                <ThumbUpIcon fontSize='small'/>
              </IconButton>
            </Box>
            <Box id='unlike' className={`icon-section ${unlikeClassName}`}>
              <Typography className='date' sx={{ fontSize: 15 }}>
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

const mapStateToProps = (state) => {
  return {
    authReducer: state.auth,
    postReducer: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
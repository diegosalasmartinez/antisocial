import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined'
import MyPopover from '../../components/MyPopover'
import moment from 'moment'
import ProfileInfo from '../profile/ProfileInfo'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorView: null
    }
  }

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
  
  onClickUsername = () => {
    const { post } = this.props;
    this.props.navigate(post.author.username);
  }

  handleAuthorViewOpen = (e) => {
    this.setState({authorView: e.currentTarget});
  }
   
  handleAuthorViewClose = () => {
    this.setState({authorView: null});
  }

  onSeeProfile = () => {
    const { post } = this.props;
    this.props.navigate("/"+post.author.username);
  }

  onFollow = () => {

  }

  render() {
    const { authorView } = this.state
    const { post, authReducer } = this.props;
    const { user } = authReducer;
    const date = moment(post.date).format('DD/MM/YYYY');
    const likeClassName = post.likes.includes(user._id) ? 'checked' : '';
    const unlikeClassName = post.unlikes.includes(user._id) ? 'checked' : '';
    const openAuthorView = Boolean(authorView);
    const idAuthorView = 'author-popover';

    return (
      <Box className='jc-c'>
        <Card className='post' sx={{ minWidth: 250, width: '100%' }}>
          <CardContent>
            <Box className='header'>
              <Typography className='title' sx={{ fontSize: 19 }}>
                {post.title}
              </Typography>
              <Typography className='author' sx={{ fontSize: 15 }} aria-describedby={idAuthorView} onClick={this.handleAuthorViewOpen}>
                @{post.author.username}
              </Typography>
              <MyPopover id={idAuthorView} open={openAuthorView} anchorEl={authorView} onClose={this.handleAuthorViewClose}>
                <ProfileInfo username={authReducer.user.username} profile={post.author} onSeeProfile={this.onSeeProfile} onFollow={this.onFollow}/>
              </MyPopover>
              <Typography className='date' sx={{ fontSize: 14 }}>
                - {date}
              </Typography>
            </Box>
            <Typography className='body' sx={{ fontSize: 16 }}>
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
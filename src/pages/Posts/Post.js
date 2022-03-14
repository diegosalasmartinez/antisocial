import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import * as userActions from '../../services/redux/actions/userActions'
import { Box, Card, CardActions, CardContent, Chip, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined'
import BookmarkFullIcon from '@mui/icons-material/Bookmark'
import MyPopover from '../../components/MyPopover'
import ProfileInfo from '../profile/ProfileInfo'
import { getCategoryColors } from '../../theme/colors'

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

  onDislike = async () => {
    const { post } = this.props;
    const postUpdated = await this.props.dislikePost(post);
    const { postReducer } = this.props;

    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.props.updatePosts(postUpdated);
    }
  }

  onSave = async () => {
    const { post } = this.props;
    const postUpdated = await this.props.savePost(post);
    const { postReducer } = this.props;

    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.props.updatePosts(postUpdated);
    }
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
    this.props.navigate("/user/"+post.author.username);
  }

  onFollow = async () => {
    const { post } = this.props;
    await this.props.followUser(post.author._id);
    const { userReducer } = this.props;

    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      this.props.updateAuthor(post.author._id, post.author.followersNumber + 1);
    }
  }

  onUnfollow = async () => {
    const { post } = this.props;
    await this.props.unfollowUser(post.author._id);
    const { userReducer } = this.props;

    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      this.props.updateAuthor(post.author._id, post.author.followersNumber - 1);
    }
  }

  render() {
    const { authorView } = this.state
    const { post, authReducer } = this.props;
    const { user } = authReducer;
    const likeClassName = post.likes.includes(user._id) ? 'checked' : '';
    const dislikeClassName = post.dislikes.includes(user._id) ? 'checked' : '';
    const saveClassName = post.saves.includes(user._id) ? 'checked' : '';
    const openAuthorView = Boolean(authorView);
    const idAuthorView = 'author-popover';
    const isFollowed = authReducer.following.includes(post.author._id);

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
                <ProfileInfo username={authReducer.user.username} profile={post.author} isFollowed={isFollowed} onSeeProfile={this.onSeeProfile} onFollow={this.onFollow} onUnfollow={this.onUnfollow}/>
              </MyPopover>
              <Typography className='date' sx={{ fontSize: 14 }}>
                - {new Date(post.date).toLocaleString()}
              </Typography>
            </Box>
            <Box className='category'>
              <Chip label={post.category.name} sx={{backgroundColor: getCategoryColors(post.category.name)}}/>
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
            <Box id='dislike' className={`icon-section ${dislikeClassName}`}>
              <Typography className='date' sx={{ fontSize: 15 }}>
                {post.dislikes.length}
              </Typography>
              <IconButton aria-label="dislike" onClick={this.onDislike}>
                <ThumbDownIcon fontSize='small'/>
              </IconButton>
            </Box>
            <Box id='save' className={`icon-section ${saveClassName}`}>
              <IconButton aria-label="save" onClick={this.onSave}>
                { saveClassName === 'checked' ?
                  <BookmarkFullIcon fontSize='small'/>
                  :  
                  <BookmarkIcon fontSize='small'/>
                }
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
    postReducer: state.post,
    userReducer: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(Object.assign({}, postActions, userActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
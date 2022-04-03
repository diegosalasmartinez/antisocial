import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import * as userActions from '../../services/redux/actions/userActions'
import { Box, Card } from '@mui/material'
import ReplyContent from './replyContent/ReplyContent'
import ReplyActions from './replyContent/ReplyActions'

class Reply extends Component {
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
    const { reply, authReducer } = this.props;
    const { user } = authReducer;

    return (
      <Box className='jc-c'>
        <Card className='reply' sx={{ minWidth: 250, width: '100%' }}>
          <ReplyContent {...this.props} reply={reply} onFollow={this.onFollow} onUnfollow={this.onUnfollow}/>
          <ReplyActions {...this.props} reply={reply} user={user} onLike={this.onLike} onDislike={this.onDislike}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reply)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import * as replyActions from '../../services/redux/actions/replyActions'
import * as userActions from '../../services/redux/actions/userActions'
import { Box, Card } from '@mui/material'
import ReplyContent from './replyContent/ReplyContent'
import ReplyActions from './replyContent/ReplyActions'

class Reply extends Component {
  onLike = async () => {
    const { reply } = this.props;
    const replyUpdated = await this.props.likeReply(reply);
    const { replyReducer } = this.props;

    if (replyReducer.failed) {
      this.props.showNotification(replyReducer.error);
      await this.props.clearErrorReply();
    } else {
      this.props.updateReplies(replyUpdated);
    }
  }

  onDislike = async () => {
    const { reply } = this.props;
    const replyUpdated = await this.props.dislikeReply(reply);
    const { replyReducer } = this.props;

    if (replyReducer.failed) {
      this.props.showNotification(replyReducer.error);
      await this.props.clearErrorReply();
    } else {
      this.props.updateReplies(replyUpdated);
    }
  }

  onFollow = async () => {
    const { reply } = this.props;
    await this.props.followUser(reply.author._id);
    const { userReducer } = this.props;

    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      this.props.updateAuthorReply(reply.author._id, reply.author.followersNumber + 1);
    }
  }

  onUnfollow = async () => {
    const { reply } = this.props;
    await this.props.unfollowUser(reply.author._id);
    const { userReducer } = this.props;

    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      this.props.updateAuthorReply(reply.author._id, reply.author.followersNumber - 1);
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
    replyReducer: state.reply,
    userReducer: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(Object.assign({}, postActions, replyActions, userActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reply)
import React, { Component } from 'react'
import { Box, CardActions, CardContent, Collapse, IconButton, Tooltip, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpFullIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownFullIcon from '@mui/icons-material/ThumbDown'
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined'
import BookmarkFullIcon from '@mui/icons-material/Bookmark'
import CommentIcon from '@mui/icons-material/CommentOutlined'
import CommentFullIcon from '@mui/icons-material/Comment'
import PostReplyComment from './PostReplyComment'

export default class PostActionsComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedCommentSection: false
    }
  }

  onComment = () => {
    this.setState({expandedCommentSection: !this.state.expandedCommentSection});
  }

  render() {
    const { expandedCommentSection } = this.state;
    const { post, user } = this.props;
    const likeClassName = post.likes.includes(user._id) ? 'checked' : '';
    const dislikeClassName = post.dislikes.includes(user._id) ? 'checked' : '';
    const saveClassName = post.saves.includes(user._id) ? 'checked' : '';
    const commentClassName = expandedCommentSection ? 'checked' : '';

    return (
      <>
        <CardActions disableSpacing>
          <Box id='comment' className={`icon-section ${commentClassName}`}>
            <Typography sx={{ fontSize: 15 }}>{post.numReplies}</Typography>
            <Tooltip title="Comment">
              <IconButton aria-label="comment" onClick={this.onComment}>
                { commentClassName === 'checked' ? <CommentFullIcon fontSize='small'/> : <CommentIcon fontSize='small'/> }
              </IconButton>
            </Tooltip>
          </Box>
          <Box id='like' className={`icon-section ${likeClassName}`}>
            <Typography sx={{ fontSize: 15 }}>{post.likes.length}</Typography>
            <Tooltip title="Like">
              <IconButton aria-label="like" onClick={this.props.onLike}>
                { likeClassName === 'checked' ? <ThumbUpFullIcon fontSize='small'/> : <ThumbUpIcon fontSize='small'/> }
              </IconButton>
            </Tooltip>
          </Box>
          <Box id='dislike' className={`icon-section ${dislikeClassName}`}>
            <Typography sx={{ fontSize: 15 }}>{post.dislikes.length}</Typography>
            <Tooltip title="Like">
              <IconButton aria-label="dislike" onClick={this.props.onDislike}>
                { dislikeClassName === 'checked' ? <ThumbDownFullIcon fontSize='small'/> : <ThumbDownIcon fontSize='small'/> }
              </IconButton>
            </Tooltip>
          </Box>
          <Box id='save' className={`icon-section ${saveClassName}`}>
            <Tooltip title="Save">
              <IconButton aria-label="save" onClick={this.props.onSave}>
                { saveClassName === 'checked' ? <BookmarkFullIcon fontSize='small'/> : <BookmarkIcon fontSize='small'/> }
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
        <Collapse in={expandedCommentSection} timeout="auto" unmountOnExit>
          <CardContent className='reply-form'>
            <PostReplyComment onReply={this.props.onReply}/>
          </CardContent>
        </Collapse>
      </>
    )
  }
}

import React, { Component } from 'react'
import { Box, CardActions, IconButton, Tooltip, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpFullIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownFullIcon from '@mui/icons-material/ThumbDown'

export default class ReplyActions extends Component {
  onComment = () => {
    this.setState({expandedCommentSection: !this.state.expandedCommentSection});
  }

  render() {
    const { reply, user } = this.props;
    const likeClassName = reply.likes.includes(user._id) ? 'checked' : '';
    const dislikeClassName = reply.dislikes.includes(user._id) ? 'checked' : '';

    return (
      <>
        <CardActions disableSpacing>
          <Box id='like' className={`icon-section ${likeClassName}`}>
            <Typography sx={{ fontSize: 15 }}>{reply.likes.length}</Typography>
            <Tooltip title="Like">
              <IconButton aria-label="like" onClick={this.props.onLike}>
                { likeClassName === 'checked' ? <ThumbUpFullIcon fontSize='small'/> : <ThumbUpIcon fontSize='small'/> }
              </IconButton>
            </Tooltip>
          </Box>
          <Box id='dislike' className={`icon-section ${dislikeClassName}`}>
            <Typography sx={{ fontSize: 15 }}>{reply.dislikes.length}</Typography>
            <Tooltip title="Dislike">
              <IconButton aria-label="dislike" onClick={this.props.onDislike}>
                { dislikeClassName === 'checked' ? <ThumbDownFullIcon fontSize='small'/> : <ThumbDownIcon fontSize='small'/> }
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </>
    )
  }
}

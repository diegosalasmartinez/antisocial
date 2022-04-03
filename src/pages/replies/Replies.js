import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import Reply from './Reply'

export default class Replies extends Component {
  render() {
    const { replies } = this.props;

    return (
      <Box className='replies'>
        { replies.length > 0 ? 
          <>
            { replies.map(r => <Reply {...this.props} key={r._id} reply={r} updateReplies={this.props.updateReplies} updateAuthorReply={this.props.updateAuthorReply}/>) }
          </>
          :
          <Typography className='no-replies' textAlign="center" sx={{ fontSize: 20 }}>
            There aren't replies yet. Try posting one rigth now!
          </Typography>
        }
      </Box>
    )
  }
}

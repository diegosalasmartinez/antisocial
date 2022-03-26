import React, { Component } from 'react'
import { Box } from '@mui/material'
import MessageModel, { validate } from '../../../services/models/MessageModel'
import MyTextField from '../../../components/MyTextField'
import MyButton from '../../../components/MyButton'
import { getInputValue, objIsNull } from '../../../utils/utils'

export default class PostReplyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: new MessageModel(),
      errors: {}
    }
  }

  onChange = (key, isNumeric = false) => (e = {}) => {
    const { message } = this.state;
    const messageUpdated = getInputValue(message, e, key, isNumeric);
    this.setState({message: messageUpdated});
  }

  onReply = () => {
    const { message } = this.state;
    let messageUpdated = {...message};
    const errors = validate(message);

    if (objIsNull(errors)) {
      const isReplyPosted = this.props.onReply(message);
      if (isReplyPosted) {
        messageUpdated = new MessageModel();
      }
    }

    this.setState({errors: errors, message: messageUpdated});
  }

  render() {
    const { message, errors } = this.state;

    return (
      <Box className='form'>
        <MyTextField param='message' label='Message' value={message.message} errors={errors} hideText={true} onChange={this.onChange}/>
        <MyButton text='Reply' onClick={this.onReply}/>
      </Box>
    )
  }
}

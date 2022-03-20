import React, { Component } from 'react'
import { Box } from '@mui/material'
import MessageModel, { validate } from '../../services/models/MessageModel'
import MyTextField from '../../components/MyTextField'
import MyButton from '../../components/MyButton'
import { objIsNull } from '../../utils/utils'

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
    let val = isNumeric ? parseInt(e.target.value || '0') : e.target.value;
    let objectUpdated = { ...message };

    const keys = key.split(".");
    if (keys.length > 1) {
      objectUpdated[keys[0]][keys[1]] = val;
    } else {
      objectUpdated[key] = val;
    }

    this.setState({message: objectUpdated});
  }

  onReply = () => {
    const { message } = this.state;
    const errors = validate(message);
    if (objIsNull(errors)) {
      this.props.onReply(message);
    }
    this.setState({errors: errors});
  }

  render() {
    const { message, errors } = this.state;

    return (
      <Box className='form'>
        <MyTextField param='message' label='Message' value={message.message} errors={errors} onChange={this.onChange}/>
        <MyButton text='Reply' onClick={this.onReply}/>
      </Box>
    )
  }
}

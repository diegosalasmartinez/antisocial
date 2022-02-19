import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'
import MyTextField from '../../components/MyTextField'
import PostModel from '../../services/models/PostModel';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: new PostModel()
    }
  }

  onChange = (key, isNumeric = false) => (e = {}) => {
    const { post } = this.state;
    let val = isNumeric ? parseInt(e.target.value || '0') : e.target.value;
    let objectUpdated = { ...post };

    const keys = key.split(".");
    if (keys.length > 1) {
      objectUpdated[keys[0]][keys[1]] = val;
    } else {
      objectUpdated[key] = val;
    }
    this.setState({post: objectUpdated});
  }

  render() {
    const { btnLoading } = this.props;
    const { post } = this.state;
    const { title, body } = post;

    return (
      <Box>
        <Typography textAlign="left" variant='h6'>
          Post your idea
        </Typography>
        <Box className='form' sx={{mt: '1rem'}}>
          <MyTextField param='title' label='Title' value={title} onChange={this.onChange}/>
          <MyTextField param='body' label='Body' value={body} mb={0} onChange={this.onChange}/>
        </Box>
        <Box className='jc-r'>
          <MyButton text='Cancel' variant='secondary' onClick={this.props.onCancel}/>
          <MyButton text='Post' loading={btnLoading} onClick={() => this.props.onPost(post)}/>
        </Box>
      </Box>
    )
  }
}

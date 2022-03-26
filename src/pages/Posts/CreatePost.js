import React, { Component } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'
import MyTextField from '../../components/MyTextField'
import MySelectField from '../../components/MySelectField'
import PostModel, { validate } from '../../services/models/PostModel'
import { getInputValue, objIsNull } from '../../utils/utils'

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: new PostModel(),
      errors: {}
    }
  }

  onChange = (key, isNumeric = false) => (e = {}) => {
    const { post } = this.state;
    const postUpdated = getInputValue(post, e, key, isNumeric);
    this.setState({post: postUpdated});
  }

  onPost = () => {
    const { post } = this.state;
    const errors = validate(post);
    if (objIsNull(errors)) {
      this.props.onPost(post);
    }
    this.setState({errors: errors});
  }

  render() {
    const { btnLoading, categories } = this.props;
    const { post, errors } = this.state;
    const { title, body } = post;
    const categoryData = categories.map(c => ({value: c._id, label: c.name}));

    return (
      <Box className='create-post'>
        <Typography className='name' textAlign="left" sx={{ fontSize: 20, fontWeight: 'bold' }}>
          Post your idea
        </Typography>
        <Box className='form' sx={{mt: '1rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MyTextField param='title' label='Title' value={title} errors={errors} onChange={this.onChange}/>
            </Grid>
            <Grid item xs={4}>
              <MySelectField param='category._id' data={categoryData} label='Category' value={post.category._id} errors={errors} onChange={this.onChange}/>
            </Grid>
          </Grid>
          <MyTextField param='body' label='Body' value={body} errors={errors} multiline={true} rows={4} mb={0} onChange={this.onChange}/>
        </Box>
        <Box className='jc-r'>
          <MyButton text='Cancel' variant='secondary' onClick={this.props.onCancel}/>
          <MyButton text='Post' loading={btnLoading} onClick={this.onPost}/>
        </Box>
      </Box>
    )
  }
}

import React, { Component } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import MyButton from '../../components/MyButton'
import MyTextField from '../../components/MyTextField'
import PostModel from '../../services/models/PostModel';
import MySelectField from 'src/components/MySelectField';

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
    const { btnLoading, categories } = this.props;
    const { post } = this.state;
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
              <MyTextField param='title' label='Title' value={title} onChange={this.onChange}/>
            </Grid>
            <Grid item xs={4}>
              <MySelectField param='category._id' data={categoryData} label='Category' value={post.category._id} onChange={this.onChange}/>
            </Grid>
          </Grid>
          <MyTextField param='body' label='Body' value={body} multiline={true} rows={4} mb={0} onChange={this.onChange}/>
        </Box>
        <Box className='jc-r'>
          <MyButton text='Cancel' variant='secondary' onClick={this.props.onCancel}/>
          <MyButton text='Post' loading={btnLoading} onClick={() => this.props.onPost(post)}/>
        </Box>
      </Box>
    )
  }
}

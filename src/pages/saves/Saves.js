import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box, Typography } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import Posts from '../posts/Posts'
import MySelectField from '../../components/MySelectField'

export class Saves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      options: {
        categorySelected: "all",
      },
      loading: true
    }
  }

  async componentDidMount() { 
    const posts = await this.props.getSavedPosts();
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({posts, loading: false});
    }
  }

  onChange = (key, isNumeric = false) => (e = {}) => {
    const { options } = this.state;
    let val = isNumeric ? parseInt(e.target.value || '0') : e.target.value;
    let objectUpdated = { ...options };

    const keys = key.split(".");
    if (keys.length > 1) {
      objectUpdated[keys[0]][keys[1]] = val;
    } else {
      objectUpdated[key] = val;
    }

    this.setState({options: objectUpdated});
  }

  updatePosts = (post) => {
    const ind = this.state.posts.findIndex(p => p._id === post._id)
    if (ind >= 0) {
      let posts = [...this.state.posts];
      posts[ind] = {...post};
      this.setState({posts: posts});
    }
  }

  updateAuthor = (authorId, numFollowers) => {
    let posts = [...this.state.posts];
    for (let i=0; i<this.state.posts.length; i++) {
      if (this.state.posts[i].author._id === authorId) {
        let post = {...this.state.posts[i]};
        post.author.followersNumber = numFollowers;
        posts[i] = post;
      }
    }
    this.setState({posts: posts});    
  }

  render() {
    const { loading, posts, options } = this.state;
    const { categorySelected } = options;
    const { categories } = this.props;
    const data = [{value: 'all', label: 'All'}, ...categories.map(c => ({value: c._id, label: c.name}))];
    const postsSelected = categorySelected === "all" ? posts : posts.filter(p => p.category._id === categorySelected);

    return (
      <Wrapper loading={loading}>
        <Box className='home saves'>
          <Box className='form timeOption'>
            <Typography className='saves-title' textAlign="left" sx={{ fontSize: 20 }}>
              Posts you saved
            </Typography>
            <MySelectField param='categorySelected' data={data} value={categorySelected} onChange={this.onChange}/>
          </Box>
          <Posts {...this.props} posts={postsSelected} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/>
        </Box>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    categories: state.category.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Saves)
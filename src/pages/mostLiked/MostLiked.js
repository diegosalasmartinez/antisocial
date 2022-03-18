import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box, Typography } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import Posts from '../posts/Posts'
import MySelectField from 'src/components/MySelectField'

class MostLiked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      options: {
        timeOption: 0
      },
      loading: true
    }
  }

  componentDidMount() { 
    this.fetchPosts();
  }

  fetchPosts = async () => {
    this.setState({loading: true});
    const { options } = this.state;
    const posts = await this.props.getMostLikedPosts(options.timeOption);
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

    this.setState({options: objectUpdated}, () => {
      this.fetchPosts();
    });
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
    const data = [{value: 0, label: 'Today'}, {value: 1, label: 'All week'}, {value: 2, label: 'All month'}];

    return (
      <Wrapper loading={loading}>
        <Box className='home'>
          <Box className='form timeOption'>
            <div></div>
            <MySelectField param='timeOption' data={data} value={options.timeOption} onChange={this.onChange}/>
          </Box>
          <Posts {...this.props} posts={posts} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/>
        </Box>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostLiked)
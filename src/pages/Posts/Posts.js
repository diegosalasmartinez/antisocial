import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import Post from './Post'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }

  async componentDidMount() { 
    const posts = await this.props.getPosts();
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({posts, loading: false});
    }
  }

  updatePosts = (post) => {
    let posts = [...this.state.posts];
    const ind = posts.findIndex(p => p._id === post._id)
    posts[ind] = {...post};
    this.setState({posts: posts});
  }

  render() {
    const { loading, posts } = this.state;

    return (
      <Wrapper loading={loading}>
        <Box className='posts'>
          { posts.map(p => <Post {...this.props} key={p._id} post={p} updatePosts={this.updatePosts}/>) }
        </Box>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
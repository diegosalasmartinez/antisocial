import { Box } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Wrapper from '../../components/Wrapper'
import * as postActions from '../../services/redux/actions/postActions'
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

  onLike = async (p) => {
    await this.props.likePost(p);
    const { auth, post } = this.props;

    if (post.failed) {
      this.props.showNotification(post.error);
      await this.props.clearErrorPost();
    } else {
      let posts = [...this.state.posts];
      const ind = posts.findIndex(post => post._id === p._id)
      const post = {...posts[ind]}
      if (post.likes.some(l => l === auth.user._id)) {
        post.likes = post.likes.filter(l => l !== auth.user._id);
      } else {
        post.likes = [...post.likes, auth.user._id]
      }
      posts[ind] = post;
      this.setState({posts})
    }
  }

  onUnlike = (p) => {

  }
  onFav = (p) => {

  }

  render() {
    const { loading, posts } = this.state;
    const { auth } = this.props

    return (
      <Wrapper loading={loading}>
        <Box className='posts'>
          { posts.map(p => <Post key={p._id} userId={auth.user._id} post={p} onLike={this.onLike} onUnlike={this.onUnlike} onFav={this.onFav}/>) }
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
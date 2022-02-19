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

  render() {
    const { loading, posts } = this.state;

    return (
      <Wrapper loading={loading}>
        <Box className='posts'>
          { posts.map(p => <Post key={p._id} post={p}/>) }
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
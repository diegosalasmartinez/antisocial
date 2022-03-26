import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import PostModel from '../../services/models/PostModel'

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: new PostModel(),
      loading: true
    }
  }

  componentDidMount() { 
    const { pathname = []} = this.props.location;
    const postId = pathname.slice(6);

    this.fetchPost(postId);
  }

  componentDidUpdate(prevProps, prevState) { 
    const prevPathname = prevProps.location.pathname;
    const pathname = this.props.location.pathname;

    if (prevPathname !== pathname) {
      const postId = pathname.slice(6);
      this.fetchPost(postId);
    }
  } 

  fetchPost = async (postId) => {
    this.setState({loading: true});
    const post = await this.props.getPost(postId);
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({ post: post, loading: false });
    }
  }


  updatePosts = (post) => {
    const ind = this.state.posts.findIndex(p => p._id === post._id);
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
    const { loading, post } = this.state;
    console.log(post);
    return (
      <Wrapper loading={loading}>
        <Box className='home'>
          {/* <Posts {...this.props} posts={posts} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import PostModel from '../../services/models/PostModel'
import Post from './Post'
import Replies from '../replies/Replies'

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
    this.setState({post: {...post}});
  }
  
  updateAuthor = (authorId, numFollowers) => {
    let post = {...this.state.post};
    let author = {...post.author};
    author.followersNumber = numFollowers;
    post.author = {...author};

    this.setState({post: post});
    this.updateAuthorReply(authorId, numFollowers, false);
  }

  updateReplies = (reply) => {
    const ind = this.state.post.replies.findIndex(r => r._id === reply._id);
    if (ind >= 0) {
      let post = {...this.state.post};
      let replies = [...post.replies];
      replies[ind] = {...reply};
      post.replies = replies;

      this.setState({post: post});
    } 
  }

  updateAuthorReply = (authorId, numFollowers, updateAuthorToo = true) => {
    let post = {...this.state.post};
    let replies = [...post.replies];
    for (let i=0; i<this.state.post.replies.length; i++) {
      if (this.state.post.replies[i].author._id === authorId) {
        let reply = {...this.state.post.replies[i]};
        let author = {...reply.author};
        author.followersNumber = numFollowers;
        reply.author = {...author};
        replies[i] = {...reply};
      }
    }
    post.replies = replies;
    this.setState({post: post});    
    if (updateAuthorToo) this.updateAuthor(authorId, numFollowers);
  }

  render() {
    const { loading, post } = this.state;

    return (
      <Wrapper loading={loading}>
        <Box className='home'>
          <Post {...this.props} post={post} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/>
          <Replies {...this.props} replies={post.replies} updateReplies={this.updateReplies} updateAuthorReply={this.updateAuthorReply}/>
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
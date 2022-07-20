import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import { Box } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import Posts from '../posts/Posts'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }

  async componentDidMount() { 
    const posts = await this.props.getPostsByFollowingUsers();
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({posts, loading: false});
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
        let author = {...post.author};
        author.followersNumber = numFollowers;
        post.author = {...author};
        posts[i] = {...post};
      }
    }
    this.setState({posts: posts});
  }

  render() {
    const { loading, posts } = this.state;

    return (
      <Wrapper loading={loading}>
        <Box className='home'>
          <Posts {...this.props} posts={posts} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor} home={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
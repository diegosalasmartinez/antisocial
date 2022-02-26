import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
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
        <Posts {...this.props} posts={posts} updatePosts={this.updatePosts}/>
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
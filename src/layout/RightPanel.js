import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../services/redux/actions/postActions'
import { Box } from '@mui/material'
import CreatePost from '../pages/posts/CreatePost'
import MyModal from '../components/MyModal'
import RecommendedUsers from '../pages/users/RecommendedUsers'
import MyButton from '../components/MyButton'

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostForm: false,
      btnCreatePostLoading: false 
    }
  }

  onShowCreatePost = () => {
    this.setState({showPostForm: true});
  }
  
  onCancelPost = () => {
    this.setState({showPostForm: false});
  }
  
  onPost = async (post) => {
    this.setState({btnCreatePostLoading: true});
    await this.props.createPost(post);
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.props.showNotification('Your post was published', 'SUCCESS');
    }
    this.setState({showPostForm: false, btnCreatePostLoading: false});
  }

  render() {
    const { showPostForm, btnCreatePostLoading } = this.state;
    const { category } = this.props;

    return (
      <Box className='right-panel'>
        <Box className='post-options'>
          <MyButton text='Post' onClick={this.onShowCreatePost}/>
        </Box>
        <Box className='recommended-users'>
          <RecommendedUsers {...this.props}/>
        </Box>
        <MyModal open={showPostForm} name='create-post' onClose={this.onCancelPost}>
          <CreatePost onCancel={this.onCancelPost} onPost={this.onPost} categories={category.categories} btnLoading={btnCreatePostLoading}/>
        </MyModal>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    category: state.category,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel)

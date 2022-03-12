import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../services/redux/actions/userActions'
import { Box } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import Posts from '../posts/Posts'

class RecommendedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    }
  }

  async componentDidMount() { 
    const users = await this.props.getRecommendedUsers();
    const userReducer = this.props.user;
    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({users, loading: false});
    }
  }

  render() {
    const { loading, users } = this.state
    return (
      <Wrapper loading={loading}>
        <Box className='recommended-users'>
          ...
          {/* <Posts {...this.props} posts={posts} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/> */}
        </Box>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsers)
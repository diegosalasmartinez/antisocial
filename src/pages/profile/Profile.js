import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Wrapper from '../../components/Wrapper'
import * as postActions from '../../services/redux/actions/postActions'
import { Box, Tab, Tabs } from '@mui/material'
import MyTabPanel from '../../components/MyTabPanel'
import { defineProps } from '../../utils/utils'
import Posts from '../posts/Posts'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      posts: [],
      postsLiked: [],
      postsUnliked: []
    }
  }

  async componentDidMount() { 
    const { pathname = []} = this.props.location;
    const username = pathname.slice(1);

    const res = await this.props.getProfile(username);
    console.log(res);
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      // this.setState({posts, loading: false});
    }
  }

  handleChange = (e, value) => {
    this.setState({tab: value});
  }

  render() {
    const { tab, posts, postsLiked, postsUnliked } = this.state;

    return (
      <Wrapper>
        <Box className='profile'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={this.handleChange} aria-label="basic tabs example">
              <Tab label="Posts" {...defineProps(0)} />
              <Tab label="Liked" {...defineProps(1)} />
              <Tab label="Unliked" {...defineProps(2)} />
            </Tabs>
          </Box>
          <MyTabPanel value={tab} index={0}>
            <Posts posts={posts}/>
          </MyTabPanel>
          <MyTabPanel value={tab} index={1}>
            <Posts posts={posts}/>
          </MyTabPanel>
          <MyTabPanel value={tab} index={2}>
            <Posts posts={posts}/>
          </MyTabPanel>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../services/redux/actions/userActions'
import Wrapper from '../../components/Wrapper'
import { Box, Tab, Tabs } from '@mui/material'
import MyTabPanel from '../../components/MyTabPanel'
import Posts from '../posts/Posts'
import ProfileInfo from './ProfileInfo'
import UserModel from '../../services/models/UserModel'
import { defineProps } from '../../utils/utils'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      loading: true,
      profile: new UserModel(),
      posts: [],
      postsLiked: [],
      postsUnliked: []
    }
  }

  async componentDidMount() { 
    const { pathname = []} = this.props.location;
    const username = pathname.slice(6);

    const res = await this.props.getProfile(username);
    const userReducer = this.props.user;
    if (userReducer.failed) {
      this.props.showNotification(userReducer.error);
      await this.props.clearErrorUser();
    } else {
      const userProfile = res[0];
      this.setState({
        profile: userProfile, 
        posts: userProfile.posts, 
        postsLiked: userProfile.likes, 
        postsUnliked: userProfile.unlikes, 
        loading: false
      });
    }
  }

  handleChange = (e, value) => {
    this.setState({tab: value});
  }

  updatePosts = (post) => {
    const ind = this.state.posts.findIndex(p => p._id === post._id)
    if (ind >= 0) {
      let posts = [...this.state.posts];
      posts[ind] = {...post};
      this.setState({posts: posts});

      const userId = this.props.auth.user._id;
      if (post.likes.includes(userId)) {
        const indLike = this.state.postsLiked.findIndex(p => p._id === post._id);
        if (indLike >= 0) {
          let postsLiked = [...this.state.postsLiked];
          postsLiked[indLike] = {...postsLiked};
          this.setState({postsLiked: postsLiked});
        } else {
          let postsLiked = [post, ...this.state.postsLiked];
          this.setState({postsLiked: postsLiked});
        }
        let postsUnliked = this.state.postsUnliked.filter(p => p._id !== post._id);
        this.setState({postsUnliked: postsUnliked});
      } else if (post.unlikes.includes(userId)) {
        const indUnlike = this.state.postsUnliked.findIndex(p => p._id === post._id);
        if (indUnlike >= 0) {
          let postsUnliked = [...this.state.postsUnliked];
          postsUnliked[indUnlike] = {...postsUnliked};
          this.setState({postsUnliked: postsUnliked});
        } else {
          let postsUnliked = [post, ...this.state.postsUnliked];
          this.setState({postsUnliked: postsUnliked});
        }
        let postsLiked = this.state.postsLiked.filter(p => p._id !== post._id);
        this.setState({postsLiked: postsLiked});
      } else {
        let postsUnliked = this.state.postsUnliked.filter(p => p._id !== post._id);
        let postsLiked = this.state.postsLiked.filter(p => p._id !== post._id);
        this.setState({postsUnliked: postsUnliked, postsLiked: postsLiked});
      }
    }
  }

  onSeeProfile = () => {
    const { profile } = this.state;
    this.props.navigate(profile.username);
  }

  onFollow = () => {

  }

  render() {
    const { auth } = this.props
    const { loading, tab, profile, posts, postsLiked, postsUnliked } = this.state;

    return (
      <Wrapper loading={loading}>
        <Box className='profile'>
          <ProfileInfo username={auth.user.username} profile={profile} profileView={true} onSeeProfile={this.onSeeProfile} onFollow={this.onFollow}/>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={this.handleChange} aria-label="basic tabs example">
              <Tab label="Posts" {...defineProps(0)} />
              <Tab label="Liked" {...defineProps(1)} />
              <Tab label="Unliked" {...defineProps(2)} />
            </Tabs>
          </Box>
          <MyTabPanel value={tab} index={0}>
            <Posts {...this.props} posts={posts} updatePosts={this.updatePosts}/>
          </MyTabPanel>
          <MyTabPanel value={tab} index={1}>
            <Posts {...this.props} posts={postsLiked} updatePosts={this.updatePosts}/>
          </MyTabPanel>
          <MyTabPanel value={tab} index={2}>
            <Posts {...this.props} posts={postsUnliked} updatePosts={this.updatePosts}/>
          </MyTabPanel>
        </Box>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

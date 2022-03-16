import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../services/redux/actions/userActions'
import { Box, Tab, Tabs } from '@mui/material'
import Wrapper from '../../components/Wrapper'
import MyTabPanel from '../../components/MyTabPanel'
import MyModal from '../../components/MyModal'
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
      postsDisliked: [],
      showProfileInfo: false
    }
  }

  componentDidMount() { 
    const { pathname = []} = this.props.location;
    const username = pathname.slice(6);

    this.fetchProfile(username);
  }

  componentDidUpdate(prevProps, prevState) { 
    const prevPathname = prevProps.location.pathname;
    const pathname = this.props.location.pathname;

    if (prevPathname !== pathname) {
      const username = pathname.slice(6);
      this.fetchProfile(username);
    }
  } 

  fetchProfile = async (username) => {
    this.setState({loading: true});

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
        postsDisliked: userProfile.dislikes, 
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
        let postsDisliked = this.state.postsDisliked.filter(p => p._id !== post._id);
        this.setState({postsDisliked: postsDisliked});
      } else if (post.dislikes.includes(userId)) {
        const indDislike = this.state.postsDisliked.findIndex(p => p._id === post._id);
        if (indDislike >= 0) {
          let postsDisliked = [...this.state.postsDisliked];
          postsDisliked[indDislike] = {...postsDisliked};
          this.setState({postsDisliked: postsDisliked});
        } else {
          let postsDisliked = [post, ...this.state.postsDisliked];
          this.setState({postsDisliked: postsDisliked});
        }
        let postsLiked = this.state.postsLiked.filter(p => p._id !== post._id);
        this.setState({postsLiked: postsLiked});
      } else {
        let postsDisliked = this.state.postsDisliked.filter(p => p._id !== post._id);
        let postsLiked = this.state.postsLiked.filter(p => p._id !== post._id);
        this.setState({postsDisliked: postsDisliked, postsLiked: postsLiked});
      }
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
    let postsLiked = [...this.state.postsLiked];
    for (let i=0; i<this.state.postsLiked.length; i++) {
      if (this.state.postsLiked[i].author._id === authorId) {
        let post = {...this.state.postsLiked[i]};
        post.author.followersNumber = numFollowers;
        postsLiked[i] = post;
      }
    }
    let postsDisliked = [...this.state.postsDisliked];
    for (let i=0; i<this.state.postsDisliked.length; i++) {
      if (this.state.postsDisliked[i].author._id === authorId) {
        let post = {...this.state.postsDisliked[i]};
        post.author.followersNumber = numFollowers;
        postsDisliked[i] = post;
      }
    }
    let profile = {...this.state.profile};
    profile.followersNumber = numFollowers;

    this.setState({profile, posts, postsLiked, postsDisliked});    
  }

  onFollow = async () => {
    const { profile } = this.state;
    await this.props.followUser(profile._id);
    const { user } = this.props;

    if (user.failed) {
      this.props.showNotification(user.error);
      await this.props.clearErrorUser();
    } else {
      this.updateAuthor(profile._id, profile.followersNumber + 1);
    }
  }

  onUnfollow = async () => {
    const { profile } = this.state;
    await this.props.unfollowUser(profile._id);
    const { user } = this.props;

    if (user.failed) {
      this.props.showNotification(user.error);
      await this.props.clearErrorUser();
    } else {
      this.updateAuthor(profile._id, profile.followersNumber - 1);
    }
  }

  onEditInfo = () => {
    this.setState({showProfileInfo: true});
  }
  
  onCancelEditInfo = () => {
    this.setState({showProfileInfo: false});
  }

  render() {
    const { auth } = this.props;
    const { loading, tab, profile, posts, postsLiked, postsDisliked, showProfileInfo } = this.state;
    const isFollowed = auth.following.includes(profile._id);
    
    return (
      <Wrapper loading={loading}>
        <Box className='profile'>
          <ProfileInfo username={auth.user.username} profile={profile} profileView={true} isFollowed={isFollowed} onFollow={this.onFollow} onUnfollow={this.onUnfollow} onEditInfo={this.onEditInfo}/>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={this.handleChange} aria-label="basic tabs example">
              <Tab label="Posts" {...defineProps(0)} />
              <Tab label="Liked" {...defineProps(1)} />
              <Tab label="Disliked" {...defineProps(2)} />
            </Tabs>
          </Box>
          <MyTabPanel value={tab} index={0}>
            <Box className='profile-posts'>
              <Posts {...this.props} posts={posts} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/>
            </Box>
          </MyTabPanel>
          <MyTabPanel value={tab} index={1}>
            <Box className='profile-posts'>
              <Posts {...this.props} posts={postsLiked} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/>
            </Box>
          </MyTabPanel>
          <MyTabPanel value={tab} index={2}>
            <Box className='profile-posts'>
              <Posts {...this.props} posts={postsDisliked} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor}/>
            </Box>
          </MyTabPanel>
        </Box>
        <MyModal open={showProfileInfo} name='edit-info' onClose={this.onCancelEditInfo}>
          {/* <CreatePost onCancel={this.onCancelPost} onPost={this.onPost} categories={category.categories} btnLoading={btnCreatePostLoading}/> */}
        </MyModal>
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

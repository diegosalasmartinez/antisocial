import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@mui/material'
import ProfileBasicInfo from './ProfileBasicInfo'

class ProfileInfo extends Component {   
  onSeeProfile = () => {
    const { profileView } = this.props

    if (!profileView) {
      this.props.onSeeProfile();
    }
  }

  render() {
    const { profile, profileView, authReducer } = this.props;
    const isFollowed = authReducer.following.includes(profile._id);
    const username = authReducer.user.username;
    
    return (
      <Box className='profile-info'>
        <ProfileBasicInfo profile={profile} username={username} profileView={profileView} isFollowed={isFollowed} onSeeProfile={this.onSeeProfile} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow} onEditInfo={this.props.onEditInfo}/>
        <Typography className='info' textAlign="left" sx={{ fontSize: 15, marginBottom: '5px' }}>
          {profile.description}
        </Typography>
        <Box sx={{display: 'flex', gap: '15px'}}>
          <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
            {profile.postsNumber} Posts
          </Typography>
          <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
            {profile.followersNumber} Followers
          </Typography>
          <Typography className='info' textAlign="left" sx={{ fontSize: 15 }}>
            {profile.followingNumber} Following
          </Typography>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)
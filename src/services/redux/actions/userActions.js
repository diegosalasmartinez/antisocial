import {
  GET_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOWING_USERS,
  CLEAR_ERROR_USER,
  ERROR_USER
} from './actionTypes/userActionTypes'
import getError from '../getError'
import {
  getProfile as getProfileAPI,
  updateUserInfo as updateUserInfoAPI,
  getRecommendedUsers as getRecommendedUsersAPI,
  following as followingAPI,
  followUser as followUserAPI,
  unfollowUser as unfollowUserAPI,
} from '../../api/user-api'

const getProfile = (username) => async (dispatch) => {
  try {
    return await getProfileAPI(username);
  } catch(e){
    const actionType = getError(e, ERROR_USER);
    return dispatch(actionType)
  }
}

const updateUserInfo = (user) => async (dispatch) => {
  try {
    return await updateUserInfoAPI(user);
  } catch(e){
    const actionType = getError(e, ERROR_USER);
    return dispatch(actionType)
  }
}

const following = () => async (dispatch) => {
  try {
    const res = await followingAPI();
    return dispatch({
      type: FOLLOWING_USERS,
      playload: res.following
    })
  } catch(e){
    const actionType = getError(e, ERROR_USER);
    return dispatch(actionType)
  }
}

const getRecommendedUsers = () => async (dispatch) => {
  try {
    const res = await getRecommendedUsersAPI();
    return res.map(r => r.author);
  } catch(e){
    const actionType = getError(e, ERROR_USER);
    return dispatch(actionType)
  }
}

const followUser = (username) => async (dispatch) => {
  try {
    const res = await followUserAPI(username);
    return dispatch({
      type: FOLLOW_USER,
      playload: res.following
    })
  } catch(e){
    const actionType = getError(e, ERROR_USER);
    return dispatch(actionType)
  }
}

const unfollowUser = (username) => async (dispatch) => {
  try {
    const res = await unfollowUserAPI(username);
    return dispatch({
      type: UNFOLLOW_USER,
      playload: res.following
    })
  } catch(e){
    const actionType = getError(e, ERROR_USER);
    return dispatch(actionType)
  }
}

const clearErrorUser = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR_USER,
  })
}

export { 
  getProfile,
  updateUserInfo,
  getRecommendedUsers,
  following,
  followUser,
  unfollowUser,
  clearErrorUser
}

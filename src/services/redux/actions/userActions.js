import {
  GET_USER,
  FOLLOW_USER,
  CLEAR_ERROR_USER,
  ERROR_USER
} from './actionTypes/userActionTypes'
import getError from '../getError'
import {
  getProfile as getProfileAPI,
  followUser as followUserAPI,
} from '../../api/user-api'

const getProfile = (username) => async (dispatch) => {
  try {
    return await getProfileAPI(username);
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

const clearErrorUser = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR_USER,
  })
}

export { 
  getProfile,
  followUser,
  clearErrorUser
}

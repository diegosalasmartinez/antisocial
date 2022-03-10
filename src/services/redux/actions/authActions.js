import {
  LOGIN,
  REGISTER,
  LOGOUT,
  FOLLOW_USER,
  CLEAR_ERROR_AUTH,
  UNAUTHORIZED,
  ERROR_AUTH
} from './actionTypes/authActionTypes'
import {
  login as loginAPI,
  register as registerAPI,
  followUser as followUserAPI
} from '../../api/auth-api'
import getError from '../getError'

const login = (user) => async (dispatch) => {
  let message = "There was a problem with the server. Sorry :("
  try {
    const res = await loginAPI(user);
    return dispatch({
      type: LOGIN,
      playload: res
    })
  } catch(e){
    if (e.response && e.response.data && e.response.data.message) {
      message = e.response.data.message;
    }
  }
  return dispatch({
    type: ERROR_AUTH,
    playload: message
  })
}

const register = (user) => async (dispatch) => {
  let message = "There was a problem with the server. Sorry :("
  try {
    const res = await registerAPI(user);
    return dispatch({
      type: REGISTER,
      playload: res
    })
  } catch(e){
    if (e.response && e.response.data && e.response.data.message) {
      message = e.response.data.message;
    }
  }
  return dispatch({
    type: ERROR_AUTH,
    playload: message
  })
}

const followUser = (username) => async (dispatch) => {
  try {
    const followers = await followUserAPI(username);
    return dispatch({
      type: FOLLOW_USER,
      playload: followers
    })
  } catch(e){
    const actionType = getError(e, ERROR_AUTH);
    return dispatch(actionType)
  }
}

const logout = () => async (dispatch) => {
  return dispatch({
    type: LOGOUT
  })
}

const clearErrorAuth = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR_AUTH,
  })
}

export { login, logout, register, followUser, clearErrorAuth }

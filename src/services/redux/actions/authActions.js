import {
  LOGIN,
  REGISTER,
  LOGOUT,
  UNAUTHORIZED,
  ERROR_AUTH
} from './actionTypes/authActionTypes'
import {
  login as loginAPI,
  register as registerAPI,
} from '../../api/auth-api'

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

const logout = () => async (dispatch) => {
  return dispatch({
    type: LOGOUT
  })
}

export { login, logout, register }

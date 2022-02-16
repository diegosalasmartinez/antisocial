import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UNAUTHORIZED,
  ERROR_AUTH
} from '../actions/actionTypes/authActionTypes'

const initialState = {
  user: {
    name: "",
    lastName: ""
  },
  token: "",
  error: "",
  loaded: false,
  failed: false
};

const auth = (state = initialState, action) => {    
  switch(action.type){
    case UNAUTHORIZED:
    case LOGOUT:
      return {...initialState, loaded: true, failed: false};
    case REGISTER:
    case LOGIN:
      return {...state, user: {...action.playload.user}, token: action.playload.token, error: "", loaded: true, failed: false};
    case ERROR_AUTH:
      return {...initialState, error: action.playload, loaded: true, failed: true};
    default:
      return {...state};
  }
}

export default auth

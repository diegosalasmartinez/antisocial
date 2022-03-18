import {
  GET_USER,
  UPDATE_USER,
  CLEAR_ERROR_USER,
  ERROR_USER
} from '../actions/actionTypes/userActionTypes'

const initialState = {
  error: "",
  loaded: false,
  failed: false
};

const user = (state = initialState, action) => {    
  switch(action.type){
    case GET_USER:
      return {...state, loaded: true, failed: false};
    case ERROR_USER:
      return {...state, loaded: true, failed: true, error: action.playload};
    case UPDATE_USER:
    case CLEAR_ERROR_USER:
      return {...state, loaded: true, failed: false, error: ''};
    default:
      return {...state};
  }
}

export default user

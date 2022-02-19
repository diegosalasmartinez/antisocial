import {
  CREATE_POST,
  GET_POSTS,
  ERROR_POST,
  CLEAR_ERROR_POST
} from '../actions/actionTypes/postActionTypes'

const initialState = {
  error: "",
  loaded: false,
  failed: false
};

const post = (state = initialState, action) => {    
  switch(action.type){
    case GET_POSTS:
    case CREATE_POST:
      return {...state, loaded: true, failed: false};
    case ERROR_POST:
      return {...state, loaded: true, failed: true, error: action.playload};
    case CLEAR_ERROR_POST:
      return {...state, loaded: true, failed: false, error: ''};
    default:
      return {...state};
  }
}

export default post

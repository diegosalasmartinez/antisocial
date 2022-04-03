import {
  ERROR_REPLY,
  CLEAR_ERROR_REPLY
} from '../actions/actionTypes/replyActionTypes'

const initialState = {
  error: "",
  loaded: false,
  failed: false
};

const reply = (state = initialState, action) => {    
  switch(action.type){
    case ERROR_REPLY:
      return {...state, loaded: true, failed: true, error: action.playload};
    case CLEAR_ERROR_REPLY:
      return {...state, loaded: true, failed: false, error: ''};
    default:
      return {...state};
  }
}

export default reply

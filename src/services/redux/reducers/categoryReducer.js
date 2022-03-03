import {
  GET_CATEGORIES,
  CLEAR_ERROR_CATEGORY,
  ERROR_CATEGORY
} from '../actions/actionTypes/categoryActionTypes'

const initialState = {
  categories: [],
  error: "",
  loaded: false,
  failed: false
};

const category = (state = initialState, action) => {    
  switch(action.type){
    case GET_CATEGORIES:
      return {...state, categories: [...action.playload], loaded: true, failed: false};
    case ERROR_CATEGORY:
      return {...state, loaded: true, failed: true, error: action.playload};
    case CLEAR_ERROR_CATEGORY:
      return {...state, loaded: true, failed: false, error: ''};
    default:
      return {...state};
  }
}

export default category

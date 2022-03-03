import {
  GET_CATEGORIES,
  CLEAR_ERROR_CATEGORY,
  ERROR_CATEGORY
} from './actionTypes/categoryActionTypes'
import getError from '../getError'
import {
  getCategories as getCategoriesAPI,
} from '../../api/category-api'

const getCategories = () => async (dispatch) => {
  try {
    const res = await getCategoriesAPI();
    return dispatch({
      type: GET_CATEGORIES,
      playload: res
    })
  } catch(e){
    const actionType = getError(e, ERROR_CATEGORY);
    return dispatch(actionType)
  }
}

const clearErrorCategory = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR_CATEGORY,
  })
}

export { 
  getCategories,
  clearErrorCategory
}

import {
  CREATE_POST,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  ERROR_POST,
  CLEAR_ERROR_POST,
} from './actionTypes/postActionTypes'
import getError from '../getError'
import {
  getPostsByFollowingUsers as getPostsByFollowingUsersAPI,
  getPostsByCategory as getPostsByCategoryAPI,
  getSavedPosts as getSavedPostsAPI,
  createPost as createPostAPI,
  likePost as likePostAPI,
  unlikePost as unlikePostAPI,
  savePost as savePostAPI,
} from '../../api/post-api'

const createPost = (post) => async (dispatch) => {
  try {
    const res = await createPostAPI(post);
    return dispatch({
      type: CREATE_POST,
      playload: res
    })
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const getPostsByFollowingUsers = () => async (dispatch) => {
  try {
    return await getPostsByFollowingUsersAPI();
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const getPostsByCategory = (categoryId) => async (dispatch) => {
  try {
    return await getPostsByCategoryAPI(categoryId);
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const getSavedPosts = () => async (dispatch) => {
  try {
    return await getSavedPostsAPI();
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const likePost = (p) => async (dispatch) => {
  try {
    const res = await likePostAPI(p);
    return res;
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const unlikePost = (p) => async (dispatch) => {
  try {
    const res = await unlikePostAPI(p);
    return res;
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const savePost = (p) => async (dispatch) => {
  try {
    const res = await savePostAPI(p);
    return res;
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const clearErrorPost = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR_POST,
  })
}

export { 
  getPostsByFollowingUsers,
  getPostsByCategory, 
  getSavedPosts,
  createPost, 
  likePost, 
  unlikePost, 
  savePost,
  clearErrorPost 
}

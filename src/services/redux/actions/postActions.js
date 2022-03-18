import {
  CREATE_POST,
  ERROR_POST,
  CLEAR_ERROR_POST,
} from './actionTypes/postActionTypes'
import getError from '../getError'
import {
  getPostsByFollowingUsers as getPostsByFollowingUsersAPI,
  getPostsByCategory as getPostsByCategoryAPI,
  getSavedPosts as getSavedPostsAPI,
  getMostLikedPosts as getMostLikedPostsAPI,
  createPost as createPostAPI,
  likePost as likePostAPI,
  dislikePost as dislikePostAPI,
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

const getMostLikedPosts = (timeOption) => async (dispatch) => {
  try {
    return await getMostLikedPostsAPI(timeOption);
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

const dislikePost = (p) => async (dispatch) => {
  try {
    const res = await dislikePostAPI(p);
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
  getMostLikedPosts,
  createPost, 
  likePost, 
  dislikePost, 
  savePost,
  clearErrorPost 
}

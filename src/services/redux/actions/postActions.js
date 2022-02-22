import {
  CREATE_POST,
  GET_POSTS,
  LIKE_POST,
  ERROR_POST,
  CLEAR_ERROR_POST
} from './actionTypes/postActionTypes'
import getError from '../getError'
import {
  getPosts as getPostsAPI,
  createPost as createPostAPI,
  likePost as likePostAPI
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

const getPosts = () => async (dispatch) => {
  try {
    return await getPostsAPI();
  } catch(e){
    const actionType = getError(e, ERROR_POST);
    return dispatch(actionType)
  }
}

const likePost = (p) => async (dispatch) => {
  try {
    const res = await likePostAPI(p);
    return dispatch({
      type: LIKE_POST,
      playload: res
    })
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

// const createPost = (pagination, searchParams) => async (dispatch) => {
//   let message = "There was a problem with the server. Sorry :("
//   try {
//       const res = await getAppointmentsAPI(pagination, searchParams);
//       return dispatch({
//           type: GET_APPOINTMENTS,
//           playload: res
//       })
//   } catch(e){
//       if (e.response && e.response.statusText === "Unauthorized") {
//           return dispatch({
//               type: UNAUTHORIZED
//           })
//       }
//       if (e.response && e.response.data && e.response.data.message) {
//           message = e.response.data.message;
//       }
//   }
//   return dispatch({
//       type: ERROR_APPOINTMENT,
//       playload: message
//   })
// }

export { getPosts, createPost, likePost, clearErrorPost }

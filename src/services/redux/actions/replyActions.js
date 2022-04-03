import {
  ERROR_REPLY,
  CLEAR_ERROR_REPLY
} from './actionTypes/replyActionTypes'
import getError from '../getError'
import {
  likeReply as likeReplyAPI,
  dislikeReply as dislikeReplyAPI
} from '../../api/reply-api'

const likeReply = (r) => async (dispatch) => {
  try {
    const res = await likeReplyAPI(r);
    return res;
  } catch(e){
    const actionType = getError(e, ERROR_REPLY);
    return dispatch(actionType)
  }
}

const dislikeReply = (r) => async (dispatch) => {
  try {
    const res = await dislikeReplyAPI(r);
    return res;
  } catch(e){
    const actionType = getError(e, ERROR_REPLY);
    return dispatch(actionType)
  }
}

const clearErrorReply = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR_REPLY,
  })
}

export { 
  likeReply,
  dislikeReply,
  clearErrorReply
}

import { apiPost } from './api'
const base = 'replies'

const likeReply = async (reply) => {
  return await apiPost(`${base}/like`, reply);
}

const dislikeReply = async (reply) => {
  return await apiPost(`${base}/dislike`, reply);
}

export { 
  likeReply,
  dislikeReply
}
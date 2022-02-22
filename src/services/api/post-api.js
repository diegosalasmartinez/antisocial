import { apiGet, apiPost } from './api'
const base = 'posts'

const createPost = async (post) => {
  return await apiPost(`${base}/add`, post);
}

const getPosts = async () => {
  return await apiGet(`${base}/`);
}

const likePost = async (postId) => {
  return await apiPost(`${base}/like`, postId);
}

export { getPosts, createPost, likePost }
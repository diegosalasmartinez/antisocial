import { apiGet, apiPost } from './api'
const base = 'posts'

const createPost = async (post) => {
  return await apiPost(`${base}/add`, post);
}

const getPosts = async () => {
  return await apiGet(`${base}/`);
}

const getMyPosts = async () => {
  return await apiGet(`${base}/`);
}

const likePost = async (post) => {
  return await apiPost(`${base}/like`, post);
}

const unlikePost = async (post) => {
  return await apiPost(`${base}/unlike`, post);
}

const favPost = async (post) => {
  return await apiPost(`${base}/fav`, post);
}

export { getPosts, getMyPosts, createPost, likePost, unlikePost, favPost }
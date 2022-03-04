import { apiGet, apiPost } from './api'
const base = 'posts'

const createPost = async (post) => {
  return await apiPost(`${base}/add`, post);
}

const getPosts = async (category) => {
  return await apiGet(`${base}?category=${category}`);
}

const likePost = async (post) => {
  return await apiPost(`${base}/like`, post);
}

const unlikePost = async (post) => {
  return await apiPost(`${base}/unlike`, post);
}

const savePost = async (post) => {
  return await apiPost(`${base}/save`, post);
}

export { getPosts, createPost, likePost, unlikePost, savePost }
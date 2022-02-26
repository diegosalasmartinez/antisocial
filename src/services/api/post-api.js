import { apiGet, apiPost } from './api'
const base = 'posts'

const createPost = async (post) => {
  return await apiPost(`${base}/add`, post);
}

const getPosts = async () => {
  return await apiGet(`${base}/`);
}

const getProfile = async (username) => {
  return await apiGet(`${base}/${username}`);
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

export { getPosts, getProfile, createPost, likePost, unlikePost, favPost }
import { apiGet, apiPost } from './api'
const base = 'posts'

const createPost = async (post) => {
  return await apiPost(`${base}/add`, post);
}

const getPostsByFollowingUsers = async () => {
  return await apiGet(`${base}/following`);
}

const getPostsByCategory = async (category) => {
  return await apiGet(`${base}/category/${category}`);
}

const getSavedPosts = async () => {
  return await apiGet(`${base}/saved`);
}

const getMostLikedPosts = async (timeOption) => {
  return await apiGet(`${base}/mostLiked?timeOption=${timeOption}`);
}

const likePost = async (post) => {
  return await apiPost(`${base}/like`, post);
}

const dislikePost = async (post) => {
  return await apiPost(`${base}/dislike`, post);
}

const savePost = async (post) => {
  return await apiPost(`${base}/save`, post);
}

export { 
  getPostsByFollowingUsers, 
  getPostsByCategory,
  getSavedPosts, 
  getMostLikedPosts,
  createPost, 
  likePost, 
  dislikePost, 
  savePost 
}
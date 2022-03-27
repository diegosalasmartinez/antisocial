import { apiGet, apiPost } from './api'
const base = 'posts'

const createPost = async (post) => {
  return await apiPost(`${base}/add`, post);
}

const getPost = async (postId) => {
  return await apiGet(`${base}/details/${postId}`);
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

const replyPost = async (postId, message) => {
  return await apiPost(`${base}/reply/${postId}`, message);
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
  getPost,
  replyPost,
  likePost, 
  dislikePost, 
  savePost 
}
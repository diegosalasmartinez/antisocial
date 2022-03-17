import { apiGet, apiPatch } from './api'
const base = 'users'

const getProfile = async (username) => {
  return await apiGet(`${base}/${username}`);
}

const updateUserInfo = async (user) => {
  return await apiPatch(`${base}/${user._id}`, user);
}

const following = async () => {
  return await apiGet(`${base}/following`);
}

const getRecommendedUsers = async () => {
  return await apiGet(`${base}/recommended-users`);
}

const followUser = async (username) => {
  return await apiGet(`${base}/follow/${username}`);
}

const unfollowUser = async (username) => {
  return await apiGet(`${base}/unfollow/${username}`);
}

export { getProfile, updateUserInfo, getRecommendedUsers, following, followUser, unfollowUser }
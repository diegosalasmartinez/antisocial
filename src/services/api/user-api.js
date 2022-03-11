import { apiGet } from './api'
const base = 'users'

const getProfile = async (username) => {
  return await apiGet(`${base}/${username}`);
}

const following = async () => {
  return await apiGet(`${base}/following`);
}

const followUser = async (username) => {
  return await apiGet(`${base}/follow/${username}`);
}

const unfollowUser = async (username) => {
  return await apiGet(`${base}/unfollow/${username}`);
}

export { getProfile, following, followUser, unfollowUser }
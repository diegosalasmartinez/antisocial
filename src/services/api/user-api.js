import { apiGet, apiPost } from './api'
const base = 'users'

const getProfile = async (username) => {
  return await apiGet(`${base}/${username}`);
}

const followUser = async (username) => {
  return await apiGet(`${base}/follow/${username}`);
}

export { getProfile, followUser }
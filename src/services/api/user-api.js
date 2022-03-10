import { apiGet, apiPost } from './api'
const base = 'users'

const getProfile = async (username) => {
  return await apiGet(`${base}/${username}`);
}

export { getProfile }
import { apiGet, apiPost } from './api'
const base = 'auth'

const login = async (user) => {
  return await apiPost(`${base}/login`, user);
}

const register = async (user) => {
    return await apiPost(`${base}/register`, user);
}

const followUser = async (username) => {
  return await apiGet(`${base}/follow/${username}`);
}

export { login, register, followUser }
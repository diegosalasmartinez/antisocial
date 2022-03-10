import { apiPost } from './api'
const base = 'auth'

const login = async (user) => {
  return await apiPost(`${base}/login`, user);
}

const register = async (user) => {
    return await apiPost(`${base}/register`, user);
}

export { login, register }
import { apiGet, apiPost } from './api'
const base = 'categories'

const getCategories = async () => {
  return await apiGet(`${base}/`);
}

export { getCategories }
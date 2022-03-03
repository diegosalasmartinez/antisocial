import { combineReducers } from 'redux'

import auth from './authReducer'
import post from './postReducer'
import user from './userReducer'
import category from './categoryReducer'

const rootReducer = combineReducers({
	auth,
	post,
	user,
	category,
})

export default rootReducer

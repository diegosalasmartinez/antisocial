import { combineReducers } from 'redux'

import auth from './authReducer'
import post from './postReducer'
import user from './userReducer'

const rootReducer = combineReducers({
	auth,
	post,
	user
})

export default rootReducer

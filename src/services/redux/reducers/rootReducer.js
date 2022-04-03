import { combineReducers } from 'redux'

import auth from './authReducer'
import post from './postReducer'
import reply from './replyReducer'
import user from './userReducer'
import category from './categoryReducer'

const rootReducer = combineReducers({
	auth,
	post,
	reply,
	user,
	category,
})

export default rootReducer

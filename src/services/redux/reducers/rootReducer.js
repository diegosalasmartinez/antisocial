import { combineReducers } from 'redux'

import auth from './authReducer'
import post from './postReducer'

const rootReducer = combineReducers({
	auth,
	post
})

export default rootReducer

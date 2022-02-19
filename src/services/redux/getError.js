import {
  UNAUTHORIZED
} from './actions/actionTypes/authActionTypes'

const getError = (e, actionType) => {
  let message = "There was a problem with the server. Sorry :("

  if (e.response && e.response.statusText === "Unauthorized") {
    return {
      type: UNAUTHORIZED
    }
  } else {
    if (e.response && e.response.data && e.response.data.message) {
      message = e.response.data.message;
    }
    return {
      type: actionType,
      playload: message
    }
  }
}

export default getError
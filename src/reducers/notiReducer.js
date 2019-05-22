import * as types from '../actions/types';
const initialState = [];

const activityReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_NOTIS:
      const newNotis = state.concat(action.notis)
      return newNotis
    case types.RESET_NOTIS:
      return action.notis
    case "GET_NOTISLIST":
      const allNotis = state.concat(action.data)
    return allNotis
    default:
      break;
  }
  return state
}

export default activityReducer;
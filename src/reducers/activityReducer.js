import * as types from '../actions/types';
const initialState = [];

const activityReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_ACTIVITIES:
      const newActivities = state.concat(action.activities)      
      return newActivities
    case types.RESET_ACTIVITIES:
      return action.activities  
    default:
      break;
  }
  return state
}

export default activityReducer;
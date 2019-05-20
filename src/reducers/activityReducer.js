import * as types from '../actions/types';
const initialState = [];

const activityReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_ACTIVITIES:
      const newActivities = state.concat(action.activities)      
      return newActivities
    case types.RESET_ACTIVITIES:
      return action.activities
    case types.REMOVE_ACTIVITIES:
      const index = state.findIndex(activity => activity.A_ID === action.id)
      if (index !== -1) {
        state.splice(index, 1)
        return [...state]
      }
      return [...state]
    default:
      break;
  }
  return [...state]
}

export default activityReducer;
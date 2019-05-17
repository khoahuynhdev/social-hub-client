import * as types from '../actions/types';
const initialState = [];

const jointActivityReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_JOINT_ACTIVITY:
      const newJointActivities = state.concat(action.jointActivities)
      return newJointActivities
    default:
      break;
  }
  return state
}

export default jointActivityReducer;
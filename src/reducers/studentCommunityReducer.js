import * as types from '../actions/types';
const initialState = null;

const studentCommunityReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_STUDENT_COMMUNITY:
      return action.payload
    default:
      break;
  }
  return state
}

export default studentCommunityReducer;
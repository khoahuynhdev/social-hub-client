import * as types from '../actions/types';
const initialState = null;

const joinYCReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_JOINYC:
      return action.payload
    default:
      break;
  }
  return state
}

export default joinYCReducer;
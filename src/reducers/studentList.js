const initialState = [];
const studentReducer = (state = initialState, action) => {
  let data = [];
  switch (action.type) {
    case "GET_STUDENTLIST":
      data = state.concat(action.data);
      return data;
    case "GET_ACTIVITYSTUDENTLIST":
      data = state.concat(action.dataactivity);
      return data;
    case "GET_PENDINGCOMMUNITYSTUDENTLIST":
      data = state.concat(action.data);
      return data;
    case "GET_PENDINGYOUTHSTUDENTLIST":
      data = state.concat(action.data);
      return data;
    case "RESET_STARRAY":
      data = action.value;
      return data;
    default:
        break;
  }
  return state;
};
export default studentReducer;

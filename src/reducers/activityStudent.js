
const initialState = [];

const activityStudent = (state = initialState, action) => {

  switch (action.type) {
    case "StudentActivity":
      const newActivities = state.concat(action.activities)      
      return newActivities
    default:
      break;
  }
  return state
}

export default activityStudent;
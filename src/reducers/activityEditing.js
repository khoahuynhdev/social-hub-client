const initialState = {
    AT_ID: 1,
    A_NAME: "",
    CONTENT: "",
    STARTDATE: "",
    ENDDATE: "",
    FEE: ""
  };
  
const activityEditing = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_Activity_EDITING':
          return action.activity
      default:
      return state;
  }

}

export default activityEditing;
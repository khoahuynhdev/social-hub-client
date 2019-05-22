const initialState = true;

const isAddNewActivity = (state = initialState, action) => {

  switch (action.type) {
    case "Is_Add_New_Activity": 
      return action.value
    default:
      break;
  }
  return state
}

export default isAddNewActivity;
const initialState="StudentList"
const studentListType = (state = initialState, action) => {

    switch (action.type) {
      case "ChangeStudentList":
        return action.value 
        default:
            break;
    }
    return state
  }
  export default studentListType;
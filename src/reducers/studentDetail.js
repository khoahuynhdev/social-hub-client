const initialState=[]
const studentDetailReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_STUDENTDETAIL":
            
            return action.student;
            default:
                break;
    }
  return state;
};
export default studentDetailReducer;

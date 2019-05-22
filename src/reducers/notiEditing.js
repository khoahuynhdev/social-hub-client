const initialState = {NMID:""};
  
const notiEditing = (state = initialState, action) => {
  switch (action.type) {
      case 'NOTI_DETAIL':
          return action.noti
      default:
      return state;
  }

}

export default notiEditing;
import Axios from 'axios';
export const getStudentList = (data) => {
    return function(dispatch)
    {
    Axios.get(`http://localhost:5000/api/admins/studentlist/?skip=${data.skip}&limit=${data.limit}`)
      .then(res=>dispatch({
          type:"GET_STUDENTLIST",
          data:res.data
      })).catch(res=>dispatch({
        type:"GET_STUDENTLIST",
        data:[],
      }))
    }
}
export const getActivityStudentList = (data) => {
  return function(dispatch)
  {
  Axios.get(`http://localhost:5000/api/admins/activitystudent/?skip=${data.skip}&limit=${data.limit}&A_ID=${data.A_ID}`)
        .then(res=>{
          console.log(res.data)
        return dispatch({
        type:"GET_ACTIVITYSTUDENTLIST",
        dataactivity:res.data,
    })})
    .catch(res=>dispatch({
      type:"GET_ACTIVITYSTUDENTLIST",
      dataactivity:[],
    }))
  }
}
export const getHSVStudentList = (data) => {
  return function(dispatch)
  {
  Axios.get(`http://localhost:5000/api/admins/studentcommunity/?skip=${data.skip}&limit=${data.limit}`)
        .then(res=>{
          console.log(res.data)
        return dispatch({
        type:"GET_PENDINGCOMMUNITYSTUDENTLIST",
        data:res.data,
    })})
    .catch(res=>dispatch({
      type:"GET_PENDINGCOMMUNITYSTUDENTLIST",
      data:[],
    }))
  }
}
export const getStudentDetail = (student) => {
  return {
    type: "GET_STUDENTDETAIL",
    student
  }
}
export const isAddNewActivity = (value) => {
  return {
    type: "Is_Add_New_Activity",
    value
  }
}
export const getActivityEditing=(activity)=>{
  return{
    type:'GET_Activity_EDITING',
    activity
  }
}
export const changeStudentList=(value)=>{
  return{
    type:"ChangeStudentList",
    value
  }
}
export const resetStudentList=(value)=>{
  return function(dispatch)
  {
  return dispatch({
    type:"RESET_STARRAY",
    value
  })
}
}
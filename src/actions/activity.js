/* 3rd party modules */
import axios from 'axios';
/* App modules */
import * as types from './types'
import { getError, setCurrentUser } from './auth';
import setHeaders from '../utils/setHeaders';
export const fetchActivities = (data) => {
  return dispatch => {
    axios.get(`http://localhost:5000/api/activities/?skip=${data.skip}&limit=${data.limit}`)
      .then(res => {
        if (res.data) {
          dispatch(getError(null))
          dispatch(getActivities(res.data.result));
        }
      })
      .catch(error => {
        dispatch(getError(error));
        if (error.response && error.response.data && error.response.data.name === 'TokenExpiredError') {
          dispatch(setCurrentUser({}))
          localStorage.removeItem('token')
          localStorage.removeItem('fingerprint')
          setHeaders(null, null)
        }
      })
  }
}

export const fetchNotis = (data) => {
  return dispatch => {
    axios.get(`http://localhost:5000/api/notis/?skip=${data.skip}&limit=${data.limit}`)
      .then(res => {
        if (res.data) {
          dispatch(getError(null))
          dispatch(getNotis(res.data.result));
        }
      })
      .catch(error => {
        dispatch(getError(error));
        if (error.response && error.response.data && error.response.data.name === 'TokenExpiredError') {          
          dispatch(setCurrentUser({}))
          localStorage.removeItem('token')
          localStorage.removeItem('fingerprint')
          setHeaders(null, null)
        }
      })
  }
}

export const fetchJointActivities = (data) => {
  return dispatch => {
    axios.get(`http://localhost:5000/api/activities/joint?skip=${data.skip}&limit=${data.limit}`)
      .then(res => {
        if (res.data) {
          dispatch(getError(null))
          dispatch(getJointActivities(res.data.result));
        }
      })
      .catch(error => {
        dispatch(getError(error));
        if (error.response && error.response.data && error.response.data.name === 'TokenExpiredError') {
          dispatch(setCurrentUser({}))
          localStorage.removeItem('token')
          localStorage.removeItem('fingerprint')
          setHeaders(null, null)
        }
      })
  }
}
export const fetchActivitiesAdmin = (data) => {
  return dispatch => {
    setTimeout(() => {
      axios.get(`http://localhost:5000/api/activities/adminactivity/?skip=${data.skip}&limit=${data.limit}`)
        .then(res => {
          if (res.data) {
            dispatch(getActivities(res.data.result));
          }
        })
        .catch(error => {
          dispatch(getError(error));
        })
    }, 1000);
  }
}

export const viewActivityDetail = (data) => {
  return dispatch => {
    dispatch(setActivityDetail(data));
  }
}

export const setActivityDetail = (activity) => {
  return {
    type: types.SET_ACTIVITYDETAIL,
    activity
  }
}


export const getActivities = (activities) => {
  return {
    type: types.GET_ACTIVITIES,
    activities
  }
}

export const resetActivities = (activities) => {
  return {
    type: types.RESET_ACTIVITIES,
    activities
  }
}

export const resetNotis = (notis) => {
  return {
    type: types.RESET_NOTIS,
    notis
  }
}

export const getJointActivities = (jointActivities) => {
  return {
    type: types.GET_JOINT_ACTIVITY,
    jointActivities
  }
}

export const resetJointActivities = (jointActivities) => {
  return {
    type: types.RESET_JOINT_ACTIVITIES,
    jointActivities
  }
}

export const getNotis = (notis) => {
  return {
    type: types.GET_NOTIS,
    notis
  }
}

export const removeActivity = (id) => {
  return {
    type: types.REMOVE_ACTIVITIES,
    id
  }
}

export const joinActivity = (data) => {
  return dispatch => {
    axios.post(`http://localhost:5000/api/activities/joinactivity`, data)
      .then(res => {
        dispatch(getError(null));
      })
      .catch(error => {
        dispatch(getError(error));
      })
  }
}

export const selectActivity = (id) => {
  return dispatch => {
    dispatch(removeActivity(id))
  }
}
/* 3rd party modules */
import axios from 'axios';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
/* App modules */
import * as types from './types';
import fingerprint from '../utils/fingerprint';
import setHeaders from '../utils/setHeaders';
import { resetActivities, resetJointActivities, setActivityDetail } from '../actions/activity';
export const activate = (data) => {
  return (dispatch) => {
    axios.post('http://localhost:5000/api/users/activate', data)
      .then(res => {
        if (res.status === 200 && res.data.msg === 'SUCCESS') {
          dispatch(getID(res.data.id))
        }
      })
      .catch(err => {
        dispatch(getError(_.get(err, 'response.data')))
      })
  }
}

export const resetActivate = () => {
  return dispatch => {
    dispatch(getID(""))
  }
}

export const login = (data) => {
  return (dispatch) => {
    fingerprint(fp => {    
      axios.post(`http://localhost:5000/api/users/login`, {...data, fingerprint:fp})
      .then(res => {
        // change state for no errors
        dispatch(getError(null));
        
        const token = res.data.token;
        
        localStorage.setItem('token', token);
        localStorage.setItem('fingerprint', fp);
        
        setHeaders(token, fp);
        
        const decoded = jwtDecode(token);
        
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {        
        dispatch(getError(_.get(err, 'response.data')))
      })
    })    
  }
}

// login with facebook
export const loginFB = (data) => {
  return dispatch => {
    fingerprint(fp => {    
      axios.post(`http://localhost:5000/api/users/loginfb`, {...data, fingerprint: fp})
      .then(res => {
        // change state for no errors
        dispatch(getError(null));
        
        const token = res.data.token;
        
        localStorage.setItem('token', token);
        localStorage.setItem('fingerprint', fp);
        
        setHeaders(token, fp);
        
        const decoded = jwtDecode(token);
        
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {        
        dispatch(getError(_.get(err, 'response.data')))
      })
    })    
  }
}

// log the user out
export const logout = () => {
  return dispatch => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('fingerprint')
      dispatch(setCurrentUser({}))
      dispatch(setActivityDetail({}))
      dispatch(resetActivities([]))
      dispatch(resetJointActivities([]))
      dispatch(setStudentCommunity(null))
      dispatch(setUpdateInfo(null))
      dispatch(getError(null))
      dispatch(getJoinYC(null))
      setHeaders(null, null)
    } catch (err) {
      dispatch(getError(_.get(err, 'response.data')))
    }
  }
}

export const postUpdateInfo = (data) => {
  return dispatch => {
    axios.post(`http://localhost:5000/api/users/update`, data)
      .then(result => {
        dispatch(setUpdateInfo(result.data))
      })
      .catch(err => {
        dispatch(getError(_.get(err, 'response.data')))
      })
  }
}

export const getUpdateInfo = (cb) => {
  return dispatch => {
    axios.get(`http://localhost:5000/api/users/update`)
      .then(result => {
        dispatch(setUpdateInfo(result.data))
        cb()
      })
      .catch(err => {
        dispatch(getError(_.get(err, 'response.data')))
      })
  }
}

export const getStudentCommunity = () => {
  return dispatch => {
    axios.get(`http://localhost:5000/api/users/getJoinstdc`)
    .then(result => {      
      dispatch(setStudentCommunity(result.data))
    })
    .catch(err => {
      dispatch(getError(_.get(err, 'response.data')))
    })
  }
}

export const joinStudentCommunity = (data) => {
  return dispatch => {
    axios.post(`http://localhost:5000/api/users/joinstdc`, data)
      .then(result => {
        dispatch(getError(null))
        dispatch(setStudentCommunity(result.data))
      })
      .catch(err => {
        dispatch(getError(_.get(err, 'response.data')))
      })
  }
}

export const getJoinYC = () => {
  return dispatch => {
    axios.get(`http://localhost:5000/api/users/getJoinyc`)
    .then(result => {
      dispatch(getError(null))
      dispatch(setJoinYC(result.data))
    })
    .catch(err => {
      dispatch(getError(_.get(err, 'response.data')))
    })
  }
}

export const joinYC = (data) => {
  return dispatch => {
    axios.post(`http://localhost:5000/api/users/joinyc`)
      .then(result => {
        dispatch(getError(null))
        dispatch(setJoinYC(result.data))
      })
      .catch(err => {
        dispatch(getError(_.get(err, 'response.data')))
      })
  }
}

export const getID = (id) => {
  return {
    type: types.GET_ID,
    id
  }
}

export const getError = (error) => {
  return {
    type: types.GET_ERRORS,
    error
  }
}

export const setUpdateInfo = (data) => {
  return {
    type: types.SET_UPDATE_INFO,
    data
  }
}

export const setCurrentUser = (profile) => {
  return {
    type: types.SET_CURRENT_USER,
    profile: profile
  }
}

export const setStudentCommunity = (data) => {
  return {
    type: types.GET_STUDENT_COMMUNITY,
    payload: data
  }
}

export const setJoinYC = (data) => {
  return {
    type: types.GET_JOINYC,
    payload: data
  }
}
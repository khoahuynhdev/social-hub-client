import {combineReducers} from 'redux';
import errors from './errorReducer';
import auth from './authReducer';
import id from './idReducer';
import studentList from './studentList';
import activities from './activityReducer';
import activity from './activityDetailReducer';
import update from './updateReducer';
import studentDetail from './studentDetail'
import isAddNewActivity from './isAddNewActivity'
import jointActivities from './jointActivityReducer'
import studentCommunity from './studentCommunityReducer'
import joinYC from './joinYCReducer';
const root = combineReducers({
  errors,
  auth,
  id,
  studentList,
  activities,
  activity,
  update,
  studentDetail,
  isAddNewActivity,
  jointActivities,
  studentCommunity,
  joinYC
})

export default root;
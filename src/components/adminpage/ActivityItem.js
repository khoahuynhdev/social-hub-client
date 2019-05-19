import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {isAddNewActivity,getActivityEditing,changeStudentList,resetStudentList} from '../../action/adminauth/index'
class ActivityItem extends Component {
    render() {
      console.log(this.props)
        return (
            <tr>
        <td>{this.props.index+1}</td>
        <td>{this.props.activity.A_NAME}</td>
        <td>Từ {this.props.activity.STARTDATE} Đến {this.props.activity.ENDDATE}</td>
        <td>
          <button data-toggle="modal" onClick={()=>{
            this.props.isAddNewActivity(false);
            this.props.getActivityEditing(this.props.activity);
          }}
            data-target="#ActivityModel" type="button" className="btn btn-sm btn-info">
            Chi Tiết
          </button>
        </td>
        <td><Link
           className="btn btn-sm btn-block btn-info" onClick={()=>this.props.resetStudentList([])} to={`./${this.props.activity.A_ID}`}>
            Danh Sách
          </Link>{""}</td>
      </tr>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
          isAddNewActivity: (value) => {
          dispatch(isAddNewActivity(value))},
          getActivityEditing:(activity)=>{
            dispatch(getActivityEditing(activity))
          },
          changeStudentList:(value)=>{
            dispatch(changeStudentList(value))
          }
      }
  }


export default connect(null,{mapDispatchToProps,resetStudentList})(ActivityItem);
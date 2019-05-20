import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActivityDetail, joinActivity, removeActivity } from '../../../actions/activity';
import moment from 'moment';
class ActivityD extends PureComponent {
  
  loadImg = (type) => {
    switch (type) {
      case 1:        
        return "./img/doantruong.jpg";
      case 2:
        return "./img/hoisv.jpg";
      case 3:
          return "./img/doankhoa.jpg";
      case 4:
          return "./img/hoisv.jpg";
      case 5:
          return "./img/sinhhoat.jpg";
      case 6:
          return "./img/tinhnguyen.jpg";
      case 7:
          return "./img/hoithao.jpg";        
      default:
        return "./img/school.jpg";
    }
  }

  handleOnClick = () => {    
    // call API
    const data = {
      id: this.props.auth.profile.ID,
      a_id: this.props.activity.A_ID
    }
    this.props.joinActivity(data)
    if (this.props.errors && this.props.errors.config) return;
    this.props.removeActivity(this.props.activity.A_ID)
  }
  
  viewDetail = () => {
    this.props.setActivityDetail(this.props.activity)
  }
  render() {
    const { A_NAME, CREATE_DATE, AT_ID } = this.props.activity;
    return (
      <div className="card mt-2">
        <div className="card-header">
          <h4>{A_NAME}</h4>
          <p>{moment(CREATE_DATE).startOf('days').fromNow()}</p>
          <img src={this.loadImg(AT_ID)} className="img-fluid" alt="event" />
        </div>
        <div className="card-body d-flex justify-content-end">
          <button className="btn btn-myapp m-1"
            data-toggle="modal"
            data-target="#activityDetail" onClick={this.viewDetail}>Xem Chi Tiết</button>
          <button className="btn btn-myapp2 m-1" onClick={this.handleOnClick}>Tham gia</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}


export default connect(mapStateToProps, { setActivityDetail, joinActivity, removeActivity })(ActivityD);
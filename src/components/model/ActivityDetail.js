import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
class ActivityDetail extends Component {
  constructor(props) {
    super(props);
    this.setState = {      
    }
  }

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

  render() {
    const { A_NAME, CONTENT, STARTDATE, ENDDATE, AT_NAME, AC_POINT, AT_ID } = this.props.activity;
    return (
      <div
        className="modal fade"
        id="activityDetail"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5 className="modal-title ">{A_NAME}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="model-body">
              <div className="mt-2">
                <h4>Thời Gian Diễn Ra</h4>
                <h6>{moment(STARTDATE).calendar()}:{moment(ENDDATE).calendar()}</h6>
              </div>
              <hr></hr>
              <div className="mt-2">
                <h4>Nội Dung</h4>
                <div className="px-5 text-overflow">
                  <p>{CONTENT}</p>
                </div>
              </div>
              <hr></hr>
              <img
                src={this.loadImg(AT_ID)}
                className="img-fluid rounded w-75 mt-2"
                alt="event"
              />
              <hr></hr>
              <div className="mt-2">
                <h4>Loại Hoạt Động</h4>
                <h6>{AT_NAME}</h6>
                <h6>Điểm rèn luyện: {AC_POINT}</h6>
              </div>
            </div>
            <div className="modal-footer">              
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activity: state.activity
  }
}

export default connect(mapStateToProps, {})(ActivityDetail);

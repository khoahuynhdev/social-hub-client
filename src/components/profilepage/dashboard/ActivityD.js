import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActivityDetail, joinActivity } from '../../../actions/activity';

class ActivityD extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      joint: false,
      once: false
    }
  }

  handleOnClick = () => {
    if (this.state.once) {
      return this.setState({joint: !this.state.joint})
    }
    // call API
    const data = {
      id: this.props.auth.profile.ID,
      a_id: this.props.activity.A_ID
    }
    this.props.joinActivity(data)
    if (this.props.errors && this.props.errors.config) return;
    this.setState({joint: !this.state.joint, once: true})
  }
  
  viewDetail = () => {
    this.props.setActivityDetail(this.props.activity)
  }
  render() {
    const { A_NAME, CREATE_DATE } = this.props.activity;
    return (
      <div className="card mt-2">
        <div className="card-header">
          <h4>{A_NAME}</h4>
          <p>{CREATE_DATE}</p>
          <img src="./img/test-banner.jpg" className="img-fluid" alt="englishtest" />
        </div>
        <div className="card-body d-flex justify-content-end">
          <button className="btn btn-myapp m-1"
            data-toggle="modal"
            data-target="#activityDetail" onClick={this.viewDetail}>Xem Chi Tiết</button>
          <button className="btn btn-myapp2 m-1" onClick={this.handleOnClick}>{this.state.joint ? "Huỷ": "Tham gia"}</button>
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


export default connect(mapStateToProps, { setActivityDetail, joinActivity })(ActivityD);
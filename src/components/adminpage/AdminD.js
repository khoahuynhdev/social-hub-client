import React, { Component } from "react";
import AdminProfile from "./AdminProfile";
import ActivityBtn from "../featurebutton/ActivityBtn";
import StudentsList from "./StudentsList";
import Activity from "./Activity";
import ActivityModel from "../model/ActivityDetail";
import StudentDetail from "../model/StudentDetail";
import { Route, Switch, withRouter, Redirect, Link } from "react-router-dom";
import ActivityM from "../model/Activity";
import Noti from "../model/Noti";
import StudentActivity from "./StudentActivity";
import { connect } from "react-redux";
import { resetStudentList } from "../../action/adminauth/index";
import StudentHSV from "./StudentHSV";
import StudentYC from "./StudentYC";
import JoinYc from "../model/JoinYc";
import NotiList from "./NotiList";
import Sender from "../model/Sender";
class AdminD extends Component {
  componentDidMount() {
    // console.log(this.props.match.url);
    return <Redirect to={this.props.match.url} />;
  }
  render() {
    return (
      <div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <AdminProfile />
            </div>
            <div className="card-body">
              <ActivityBtn />
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-4 mb-1">
                  <Link
                    className="btn btn-block btn-myapp"                    
                    to="./"
                  >
                    Danh Sách Sinh Viên
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  {" "}
                  <Link className="btn btn-block btn-myapp"
                    to="./pendingjoinYC"
                    onClick={() => this.props.resetStudentList([])}>
                    Danh Sách Chuyển Sinh Hoạt Đoàn
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  <Link
                    className="btn btn-block btn-myapp"
                    to="./pendingjoinHSV"
                    onClick={() => this.props.resetStudentList([])}
                  >
                    Danh Sách Đăng Ký Vào HSV
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  <Link className="btn btn-block btn-myapp" to="./activity">
                    Danh Sách Hoạt Động
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  {" "}
                  <Link className="btn btn-block btn-myapp" to="./notis">
                    Danh Sách Thông Báo
                  </Link>
                </div>

                <div className="col-4 mb-1">
                  {" "}
                  <button className="btn btn-block btn-myapp">
                    Lập Báo Cáo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Switch>
            <Route
              path={`${this.props.match.url}/activity`}
              exact
              component={Activity}
            />
            <Route
              path={`${this.props.match.url}/pendingjoinHSV`}
              exact
              component={StudentHSV}
            />
            <Route
              path={`${this.props.match.url}/pendingjoinYC`}
              exact
              component={StudentYC}
            />
            <Route
              path={`${this.props.match.url}/notis`}
              exact
              component={NotiList}
            />
            <Route
              path={`${this.props.match.url}/:aid`}
              component={StudentActivity}
            />
            <Route path={`/`} component={StudentsList} />
          </Switch>
        </div>
        <ActivityModel />
        <StudentDetail />
        <JoinYc/>
        <Sender/>
        <ActivityM adminID={this.props.match.params.admin} />
        <Noti adminID={this.props.match.params.admin}/>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { resetStudentList }
  )(AdminD)
);

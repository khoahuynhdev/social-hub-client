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
import Axios from "axios";
class AdminD extends Component {
  componentDidMount() {
    console.log(this.props.match.url);
    return <Redirect to={this.props.match.url} />;
  }
  getReport = () => {
    Axios.get("https://server-socialhub.herokuapp.com/api/admins/reportpoint")
      .then(response => {
        response.data.options.responseType = "blob";
        Axios(response.data.options).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "invoice-main.pdf");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => alert("failed"));
  };
  getReportCSHD = () => {
    Axios.get("https://server-socialhub.herokuapp.com/api/admins/reportcshd")
      .then(response => {
        response.data.options.responseType = "blob";
        Axios(response.data.options).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "cshd.pdf");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => alert("failed"));
  };
  getReportHSV = () => {
    Axios.get("https://server-socialhub.herokuapp.com/api/admins/reporthsv")
      .then(response => {
        response.data.options.responseType = "blob";
        Axios(response.data.options).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "community.pdf");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => alert("failed"));
  };
  render() {    
    const data = localStorage.getItem('admintoken')
    if (!data) return <Redirect to="/adminlogin" />
    return (
      <div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <AdminProfile history={this.props.history}/>
            </div>
            <div className="card-body">
              <ActivityBtn />
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-4 mb-1">
                  <Link
                    className="btn btn-block btn-myapp"                    
                    to={`${this.props.match.url}`}
                  >
                    Danh Sách Sinh Viên
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  {" "}
                  <Link className="btn btn-block btn-myapp"
                    to={`${this.props.match.url}/pendingjoinHSV`}
                    onClick={() => this.props.resetStudentList([])}>
                    Danh Sách Chuyển Sinh Hoạt Đoàn
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  <Link
                    className="btn btn-block btn-myapp"
                    to={`${this.props.match.url}/pendingjoinYC`}
                    onClick={() => this.props.resetStudentList([])}
                  >
                    Danh Sách Đăng Ký Vào HSV
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  <Link className="btn btn-block btn-myapp" to={`${this.props.match.url}/activity`}>
                    Danh Sách Hoạt Động
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  {" "}
                  <Link className="btn btn-block btn-myapp" to={`${this.props.match.url}/notis`}>
                    Danh Sách Thông Báo
                  </Link>
                </div>

                <div className="col-4 mb-1">
                  {" "}
                  <div class="btn-group btn-block" role="group">
                    <button
                      id="btnGroupDrop1"
                      className="btn btn-myapp btn-block btn-block dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Lập Báo Cáo Sinh Viên
                    </button>
                    <div className="dropdown-menu btn-block" aria-labelledby="btnGroupDrop1">
                      <button className="dropdown-item" onClick={this.getReport}>
                        Báo Cáo Điểm Rèn Luyện
                      </button>
                      <button className="dropdown-item" onClick={this.getReportCSHD}>
                      Báo Cáo Chuyển Sinh Hoạt Đoàn
                      </button>
                  
                      <button className="dropdown-item" onClick={this.getReportHSV}>
                      Báo Cáo Gia Nhập Hội Sinh Viên                                                                    
                      </button>
                    </div>
                  </div>
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
            <Route path={`${this.props.match.url}/`} component={StudentsList} />
          </Switch>
        </div>
        <ActivityModel />
        <StudentDetail />
        <JoinYc />
        <Sender />
        <ActivityM adminID={this.props.match.params.admin} />
        <Noti adminID={this.props.match.params.admin} />
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

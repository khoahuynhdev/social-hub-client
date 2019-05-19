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
import {connect} from 'react-redux';
import {resetStudentList} from '../../action/adminauth/index'
import StudentHSV from "./StudentHSV";
class AdminD extends Component {
  componentDidMount(){
    console.log(this.props.match.url)
    return <Redirect to={this.props.match.url}/>
      
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
                  <Link className="btn btn-block btn-myapp" onClick={()=>this.props.resetStudentList([])} to="./">
                    Danh Sách Sinh Viên
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  {" "}
                  <button className="btn btn-block btn-myapp" type="button">
                    Danh Sách Chuyển Sinh Hoạt Đoàn
                  </button>
                </div>
                <div className="col-4 mb-1">
                  <button className="btn btn-block btn-myapp" type="button">
                    Danh Sách Đăng Ký Vào HSV
                  </button>
                </div>
                <div className="col-4 mb-1">
                  <Link className="btn btn-block btn-myapp" to="./activity">
                    Danh Sách Hoạt Động
                  </Link>
                </div>
                <div className="col-4 mb-1">
                  {" "}
                  <button className="btn btn-block btn-myapp" type="button">
                    Danh Sách Thông Báo
                  </button>
                </div>

                <div className="col-4 mb-1">
                  {" "}
                  <button className="btn btn-block btn-myapp" type="button">
                    Danh Sách Thông Báo
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
            <Route path={`${this.props.match.url}/pendingjoinHSV`} exact component={StudentHSV} />
            <Route
              path={`${this.props.match.url}/:aid`}
              component={StudentActivity}
            />
            <Route path={`/`} component={StudentsList} />
          </Switch>
        </div>
        <ActivityModel />
        <StudentDetail />

        <ActivityM adminID={this.props.match.params.admin} />
        <Noti />
      </div>
    );
  }
}
export default withRouter(connect(null,{resetStudentList})(AdminD));

import React, { Component } from "react";
import DetailProfile from './DetailProfile'
import MainDashB from "./dashboard/MainDashB";
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import NotificationDashB from "./dashboard/NotificationDashB";
import SearchDashB from "./dashboard/SearchDashB";
import Information from "./dashboard/Information";
import ChangePassword from "./dashboard/ChangePassword";
import Cshdoan from "../model/Cshd";
import Dkhsinhvien from "../model/Dkhsv";
import ActivityJoinList from "./dashboard/ActivitysJoinList";
import ActivityDetail from "../model/ActivityDetail";
import { connect } from 'react-redux';
import { fetchActivities } from '../../actions/activity';
import setHeaders from '../../utils/setHeaders';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const fingerprint = localStorage.getItem('fingerprint')
      if (token && fingerprint) setHeaders(token, fingerprint)
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('fingerprint')
      setHeaders(null, null)
    }
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to='/' />
    }
    const { match } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <img src="img/school.jpg"
            alt="none"
            className="img-fluid rounded mb-3 border" />
          <hr></hr>
        </div>
        <div className="col-lg-4 col-sm-12">
          <DetailProfile match={match} />
          <div>
            <Link className="btn btn-myapp3 btn-block txt-white mt-2" to={`./youractivity`}>Hoạt Động Của Bạn</Link>
            <button
              className="btn btn-myapp2 btn-block px-auto"
              data-toggle="modal"
              data-target="#cSHD"
            >
              Chuyển Sinh Hoạt Đoàn
        </button>
          </div>
          <div className="mt-1">
            <button
              className="btn btn-myapp btn-block px-auto"
              data-toggle="modal"
              data-target="#dkHSV"
            >
              Tham Gia Hội Sinh Viên
        </button>
          </div>
        </div>
        <div className="col-md-8">
          <Switch>

            <Route path={`${this.props.match.url}/noti`} exact component={NotificationDashB} />
            <Route path={`${this.props.match.url}/search/:name`} exact render={({ match, history }) => <SearchDashB match={match} history={history} />} />
            <Route path={`${this.props.match.url}/information`} exact render={({ match, history }) => <Information match={match} history={history} />} />
            <Route path={`${this.props.match.url}/changepassword`} exact component={ChangePassword} />
            <Route path={`${this.props.match.url}/youractivity`} exact component={ActivityJoinList} />
            <Route path={`/`} component={MainDashB} />

          </Switch>

        </div>

        <Cshdoan />
        <Dkhsinhvien />
        <ActivityDetail />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.activities,
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps, { fetchActivities })(Profile));

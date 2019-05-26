import React, { Component } from "react";
import { connect } from 'react-redux';
import { setCurrentUser, logout, resetError } from '../../actions/auth'
import { Link, NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      isAuthenticated: false,
    }
  }

  componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode(token)
        this.props.setCurrentUser(decoded);
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('fingerprint');
      this.props.setCurrentUser({});
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light fixed-top">

          <div className="container">
            <Link className="navbar-brand mr-auto  " to="/" onClick={this.props.resetError}>
              <img
                src="img/SocialHub-128.png"
                className="logo"
                alt="hslogo"
              />
            </Link>
            {
              this.props.auth.isAuthenticated && <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="btn btn-none text-center" to="./noti" replace>
                    <i className="far fa-bell" />
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-none text-center" to="./">
                    <i className="fas fa-tasks" />
                  </Link>
                </li>

                <li className="nav-item">
                  <NavLink className="btn btn-none text-center" to="./information">
                    <i className="fas fa-user mr-1"></i>
                    {this.props.auth.profile.ID}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button className="btn btn-none text-center" onClick={this.props.logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    logout
                  </button>
                </li>

              </ul>
            }

          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { setCurrentUser, logout, resetError })(Navbar);

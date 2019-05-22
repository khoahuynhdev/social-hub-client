import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, loginFB, resetError, setCurrentUser } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
class loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      password: "",
      errors: {}
    }
  }

  responseFacebook = (response) => {
    if (response && response.id) {
      this.props.loginFB({ facebookID: response.id });
    } else {
      alert('đã có lỗi xảy ra hãy thử lại sau');
    }
  }

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        this.props.setCurrentUser(decoded);
      }
    } catch (error) {

    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault();
    const { ID, password } = this.state;
    this.props.login({
      ID, password
    });
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to={`/students/${this.props.auth.profile.ID}/`} />
    }
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4 f-elm text-center ">
            <div className="card-header bg-main text-light align-middle">
              <h4> Đăng Nhập</h4>
              <p>đăng nhập bằng mã số sinh viên trường</p>
              <small className="text-danger">
                {this.props.errors && this.props.errors.loginError ? `${this.props.errors.loginError}` : null}
              </small>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>

                <div className="form-group">
                  <h6>
                    <label>Tên Đăng Nhập</label>
                  </h6>
                  <input
                    type="text"
                    className="form-control"
                    name="ID"
                    onChange={this.onChange}
                    autoComplete="off"
                    placeholder="16DH100000"
                    required
                  />
                </div>

                <div className="form-group">
                  <h6>
                    <label>Mật Khẩu</label>
                  </h6>
                  <input
                    type="password"
                    className="form-control"
                    name="password"                    
                    onChange={this.onChange}
                    required
                  />
                </div>

                <div className="mt-2 row">
                  <div className="mt-2 col-12 col-md-6" >
                    <button
                      type="button"
                      className="btn btn-default btn-block"
                    >
                      Quên Mật Khẩu ?
                    </button>
                  </div>
                  <div className="mt-2 col-12 col-md-6">
                    <FacebookLogin
                      appId="839052703122702"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      cssClass="btn btn-primary btn-block"
                      icon="fa-facebook" />
                  </div>
                  <div className="mt-2 col-12 col-md-6">
                    <Link className="btn btn-myapp btn-block" to="/activate" onClick={this.props.resetError}>Kích hoạt tài khoản</Link>
                  </div>
                  <div className="mt-2 col-12 col-md-6">
                    <input
                      type="submit"
                      className="btn btn-myapp btn-block"
                      value="Đăng nhập"
                    />
                   
                  </div>
                  <div className="col-12 mt-2">                    
                    <Link className="btn btn-myapp2 btn-block" to="/adminlogin">Đăng Nhập Quyền Admin</Link>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
        <div className="col-md-4">
          <img
            src="./img/huflit-event.jpg"
            className="img-fluid rounded col-6 col-lg-12"
            alt="huflit"
          />
          <img
            src="./img/huflit-event.jpg"
            className="img-fluid rounded mt-1 col-6 col-lg-12"
            alt="huflit"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login, loginFB, setCurrentUser, resetError })(loginpage);

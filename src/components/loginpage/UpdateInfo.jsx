import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { resetActivate, updateInfo } from '../../actions/auth';
class UpdateInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      password2: "",
      email: "",
      phone: "",
      address: "",
      errors: {}
    }
  }

  componentDidMount() {
    this.setState({ id: this.props.id })
    this.props.resetActivate();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  validateInput = (data) => {
    const { password, password2 } = data;
    let errors = {};
    if (password.trim().length < 8) errors.password = "Mât khẩu phải có ít nhất 8 kí tự";
    if (!(password.trim() === password2.trim())) errors.password2 = "Nhập lại mật khẩu không đúng";

    return {
      errors,
      valid: _.isEmpty(errors)
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { errors, valid } = this.validateInput(this.state);
    if (valid) {
      this.props.updateInfo(this.state, () => {
        this.setState({
          errors: errors,
        })
        this.props.history.push('/');
      })
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="card">
        <div className="card-body form-group">
          <h2 className="text-center">Cập nhật thông tin</h2>
          <form onSubmit={this.onSubmit}>
            <div>
              <div className="form-group">
                <div className="form-row">

                  <div className="col-12">
                    <label htmlFor="updatePassword">
                      <h6>Mật khẩu</h6>
                    </label>
                    <input
                      name="password"
                      className="form-control"
                      id="updatePassword"
                      type="password"
                      onChange={this.onChange}
                      required
                    />
                    <small className="form-text text-danger">{errors.password ? "mật khẩu phải có ít nhất 8 kí tự" : ""}</small>
                  </div>

                  <div className="col-12">
                    <label htmlFor="updatePassword2">
                      <h6>Nhập lại mật khẩu</h6>
                    </label>
                    <input
                      name="password2"
                      className="form-control"
                      id="updatePassword2"
                      type="password"
                      onChange={this.onChange}
                      required
                    />
                    <small className="form-text text-danger">{errors.password2 ? "nhập lại mật khẩu không đúng" : ""}</small>
                  </div>

                  <div className="col-12">
                    <label htmlFor="updateEmail">
                      <h6>Email</h6>
                    </label>
                    <input
                      name="email"
                      className="form-control"
                      id="updateEmail"
                      type="email"
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="updatePhone">
                      <h6>Phone</h6>
                    </label>
                    <input
                      name="phone"
                      id="updatePhone"
                      className="form-control"
                      type="text"
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="updateAddress">
                      <h6>Address</h6>
                    </label>
                    <input
                      name="address"
                      id="updateAddress"
                      className="form-control"
                      type="text"
                      onChange={this.onChange}
                      required
                    />
                  </div>

                </div>
              </div>
              <div className="text-center">
                <input
                  className="btn btn-myapp3"
                  type="submit"
                  value="Cập nhật thông tin"
                />

              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    id: state.id
  }
}

export default connect(mapStateToProps, { resetActivate, updateInfo })(UpdateInfo);
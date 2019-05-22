import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { changePassword } from '../../../actions/auth';
class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: "",
			newPassword: "",
			cNewPassword: "",
			errors: {}
		}
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	validateInput = (data) => {
		const { newPassword, cNewPassword } = data;
		let errors = {};
		if (newPassword.trim().length < 8) errors.newPassword = "Mât khẩu phải có ít nhất 8 kí tự";
		if (!(newPassword.trim() === cNewPassword.trim())) errors.cNewPassword = "Nhập lại mật khẩu không đúng";

		return {
			errors,
			valid: _.isEmpty(errors)
		}
	}

	onSubmit = event => {
		event.preventDefault();
		const { errors, valid } = this.validateInput(this.state);
		if (valid) {
			// business logic here
			this.props.changePassword({
				oldPassword: this.state.oldPassword,
				newPassword: this.state.newPassword
			}, () => {
				this.setState({oldPassword: "", newPassword: "", cNewPassword: "", erorrs: {}})
				this.props.history.push('./information')
			})
		} else {
			this.setState({ errors });
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="card">
				<div className="card-body">
					<div className="form-text text-danger">{this.props.stateErrors && this.props.stateErrors.oldPasswordError}</div>
					<form onSubmit={this.onSubmit}>
						<div>
							<div className="form-group">
								<div className="form-row">
									<div className="col-12">
										<label htmlFor="oldPassword">
											<h6>Mật khẩu</h6>
										</label>
										<input
											name="oldPassword"
											className="form-control"
											type="password"
											onChange={this.onChange}
											required
										/>
									</div>
									<div className="col-12">
										<label htmlFor="newPassword">
											<h6>Mật khẩu mới</h6>
										</label>
										<input
											name="newPassword"
											className="form-control"
											type="password"
											onChange={this.onChange}
											required
										/>
										<small className="form-text text-danger">{errors.newPassword && "mật khẩu phải có ít nhất 8 kí tự"}</small>
									</div>
									<div className="col-12">
										<label htmlFor="cNewPassword">
											<h6>Nhập lại mật khẩu</h6>
										</label>
										<input
											name="cNewPassword"
											className="form-control"
											type="password"
											onChange={this.onChange}
											required
										/>
										<small className="form-text text-danger">{errors.cNewPassword && "nhập lại mật khẩu không đúng"}</small>
									</div>
								</div>
							</div>
							<div className="text-center">
								<input
									type="submit"
									className="btn btn-myapp mr-1"
									name="btnHuy"
									value="Đổi mật khẩu"
								/>
								<Link
									className="btn btn-myapp3 text-white mr-1"
									to="./information"
									replace
								>Trang Thông Tin</Link>

							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		stateErrors: state.errors
	}
}

export default connect(mapStateToProps, { changePassword })(ChangePassword);
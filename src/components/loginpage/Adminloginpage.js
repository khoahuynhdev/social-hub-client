import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
class Adminloginpage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			error: null
		}
	}

	componentDidMount() {
		this.getAdminData()
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	onSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/admins/login', this.state)
			.then(res => {
				if (res.data.msg === 'Login Success') {
					localStorage.setItem("admintoken", res.data.admintoken)
					this.props.history.push(`/admin/${this.state.username}`);
				}
			})
			.catch(err => {
				// console.log(err.response.data.error);
				if (err.response.data && err.response.data.error) this.setState({error: err.response.data.error})
			})
	}

	getAdminData = () => {
		let data = localStorage.getItem('admintoken')
		if (data) {
			const admin = jwtDecode(data)			
			return this.props.history.replace(`/admin/${admin.username}/`)			
		}
	}
	render() {		
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card mb-4 f-elm text-center w-50 ml-auto mr-auto">
						<div className="card-header bg-main text-light align-middle">
							<h4>Đăng Nhập vào trang Admin</h4>
							<small className="text-danger">{this.state.error}</small>
						</div>
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<h6><label>Tên Đăng Nhập</label></h6>
									<input type="text" className="form-control" name="username" id="username" onChange={this.onChange} required />
									<h6><label>Mật Khẩu</label> </h6>
									<input type="password" className="form-control" name="password" id="password" onChange={this.onChange} required />
									<div className="mt-2">
										<button type="submit" className="btn btn-myapp  col-12 col-md-12 col-lg-12" >Đăng Nhập</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, null)(Adminloginpage);
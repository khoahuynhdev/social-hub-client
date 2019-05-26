import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

class AdminProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullname: ""
		}
	}

	componentDidMount() {
		const data = localStorage.getItem('admintoken')
		if (data) {
			const admin = jwtDecode(data)
			this.setState({ fullname: admin.fullname })
		}
	}

	handleLogout = () => {
		localStorage.clear()
		this.props.history.push('/adminlogin')
	}

	render() {
		return (
			<div className="text-center">
				<h4>Admin</h4>
				<img src="img/holder.jpg" className="img-fluid w-25 rounded-circle" alt="avatar" />
				<h6 className="mt-2">{this.state.fullname}</h6>
				<button className="btn btn-myapp2" onClick={this.handleLogout}>Đăng xuất</button>
			</div>
		);
	}
}

export default AdminProfile;
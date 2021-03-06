import React, { Component } from 'react';
import { connect } from 'react-redux';
class DetailProfile extends Component {
	render() {
		const { ID, FullName, Faculty, Major } = this.props.auth.profile;

		return (
			<div className="card m-1 ">
				<div className="card-header bg-main txt-white text-center">
					<h4>Profile</h4>
					<img src="./img/SocialHub-512.png" className="img-fluid w-50 rounded-circle" alt="avatar" />
					<h6 className="mt-2">{FullName}</h6>

				</div>
				<div className="card-body">
					<p><strong>Mã Sinh Viên:</strong> {ID}</p>
					<p><strong>Khoa</strong>: {Faculty}</p>
					<p><strong>Ngành</strong>: {Major}</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}
export default connect(mapStateToProps)(DetailProfile);
import React, { PureComponent } from 'react';
import moment from 'moment';
class NotiD extends PureComponent {
	render() {
		const { NM_NAME, CONTENT, CREATE_DATE, SENDER } = this.props.noti;
		return (
			<div className="card mt-2">
				<div className="card-header">
					<h4>{NM_NAME}</h4>
					<h5>{SENDER}</h5>
					<p>{moment(CREATE_DATE).fromNow()}</p>
					<img src="./img/school.jpg" className="img-fluid" alt="notis" />
				</div>
				<div className="card-body d-flex justify-content-end">
					<p>{CONTENT}</p>					
				</div>
			</div>
		);
	}
}

export default NotiD;
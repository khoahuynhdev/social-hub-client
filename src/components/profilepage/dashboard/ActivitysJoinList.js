import React, { Component } from 'react';
import ActivityJoin from './ActivityJoin';
import { connect } from 'react-redux';
import { fetchJointActivities, resetFetchJointActivities } from '../../../actions/activity';
import axios from 'axios';
class ActivityJoinList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMore: true,
			skip: 0,
			activitiesCount: 0
		}
	}
	componentDidMount() {		
		axios.get(`http://localhost:5000/api/activities/joint/count`)
			.then(result => {
				this.props.resetFetchJointActivities([]);
				this.setState({ activitiesCount: result.data.activities }, () => {
					this.fetchMoreData()
				})				
			})
			.catch(error => {
				this.setState({ activitiesCount: 1 })
			})		
	}
	fetchMoreData = () => {
		if (this.props.jointActivities.length >= this.state.activitiesCount) {
			return this.setState({ hasMore: false });
		}
		else {
			this.props.fetchJointActivities({ skip: this.state.skip, limit: 10 })
			this.setState({ skip: this.state.skip + 10, hasMore: true })
		}
	}

	render() {
		let totalPoint = this.props.jointActivities.filter(ac => ac.STATE !== 'Registered').map(ac => ac.AC_POINT).reduce((pre, cur) => {			
			return pre + cur
		},0)
		return (
			<div className="card">
				<div className="card-header">
					<h4 className="text-center mb-auto mt-auto">Danh Sách Các Hoạt Động Đã Đăng Ký</h4>
				</div>
				<div className="row mb-auto mt-auto card-body">
					<div className="col-6 col-sm-4 input-group">
						<div className="text-primary">Điểm Rèn Luyện: {totalPoint}</div>
					</div>
				</div>				
				<table className="table table-hover ml-auto mr-auto">
						<thead>
							<tr>
								<th>STT</th>
								<th>Tên Hoạt Động</th>
								<th>Trạng Thái</th>
								<th>Chi Tiết</th>
							</tr>
						</thead>
						<tbody>
							{this.props.jointActivities.map((item, index) => {
								return <ActivityJoin activity={item} key={index} index={index + 1} />
							})}
						</tbody>
					</table>
				{this.props.jointActivities.length < this.state.activitiesCount && <button onClick={this.fetchMoreData}>Load More</button>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		jointActivities: state.jointActivities
	}
}

export default connect(mapStateToProps, { fetchJointActivities, resetFetchJointActivities })(ActivityJoinList);
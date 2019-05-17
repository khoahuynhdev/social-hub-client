import React, { Component } from 'react';
import ActivityJoin from './ActivityJoin';
import { connect } from 'react-redux';
import { fetchJointActivities } from '../../../actions/activity';
import InfiniteScroll from "react-infinite-scroll-component";
class ActivityJoinList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMore: true,
			skip: 10,
			limit: 10,
			activitiesCount: 30
		}
	}
	componentDidMount() {
		this.props.fetchJointActivities({ skip: 0, limit: 10 })
	}
	fetchMoreData = () => {
		if (this.props.jointActivities.length >= this.state.activitiesCount) {
			return this.setState({ hasMore: false });
		}
		this.props.fetchJointActivities({ skip: this.state.skip, limit: 10 })
		this.setState({ skip: this.state.skip + 10 })

	}

	render() {
		return (
			<div className="card">
				<div className="card-header">
					<h4 className="text-center mb-auto mt-auto">Danh Sách Các Hoạt Động Đã Tham Gia</h4>
				</div>
				<div className="row mb-auto mt-auto card-body">
					<div className="col-6 col-sm-4 input-group">
						<input
							type="text"
							className="form-control"
							name=""
							id=""
							aria-describedby="helpId"
							placeholder=""
						/>
						<div className="input-group-append">
							<button
								className="btn btn-xs btn-myapp text-center"
							>
								<i className="fas fa-search fa-xs" />
							</button>
						</div>
					</div>
				</div>
				<InfiniteScroll
					dataLength={this.props.jointActivities.length}
					next={this.fetchMoreData}
					hasMore={this.state.hasMore}
					loader={<h4>đang tải...</h4>}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Bạn đã thấy hết sự kiện</b>
						</p>
					}
				>
					<table className="table table-hover ml-auto mr-auto">
						<thead>
							<tr>
								<th>Tên Hoạt Động</th>
								<th>Bắt Đầu</th>
								<th>Kết Thúc</th>
								<th>Chỉnh sửa</th>
							</tr>
						</thead>
						<tbody>
							{this.props.jointActivities.map((item, index) => {
								return <ActivityJoin activity={item} key={index} />
							})}
						</tbody>
					</table>
				</InfiniteScroll>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		jointActivities: state.jointActivities
	}
}

export default connect(mapStateToProps, { fetchJointActivities })(ActivityJoinList);
import React, { Component } from 'react';
import NotiD from './NotiD'
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
import { fetchNotis, resetFetchNotis } from '../../../actions/activity';
class NotificationDashB extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasMore: true,
			skip: 0,
			limit: 10,
			notisCount: 0
		}
	}

	componentDidMount() {
		this.props.resetFetchNotis()
		axios.get(`http://localhost:5000/api/notis/count`)
			.then(result => {
				this.setState({ notisCount: result.data.notis }, () => {
					this.fetchMoreData()
				})
			})
			.catch(error => {
				this.setState({ notisCount: 1 })
			})
	}

	fetchMoreData = () => {
		if (this.props.notis.length >= this.state.notisCount) {
			return this.setState({ hasMore: false });
		}
		this.props.fetchNotis({ skip: this.state.skip, limit: 10 })
		this.setState({ skip: this.state.skip + 10 })

	}

	render() {
		return (
			<div className="card mt-2">
				<div className="card-header">
					<h4>THÔNG BÁO</h4>
					
				</div>
				<div className="card-body d-flex justify-content-end">
					<div className="row">
						<InfiniteScroll
							dataLength={this.props.notis.length}
							next={this.fetchMoreData}
							hasMore={this.state.hasMore}
							loader={<h4>đang tải...</h4>}
							endMessage={
								<p style={{ textAlign: "center" }}>
									<b>Bạn đã thấy hết thông báo</b>
								</p>
							}
						>
							{this.props.notis.map((item, index) => {
								return <div className="col-12" key={index}>
									<NotiD noti={item} key={index} />
								</div>
							})}
						</InfiniteScroll>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		notis: state.notis
	}
}
export default connect(mapStateToProps, { fetchNotis, resetFetchNotis })(NotificationDashB);
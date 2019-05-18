import React, { Component } from "react";
import ActivityD from "./ActivityD";
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchActivities } from '../../../actions/activity';
import axios from 'axios';
class MainDashB extends Component {
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
		axios.get(`https://server-socialhub.herokuapp.com/api/activities/count`)
			.then(result => {
				this.setState({ activitiesCount: result.data.activities })
			})
			.catch(error => {
				this.setState({ activitiesCount: 30 })
			})
		this.props.fetchActivities({ skip: 0, limit: 10 });
	}

	fetchMoreData = () => {
		if (this.props.activities.length >= this.state.activitiesCount) {
			return this.setState({ hasMore: false });
		}
		this.props.fetchActivities({ skip: this.state.skip, limit: 10 })
		this.setState({ skip: this.state.skip + 10 })

	}

	render() {		
		return (
			<div className="card mt-2">
				<div className="card-header">
					<h4>HOẠT ĐỘNG</h4>

					<div className="justify-content-start">
						<form className="form-inline">
							<div className="form-group form-inline">
								<select
									className="custom-select my-1 mr-sm-2"
									id="inlineFormCustomSelectPref"
								>
									<option >Tất Cả</option>
									<option value="1">Khoa</option>
									<option value="2">Ngành</option>
									<option value="3">Lớp</option>
								</select>
							</div>
							<div className="form-group ml-auto">
								<input type="text" className="form-control mr-1" id="formGroupExampleInput" placeholder="Tìm Kiếm" />

								<button type="submit" className="btn btn-primary my-1">
									Tìm Kiếm
                  </button>
							</div>
						</form>

					</div>
				</div>

				<div className="card-body d-flex justify-content-end">
					<div className="row">
						<InfiniteScroll
							dataLength={this.props.activities.length}
							next={this.fetchMoreData}
							hasMore={this.state.hasMore}
							loader={<h4>đang tải...</h4>}
							endMessage={
								<p style={{ textAlign: "center" }}>
									<b>Bạn đã thấy hết sự kiện</b>
								</p>
							}
						>
							{this.props.activities.map((item, index) => {
								return <div className="col-12" key={index}>
									<ActivityD activity={item} key={index} />
								</div>
							})}
						</InfiniteScroll>
					</div>
				</div>
				{this.props.errors && this.props.errors.config ? <div>Đã có lỗi xảy ra, vui lòng thử lại sau</div> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		activities: state.activities,
		errors: state.errors
	}
}

export default connect(mapStateToProps, { fetchActivities })(MainDashB);

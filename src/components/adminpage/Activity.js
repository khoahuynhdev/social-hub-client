import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchActivitiesAdmin } from '../../actions/activity';
import ActivityItem from './ActivityItem';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.activities,
      hasMore: true,
      skip: 10,
      limit: 10,
    }
  }
  componentDidMount() {
    this.props.fetchActivitiesAdmin({ skip: 0, limit: 10 });
  }

  fetchMoreData = () => {

    this.props.fetchActivitiesAdmin({ skip: this.state.skip, limit: 10 })
    this.setState({ skip: this.state.skip + 10, items: this.props.activities })

  }
    render() {
        return (
            <div className="card">
            <div className="card-header">
        <h4 className="text-center mb-auto mt-auto">Danh Sách Các Hoạt Động</h4>
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
                id="triggerId"
              >
                <i className="fas fa-search fa-xs" />
              </button>
            </div>
          </div>
          </div>
          <InfiniteScroll
              dataLength={this.props.activities.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
        <table className="table table-hover ml-auto mr-auto">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên Hoạt Động</th>
              <th>Bắt Đầu/Kết Thúc</th>
              <th>Chỉnh sửa</th>
              <th>Điểm Danh Sinh Viên</th>
              
            </tr>
          </thead>
          <tbody>
          {this.props.activities.map((item, index) => {
                return <ActivityItem match={this.props.match} activity={item} key={index} index={index} />
              })}
          </tbody>
        </table>
        </InfiniteScroll>
      </div>
        );
    }
}
const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};
export default connect(mapStateToProps, { fetchActivitiesAdmin })(Activity) ;   
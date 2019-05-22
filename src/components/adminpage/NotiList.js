import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { getNotisList } from '../../actions/activity';
import NotisItem from './NotisItem';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.notis,
      hasMore: true,
      skip: 10,
      limit: 10,
    }
  }
  componentDidMount() {
    this.props.getNotisList({ skip: 0, limit: 10 });
  }

  fetchMoreData = () => {

    this.props.getNotisList({ skip: this.state.skip, limit: 10 })
    this.setState({ skip: this.state.skip + 10, items: this.props.notis })

  }
    render() {
        return (
            <div className="card">
            <div className="card-header">
        <h4 className="text-center mb-auto mt-auto">Danh Sách Các Thông Báo</h4>
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

        <table className="table table-responsive table-hover ml-auto mr-auto">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên Thông Báo</th>
              <th>Ngày Tạo</th>
              <th className="w-25">Nội Dung</th>
              <th>Admin</th>
              <th>Người gửi</th>
              <th>Gửi Đến</th>
            </tr>
          </thead>
          <tbody>
          {this.props.notis.map((item, index) => {
                return <NotisItem notis={item} key={index} index={index} />
              })}
          </tbody>
        </table>
        <button className="btn btn-myapp2" onClick={this.fetchMoreData}>Tải Thêm</button>
      </div>
        );
    }
}
const mapStateToProps = state => {
  return {
    notis: state.notis
  };
};
export default connect(mapStateToProps, { getNotisList })(Activity) ;   
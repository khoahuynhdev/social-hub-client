import React, { Component } from "react";
import Students from "./Students";
import { getStudentList, getStudentListCount, resetStudentList } from "../../action/adminauth/index";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      skip: 0,
      studentCount: 1
    };
  }

  componentDidMount() {
    this.props.resetStudentList([]);
    getStudentListCount(count => {      
      this.setState({ studentCount: count || 1 }, this.fetchMoreData)
    });
  }

  fetchMoreData = () => {
    if (this.props.students.length >= this.state.studentCount) return this.setState({ hasMore: false })
    this.props.getStudentList({ skip: this.state.skip, limit: 20 });
    this.setState({ skip: this.state.skip + 20 });
  }

  render() {
    return (
      <div className="mt-5">
        <h1 className="text-center mb-5">Danh Sách Các Sinh Viên</h1>
        <div className="row mb-3">
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
          dataLength={this.props.students.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4 style={{ textAlign: "center" }}>Đang tải...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Bạn đã thấy hết sinh viên</b>
            </p>
          }
        >

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>MSSV</th>
                  <th>Tên</th>
                  <th>Lớp</th>
                  <th>Khoa</th>
                  <th>Chức Năng</th>
                </tr>
              </thead>
              <tbody>

                {this.props.students.map((item, index) => {
                  return (
                    <Students
                      key={index}
                      item={item}
                      index={index}
                      types="STList"
                    />
                  )
                })}

              </tbody>
            </table>
          </div>

        </InfiniteScroll>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.studentList,
  };
};
export default connect(
  mapStateToProps,
  { getStudentList, resetStudentList }
)(StudentList);

import React, { Component } from 'react';
import Students from "./Students";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getYouthStudentList} from "../../action/adminauth/index";
class StudentYC extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: this.props.students,
          hasMore: true,
          skip: 10,
          limit: 10
        };
      }
      componentDidMount() {
          console.log(this.props.match.params.aid)
        this.props.getYouthStudentList({ skip: 0, limit: 10, A_ID: this.props.match.params.aid });
      }
      fetchMoreData = () => {
        console.log("getITem");
        this.props.getYouthStudentList({
          skip: this.state.skip,
          limit: 10,
          A_ID: this.props.match.params.aid
        });
        this.setState({ skip: this.state.skip + 10, items: this.props.students });
      };
    render() {
        return (
            <div className="mt-5">
            <h1 className="text-center mb-5">
             Danh Sách Sinh Viên Chuyển Sinh Hoạt Đoàn
            </h1>
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
              loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Stt</th>
                    <th>MSSV</th>
                    <th>Tên</th>
                    <th>Lớp</th>
                    <th>Khoa</th>
                    <th>Ngành</th>
                    <th>Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.students.map((item, index) => {
                    return <Students key={index} item={item} index={index} types={item.STATE+"YC"} />;
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
      students: state.studentList
    };
  };
export default connect(mapStateToProps,{getYouthStudentList})(StudentYC);
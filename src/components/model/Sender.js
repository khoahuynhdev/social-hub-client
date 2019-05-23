import React, { Component } from 'react';
import { connect } from "react-redux";
import Axios from 'axios';
class Sender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      F_ID: null,
      M_ID: null,
      C_ID: null,
      ID: null,
      NM_ID: this.props.noti.NM_ID,
      classes: []
    };
  }
  SendAll = () => {
    Axios.post(`http://localhost:5000/api/notis/notisend`, { NM_ID: this.props.noti.NM_ID, ISALL: 1 })
      .then(res => {
        if (res.res === "win") alert("Gửi Thành Công");
      })
      .catch(err => alert("Gửi Thất Bại Vui Lòng Thử Lại"))
  }
  onSubmit = (e) => {
    const Send = {
      F_ID: this.state.F_ID,
      M_ID: this.state.M_ID,
      C_ID: this.state.C_ID,
      ID: this.state.ID,
      NM_ID: this.props.noti.NM_ID,
    }
    e.preventDefault();
    Axios.post(`http://localhost:5000/api/notis/notisend`, Send)
      .then(res => {
        if (res.res === "win") alert("Gửi Thành Công");
      })
      .catch(err => alert("Gửi Thất Bại Vui Lòng Thử Lại"))
  }

  componentDidMount = () => {
    Axios.get(`http://localhost:5000/api/admins/getclass`)
      .then(result => this.setState({
        classes: result.data
      }))
      .catch(err => alert("Ko lấy đc danh sách lớp"))
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    // console.log(this.state.NM_ID)
    // console.log(this.props.noti.NM_ID)
    return (
      <div
        className="modal fade"
        id="SenderModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="SenderModel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-center">
            <div className="modal-header text-center">
              <h5 className="modal-title ">Gửi Thông Báo {this.props.noti.NM_NAME} Đến</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group form-inline">
                  <label>Khoa</label>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="Khoa"
                    name="F_ID"

                    onChange={this.onChange}
                  >
                    <option value={null}>Không</option>
                    <option value="1">Kinh tế - Tài chính</option>
                    <option value="2">Công nghệ thông tin</option>
                    <option value="3">Quản trị kinh doanh quốc tế</option>
                    <option value="4">Ngôn ngữ và Văn hóa phương Đông</option>
                    <option value="5">Bộ môn Luật</option>
                    <option value="6">Du lịch - Khách sạn</option>
                    <option value="7">Quan hệ quốc tế</option>
                    <option value="8">Ngoại ngữ</option>
                  </select>
                </div>
                <div className="form-group form-inline">
                  <label>Ngành</label>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="Ngành"
                    name="M_ID"
                    onChange={this.onChange}
                  >
                    <option value={null}>Không</option>
                    <option value="1">Công nghệ thông tin</option>
                    <option value="2">Quản trị dịch vụ du lịch và lữ hành</option>
                    <option value="3">Kế toán</option>
                    <option value="4">Quản trị khách sạn</option>
                    <option value="5">Luật kinh tế</option>
                    <option value="6">Quản trị kinh doanh</option>
                    <option value="7">Đông Phương học</option>
                    <option value="8">Quan hệ quốc tế</option>
                    <option value="9">Ngôn ngữ Anh</option>
                    <option value="10">Ngôn ngữ Trung Quốc</option>
                    <option value="11">Kinh doanh quốc tế</option>
                    <option value="12">Tài chính - Ngân hàng</option>
                  </select>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Sinh Viên</h6>
                    </label>
                    <input
                      name="ID"
                      className="form-control"
                      id="txtTenHoatDong"
                      type="text"
                      placeholder="Nhập mã số sinh viên muốn gửi"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <label>Lớp</label>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="class"
                    name="C_ID"
                    onChange={this.onChange}
                  >
                    <option value={null}>Không</option>
                    {this.state.classes.map((item, index) => {
                      return <option value={item.C_ID} key={index}>{item.CNAME}</option>
                    })}
                  </select>
                </div>
                <input
                  className="btn btn-myapp3 ml-1"
                  name="btnGui"
                  id="btnGui"
                  type="submit"
                  value="Gửi"
                />
                <input
                  className="btn btn-myapp ml-1"
                  name="btnHuy"
                  id="btnHuy"
                  type="button"
                  value="Huỷ"
                />
              </form>
              <button
                className="btn btn-myapp mt-1"
                onClick={() => { this.SendAll() }}
              > Gửi đến tất cả</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    noti: state.notiEditing
  };
};
export default connect(mapStateToProps)(Sender);
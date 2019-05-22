import React, { Component } from "react";
import axios from "axios";
class Noti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NM_NAME:"",
      CONTENT:"",
      ADMIN_ID:this.props.adminID,
      SENDER:""
    };
  }
  onSubmit = event => {
    event.preventDefault();
    console.log(this.props.isAddNewActivity);
      axios
        .post(
          "http://localhost:5000/api/notis/notipost",
          this.state
        )
        .then(res => {
          console.log(res)
        })
        .catch(console.log);
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div
        className="modal fade"
        id="NotiModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="NotiModel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-center">
            <div className="modal-header text-center">
              <h5 className="modal-title ">Tạo Thông Báo</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={this.onSubmit}>
                <div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Tên thông báo</h6>
                    </label>
                    <input
                      name="NM_NAME"
                      className="form-control"
                      id="txtTenHoatDong"
                      type="text"
                      placeholder="Nhập tên thông báo"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Nội Dung</h6>
                    </label>
                    <textarea
                     name="CONTENT"
                      placeholder="Nhập nội dung thông báo"
                      className="form-control "
                      rows="5"
                      cols="35"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Người Gửi</h6>
                    </label>
                    <input
                      name="SENDER"
                      className="form-control"
                      id="txtTenHoatDong"
                      type="text"
                      placeholder="Nhập tên thông báo"
                      onChange={this.onChange}
                    />
                  </div>
                
                      <div className="card-body">
                          
                      </div>
                    </div>
                  <input
                    className="btn btn-myapp3"
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Noti;

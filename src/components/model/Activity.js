import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      A_ID:"",
      AT_ID: 1,
      A_NAME: "",
      CONTENT: "",
      STARTDATE: "",
      ENDDATE: "",
      FEE: "",
      ADMIN_ID:this.props.adminID,
    };
  }
  componentWillReceiveProps=(nextProps) =>{
      if(nextProps.isAddNewActivity)
      {
          this.setState({
            AT_ID: 1,
            A_NAME: "",
            CONTENT: "",
            STARTDATE: "",
            ENDDATE: "",
            FEE: "" 
          })
      }
      else if(nextProps.activityEditing)
      {
        const {A_ID,AT_ID,A_NAME,CONTENT,STARTDATE,ENDDATE,FEE}=nextProps.activityEditing
       console.log(A_NAME)
        this.setState({
          A_ID,AT_ID,A_NAME,CONTENT,STARTDATE,ENDDATE,FEE
        },()=> console.log(this.state.A_ID));
       
      }
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    console.log(this.props.isAddNewActivity);
    if (this.props.isAddNewActivity) {
      axios
        .post(
          "http://localhost:5000/api/activities/createNewActivity",
          this.state
        )
        .then(res => {
          if (res.data.msg === "Create New Activity Success") {
          }
        })
        .catch(console.log);
    } else {
      axios
        .post(
          "http://localhost:5000/api/activities/editActivity",
          this.state
        )
        .then(res => {
          if (res.data.msg === "Create New Activity Success") {
          }
        })
        .catch(console.log);
    }
  };
  render() {
    return (
      <div
        className="modal fade"
        id="ActivityModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ActivityModel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-center">
            <div className="modal-header text-center">
              <h5 className="modal-title ">{this.props.isAddNewActivity ? "Tạo Hoạt Động":"Chỉnh Sửa Hoạt Động"}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.onSubmit}>
                <div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Tên Hoạt Động</h6>
                    </label>
                    <input
                      name="A_NAME"
                      className="form-control"
                      id="txtTenHoatDong"
                      type="text"
                      value={this.state.A_NAME}
                      onChange={this.onChange}
                      placeholder="Nhập Tên Hoạt Động"
                    />
                  </div>
                  <div className="card mb-1">
                    <div className="form-row m-1 card-body">
                      {/* <div className=" col-4">
            <label htmlFor="dtNgayDienRa">
            <h6>Ngày Diễn Ra Hoạt Động</h6>
                </label>
                <input name="dtNgayDienRa" className="form-control" id="dtNgayDienRa" type="date" placeholder="Nhập ngày diễn ra"/>
            </div> */}
                      <div className=" col-6">
                        <label htmlFor="txtThoiGianBatDau">
                          <h6>Thời Gian Bắt Đầu Hoạt Động</h6>
                        </label>
                        <input
                          name="STARTDATE"
                          className="form-control"
                          id="txtThoiGianBatDau"
                          type="date"
                          placeholder="Thời gian bắt đầu"
                          value={this.state.STARTDATE}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className=" col-6">
                        <label htmlFor="ttxtThoiGianKetThu">
                          <h6>Thời Gian Kết Thúc Hoạt Động</h6>
                        </label>
                        <input
                          name="ENDDATE"
                          className="form-control"
                          id="txtThoiGianKetThuc"
                          type="date"
                          value={this.state.ENDDATE}
                          placeholder="Thời gian kết thúc"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Nội Dung</h6>
                    </label>
                    <textarea
                      placeholder="Nhập nội dung hoạt động"
                      className="form-control"
                      name="CONTENT"
                      rows="5"
                      cols="35"
                      value={this.state.CONTENT}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Loại Hoạt Động</h6>
                    </label>
                    <select
                      className="custom-select my-1 mr-sm-2"
                      id="inlineFormCustomSelectPref"
                      name="AT_ID"
                      onChange={this.onChange}
                      value={this.state.AT_ID}
                    >
                      <option value="1">Đoàn Trường</option>
                      <option value="2">Hội Sinh Viên</option>
                      <option value="3">Đoàn Khoa</option>
                      <option value="4">Ngày Hội</option>
                      <option value="5">Sinh Hoạt</option>
                      <option value="6">Tình Nguyện</option>
                      <option value="7">Hội Thảo</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Chi Phí</h6>
                    </label>
                    <input
                      name="FEE"
                      className="form-control"
                      id="txtChiPhi"
                      type="text"
                      placeholder="Nhập chi phí"
                      onChange={this.onChange}
                      value={this.state.FEE}
                    />
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAddNewActivity: state.isAddNewActivity,
    activityEditing:state.activityEditing
  };
};
export default connect(mapStateToProps)(Activity);

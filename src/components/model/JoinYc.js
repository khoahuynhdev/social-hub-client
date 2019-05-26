import React, { Component } from "react";
import { connect } from "react-redux";
import { joinYC } from "../../actions/auth";
import axios from "axios";
class JoinYc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CMND: "",
      RACE: "",
      RELIGION: "",
      CMND_DATE: "",
      CMND_PLACE: "",
      JYC_ID: "",
      APPROVAL_NUMBER: "",
      SIGNED_DATE: "",
      SIGNED_APPROVAL: "",
      SIGNED_PLACE: "",
      AMOUNT: "",
      TDATE: "",
      STATE:"",
      isaccept:false,
    };
  }
  componentWillReceiveProps = nextProps => {
    if(nextProps.isJoinYC){
      this.setState(
        {
      CMND: "",
      RACE: "",
      RELIGION: "",
      CMND_DATE: "",
      CMND_PLACE: "",
      JYC_ID: "",
      APPROVAL_NUMBER: "",
      SIGNED_DATE: "",
      SIGNED_APPROVAL: "",
      SIGNED_PLACE: "",
      AMOUNT: "",
      STATE:"",
      TDATE: ""
        })
    }
    else if(nextProps.StudentDetail){
    const {
      CMND,
      RACE,
      RELIGION,
      CMND_DATE,
      CMND_PLACE,
      JYC_ID,
      APPROVAL_NUMBER,
      SIGNED_DATE,
      SIGNED_APPROVAL,
      SIGNED_PLACE,
      AMOUNT,
      STATE,
      TDATE
    } = nextProps.StudentDetail;
    this.setState(
      {
        CMND,
        RACE,
        RELIGION,
        CMND_DATE,
        CMND_PLACE,
        JYC_ID,
        APPROVAL_NUMBER,
        SIGNED_DATE,
        SIGNED_APPROVAL,
        SIGNED_PLACE,
        AMOUNT,
        STATE,
        TDATE
      },
      () => console.log(this.state.A_ID)
    );
  }
  };
  Submit = e => {
    e.preventDefault();
    axios
        .post(
          "http://localhost:5000/api/admins/acceptstudentyc",
          this.state
        )
        .then(res => {
          if (res.data.msg === "Insert Success") {
            this.setState({STATE:"Accepted"})
          }
          else{
            alert("Vui Lòng Xem Lại Thông Tin Nhập Duyệt")
          }
        })
        .catch(err=>alert("Duyệt không thành công .Có vấn đề với thông tin nhập vào vui lòng xem lại trước khi duyệt"));
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    console.log(this.state.STATE)
    return (
      <form onSubmit={this.state.STATE==="Pending"?this.Submit:""}>
        <div
          className="modal fade"
          id="YCDETAIL"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title ">
                  Thông Tin Chuyển Sinh Hoạt Đoàn
                </h5>
                <p />
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
                <div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-6">
                        <label htmlFor="txtTenHoatDong">
                          <h6>Chứng Minh Nhân Dân</h6>
                        </label>
                        <input
                          name="CMND"
                          className="form-control"
                          id=""
                          type="text"
                          value={this.state.CMND}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="">
                          <h6>Nơi Cấp</h6>
                        </label>
                        <input
                          name=""
                          className="form-control"
                          id=""
                          type="text"
                          value={this.state.CMND_PLACE}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="">
                          <h6>Ngày Cấp</h6>
                        </label>
                        <input
                          name=""
                          className="form-control"
                          id=""
                          type="date"
                          value={this.state.CMND_DATE}
                               onChange={this.onChange}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="">
                          <h6>Dân Tộc</h6>
                        </label>
                        <input
                          name=""
                          className="form-control"
                          id=""
                          type="text"
                          value={this.state.RACE}
                                onChange={this.onChange}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="">
                          <h6>Tôn Giáo</h6>
                        </label>
                        <input
                          name=""
                          className="form-control"
                          id=""
                          type="text"
                          
                          value={this.state.RELIGION}
                             onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card mb-1">
                    <div className="form-row m-1 card-body">
                      <div className="col-6">
                        <label htmlFor="txtTenHoatDong">
                          <h6>Sổ Nghị Quyết</h6>
                        </label>
                        <input
                          name="APPROVAL_NUMBER"
                          className="form-control"
                          id="txtKhoa"
                          type="text"
                          value={this.state.APPROVAL_NUMBER}
                           onChange={this.onChange}
                        />
                      </div>
                      <div className=" col-6">
                        <label htmlFor="">
                          <h6>Ngày Kí</h6>
                        </label>
                        <input
                          name="SIGNED_DATE"
                          className="form-control"
                          id="txtNganh"
                          type="date"
                          value={this.state.SIGNED_DATE}
                            onChange={this.onChange}
                        />{" "}
                      </div>
                      <div className=" col-6">
                        <label htmlFor="">
                          <h6>Nơi Kí</h6>
                        </label>
                        <input
                          name="SIGNED_PLACE"
                          className="form-control"
                          id="txtLop"
                          type="text"
                          value={this.state.SIGNED_PLACE}
                           onChange={this.onChange}
                        />
                      </div>
                      <div className=" col-6">
                        <label htmlFor="">
                          <h6>Người Kí</h6>
                        </label>
                        <input
                          name="SIGNED_APPROVAL"
                          className="form-control"
                          id="txtLop"
                          type="text"
                          value={this.state.SIGNED_APPROVAL}
                           onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    type="submit"
                    className="btn btn-primary"
                  >
                    {this.state.STATE==="Pending"?"Duyệt":"Đã Duyệt"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    StudentDetail: state.studentDetail,
    isJoinYC:state.isJoinYC
  };
};

export default connect(mapStateToProps)(JoinYc);

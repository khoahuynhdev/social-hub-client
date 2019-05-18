import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentCommunity, joinStudentCommunity } from '../../actions/auth';
class Dkhsinhvien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinYC: null,
      joinCP: null,
      title: ""
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.props.getStudentCommunity();
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = {
      joinYC: this.state.joinYC,
      joinCP: this.state.joinCP,
      title: this.state.title
    }
    this.props.joinStudentCommunity(data);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="dkHSV"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <form onSubmit={this.onSubmit}>
          <div className="modal-dialog" role="document">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title ">Đăng Ký Vào Hội Sinh Viên</h5>
              </div>
              <div className="modal-body">
                {!this.props.studentCommunity ? <div className="card">
                  <div className="card-header">Thông Tin Cơ Bản</div>

                  <div className="form-group m-3">
                    <label htmlFor="joinYC">
                      Ngày vào Đoàn (nếu có)
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="joinYC"
                      id="joinYC"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group m-3">
                    <label htmlFor="joinCP">
                      Ngày vào Đảng (nếu có)
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="joinCP"
                      id="joinCP"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group m-3">
                    <label htmlFor="title">
                      Chức vụ (nếu có)
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="off"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-check m-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cbDKHSV"
                      defaultChecked
                      required
                    />
                    <label className="form-check-label" htmlFor="cbDKHSV">
                      Cung cấp thông tin cơ bản
                    </label>
                  </div>

                </div>
                  : <div className="card">
                    <div className="card-header">Trạng thái</div>
                    <label className="text-info">
                      {this.props.studentCommunity.STATE}
                    </label>
                  </div>
                }


              </div>
              <div className="modal-footer">
                {!this.props.studentCommunity ?
                <button
                  className="btn btn-myapp">
                  Đăng Ký
              </button> 
              : null}
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Hủy Bỏ
              </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentCommunity: state.studentCommunity
  }
}

export default connect(mapStateToProps, { getStudentCommunity, joinStudentCommunity })(Dkhsinhvien);
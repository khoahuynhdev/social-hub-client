import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJoinYC, joinYC } from '../../actions/auth';
class Cshdoan extends Component {

  componentDidMount() {
    this.props.getJoinYC();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.joinYC();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="cSHD"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <form onSubmit={this.onSubmit}>
          <div className="modal-dialog" role="document">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title ">Chuyển sinh hoạt đoàn</h5>
              </div>
              <div className="modal-body">

                {!this.props.joinyc ? <div className="card">
                  <div className="card-header">Thông Tin Cơ Bản</div>
                  <div className="form-check m-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cbCSHD"
                      defaultChecked
                      required
                    />
                    <label className="form-check-label" htmlFor="cbCSHD">
                      Cung cấp thông tin cơ bản
                    </label>
                  </div>
                </div>
                  :
                  <div className="card">
                    <div className="card-header">Trạng Thái</div>
                    <label className="text-info">{this.props.joinyc.STATE}</label>
                  </div>}

              </div>
              <div className="modal-footer">
                {!this.props.joinyc ? <button className="btn btn-myapp">Đăng Ký</button> : null}
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
    joinyc: state.joinYC
  }
}

export default connect(mapStateToProps, { joinYC, getJoinYC })(Cshdoan);
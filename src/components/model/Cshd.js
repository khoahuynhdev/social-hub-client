import React, { Component } from 'react';

class Cshdoan extends Component {
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
        <form>
          <div className="modal-dialog" role="document">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title ">Chuyển sinh hoạt đoàn</h5>
              </div>
              <div className="modal-body">

                <div className="card">
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
                <div className="card">
                  <div className="card-header">Trạng Thái</div>
                </div>

              </div>
              <div className="modal-footer">
                <button className="btn btn-myapp">
                  Đăng Ký
                </button>
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

export default Cshdoan;
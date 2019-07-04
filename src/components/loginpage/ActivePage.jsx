import React, { useState } from 'react';
import { connect } from 'react-redux';
import { activate } from '../../actions/auth';

const ActivePage = (props) => {
  const { errors, activate, history } = props;
  const [state, setState] = useState({
    ID: "",
    FullName: "",
    BirthDate: "",
    Faculty: "",
    Major: "",
  });

  const onSubmit = event => {
    event.preventDefault();
    activate(state, () => {
      history.push('/updateInfo')
    })
  }

  const onChange = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const faculties = [
    "Khoa",
    "Du lịch - Khách sạn",
    "Công nghệ thông tin",
    "Kinh tế - Tài chính",
    "Bộ môn Luật",
    "Quản trị kinh doanh quốc tế",
    "Ngôn ngữ và Văn hóa phương Đông",
    "Quan hệ quốc tế",
    "Ngoại ngữ"
  ];
  const majors = [
    "Ngành",
    "Quản trị dịch vụ du lịch và lữ hành",
    "Công nghệ thông tin",
    "Kế toán",
    "Quản trị khách sạn",
    "Luật kinh tế",
    "Quản trị kinh doanh",
    "Đông Phương học",
    "Quan hệ quốc tế",
    "Ngôn ngữ Anh",
    "Ngôn ngữ Trung Quốc",
    "Kinh doanh quốc tế",
    "Tài chính - Ngân hàng"
  ];

  const facultyElements = faculties.map((item, index) => {
    return <option value={item} key={index}>{item}</option>
  });
  const majorsElements = majors.map((item, index) => {
    return <option value={item} key={index}>{item}</option>
  })

  const { validateRegisterError = null, invalidInfoError = null, activeError = null  } = errors;

  return (
    <div className="container app-content text-center">
      <div className="row form-vertical mt-10 ">
        <form onSubmit={onSubmit} className="ml-auto mr-auto mt-10">
          <h4 className="text-danger">
            {(validateRegisterError || invalidInfoError) ? 'Sai thông tin tài khoản'
              : activeError ? activeError : null}
          </h4>
          <div className="form-group">
            <label htmlFor="ID">Mã số Sinh Viên</label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              name="ID"
              id="ID"
              placeholder="16DH110123"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="FullName">Họ Tên</label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              name="FullName"
              id="FullName"
              placeholder="Họ Tên"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="BirthDate">Ngày Sinh</label>
            <input
              onChange={onChange}
              type="date"
              className="form-control"
              name="BirthDate"
              id="BirthDate"
              placeholder="Ngày Sinh"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="Faculty">Khoa</label>
            <select
              onChange={onChange}
              className="form-control"
              name="Faculty"
              id="Faculty">
              {facultyElements}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Major">Ngành</label>
            <select
              onChange={onChange}
              className="form-control"
              name="Major"
              id="Major">
              {majorsElements}
            </select>
          </div>
          <button
            className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    id: state.id,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { activate })(ActivePage);
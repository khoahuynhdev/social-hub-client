import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activate } from '../../actions/auth';
class ActivePage extends Component {
  constructor(props) {
    super(props);
    this.Faculties = [
      "Khoa",
      "Du lịch - Khách sạn",
      "Công nghệ thông tin",
      "Kinh tế - Tài chính",
      "Bộ môn Luật",
      "Quản trị kinh doanh quốc tế",
      "Ngôn ngữ và Văn hóa phương Đông",
      "Quan hệ quốc tế",
      "Ngoại ngữ"]
    this.Majors = [
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
    ]
    this.state = {
      ID: "",
      FullName: "",
      BirthDate: "",
      Faculty: "",
      Major: "",
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.activate(this.state, () => {
      this.props.history.push('/updateInfo')
    })
  }

  render() {
    const facultyElements = this.Faculties.map((item, index) => {
      return <option value={item} key={index}>{item}</option>
    });
    const majorsElements = this.Majors.map((item, index) => {
      return <option value={item} key={index}>{item}</option>
    })
    // if (this.props.id) return <Redirect to='/updateInfo' />;
    return (
      <div className="container app-content text-center">
        <div className="row form-vertical mt-10 ">
          <form onSubmit={this.onSubmit} className="ml-auto mr-auto mt-10">
            <h4 className="text-danger">
              {this.props.errors && this.props.errors.validateRegisterError ? 'Sai thông tin tài khoản'
                : this.props.errors && this.props.errors.activeError ? this.props.errors.activeError : null}
            </h4>
            <div className="form-group">
              <label htmlFor="ID">Mã số Sinh Viên</label>
              <input onChange={this.onChange} type="text" className="form-control" name="ID" id="ID" placeholder="16DH110001" required />
            </div>
            <div className="form-group">
              <label htmlFor="FullName">Họ Tên</label>
              <input onChange={this.onChange} type="text" className="form-control" name="FullName" id="FullName" placeholder="Họ Tên" required />
            </div>
            <div className="form-group">
              <label htmlFor="BirthDate">Ngày Sinh</label>
              <input onChange={this.onChange} type="date" className="form-control" name="BirthDate" id="BirthDate" placeholder="Ngày Sinh" required />
            </div>
            <div className="form-group">
              <label htmlFor="Faculty">Khoa</label>
              <select onChange={this.onChange} className="form-control" name="Faculty" id="Faculty">
                {facultyElements}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Major">Ngành</label>
              <select onChange={this.onChange} className="form-control" name="Major" id="Major">
                {majorsElements}
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { activate })(ActivePage);
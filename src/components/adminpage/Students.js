import React, { Component } from "react";
import {connect} from 'react-redux';
import {getStudentDetail,getHSVStudentList } from '../../action/adminauth/index';
import axios from 'axios';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types:this.props.types
    };
  }
  getDetail=()=>
  {
    this.props.getStudentDetail(this.props.item)
  }
  typeOfButton=(types)=>
  {
    switch (types) {
      case 'STList':
        return "Khôi phục"
       case 'Registered':
       return "Điểm Danh"
        case 'Pending':
        return "Duyệt"
        case 'PendingYC':
          return "Why"
          default:     
        return "Đã Duyệt"
    }
  }
  resetStudent=(types)=>
  {
    switch (types) {
      case 'STList':
        return axios
      .post('https://server-socialhub.herokuapp.com/api/admins/resetStudent',this.props.item)
        .then(res=>{
          if(res.data.msg==='SUCCESS'){
            alert("Sinh viên đã được khôi phục tài khoản về trạng thái ban đầu")
          }
        })
        .catch(console.log)
      
       case 'Registered':
            return axios
            .post('https://server-socialhub.herokuapp.com/api/admins/checkinstudent',this.props.item)
              .then(res=>{
                if(res.data.msg==='Success') {
                  this.setState({types:""})
                }
              })
              .catch(err=>console.log(err.error))
        case 'Pending':
          return axios
            .post('https://server-socialhub.herokuapp.com/api/admins/acceptstudent',this.props.item)
              .then(res=>{
                console.log(res.data)
                if(res.data.msg==='Success') {
                  this.setState({types:""})
                  console.log(this.state.types)
                }
              })
              .catch(err=>console.log(err.error))
        default:
        return alert("Sinh Viên Đã Được Duyệt Không Thể Duyệt Lại Lần Nữa")
    }
  }
  render() {
    const student=this.props.item
    // console.log(this.props)
    return (
      <tr key={this.props.index}>
        <td>{this.props.index+1}</td>
        <td>{student.ID}</td>
        <td>{student.FULLNAME}</td>
        <td>{student.CNAME}</td>
        <td>{student.FNAME}</td>
        <td>
          <button type="button" className="btn btn-md btn-info"  onClick={this.getDetail} data-toggle="modal"
                  data-target="#StudentDetail">
            Chi tiết
          </button>{" "}
          <button type="button" className={`btn btn-md btn-info ${this.state.types==="PendingYC"||this.state.types==="AcceptedYC" ? "":"d-none"}`}  onClick={this.getDetail} data-toggle="modal"
                  data-target="#YCDETAIL">
            Duyệt 
          </button>{" "}
          &nbsp;
          <button type="button" onClick={this.resetStudent.bind(null,this.state.types)} className={`btn btn-md btn-primary ml-1 ${this.state.types==="PendingYC" ? "d-none":""}`}>
            {this.typeOfButton(this.state.types)}
          </button>
          <button type="button" onClick={this.resetStudent.bind(null,this.state.types)} className={`btn btn-md btn-danger ${this.state.types==="Pending"||this.state.types==="PendingYC" ? "":"d-none"}`}>
            Từ Chối
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(null,{getStudentDetail,getHSVStudentList})(Students);

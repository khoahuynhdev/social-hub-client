import React, { Component } from 'react';
import {getNoti} from '../../actions/activity';
import { connect } from 'react-redux';
class NotisItem extends Component {
    render() {
        return (
            <tr>
        <td>{this.props.index+1}</td>
        <td>{this.props.notis.NM_NAME}</td>
        <td>{this.props.notis.CREATE_DATE}</td>
        <td>{this.props.notis.CONTENT}</td>
        <td>{this.props.notis.ADMIN_ID}</td>
        <td>{this.props.notis.SENDER}</td>
        <td>
          <button data-toggle="modal" data-target="#SenderModel" type="button" onClick={()=>this.props.getNoti(this.props.notis)} className="btn btn-sm btn-info ml">
            Gửi
          </button>
        </td>
        <td></td>
      </tr>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
            getNoti: (value) => {dispatch(getNoti(value))}
        }
    }
export default connect(null,mapDispatchToProps)(NotisItem);
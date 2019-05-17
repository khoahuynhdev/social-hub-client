import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActivityDetail } from '../../../actions/activity';
class ActivityJoin extends PureComponent {
  render() {
    const { A_NAME, STARTDATE, ENDDATE } = this.props.activity;    
    return (
      <tr>        
        <td>{A_NAME}</td>
        <td>{STARTDATE}</td>
        <td>{ENDDATE}</td>
        <td>
          <button data-toggle="modal" onClick={this.props.setActivityDetail.bind(null, this.props.activity)}
            data-target="#activityDetail" type="button" className="btn btn-sm btn-info">
            Thông Tin
          </button>          
        </td>
      </tr>

    );
  }
}

export default connect(null, { setActivityDetail })(ActivityJoin);
import React from 'react';
import axios from 'axios';
import './LeftWheel.css';
import { useSelector } from 'react-redux';

const DataRow = ({ label, value }) => {
  const data = useSelector((state) => state.amrReducer.amrs);

  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const LeftWheel = ({status}) => {
  const data = useSelector((state) => state.amrReducer.amrs);

  const renderTableRows = () => {
    return (
      <div className='table-component'>
        <div className='left-wheel-table'>
          <DataRow label="error_msg" value={status && status.servo_left_error_msg} />
          <DataRow label="error_code" value={status && status.servo_left_error_code} />
          <DataRow label="current" value={status && status.wheel_1_current} />
          <DataRow label="status" value={status && status.wheel_1_status} />
        </div>
      </div>
    )
  };

  return (
    <div className="container">
      <table className="left-wheel-table">
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default LeftWheel;

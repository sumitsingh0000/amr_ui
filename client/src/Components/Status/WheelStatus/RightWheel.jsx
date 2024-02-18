import React from 'react';
import './RightWheel.css';
import { useSelector } from 'react-redux';

const DataRow = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);


const RightWheel = ({status}) => {
  const data = useSelector((state) => state.amrReducer.amrs);

  const renderTableRows = () => {
    return  <div className='right-wheel-table'>
        <div className='left_wheel'>
          <DataRow label="error_msg" value={status && status.servo_right_error_msg} />
          <DataRow label="error_code" value={status && status.servo_right_error_code} />
          <DataRow label="current" value={status && status.wheel_2_current} />
          <DataRow label="status" value={status && status.wheel_2_status} />
        </div>
      </div>
   
  };

  return (
    <div className="container">
      <table className="right-wheel-table">
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default RightWheel;

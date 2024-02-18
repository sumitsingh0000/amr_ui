import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { delAmr } from '../../../Redux/amr/action';

const AmrDb = () => {

  const data = useSelector((state) => state.amrReducer.amrs)

  const getBatteryClass = (batteryPercentage) => {
    if (batteryPercentage >= 60) {

      return 'battery-green';
    } else if (batteryPercentage >= 20 && batteryPercentage < 80) {
      return 'battery-orange';
    } else {
      return 'battery-red';
    }
  };
  function amrDelhandler(amr){
    //console.log(amr._id);
    delAmr({ID:amr._id})
  }
  const renderTableRows = () => {
    return data.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.IP}</td>
        <td>{item.position && item.position.x ? (item.position.x).toFixed(5) : 0}</td>
        <td>{item.position && item.position.y ? (item.position.y).toFixed(5) : 0}</td>

        <td id={getBatteryClass(item.battery)}>
          {item.battery ? `${item.battery}%` : 'NA'}
        </td>
        <td>{item.isRearRadarConnected ? 'Active' : 'Not Active'}</td>
        <td>Active</td>
        <td>Active</td>
        <td>Connected</td>
        <td>OK</td>
        <td className='db-table-motors' ><div>L</div><div>C</div><div>R</div></td>
        <td>No</td>
        <td  onClick={()=>{amrDelhandler(item)}} id='db-amr-del' ><DeleteIcon /></td>

      </tr>
    ));
  };

  return (
    <div className="db-amr-container">
      <div className='AMR-name'>
        <h2 >AMRS</h2>

      </div>
      <table className="db-data-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>IP</th>
            <th>POSITION X</th>
            <th>POSITION Y</th>
            <th>Battery</th>
            <th>LIDAR 1</th>
            <th>LIDAR 2</th>
            <th>LOCALIZATION</th>
            <th>NAVIGATION</th>
            <th>CAMERA</th>
            <th>MOTOR STATUS</th>
            <th>PALLET</th>
            <th >DELETE</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>

    </div>
  );
};

export default AmrDb;

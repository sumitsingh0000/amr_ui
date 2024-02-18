import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AmrDb.css'
import { useSelector } from 'react-redux';

const StationDb = () => {
  // const [stationData, setStationData] = useState([]);
  const [showData, setShowData] = useState(false);
const stationData=useSelector((state)=>state.mapReducer.stations)


  const renderStationTableRows = () => {
    return stationData.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.station_id}</td>
        <td>{item.position && item.position.x ? (item.position.x).toFixed(5) : 0}</td>
        <td>{item.position && item.position.y ? (item.position.y).toFixed(5) : 0}</td>
      <td>{item.position && item.position.theta ? (item.position.theta).toFixed(5) : 0}</td>

      </tr>
    ));
  };

  return (
    <div className='db-amr-container'>
        <div className='station-name'>
          <h2 >STATIONS</h2>
       
        </div>
        <table  className="db-data-table">
           
          <thead>
            <tr>
              <th>NAME</th>
              <th>STATION ID</th>
              <th>POSITION X</th>
              <th>POSITION Y</th>
              <th>THETA</th>
            </tr>
          </thead>
          <tbody>
            {renderStationTableRows()}
          </tbody>
        </table>
      
    </div>
  );
};

export default StationDb;

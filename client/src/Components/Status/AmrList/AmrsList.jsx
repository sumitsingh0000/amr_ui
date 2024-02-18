import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AmrsList.css';
import { useDispatch, useSelector } from 'react-redux';
import { Set_Active_Amr } from '../../../Redux/amr/action';

const AmrsList = () => {
const data = useSelector((state)=>state.amrReducer.amrs)
const active_amr = useSelector((state) => state.amrReducer.active_amr || false)
const dispatch = useDispatch()
// console.log(data);

const clickHandler = (amr) => {
// console.log(amr);
   dispatch(Set_Active_Amr(amr))
}
  return (
      <div className='new-st-table'>
        <table>
          <thead className='new-st-table-amr'> 
            <tr>
              <th>AMRS</th>
              <th>IP ADDRESS</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='new-st-data-amr'>
            {data.map((amr, index) => {
              // console.log(amr,active_amr.id);
              return (
              <tr key={index} id={`${amr.IP==active_amr.IP?"st-active-amr":""}`} onClick={()=>{clickHandler(amr)}} >
                <td>{amr.name}</td>
                <td>{amr.IP}</td>
                <td>{amr.isConnected ? 'Online' : 'Ofline'}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    
  );
};

export default AmrsList;
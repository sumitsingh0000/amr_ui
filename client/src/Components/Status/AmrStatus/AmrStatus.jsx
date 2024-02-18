
import React, { useEffect, useState } from 'react';
import './AmrStatus.css';
const dummyData4 = [
  { label: 'Status', value: '4' },
  { label: 'Code', value: 'Null' },
  { label: 'Error Msg', value: 'Null' },
];
const AmrStatus = ({status}) => {

  const [amrStatus,setAmrStatus]=useState(dummyData4)


useEffect(()=>{
  let state=["INIT", "STOPPED", "ERROR", "RUNNING"]
//   AMR_STATE_INIT 0
// AMR_STATE_STOPPED 1
// AMR_STATE_ERROR 2
// AMR_STATE_RUNNING 3
  setAmrStatus([
    { label: 'Status', value: state[status.state] },
    { label: 'Code', value: status.amr_error_code },
    { label: 'Error Msg', value: status.amr_error_msg },
  ])
},[status])


  const dummyData1 = [
    { label: 'Front Cam', value: 'Connected' },
    { label: 'Rear Cam', value: 'Disconnected' },
  ];

  const dummyData2 = [
    { label: 'Front Lidar', value1: 'Active', value2: 'IP' },
    { label: 'Rear Lidar', value1: 'Inactive', value2: 'IP' },
  ];

  const dummyData3 = [
    { label: 'Voltage', value: '100' },
    { label: 'Percentage', value: '100' },
  ];



  return (
    <div className="new-st-cam-container">

      <div className="new-st-cam-data-div">

        <div className='new-st-table-head' >STATUS</div>

        <div>
          {amrStatus.map((item, index) => (
            <div className='new-st-table-items' key={index}>
              <div>{item.label}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="new-st-cam-data-div">
       
            <div className='new-st-table-head' >CAMERA</div>
         
        <div>
          {dummyData1.map((item, index) => (
            <div className='new-st-table-items' key={index}>
              <div>{item.label}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="new-st-cam-data-div">
        
            <div className='new-st-table-head' >LIDAR</div>
         
        <div>
          {dummyData2.map((item, index) => (
            <div className='new-st-table-items' key={index}>
              <div>{item.label}</div>
              <div>{item.value1}</div>
              <div>{item.value2}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="new-st-cam-data-div">
       
            <div className='new-st-table-head' >BATTERY</div>
        
        <div>
          {dummyData3.map((item, index) => (
            <div className='new-st-table-items' key={index}>
              <div>{item.label}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmrStatus;

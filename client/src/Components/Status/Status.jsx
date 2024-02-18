import React, { useState, useEffect } from 'react';

import './Status.css';
import AmrsList from './AmrList/AmrsList';

import CameraStatus from './AmrStatus/AmrStatus';



import InputData from './InputData/InputData';

import LeftWheel from './WheelStatus/LeftWheel';
import RightWheel from './WheelStatus/RightWheel';
import ConveyorStatus from './ConveyorStatus/ConveyorStatus';

import { useSelector } from 'react-redux';

let obj = {
  amr_error_code: 1,
  amr_error_msg: "",
  battery_percent: 100,
  battery_voltage: 25861,
  conveyor_current: -1,
  conveyor_status: 22071,
  input1: true,
  input2: false,
  input3: false,
  input4: false,
  input5: false,
  input6: false,
  input7: true,
  input8: true,
  joy_mode: false,
  output1: true,
  output2: false,
  output3: true,
  output4: false,
  servo_conveyor_error_code: 0,
  servo_conveyor_error_msg: "",
  servo_left_error_code: 0,
  servo_left_error_msg: "",
  servo_right_error_code: 0,
  servo_right_error_msg: "",
  state: 1,
  user_input1: true,
  user_input10: true,
  user_input11: false,
  user_input12: false,
  user_input13: false,
  user_input14: false,
  user_input15: false,
  user_input16: false,
  user_input2: false,
  user_input3: false,
  user_input4: false,
  user_input5: false,
  user_input6: false,
  user_input7: false,
  user_input8: false,
  user_input9: false,
  wheel_1_current: 26,
  wheel_1_status: 22071,
  wheel_2_current: 18,
  wheel_2_status: 22071
}


const Status = () => {

  const [loaclizeData, setLocalData] = useState({ LOCALIZATION: true, MAPPING: true, CHARGING: false, "NO GO ZONE": true, "SPEED LIMIT": false, NAVIGATION: true })
  const [loaclizeArr, setLocalArr] = useState([])
  const [status, setStatus] = useState(obj)
  const [uOut, setUOut] = useState([])
  const [iOut, setiOut] = useState([])
  const [oOut, setoOut] = useState([])
  const [leftWheel, setLeftWheel] = useState([])
  const [rightWheel, setRightWheel] = useState([])
  const [convayer, setConvayer] = useState([])
  const active_amr = useSelector((state) => state.amrReducer.active_amr || {})

  const amrs = useSelector((state) => state.amrReducer.amrs)
  useEffect(() => {

    for (let i = 0; i < amrs.length; i++) {

      if (amrs[i].IP == active_amr.IP) {
        let a = amrs[i]
        setStatus(amrs[i].status || {})
        setLocalData({
          LOCALIZATION: a.amcl, MAPPING: a.map_server, CHARGING: false, "NO GO ZONE": a.cost_map, "SPEED LIMIT": a.cost_map, NAVIGATION: a.isRearRadarConnected

        })
      }

    }

  }, [amrs, active_amr])
  useEffect(() => {
    let arr = []
    for (const i in loaclizeData) {
      // console.log(i);
      arr.push({ name: i, data: loaclizeData[i] })
    }
    // console.log(arr);
    setLocalArr(arr)
  }, [loaclizeData])

  useEffect(() => {
    let arr1 = []
    let arr2 = []
    let arr3 = []
    // console.log(status);
    for (const i in status) {
      if (i.includes("user_input")) {
        let id = +i.replace("user_input", "")

        let obj1 = {
          name: `u${id}`,
          id,
          data: status[i]
        }
        arr1.push(obj1)

      } else if (i.startsWith("output")) {
        let id = +i.replace("output", "")

        let obj1 = {
          name: `o${id}`,
          id,
          data: status[i]
        }
        arr2.push(obj1)

      } else if (i.startsWith("input")) {
        let id = +i.replace("input", "")

        let obj1 = {
          name: `i${id}`,
          id,
          data: status[i]
        }
        arr3.push(obj1)

      }
    }

    setUOut(arr1.sort((a, b) => a.id - b.id))

    setoOut(arr2.sort((a, b) => a.id - b.id))

    setiOut(arr3.sort((a, b) => a.id - b.id))

    // console.log(arr);
    // console.log(status);
  }, [status])

  return (

    <div className='NewStatus'>

      <div className='NewStatus-div1' >
        {
          loaclizeArr.map((e, i) => {
            return <div key={i + ""}>
              <div>{e.name}</div>
              <div className={`new_st_${e.data ? "green" : "red"}`} ></div>
            </div>
          })
        }

      </div>
      <div className='NewStatus-div2' >
        <AmrsList />
        <CameraStatus status={status} />

      </div>
      <div className='NewStatus-div3' >
        <div className='new-st-lcr-data'>
          <div className='new-st-l' ><LeftWheel status={status} /></div>
          <div className='new-st-c'>
            <div className='new-st-amr_model' >
              <div className='left_wheel' ></div>
              <div className='conveyer'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className='right_wheel' ></div>
            </div>
            <div className='con-wheel'><ConveyorStatus status={status} /></div>
          </div>
          <div className='new-st-r'><RightWheel status={status} /></div>
        </div>
        <div className='newst-iputsdata' >

          <InputData data={uOut} name="uOut" />
          <InputData data={iOut} name="uOut2" />
          <InputData data={oOut} name="uOut3" />

        </div>

      </div>


    </div>

  );
};

export default Status;
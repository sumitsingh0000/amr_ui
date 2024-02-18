import React, { useEffect, useState } from 'react'

import './Status.css';

import ROSLIB from 'roslib';

// import ReactFlow from 'reactflow';

import { useDispatch, useSelector } from 'react-redux';

import Light from './Light';

import { Set_Amr_Status } from '../../Redux/amr/action';

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
  state: 3,
  user_input1: false,
  user_input10: false,
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

  const active_amr = useSelector((state) => state.amrReducer.active_amr || {})

  const amrs = useSelector((state) => state.amrReducer.amrs)

  const [status, setStatus] = useState(obj)

  // const status = obj

  // const [status, setStatus] = useState(obj)

  const [statusArr, setStatusArr] = useState([])

  // const status = useSelector((state) => { return state.amrReducer.status }) // If it is true then AMR's status will be shown on UI other vise Not.

  const dispatch = useDispatch()

  useEffect(() => {

    for (let i = 0; i < amrs.length; i++) {

      if (amrs[i].IP == active_amr.IP) {

        setStatus(amrs[i].status || {})

      }

    }

  }, [amrs, active_amr])

  useEffect(() => {

    let arr = []

    for (const key in status) {

      if (status.hasOwnProperty(key)) {

        arr.push(key)

      }

    }

    arr = arr.sort((a, b) => a - b)

    setStatusArr(arr)

  }, [status])

  return (

    <div id='st_status' >

      <div className='st_div1' >

      {/* <div className='st_div2' > {e} :  {status[e] === true ? <Light color="green" /> : status[e] !== false ? status[e] : <Light color="red" />}</div> */}

        {statusArr.map((e, i) => {



          //console.log("");



          return <div className='st_div2' > {e} :  {status[e] === true ? <Light color="green" /> : status[e] !== false ? status[e] : <Light color="red" />}</div>



        })}



      </div>



    </div>



  )



}







export default Status




import React, { useEffect, useState } from 'react'
import './Joystick.css';
import { Joystick as Joystick_Component } from "react-joystick-component"
import { useDispatch, useSelector } from 'react-redux';
import ROSLIB from 'roslib';
import axios from 'axios';
import { IP_ADDERESS, PORT } from '../../config/config';
import { Set_Show_Active_Amr_Err } from '../../Redux/amr/action';

function move_Robot({ x, y, publisher, active_amr }) {
  // const twist = new ROSLIB.Message({

  //   linear: { x:y*.4, y: 0, z: 0 },
  //   angular: { x: 0, y: 0, z: -x*.2 },

  // });
  // publisher.publish(twist)
  // console.log("x:", x, "  y:", y);
  let obj = {
    linear: { x: y * .4, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: -x * .2 },
    active_amr
  }
  axios.post(`http://${IP_ADDERESS}:${PORT}/joy/move`,{obj})
}
function stop_Robot({  active_amr }) {
  let obj = {
    active_amr
  }
  axios.post(`http://${IP_ADDERESS}:${PORT}/joy/stop`,{obj})
}




const Joystick = () => {
  const { ros } = useSelector((state) => { return state.rosReducer })
  const [publisher, setPub] = useState(null);
  const [value, setValue] = useState({ check: false, x: 0, y: 0 })
  const active_amr = useSelector((state) => state.amrReducer.active_amr || false)
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log("here in joy-stick");
  },)//show_initpose,amrs,isAddAmr,show_Status,show_active_amr_err,show_joy
  useEffect(() => {
    let pub = new ROSLIB.Topic({
      ros,
      name: '/cmd_vel'
      , // Replace with your topic name  /cmd_vel //  /diffbot_base_controller/cmd_vel_unstamped
      messageType: 'geometry_msgs/msg/Twist', // Replace with your message type geometry_msgs/msg/Twist
    });//geometry_msgs/msg/Twist
    setPub(pub)

  }, [])

  useEffect(() => {
    let i = setInterval(() => {
      if (value.check) {
       // console.log("ture");
        move_Robot({ ...value, publisher, active_amr })
      } else {
        //console.log("flse");
        // move_Robot({...value, publisher })

      }
      clearInterval(i)
    }, 1)
    return () => {
      clearInterval(i)
    }
  }, [value])
  function moveHandler(e) {
    if (!active_amr) {

      dispatch(Set_Show_Active_Amr_Err(true))

      return

    }
    const { x, y } = e
    setValue({ x, y, check: true })
    // move_Robot({ x, y, publisher })
    // console.log("x:",x,"  y:",y );
  }
  function stopHandler(e) {
    let obj = { x: 0, y: 0, check: false }
    setValue(obj)
    move_Robot({ ...obj, publisher, active_amr })
    stop_Robot({active_amr})
    console.log("stopped", e);
  }



  return (
    <div id='j_joystick' >
      {/* <div id='es'>

      </div> */}
      {/* <Joystick_Component move={moveHandler} stop={stopHandler} start={moveHandler} minDistance={35} /> */}
      <Joystick_Component move={moveHandler} stop={stopHandler} start={moveHandler} baseColor='rgba(0, 0, 5, 0.2)' stickColor='rgba(0, 0, 5, 0.527)' minDistance={35} />
    </div>
  )
}

export default Joystick

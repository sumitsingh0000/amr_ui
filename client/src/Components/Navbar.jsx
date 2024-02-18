import React, { useEffect, useState } from 'react';

import '../style/Navbar.css';

import logo from "../images/navbarlogo.png"

import { useDispatch, useSelector } from 'react-redux';

import { Set_Ros_Ip } from '../Redux/ros/action';

import { Set_Joy_Show, Set_Show_Amr_Status } from '../Redux/amr/action';
import { SliderButton } from './SliderButton/SliderButton';
import SingleAmr from './Amrs/SingleAmr';

const Navbar = () => {

  const dispatch = useDispatch()

  //const {IP}=useSelector((state)=>state.rosReducer);

  const [ipText, setIptext] = useState("192.168.1.7");

  const show_Status = useSelector((state) => { return state.amrReducer.show_Status }) // If it is true then AMR's status will be shown on UI other vise Not.

  const active_amr = useSelector((state) => state.amrReducer.active_amr || {})

  const show_joy = useSelector((state) => { return state.amrReducer.show_joy })
  const amrs = useSelector((state) => state.amrReducer.amrs)
  const [onlineAmr, setOnlineAmr] = useState(0)
  function connectHAndler() {

    dispatch(Set_Ros_Ip(ipText))

  }

  function statusHandler() {
    dispatch(Set_Show_Amr_Status(!show_Status))

  }
  function joyHandler() {
    dispatch(Set_Joy_Show(!show_joy))
    openFullscreen()
  }
  useEffect(() => {
    let count = 0;
    amrs.forEach(element => {
      if (element.isConnected)
        count++;
    });
    setOnlineAmr(count)
    // openFullscreen()
  }, [amrs])

  const openFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  return (

    <div className='navbar'>

      <div >

        <img src={logo} />

      </div>
      <div className='nav-info' >
        <div> AMR - 1500</div>
        <div>ONLINE AMRS - {onlineAmr}
        </div>
        <div>{active_amr.name?active_amr.name:"AMR - null"}</div>
      </div>

      <div className='nav-btn'>


        <SliderButton on="MANUAL" off="AUTO" onClick={joyHandler} key={"2"} isOn={show_joy} name="joy" id="2" />

        <div  id='nav-e-stop' >
          E - STOP
        </div>

      </div>

    </div>

  )

}



export default Navbar
import { useDispatch, useSelector } from 'react-redux';

import '../../style/bottombar.css';

import { Set_Amr_Is_Set_Goal, Set_Is_Add_Amr, Set_Amr_Is_Set_POSE, Set_Amr_Temp_POSE, postAmrPosition, Set_Show_Init_Pose, goToPosition, Set_Show_Active_Amr_Err, } from '../../Redux/amr/action';

import { useEffect } from 'react';

import ROSLIB from "roslib"

import { AddMapStation, post_add_Station, setMapIsSetStation } from '../../Redux/map/action';





export const BottomBar = () => {

  const dispatch = useDispatch()

  const { isSetGoal } = useSelector((state) => state.amrReducer)

  const  isSetStation = useSelector((state) => { return state.mapReducer.isSetStation })

  const  temp_station   = useSelector((state) => { return state.mapReducer.temp_station })

  const stations  = useSelector((state) => { return state.mapReducer.stations })

  const isSetPose = useSelector((state) => state.amrReducer.isSetPose);

  const show_initpose = useSelector((state) => state.amrReducer.show_initpose)

  const active_amr = useSelector((state) => state.amrReducer.active_amr)

  const goal = useSelector((state) => state.amrReducer.goal)






  function setGoalHandler() {

    dispatch(setMapIsSetStation(false))

    dispatch(Set_Amr_Is_Set_Goal(!isSetGoal))

    stopClickHandler()

  }

  const goClickHandler = () => {

    if (!active_amr) {

      dispatch(Set_Show_Active_Amr_Err(true))

      return

    }

    dispatch(Set_Amr_Is_Set_Goal(false))

    goToPosition({ IP: active_amr.IP, goal })

  }

  function addStationHandler() {



    dispatch(Set_Amr_Is_Set_Goal(false))



    if (isSetStation) {

      dispatch(post_add_Station({ ...temp_station, id: stations.length + 1 }))

    }

    dispatch(setMapIsSetStation(!isSetStation))

  }

  function inIt_Pose_Handler() {
    if (!active_amr) {

      dispatch(Set_Show_Active_Amr_Err(true))

      return

    }
    dispatch(Set_Show_Init_Pose(!show_initpose))

    // dispatch(Set_Amr_Is_Set_POSE(!isSetPose));

    dispatch(Set_Amr_Is_Set_POSE(false));



  }

  function stopClickHandler() {



  }

  function AddAmrHandler() {

    dispatch(Set_Is_Add_Amr())

  }

  return <div className="bottombar">

    <div className='btm1' >

      <div id={`${isSetGoal ? "sidebar-on-div" : "sidebar-on-div"} sidebar-on-div`} style={{ border: isSetGoal && "2px solid black" }} onClick={setGoalHandler} >SET GOAL</div>

      <div onClick={goClickHandler} > GO</div>

      <div onClick={stopClickHandler} > STOP</div>

      <div style={{ border: isSetStation && "2px solid black" }} onClick={addStationHandler} >{isSetStation ? "CONFIRM" : "ADD  STATION"}</div>

      <div onClick={AddAmrHandler} >ADD AMR</div>

      <div

        onClick={inIt_Pose_Handler}

        style={{ border: isSetPose && "2px solid black" }}

      >

        {isSetPose ? "CONFIRM" : "InIt POSE"}

      </div>

    </div>



  </div>

}





//ros2 action send_goal /navigate_through_poses nav2_msgs/action/NavigateThroughPoses "{\

// \"poses\": [\

// {\"header\": {\"frame_id\": \"map\"}, \"pose\": {\"position\": {\"x\": 1.0, \"y\": 2.0, \"z\": 0.0}, \"orientation\": {\"x\": 0.0, \"y\": 0.0, \"z\": 0.0, \"w\": 1.0}}},\

// {\"header\": {\"frame_id\": \"map\"}, \"pose\": {\"position\": {\"x\": 3.0, \"y\": 4.0, \"z\": 0.0}, \"orientation\": {\"x\": 0.0, \"y\": 0.0, \"z\": 0.0, \"w\": 1.0}}}\

// ]\

// }"


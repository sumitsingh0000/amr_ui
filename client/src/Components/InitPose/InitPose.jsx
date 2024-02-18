import React, { useState } from 'react'

import './InitPose.css'

import { useDispatch, useSelector } from 'react-redux'

import { Set_Amr_Is_Set_POSE, Set_Amr_Temp_POSE, Set_Show_Init_Pose, postAmrPosition } from '../../Redux/amr/action'





const InitPose = () => {

  const { show_initpose } = useSelector((state) => { return state.amrReducer })

  const isSetPose = useSelector((state) => state.amrReducer.isSetPose);

  const temp_Pose = useSelector((state) => state.amrReducer.temp_Pose);

  const { active_amr } = useSelector((state) => state.amrReducer)

  const [defau, setDefault] = useState(true)

  const [custom, setCustom] = useState(true)



  const dispatch = useDispatch()
  const [showAddAMRMessage, setShowAddAMRMessage] = useState(false);



  function customHandler() {



    dispatch(Set_Amr_Is_Set_POSE(!isSetPose));

    setDefault(false)

    if (!isSetPose) return;

    console.log("clicked");

    console.log(active_amr);

    postAmrPosition({ temp_Pose, IP: active_amr.IP })

    dispatch(Set_Show_Init_Pose(!show_initpose))

    setDefault(true)

    dispatch(Set_Amr_Temp_POSE({ x: 0, y: 0, theta: 0 }))

  }

  function defaultHandler() {

    setCustom(false)

    postAmrPosition({ IP: active_amr.IP })

    dispatch(Set_Show_Init_Pose(false))

  }
function closehandler(){
  dispatch(Set_Show_Init_Pose(false))

  dispatch(Set_Amr_Is_Set_POSE(false));
}
  return (

    <div className={`init_div1 ${show_initpose ? 'show' : ''}`} >

    



      {custom && <>
        <button onClick={customHandler} >{defau ? "CUSTOM" : "CONFIRM"}</button>
     
      </>}
      {defau ? <button onClick={defaultHandler}>DEFAULT</button>:  <button onClick={closehandler} >CANCEL</button>}



      {showAddAMRMessage && (
        <div className="add-amr-message">
          <p>Please Add An AMR</p>

        </div>
      )}
    </div>

  )

}



export default InitPose


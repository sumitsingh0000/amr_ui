import { useDispatch } from "react-redux"
import { setMapIsSetStation } from "../../Redux/map/action"
import { Set_Amr_Is_Set_POSE } from "../../Redux/amr/action"

export const GoalOrientationSlider = ({ goalOrientationHandler, selectedAngle, type, stationNamehandler, name }) => {

  //console.log("asdfghjklkjhgfdfgh");
  const dispatch = useDispatch()
  function closeHandler() {

    dispatch(setMapIsSetStation(false))
  }

  return <div id='goal-Slider' style={{ position: "absolute" }}>
    {/* <button>X</button> */}
    {

      type == "Station" && <>

        <input placeholder="Enter Station Name " value={name} onChange={stationNamehandler} type="text" />

      </>

    }

    <div>

      <input
        type="range"

        min="0"

        max="360"

        step="1"

        value={selectedAngle}

        onChange={(e) => { goalOrientationHandler(e) }}

      />

      <input className="goal_input3" placeholder={`Adjust ${type} Orientation: ${selectedAngle}° `} value={selectedAngle} type="number" min={0} max={360} onChange={(e) => { goalOrientationHandler(e) }} />

    </div>
    <div>

      <span>{selectedAngle}°</span>


      <button className="orientation_cancel" onClick={closeHandler} >X</button>

    </div>



  </div>

}

export const PoseOrientationSlider = ({ goalOrientationHandler, selectedAngle }) => {
  const dispatch = useDispatch()
  function closeHandler() {
    dispatch(Set_Amr_Is_Set_POSE(false));
    
  }
  return <div id='goal-Slider' style={{ position: "absolute" }}>

    <label>Adjust Pose Orientation: {selectedAngle}° </label>

    <input

      type="range"

      min="0"

      max="360"

      step="1"

      value={selectedAngle}

      onChange={(e) => { goalOrientationHandler(e) }}

    />

    {/* <span>{selectedAngle}°</span> */}

<input value={selectedAngle} type="number" min={0} max={360} onChange={(e) => { goalOrientationHandler(e) }} />
    {/* <button className="orientation_cancel" onClick={closeHandler} >X</button> */}

    

  </div>

}
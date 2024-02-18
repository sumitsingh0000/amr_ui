import "../../style/Stations/AllStaions.css"
import { delStation, goToStation } from "../../Redux/map/action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";
import { Set_AMr_Goal } from "../../Redux/amr/action";
import { useState } from "react";


function Station({ name, station_id, position, clickhandler }) {

  const dispatch = useDispatch()
  //const { active_amr } = useSelector((state) => state.amrReducer)
  const [confirmDelete,setConfirmDelete] = useState(false);
  const clickHandler = () => {
    //console.log("Clickhandler trriggerd",name);
    clickhandler(name)
    dispatch(Set_AMr_Goal(position))
    //goToStation(station_id,active_amr?active_amr.amr_id:null)
  }
  const deleteHandler = () => {
     setConfirmDelete(true)
  }
  const confirmHandler =()=>{
    dispatch(delStation(station_id))
    setConfirmDelete(false);
    
  }
  

  return (

    <div id="station"  >
      <div onClick={clickHandler} >
        {name}
      </div>

      <button className="staion_del" onClick={deleteHandler} ><DeleteIcon /></button>
       {confirmDelete && (
            <div className="confirm-delete">
               <div className="confirm-content">
               <p>Are you sure want to delete the station ?</p>
               <button className="confirm-yes"  onClick={confirmHandler}>Yes</button>
               <button className="confirm-no" onClick={()=>{setConfirmDelete(false)}}>No</button>
               </div>
             
            </div>
       )}
    </div>
  );
}

export default Station;
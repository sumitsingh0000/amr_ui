import React, { useEffect, useState } from 'react';

import '../../style/Map.css';



import { SingleMapCompoent } from './SingleMapCompoent';



import { useDispatch, useSelector } from 'react-redux';

import { getAmrData } from '../../Redux/amr/action';

import { BottomBar } from '../bottombar/BottomBar';



import Ros2ActionCaller from '../bottombar/Test';
import AllStations from '../Stations/AllStations';
import Amrs from '../Amrs/Amrs';
import  Joystick  from "../Joystick/Joystick";
import InitPose from '../InitPose/InitPose';
import ActiveAmrErr from '../Errors/ActiveAmrErr';

//import { SingleMapCompoent } from './Test';

const Map = () => {
    const show_initpose = useSelector((state) => state.amrReducer.show_initpose)

    const show_active_amr_err = useSelector((state) => state.amrReducer.show_active_amr_err)
  
    const show_joy = useSelector((state) => { return state.amrReducer.show_joy })
    const [loading,setLoading]=useState(false)







    return (

        <div className='map'>
{/**/}
{show_joy && <Joystick />}
             <SingleMapCompoent  />

            <BottomBar /> 
            <AllStations />

          <Amrs />
          

          {

            show_initpose && <InitPose />

          }
          {show_active_amr_err && <ActiveAmrErr />

          }   

        </div>

    )

}



export default Map
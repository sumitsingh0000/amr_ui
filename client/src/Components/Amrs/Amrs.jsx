import React, { useEffect, useState } from 'react'

import './Amrs.css';

import SingleAmr from './SingleAmr';

import { useSelector } from 'react-redux';
import { refreshConnections } from '../../Redux/amr/action';

const Amrs = () => {
  const [showSelectAMR, setShowSelectAMR] = useState(false)
  const amrs = useSelector((state) => state.amrReducer.amrs)
  const active_amr = useSelector((state) => state.amrReducer.active_amr || false)

  function showClickHandler() {
    refreshConnections()
    setShowSelectAMR(!showSelectAMR)
  }
  useEffect(()=>{
   // console.log("here in amrs.jsx");
  },)//show_initpose,amrs,isAddAmr,show_Status,show_active_amr_err,show_joy
  return <div className="allAmrs">

    <div className='amr_selected' onClick={showClickHandler} >{active_amr.name || "Select AMR"}  <button  ></button> </div>
    {showSelectAMR && <div className='select_amr'>
      {amrs.map((e, i) => {
        return <SingleAmr key={i + ""} setShowSelectAMR={setShowSelectAMR} {...e} i={i} />
      })}
    </div>}


  </div>

}



export default Amrs


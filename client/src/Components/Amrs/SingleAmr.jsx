import React from 'react'

import { useDispatch } from 'react-redux';

import { Set_Active_Amr } from '../../Redux/amr/action';

import Light from '../Statusnotinuse/Light';



const SingleAmr = (amr) => {

  const dispatch = useDispatch()

  const clickHandler = () => {

    amr.setShowSelectAMR((pre)=>!pre)

    dispatch(Set_Active_Amr(amr))
  }
  let color=["blue","green","orange","pink","violet"]
  const deleteHandler = () => {

    console.log("delete handler triggered");

  }

  return (

    <div onClick={clickHandler} style={{color:color[amr.i]}} >

      {amr.name}

    <Light color={amr.isConnected?`"green"`:"red"} />
      {/* <button onClick={deleteHandler} >Del</button> */}



    </div>

  );



}



export default SingleAmr


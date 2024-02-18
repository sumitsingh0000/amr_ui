import React, { useState } from 'react'

import './AddAmr.css'

import { useDispatch } from 'react-redux'

import { Add_Amr, Set_Is_Add_Amr } from '../../Redux/amr/action'



const AddAmr = () => {

  const [name, setname] = useState("AMR-")

  const [IP, setIp] = useState("192.168.1.2")

  const [amr_id, setAmr_id] = useState(0)



  const dispatch = useDispatch()

  function addClickHandler() {

    console.log(name, IP);

    dispatch(Add_Amr({ name, IP, amr_id }))

  }

  function cancelHandler() {

    dispatch(Set_Is_Add_Amr())

  }

  return (

    <div className='Add_Amr_con' >

      <div className='add_div2'>

        <h1>ADD AMR</h1>

        <div>

          <label>ENTER AMR NAME</label>

          <input className='add_input' placeholder='Enter Name' onChange={(e) => { setname(e.target.value) }} value={name} />

        </div>



        <div>

          <label>ENTER AMR ID</label>

          <input className='add_input' placeholder='Enter ID' value={amr_id} onChange={(e) => { setAmr_id(e.target.value) }} />

        </div>



        <div>

          <label>ENTER AMR IP</label>

          <input className='add_input' placeholder='Enter IP' value={IP} onChange={(e) => { setIp(e.target.value) }} />

        </div>



        <div className='add_amr_buttons'>

          <button onClick={cancelHandler}>Cancel</button>

          <button onClick={addClickHandler}>ADD</button>



        </div>







      </div>

    </div>

  )

}



export default AddAmr


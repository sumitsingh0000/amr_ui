import React, { useEffect } from 'react'

import './ActiveAmrErr.css'

import { Set_Show_Active_Amr_Err } from '../../Redux/amr/action'

import { useDispatch } from 'react-redux'





const ActiveAmrErr = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    let i = setTimeout(() => {

      dispatch(Set_Show_Active_Amr_Err(false))

    }, 3000)



    return () => {

      clearTimeout(i)

    }

  }, [])

  return (

    <div onClick={() => { dispatch(Set_Show_Active_Amr_Err(false)) }} className='amr_err' >

      No AMR Selected

    </div>

  )

}



export default ActiveAmrErr


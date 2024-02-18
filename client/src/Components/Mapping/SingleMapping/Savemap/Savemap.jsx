import React from 'react'
import "./Savemap.css"

const Savemap = ({setShowConfirmSave}) => {
  return (
    <div className='mapping_save' onClick={()=>{setShowConfirmSave(true)}} >
      SAVE
    </div>
  )
}

export default Savemap

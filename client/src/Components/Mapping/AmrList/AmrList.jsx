import React from 'react'
import { useSelector } from 'react-redux';

const AmrList = ({setSelectedAmr}) => {
    const amrs  = useSelector((state) => state.amrReducer.amrs);
  
  
    function amrClickhandler(IP) {
      setSelectedAmr(IP)
    }
  return (
    <div className='mapping-amrslist'>
    {amrs.map((e, i) => {
      return <div key={i+"A"}  onClick={() => { amrClickhandler(e.IP) }} >
        <p>{e.name}</p>
        <p>{e.IP}</p>
      </div>
    })}
  </div> 
  )
}

export default AmrList

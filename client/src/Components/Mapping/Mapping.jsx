import React, { useEffect, useState } from 'react'
import { SingleMappingCompoent } from './SingleMapping/Singlemapping'

import './Mapping.css';
import AmrList from './AmrList/AmrList';

const Mapping = () => {

  const [slectedAmr, setSelectedAmr] = useState(null)


  // console.log(slectedAmr);
  return (
    <div id='mapping' >


      {slectedAmr==null ? <AmrList setSelectedAmr={setSelectedAmr}/>: <SingleMappingCompoent slectedAmr={slectedAmr} />}


    </div>
  )
}

export default Mapping

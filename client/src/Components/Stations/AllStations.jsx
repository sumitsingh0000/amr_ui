import { motion, AnimatePresence } from 'framer-motion';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { Select } from '@chakra-ui/react'

import '../../style/Stations/AllStaions.css';

import Station from './Station';

import { useSelector } from 'react-redux';

import { useState } from 'react';
import SingleAmr from '../Amrs/SingleAmr';

function AllStations() {

  const [isOpen, setIsOpen] = useState(false);

  // const [showSelectAMR, setShowSelectAMR] = useState(false)

  const [staion, setStation] = useState("Select Station")

 

  const stations  = useSelector((state) => state.mapReducer.stations)

  function clickhandler(name) {

    setStation(name)

    setIsOpen((pre) => !pre)

  }

  return (

    <div className="allStaions">

      <div className='station_selected' onClick={() => { setIsOpen((pre) => !pre) }} >{staion || "Select Station"}   </div>

      {isOpen && <div className='select_station'>

        {stations.map((e, i) => {

          return <Station key={i + ""} clickhandler={clickhandler} {...e} i={i} />

        })}

      </div>}

    </div>

  );

}



export default AllStations;


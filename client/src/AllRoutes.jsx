import React from 'react'
import { Route, Routes } from "react-router-dom"
import Navbar from './Components/Navbar'
import Map from './Components/map/Map'
import Db from './Components/DB/Db'
import Status from './Components/Status/Status'
import Mapping from './Components/Mapping/Mapping'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Map/>} />
        <Route path='/db' element={ <Db/>} />
        <Route path='/plan' element={ <h1>plan</h1>} />
        <Route path='/status' element={<Status/>} />
        <Route path='/mapping' element={<Mapping/>} />
        
    </Routes>
  )
}

export default AllRoutes

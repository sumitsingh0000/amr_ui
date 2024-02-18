import React from 'react'
import './Sidebar.css';
import { Link,useLocation } from 'react-router-dom';

const Sidebar = () => {

const path=useLocation().pathname
    return (
        <div className='sidebar' >
            <div id={`${path=="/"?"sidebar-clicked-div":""}`} >
                <Link to="/" >MAIN</Link>
            </div>
            <div id={`${path=="/db"?"sidebar-clicked-div":""}`} >

            <Link to="/db" >DB</Link>

            </div>
            <div id={`${path=="/plan"?"sidebar-clicked-div":""}`}>

            <Link to="/plan" >PLAN</Link>

            </div>
            <div id={`${path=="/status"?"sidebar-clicked-div":""}`}>

            <Link to="/status" >STATUS</Link>

            </div>
            <div id={`${path=="/mapping"?"sidebar-clicked-div":""}`}>

            <Link to="/mapping" >MAP</Link>

            </div>
        </div>
    )
}

export default Sidebar

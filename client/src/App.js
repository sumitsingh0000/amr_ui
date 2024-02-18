import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { fetch_Cost_map_data, fetch_Stations_data, fetch_map_data } from './Redux/map/action';

import { getAmrData } from './Redux/amr/action';

import Map from './Components/map/Map';

import Navbar from './Components/Navbar';

import AllStations from './Components/Stations/AllStations';

import { AnzoIntro } from './Components/AnzoIntro';

import AddAmr from './Components/Addamr/AddAmr';

import Amrs from './Components/Amrs/Amrs';

import InitPose from './Components/InitPose/InitPose';



import Joystick from './Components/Joystick/Joystick';

import ActiveAmrErr from './Components/Errors/ActiveAmrErr';

import { Loading } from './Components/Loading/Loading';

import Sidebar from './Components/SideBar/Sidebar';

import AllRoutes from './AllRoutes';

import LoadingScreen from './Components/initialLoading/LoadingScreen';

import { FRAME_RATE } from './config/config';

const handleFullScreen = () => {

  const element = document.documentElement;

  if (element.requestFullscreen) {

    element.requestFullscreen();

  } else if (element.mozRequestFullScreen) {

    element.mozRequestFullScreen();

  } else if (element.webkitRequestFullscreen) {

    element.webkitRequestFullscreen();

  } else if (element.msRequestFullscreen) {

    element.msRequestFullscreen();

  }

};

function App() {

  const [intro, setIntro] = useState(true)

  const [loading, setLoading] = useState(false)

  const isAddAmr = useSelector((state) => state.amrReducer.isAddAmr)

  const show_Status = useSelector((state) => { return state.amrReducer.show_Status }) // If it is true then AMR's status will be shown on UI other vise Not.

  const dispatch = useDispatch()


  useEffect(() => {
    // handleFullScreen()
    setTimeout(() => {

      setIntro(false)

    }, 350)

    // console.log(process.env);

    dispatch(fetch_Stations_data())

  }, [])

  useEffect(() => {
    // console.log("here in app.js");
  },)//show_initpose,amrs,isAddAmr,show_Status,show_active_amr_err,show_joy

  useEffect(() => {

    setLoading(true)
    let id = setInterval(() => {
      dispatch(getAmrData())

    },FRAME_RATE)


    dispatch(fetch_map_data())
    dispatch(fetch_Cost_map_data())

    setLoading(false)
    return () => {

      clearInterval(id)
    }
  }, [])



  useEffect(() => {

    document.addEventListener('touchmove', function (event) {
      // Prevent the default behavior of the pull-to-refresh gesture
      event.preventDefault();
    }, { passive: false });

    let elementsToProtect = document.querySelectorAll("div")
    elementsToProtect.forEach(function (element) {
      element.addEventListener('selectstart', function (event) {
        event.preventDefault();
      });
    });
    const canvas = document.querySelector('.App');

    const preventDefault = (event) => {
      event.preventDefault();
    };

    const handleTouchMove = (event) => {
      // Check if there are exactly two touches (pinch gesture)
      if (event.touches.length === 2) {
        preventDefault(event);
      }
    };

    // canvas.addEventListener('touchstart', preventDefault, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', preventDefault);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };


  }, []);

  return (

    <>

      {isAddAmr && <AddAmr />}

      <div className="App">

{intro&&<LoadingScreen/>}

        <Navbar />
        <Sidebar />

        <div className='body'>
          <AllRoutes />
          
          {/* <Map /> */}

        </div>

        {/* <AllStations />

          <Amrs />
          {show_joy && <Joystick />}

          {

            show_initpose && <InitPose />

          }
          {show_active_amr_err && <ActiveAmrErr />

          }        */}
        {
          // show_Status ? <Status /> : ""
        }

        {
          loading && <Loading />
        }



      </div>

    </>

  );

}

export default App;


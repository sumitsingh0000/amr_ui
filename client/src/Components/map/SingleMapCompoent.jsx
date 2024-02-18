import React, { useEffect, useRef, useState } from 'react';

import { PanZoom } from 'react-easy-panzoom';

import { useDispatch, useSelector } from 'react-redux';

import { getScaleMultiplier, pixel_to_meter } from '../../Algos/PixelToMeter';


import { Set_AMr_Goal, Set_Amr_Goal_Orientation, Set_Amr_Is_Set_Goal, Set_Amr_POSE_Orientation, Set_Amr_Temp_POSE } from '../../Redux/amr/action';

import { AddMapStation, setTempStation, setTempStationName, setTempStationOrientation } from '../../Redux/map/action';

import { drawMap } from './showCanvas/drawMap';

import { showStations } from './showCanvas/showStations';

import { showPath } from './showCanvas/showpath';

import { showGoal } from './showCanvas/showGoal';

import { showAmr } from './showCanvas/showAmr';

import { GoalOrientationSlider, PoseOrientationSlider } from './GoalOrientationSlider';

import { showTempStation } from './showCanvas/showTempStation';

import { drawScanData } from './showCanvas/drawScanData';
import { drawCostMap } from './showCanvas/drawCostMap';
import { Loading } from '../Loading/Loading';
import { FRAME_RATE } from '../../config/config';



export const SingleMapCompoent = () => {

  const canvasRef = useRef(null);

  const panZoomRef = useRef(null);

  const [reRender, setRerender] = useState(0)

  const [mouseDown, setMouseDown] = useState(false)

  const [showOrientationSlider, setShowOrientationSlider] = useState(false)

  const [zoom, setZoom] = useState(1);

  const [check, setCheck] = useState(false)

  const [loading, setLoading] = useState(true)

  const [refresh, setRefresh] = useState(1)

  const [selectedAngle, setSelectedAngle] = useState(0);

  const [selecteRadian, setSelecteRadian] = useState(0)

  const [origin, setOrigin] = useState({ x: 100, y: 0 });

  const [cursorType, setCursorType] = useState()

  const [mouseLocation, setMouseLocation] = useState({ top: 0, left: 0 })

  const { temp_Pose, path, isSetGoal, goal, amrs, isSetPose } = useSelector((state) => state.amrReducer);

  const { mapData, stations, isSetStation, temp_station, costmapData } = useSelector((state) => state.mapReducer);

  const dispatch = useDispatch();

  function setAmrGoalHandler(obj) {

    obj.orientation = {

      x: 0,

      y: 0,

      z: Math.sin(selecteRadian / 2),

      w: Math.cos(selecteRadian / 2),

    }

    obj.theta = selectedAngle

    dispatch(Set_AMr_Goal(obj))

  }

  function setAmrPoseHandler(obj) {

    obj.orientation = {

      x: 0,

      y: 0,

      z: Math.sin(selecteRadian / 2),

      w: Math.cos(selecteRadian / 2),

    }

    obj.theta = selectedAngle

    dispatch(Set_Amr_Temp_POSE(obj))

  }

  function setMapStationHandler(obj) {

    dispatch(setTempStation(obj))

  }

  function mouseDownHandler(event) {
    setCursorType("grab")
    setMouseDown(true)

    if (!mapData) return;

    const rect = canvasRef.current.getBoundingClientRect();

    let lx = (event.clientX - rect.left) / zoom;

    let ly = (event.clientY - rect.top) / zoom;

    setMouseLocation({ top: ly, left: lx })

    if (!canvasRef.current || !panZoomRef.current) return;

    const { x, y } = pixel_to_meter({ x: lx, y: ly, resolution: mapData.info.resolution, origin })

    if (isSetGoal) {

      setAmrGoalHandler({ x, y })

    } else if (isSetStation) {

      setMapStationHandler({ x, y })

    } else if (isSetPose) {

      setAmrPoseHandler({ x, y })



    }

  }

  function mouseUpHandler(event) {
    setMouseDown(false)
    setCursorType("crosshair")
  }

  const onWheelHandler = (e) => {

    if (check)

      return

    if (e.deltaY < 0) {

      handleZoomIn()

    } else if (e.deltaY > 0) {

      handleZoomOut()

    }

  }

  const handleZoomIn = () => {

    setZoom((prevZoom) => {

      if (prevZoom > 5) {

        return prevZoom

      }

      return prevZoom + 1

    }); // Increase zoom by 20%

  };



  const handleZoomOut = () => {

    setZoom((prevZoom) => {

      if (prevZoom <= 1) {

        return prevZoom

      }

      return prevZoom - 1

    }); // Decrease zoom by 20%

  };

  function refreshFunc() {

    setRefresh(Math.random())

  }

  function goalOrientationHandler(e) {

    const newAngle = parseFloat(e.target.value);

    setSelectedAngle(newAngle);

    setSelecteRadian(newAngle * (Math.PI / 180))

    dispatch(Set_Amr_Goal_Orientation(newAngle * (Math.PI / 180)))

  }

  function poseOrientationHandler(e) {

    //console.log(e.target.value);

    const newAngle = parseFloat(e.target.value);

    setSelectedAngle(newAngle);

    setSelecteRadian(newAngle * (Math.PI / 180))

    dispatch(Set_Amr_POSE_Orientation(newAngle * (Math.PI / 180)))

    //console.log(newAngle * (Math.PI / 180));//ange to radian

  }

  function stationOrientationHandler(e) {

    const newAngle = parseFloat(e.target.value);

    setSelectedAngle(newAngle);

    setSelecteRadian(newAngle * (Math.PI / 180))

    dispatch(setTempStationOrientation(newAngle * (Math.PI / 180)))

  }

  function stationNamehandler(e) {

    //console.log(e.target.value);

    dispatch(setTempStationName(e.target.value))

  }

  //Zoom In or Out by using CSS property

  // useEffect(() => {

  //   const canvas = canvasRef.current;

  //   canvas.style.transform = `scale(${zoom})`;

  // }, [zoom]);

  useEffect(() => {

    setLoading(true)

    setTimeout(() => {

      drawMap({ mapData, zoom ,id:"mapCanvas"}).then(() => {

        setLoading(false)

      })

    }, 100)

  }, [zoom, mapData])

  useEffect(() => {

    if (!mapData) {

      return

    }

    let obj = {
      
      y: (mapData.info.height + (mapData.info.origin.position.y) / mapData.info.resolution),

      x: 0 - (mapData.info.origin.position.x) / mapData.info.resolution

    };

    setOrigin(obj);

    const canvas = document.getElementById("mapCanvas2");

    const mapWidth = mapData.info.width;

    const mapHeight = mapData.info.height;

    canvas.height = mapHeight * zoom;

    canvas.width = mapWidth * zoom;

    setCheck(true);

    amrs.forEach((amr) => {//laseData

      const { position, laserData } = amr;

      drawScanData({ mapData, laserData, zoom, pose: position, origin })

    });

    showTempStation({ mapData, pose: temp_station, zoom, origin })

    showStations({ stations, zoom, mapData, origin })

    showGoal({ mapData, goal, zoom, origin })

    showAmr({ mapData, pose: temp_Pose, zoom, origin })

    amrs.forEach((amr, index) => {

      const { position, path, laserData, name } = amr;

      showPath({ mapData, path, zoom, origin, index })

      showAmr({ mapData, pose: position, zoom, origin, index, name })

    });

    setCheck(false);

  }, [refresh])//mapData,pose,path,zoom



  useEffect(() => {

    let id = setInterval(() => {

      refreshFunc()

    }, FRAME_RATE)

    return () => {

      clearInterval(id)

    }

  }, [])

  useEffect(() => {

    setShowOrientationSlider(isSetGoal)

  }, [isSetGoal])

  useEffect(() => {
    drawCostMap({ mapData: costmapData, zoom })
  }, [costmapData, zoom])

  // useEffect(() => {
  //   const canvas = document.getElementById('mapCanvas2');

  //   const preventDefault = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleTouchMove = (event) => {
  //     // Check if there are exactly two touches (pinch gesture)
  //     if (event.touches.length === 2) {
  //       preventDefault(event);
  //     }
  //   };

  //   // canvas.addEventListener('touchstart', preventDefault, { passive: false });
  //   canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

  //   return () => {
  //     canvas.removeEventListener('touchstart', preventDefault);
  //     canvas.removeEventListener('touchmove', handleTouchMove);
  //   };
  // }, []);

  return (

    <div

      style={{

        width: '100%',

        height: '100%',

        overflow: 'hidden',

        position: 'absolute',

       top:"0px",
       left:"0px"

      }}

    >

      {loading && <Loading />}
      <PanZoom

        id="pan"

        ref={panZoomRef}

        zoomSpeed={0}

        disableScrollZoom={true}

        disableDoubleClickZoom={true}

        style={{

          
        }}

      >

        <div id='canvas_div'>

          <canvas style={{
            position: "absolute", top: "0px", left: "0px",

            zIndex: 2
          }} id='mapCanvas'

            width={"100%"}

          >

          </canvas>


          <canvas style={{
            position: "absolute", top: "0px", left: "0px",

            zIndex: 3
          }} id='middlecanvas'

            width={"100%"}

          >

          </canvas>


          <canvas className='canvas2' style={{

            position: "absolute", top: "0px", left: "0px", cursor: cursorType,

            zIndex: 4

          }} id='mapCanvas2'

            width={"100%"}

            ref={canvasRef}

            onMouseDown={mouseDownHandler}

            // onWheel={onWheelHandler}

            onMouseUp={mouseUpHandler}

          >

          </canvas>

        </div>

      </PanZoom>
      <div className='map-zoom'>
      <button onClick={handleZoomOut} >-</button>
        <button onClick={  handleZoomIn} >+</button>
        

      </div>



      {showOrientationSlider && <GoalOrientationSlider goalOrientationHandler={goalOrientationHandler} type={"Goal"} selectedAngle={selectedAngle} />}

      {isSetPose && <PoseOrientationSlider goalOrientationHandler={poseOrientationHandler} selectedAngle={selectedAngle} />}

      {isSetStation && <GoalOrientationSlider goalOrientationHandler={stationOrientationHandler} stationNamehandler={stationNamehandler} name={(temp_station && temp_station.name) || ""} type={"Station"} selectedAngle={selectedAngle} />}



    </div>

  );

};


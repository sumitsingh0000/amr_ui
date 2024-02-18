

import React, { useEffect, useRef, useState } from 'react';

import { PanZoom } from 'react-easy-panzoom';

import { useDispatch, useSelector } from 'react-redux';

import { getScaleMultiplier, pixel_to_meter } from '../../Algos/PixelToMeter';

import svg1 from "../../images/map.svg"

import { ReactSVG } from 'react-svg';

import { Set_AMr_Goal, Set_Amr_Goal_Orientation, Set_Amr_Is_Set_Goal } from '../../Redux/amr/action';

import { background } from '@chakra-ui/react';

import { AddMapStation, setTempStation, setTempStationName, setTempStationOrientation } from '../../Redux/map/action';

import { drawMap } from './showCanvas/drawMap';

import { showStations } from './showCanvas/showStations';

import { showPath } from './showCanvas/showpath';

import { showGoal } from './showCanvas/showGoal';

import { showAmr } from './showCanvas/showAmr';

import { GoalOrientationSlider } from './GoalOrientationSlider';

import { showTempStation } from './showCanvas/showTempStation';



export const SingleMapCompoent = () => {

  const canvasRef = useRef(null);

  const panZoomRef = useRef(null);



  const [showOrientationSlider, setShowOrientationSlider] = useState(false)

  const [zoom, setZoom] = useState(4);

  const [check, setCheck] = useState(false)

  const [refresh, setRefresh] = useState(1)

  const [selectedAngle, setSelectedAngle] = useState(0);

  const [selecteRadian, setSelecteRadian] = useState(0)

  const [origin, setOrigin] = useState({ x: 100, y: 0 });

  const [showMousePosition, setShowMousePosition] = useState(false);

  const [mouseLocation, setMouseLocation] = useState({ top: 0, left: 0 })



  const { pose, path, isSetGoal, goal, amrs } = useSelector((state) => state.amrReducer);

  const { mapData, stations, isSetStation, temp_station } = useSelector((state) => state.mapReducer);

  const dispatch = useDispatch();

  //console.log(temp_station)e;

  let s = "/*"

  let e = "*/"



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

  function setMapStationHandler(obj) {

    // dispatch(AddMapStation(obj))



    dispatch(setTempStation(obj))

  }

  function mouseDownHandler(event) {

    //   setMouseDown(true)

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

      setMapStationHandler({ x, y, theta: 0 })

    }



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

      if (prevZoom > 10) {

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

    if (!mapData) {

      return

    }

    let obj = {

      y: mapData.info.height / 2 - mapData.info.height / 50,

      x: mapData.info.width / 2 + mapData.info.width / 50,

    };

    setOrigin(obj);



    const canvas = document.getElementById("mapCanvas");

    const ctx = canvas.getContext("2d");



    const mapWidth = mapData.info.width;

    const mapHeight = mapData.info.height;

    canvas.height = mapHeight

    canvas.width = mapWidth

    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    setCheck(true)

    drawMap({ mapData, zoom, ctx })

    amrs.forEach((amr) => {

      const { position, path } = amr;

      showAmr({ mapData, pose: position, zoom, origin, ctx })

      showPath({ mapData, path, zoom, origin, ctx })

    });



    showTempStation({ mapData, pose: temp_station, zoom, origin, ctx })

    showStations({ stations, zoom, mapData, origin, ctx })

    showGoal({ mapData, goal, zoom, origin, ctx })

    setCheck(false);

  }, [refresh])//mapData,pose,path,zoom 

  useEffect(() => {

    let id = setInterval(() => {

      refreshFunc()

    }, 200)



    return () => {

      clearInterval(id)

    }

  }, [])

  useEffect(() => {

    setShowOrientationSlider(isSetGoal)

  }, [isSetGoal])



  return (

    <div

      style={{

        width: '100%',

        height: '100%',

        overflow: 'hidden',

        position: 'relative',

        display: 'flex',

        justifyContent: "space-evenly",

        alignItems: "center"

      }}

    >

      <PanZoom

        id="pan"

        ref={panZoomRef}

        zoomSpeed={.9}

        disableScrollZoom={true}

        disableDoubleClickZoom="true"

        style={{

          width: '100%',

          height: '100%',

          position: 'absolute',

          top: 0,

          left: 0,

        }}

      >

        {/* <ReactSVG src={svg1} /> */}

        <canvas style={{}} id='mapCanvas'

          width={"100%"}

          ref={canvasRef}

          onMouseEnter={() => setShowMousePosition(true)}

          onMouseLeave={() => setShowMousePosition(false)}

          onMouseDown={mouseDownHandler}

          onWheel={onWheelHandler}

        >

        </canvas>

      </PanZoom>



      {showOrientationSlider && <GoalOrientationSlider goalOrientationHandler={goalOrientationHandler} type={"Goal"} selectedAngle={selectedAngle} />}



      {isSetStation && temp_station && <GoalOrientationSlider goalOrientationHandler={stationOrientationHandler} stationNamehandler={stationNamehandler} name={temp_station.name} type={"Station"} selectedAngle={selectedAngle} />}


    </div>

  );

};



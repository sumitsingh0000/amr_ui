import React, { useEffect, useRef, useState } from 'react';

import { PanZoom } from 'react-easy-panzoom';

import { useDispatch, useSelector } from 'react-redux';

import { getScaleMultiplier, pixel_to_meter } from '../../../Algos/PixelToMeter';








import { Loading } from '../../Loading/Loading';
import { FRAME_RATE } from '../../../config/config';
import { drawMap } from '../../map/showCanvas/drawMap';
import { getAmrData } from '../../../Redux/amr/action';
import { fetch_map_data, mapping_map_data, setMappingMapData } from '../../../Redux/map/action';
import Functionalitybox from './Functionalitybox/Functionalitybox';
import Savemap from './Savemap/Savemap';
import ConfirmSave from './ConfirmSave/ConfirmSave';
import filterMap from './ShowCanavsFuncs/FilterMap';


let prevMapData = []
export const SingleMappingCompoent = ({ slectedAmr }) => {

    const [showConfirmSave, setShowConfirmSave] = useState(false)

    // const [prevMapData, setPrevMapData] = useState([])

    const panZoomRef = useRef(null);

    const [zoom, setZoom] = useState(1);

    const [loading, setLoading] = useState(true)

    const mapData = useSelector((state) => state.mapReducer.mappingData);

    const dispatch = useDispatch();
    function toggleConfirSave(value) {
        setShowConfirmSave(value)
    }
    useEffect(() => {

        setLoading(true)

        let id = setTimeout(() => {
            // console.log(prevMapData);
            // filterMap({ mapData, zoom, prevMapData })
            drawMap({ mapData, zoom ,id:"mappingCanvas"}).then(() => {
                setLoading(false)
            })
            // if(mapData)
            // prevMapData=[...mapData.data.data]
        },)

        return () => {
            clearTimeout(id)
        }

    }, [zoom, mapData])


    useEffect(() => {


        let id = setInterval(() => {
            dispatch(mapping_map_data(slectedAmr))
            // console.log("interval");
        }, 1500)
        // dispatch(mapping_map_data(slectedAmr))    

        return () => {
            // console.log("cleared");
            let canvas = document.getElementById(id);
            canvas=null
            dispatch(setMappingMapData(null))
            clearInterval(id)
         
        }
    }, [])




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

            {loading && <Loading />}
            <PanZoom

                id="pan"

                ref={panZoomRef}

                zoomSpeed={0}

                disableScrollZoom={true}

                disableDoubleClickZoom={true}

                style={{

                    width: '100%',

                    height: '100%',

                    position: 'absolute',

                    top: 0,

                    left: 0,

                }}

            >

                <div className='canvas_div'>

                    <canvas style={{
                        position: "absolute", top: 2, left: 2,

                        zIndex: 2
                    }} id='mappingCanvas'

                        width={"100%"}

                    >

                    </canvas>




                </div>

            </PanZoom>

            {showConfirmSave && <ConfirmSave setShowConfirmSave={toggleConfirSave} ip={slectedAmr} />}
            <Savemap setShowConfirmSave={toggleConfirSave} />



        </div>

    );

};


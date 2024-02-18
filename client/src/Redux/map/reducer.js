import { SET_AMRS_DATA } from "../amr/actionTypes"
import { ADD_MAP_STATION, SET_COST_MAP_DATA, SET_MAPPING_MAP, SET_MAP_DATA, SET_MAP_IS_SETSTAION, SET_MAP_ORIGIN, SET_MAP_ORIGIN_FLAG, SET_MAP_PIXELS, SET_MAP_STATIONS, SET_TEMP_STATION, SET_TEMP_STATION_NAME, SET_TEMP_STATION_ORIENTATION } from "./actionType"

let initial_State = {
    mapData: null,
    costmapData:null,
    mappingData:null,
    isSetStation: false,
    originFlag: false,
    origin: {
        x: 0,
        y: 0
    },
    pixels: {
        x: 0, y: 0
    },
    temp_station: undefined,
    stations: []
}
export const reducer = (state = initial_State, { payload, type }) => {
    switch (type) {
        case SET_MAP_ORIGIN_FLAG: {
            return { ...state, originFlag: !state.originFlag }
        }
        case SET_MAP_ORIGIN: {
            return { ...state, origin: payload }
        }
        case SET_MAP_PIXELS: {
            return { ...state, pixels: payload }
        }
        case SET_MAP_DATA: {
            return { ...state, mapData: payload }
        }
        case SET_MAPPING_MAP :{
            // console.log(payload);
            return { ...state, mappingData: payload }
        }
        case SET_COST_MAP_DATA: {
            return { ...state, costmapData: payload }
        }
        case SET_MAP_IS_SETSTAION: {
            // console.log(payload,"from setmapstation");
            return { ...state, isSetStation: payload }
        }
        case ADD_MAP_STATION: {
            let obj = state.temp_station;
            // let id=state.stations.length+1;
            // let obj={name:`Station ${id}`,id,pose};
            //console.log(obj);
            return {
                ...state, stations: [...state.stations, obj]
            }
        }
        case SET_MAP_STATIONS: {
            return {
                ...state, stations: payload
            }
        }
        case SET_TEMP_STATION: {
            let id = state.stations.length + 1;

            let obj = { name: (state.temp_station && state.temp_station.name) || `Station ${id}`, id, pose: payload }
            return {
                ...state, temp_station: obj
            }
        }
        case SET_TEMP_STATION_ORIENTATION: {
            return {
                ...state, temp_station: { ...state.temp_station, pose: { ...state.temp_station.pose, theta: payload } }
            }
        }
        case SET_TEMP_STATION_NAME: {
            return {
                ...state, temp_station: { ...state.temp_station, name: payload }
            }
        }
        default: {
            return { ...state }
        }
    }
}
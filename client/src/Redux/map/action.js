import { ADD_MAP_STATION, ADD_MAP_STATION_ORIENTATION, SET_COST_MAP_DATA, SET_MAPPING_MAP, SET_MAP_DATA, SET_MAP_IS_SETSTAION, SET_MAP_ORIGIN, SET_MAP_ORIGIN_FLAG, SET_MAP_PIXELS, SET_MAP_STATIONS, SET_TEMP_STATION, SET_TEMP_STATION_NAME, SET_TEMP_STATION_ORIENTATION } from "./actionType"
import axios from "axios"
import { IP_ADDERESS, PORT, link } from "../../config/config"


export const Set_Map_Origin_Flag=(payload)=>{
    return {
        type:SET_MAP_ORIGIN_FLAG
    }
}
export const Set_Map_Origin=(payload)=>{
    return {
        type:SET_MAP_ORIGIN,
        payload
    }
}
export const Set_Map_Pixels=(payload)=>{
    return {
        type:SET_MAP_PIXELS,
        payload
    }
}

export const setMapIsSetStation=(payload)=>{
    return {
        type:SET_MAP_IS_SETSTAION,
        payload
    }
}
export const AddMapStation=()=>{
    return {
        type:ADD_MAP_STATION,
        
    }
}

export const SetMapStationOrientation=(payload)=>{
    return {
        type:ADD_MAP_STATION_ORIENTATION,
        payload
    }
}

export const setMapData=(payload)=>{
    return{
        type:SET_MAP_DATA,
        payload
    }
}

export const setCostMapData=(payload)=>{
    return{
        type:SET_COST_MAP_DATA,
        payload
    }
}
export const setMappingMapData=(payload)=>{
    return{
        type:SET_MAPPING_MAP,
        payload
    }
}


export const setTempStation=(payload)=>{
    return {
        type:SET_TEMP_STATION,
        payload
    }
}
export const setTempStationOrientation=(payload)=>{
    return {
        type:SET_TEMP_STATION_ORIENTATION,
        payload
    }
}
export const setTempStationName=(payload)=>{
    return {
        type:SET_TEMP_STATION_NAME,
        payload
    }
}
export const setMapStations=(payload)=>{
    return{
        type:SET_MAP_STATIONS,
        payload
    }
}
export const fetch_map_data=()=>async(dispatch)=>{
    
    try {
        const {data}=await axios.get(`${link}/map/get`)
       //console.log(data);
      
        dispatch(setMapData(data))
    } catch (error) {
        console.error(error);
    }

}

export const fetch_Cost_map_data=()=>async(dispatch)=>{
    
    try {
        const {data}=await axios.get(`${link}/map/costmap`)
     //  console.log(data);
        dispatch(setCostMapData(data))
    } catch (error) {
        console.error(error);
    }

}

export const mapping_map_data=(ip="192.168.1.27")=>async(dispatch)=>{
    
    try {
        const {data}=await axios.get(`${link}/map/mapping/${ip}`)
    //   console.log(data);
        dispatch(setMappingMapData(data))
    } catch (error) {
        console.error(error);
    }

}

export const fetch_Stations_data=()=>async(dispatch)=>{
    try {
        const {data}=await axios.get(`${link}/station/list`)
     
      dispatch(setMapStations(data))
    } catch (error) {
        
    }
}
export const post_add_Station=(obj)=>async (dispatch)=>{
    try {
       console.log(obj);
        let {pose,name,id}=obj
        let {x,y,theta}=pose
        let station={
            name,
            station_id: id,
            position:{x,y,theta}

        }
        const {data}=await axios.post(`${link}/station/add`,station) 
      //  console.log(data);
        dispatch(setMapStations(data)) 
    } catch (error) {
        
    }
}
export const goToStation=async (station_id,amr_id)=>{
  
    let obj={
        station_id,
        amr_id:amr_id||null
    }
  //  console.log(obj);
    const {data}=await axios.post(`${link}/station/go`,obj)
    //console.log(data);
}
export const delStation=(station_id)=>async(dispatch)=>{
  
    let obj={
        station_id
    }
   // console.log(obj);

    try {
      
        const {data}=await axios.delete(`${link}/station/del`,{params:{station_id}})
        dispatch(fetch_Stations_data())
    } catch (error) {
          console.log(error);
    }
  
}


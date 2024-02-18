import { SET_MAP_ORIGIN, SET_MAP_ORIGIN_FLAG, SET_MAP_PIXELS, SET_ROS_LINK_IP } from "./actionType"
import ROSLIB from "roslib"
let initial_State={
    IP:"192.168.1.22",
   ros:new ROSLIB.Ros({
    groovyCompatibility:false
   })
   
}

export const reducer=(state=initial_State,{payload,type})=>{
    switch(type){
      case SET_ROS_LINK_IP:{
        return {...state,IP:payload}
      }
        default:{
            return state
        }
    }
}

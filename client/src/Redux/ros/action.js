import { SET_ROS_LINK_IP } from "./actionType"

export const Set_Ros_Ip=(payload)=>{
    return {
        type:SET_ROS_LINK_IP,
        payload
    }
}
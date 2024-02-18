import { IP_ADDERESS, PORT, link } from "../../config/config"

import { ADD_AMR, SET_ACTIVE_AMR, SET_AMRS_DATA, SET_AMR_TEMP_POSE, SET_AMR_IS_SET_POSE, SET_AMR_GOAL, SET_AMR_GOAL_ORIENTATION, SET_AMR_IS_SET_GAOL, SET_AMR_PATH, SET_AMR_POSE, SET_IS_ADD_AMR, SET_LOADING, SET_AMR_POSE_ORIENTATION, SET_SHOW_INIT_POSE, SET_SHOW_AMR_STATUS, SET_SHOW_ACTIVE_AMR_ERR, SET_JOY_SHOW } from "./actionTypes"

import axios from "axios"



export const setLoading = (paload) => {

    return {

        type: SET_LOADING,

        paload

    }

}

const SetAmrsData = (payload) => {

    return {

        type: SET_AMRS_DATA,

        payload

    }

}



export const Set_Amr_Pose = (payload) => {

    return {

        type: SET_AMR_POSE,

        payload

    }

}

export const Set_Amr_Is_Set_POSE = (payload) => {

    //console.log(payload);

    return {

        type: SET_AMR_IS_SET_POSE,

        payload

    }

}





export const Set_Amr_Temp_POSE = (payload) => {

    return {

        type: SET_AMR_TEMP_POSE,

        payload

    }

}

export const Set_Amr_POSE_Orientation = (payload) => {

    return {

        type: SET_AMR_POSE_ORIENTATION,

        payload

    }

}



export const Set_Amr_Path = (payload) => {



    return {

        type: SET_AMR_PATH,

        payload

    }

}



export const Set_Amr_Is_Set_Goal = (payload) => {

    return {

        type: SET_AMR_IS_SET_GAOL,

        payload

    }

}



export const Set_AMr_Goal = (payload) => {

    return {

        type: SET_AMR_GOAL,

        payload

    }

}



export const Set_Amr_Goal_Orientation = (payload) => {

    return {

        type: SET_AMR_GOAL_ORIENTATION,

        payload

    }

}



export const Set_Is_Add_Amr = () => {

    return {

        type: SET_IS_ADD_AMR,

    }

}



export const Set_Show_Amr_Status = (payload) => {



    return {



        type: SET_SHOW_AMR_STATUS,



        payload



    }



}

export const Set_Joy_Show = (payload) => {

    return {

        type: SET_JOY_SHOW,

        payload

    }

}


export const Set_Active_Amr = (payload) => {

    return {

        type: SET_ACTIVE_AMR,

        payload

    }

}



export const Set_Show_Active_Amr_Err = (payload) => {

    return {

        type: SET_SHOW_ACTIVE_AMR_ERR,

        payload

    }

}



export const Set_Show_Init_Pose = (payload) => {

    return {

        type: SET_SHOW_INIT_POSE,

        payload

    }

}



export const Add_Amr = ({ name, IP, amr_id }) => async (dispatch) => {

    // console.log(name, IP);

    try {

        const { data } = await axios.post(`${link}/amr/add`, { name, IP, amr_id })

        console.log(data);

        dispatch(Set_Is_Add_Amr())

        getAmrData()



    } catch (error) {

        console.log("error.response.data");

    }



}



export const getAmrData = () => async(dispatch) => {

    try {

      

            const { data } = await axios.get(`${link}/amr/list`)

            //  console.log(data);

            dispatch(SetAmrsData(data))

   

    } catch (error) {

        console.log("error");

    }

}

export const postAmrPosition = async ({ temp_Pose, IP }) => {

    try {

        const { data } = await axios.post(`${link}/amr/initpose`, { temp_Pose, IP })

        console.log(data);

    } catch (error) {

        console.log("error");



    }

}

export const goToPosition = async ({ goal, IP }) => {

    try {

        const { data } = await axios.post(`${link}/amr/go`, { goal, IP })

        console.log(data);

    } catch (error) {

        console.log("error");



    }

}



export const refreshConnections = async () => {

    try {

        const { data } = await axios.post(`${link}/start`)

        console.log(data);

    } catch (error) {

        console.log("error");



    }

}

export const delAmr = async ({ ID }) => {

    try {

        const { data } = await axios.delete(`${link}/amr/delete${ID}`)

        console.log(data);

    } catch (error) {

        console.log("error");



    }

}

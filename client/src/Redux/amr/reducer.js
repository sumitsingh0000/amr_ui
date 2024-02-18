import ROSLIB from "roslib"

import { ADD_AMR, SET_ACTIVE_AMR, SET_AMRS_DATA, SET_AMR_GOAL, SET_AMR_GOAL_ORIENTATION, SET_AMR_IS_SET_GAOL, SET_AMR_IS_SET_POSE, SET_AMR_PATH, SET_AMR_POSE, SET_AMR_POSE_ORIENTATION, SET_AMR_TEMP_POSE, SET_IS_ADD_AMR, SET_JOY_SHOW, SET_LOADING, SET_SHOW_ACTIVE_AMR_ERR, SET_SHOW_AMR_STATUS, SET_SHOW_INIT_POSE } from "./actionTypes"



let initial_State = {

    amrs: [],

    pose: { x: 0, y: 0, theta: 0 },

    temp_Pose: { x: null, y: null, theta: null },

    path: [],

    isSetGoal: false,

    goal: null,

    isAddAmr: false,

    active_amr: null,

    show_active_amr_err: false,

    show_initpose: false,

    show_Status: false,

    show_joy:false

}



export const reducer = (state = initial_State, { payload, type }) => {

    switch (type) {

        case SET_LOADING: {

            return { ...state, loading: true }

        }

        case SET_AMRS_DATA: {

            return { ...state, amrs: payload }

        }

        case SET_AMR_POSE: {

            const { x, y, theta, IP } = payload;

            state.amrs.forEach((amr) => {

                if (amr.IP === IP) {

                    amr.pose = { x, y, theta }

                }

            });

            return { ...state, amrs: state.amrs }

        }

        case SET_AMR_PATH: {

            // console.log(payload);

            const { path, IP } = payload;



            state.amrs.forEach((amr) => {

                if (amr.IP === IP) {

                    amr.path = path

                }

            });

            return { ...state, amrs: state.amrs }

        }

        case SET_AMR_IS_SET_GAOL: {

            return { ...state, isSetGoal: payload }

        }

        case SET_AMR_GOAL: {

           // console.log(payload);

            payload.orientation = payload.orientation || {

                x: 0,

                y: 0,

                z: Math.sin(90 / 2),

                w: Math.cos(90 / 2),

            }

            return { ...state, goal: payload }

        }

        case SET_AMR_GOAL_ORIENTATION: {

            let obj = { ...state.goal }

            obj.theta = payload

            obj.orientation = {

                x: 0,

                y: 0,

                z: Math.sin(payload / 2),

                w: Math.cos(payload / 2),

            }



            return { ...state, goal: obj }

        }

        case SET_IS_ADD_AMR: {

            return { ...state, isAddAmr: !state.isAddAmr }

        }



        case ADD_AMR: {

            let { name, IP } = payload

            //console.log(payload);

            let amr = {

                name, IP,

                pose: { x: 0, y: 0, theta: 0 },

                path: [],

                goal: null,

                ros: new ROSLIB.Ros({

                    groovyCompatibility: false

                }),



            }

            return { ...state, amrs: [...state.amrs, amr], isAddAmr: !state.isAddAmr }

        }

        case SET_ACTIVE_AMR: {

            return { ...state, active_amr: payload }

        }

        case SET_SHOW_ACTIVE_AMR_ERR: {

            return { ...state, show_active_amr_err: payload }

        }

        case SET_AMR_IS_SET_POSE: {

            //console.log("redux",payload);

            return { ...state, isSetPose: payload }

        }

        case SET_AMR_TEMP_POSE: {

            payload.orientation = payload.orientation || {

                x: 0,

                y: 0,

                z: Math.sin(90 / 2),

                w: Math.cos(90 / 2),

            }

            return { ...state, temp_Pose: payload }

        }



        case SET_AMR_POSE_ORIENTATION: {

            let obj = { ...state.temp_Pose }

            obj.theta = payload

            obj.orientation = {

                x: 0,

                y: 0,

                z: Math.sin(payload / 2),

                w: Math.cos(payload / 2),

            }



            return { ...state, temp_Pose: obj }

        }

        case SET_SHOW_INIT_POSE: {

            return { ...state, show_initpose: payload }

        }

        case SET_SHOW_AMR_STATUS: {



            // console.log("reached",payload);



            return { ...state, show_Status: payload }



        }

        case SET_JOY_SHOW:{

            return { ...state, show_joy: payload }

        }

        default: {

            return { ...state }

        }

    }

}
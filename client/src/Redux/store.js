import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import {reducer as amrReducer} from "./amr/reducer"
import { reducer as mapReducer } from "./map/reducer";
import { reducer as rosReducer } from "./ros/reducer";

const allReducer=combineReducers({amrReducer,mapReducer,rosReducer})

const store=legacy_createStore(allReducer,applyMiddleware(thunk))

export default store
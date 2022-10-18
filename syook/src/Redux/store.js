import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import thunk from "redux-thunk"
import { reducer as AuthReducer  } from "../Redux/AuthReducer/reducer";
import {reducer as AppReducer} from "../Redux/AppReducer/reducer";
const rootReducer=combineReducers({AuthReducer,AppReducer})
export const store =legacy_createStore(rootReducer,applyMiddleware(thunk));
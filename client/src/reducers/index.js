import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {fileReducer} from "./fileReducer";
import {userReducer} from "./userReducer";


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
})


export const store = configureStore({reducer: rootReducer});

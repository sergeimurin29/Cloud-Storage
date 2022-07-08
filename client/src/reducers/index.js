import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {fileReducer} from "./fileReducer";
import {uploadReducer} from "./uploadReducer";
import {userReducer} from "./userReducer";


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    uploader:uploadReducer
})


export const store = configureStore({reducer: rootReducer});

import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {fileReducer} from "./fileReducer";
import {uploadReducer} from "./uploadReducer";
import {userReducer} from "./userReducer";


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    uploader:uploadReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

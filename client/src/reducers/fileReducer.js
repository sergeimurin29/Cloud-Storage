const SET_FILES = "SET_FILES";
const SET_CURRENT_DIRECTORY = "SET_CURRENT_DIRECTORY";
const ADD_FILE = "ADD_FILE";
const SET_POP_UP_DISPLAY = "SET_POP_UP_DISPLAY";
const PUSH_TO_DIRECTORY_STACK = "PUSH_TO_DIRECTORY_STACK";
const SET_DIRECTORY_STACK = "SET_DIRECTORY_STACK";
const DELETE_FILE = "DELETE_FILE";
const SHOW_UPLOAD = "SHOW_UPLOAD";
const HIDE_UPLOAD = "HIDE_UPLOAD";
const SET_VIEW = "SET_VIEW";


const defaultState = {
    files: [],
    currentDirectory: null,
    popUpDisplay: "none",
    directoryStack: [],
    uploadIsVisible: false,
    view: "list",
};

export const fileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FILES: {
            return {...state, files: action.payload};
        }
        case SET_CURRENT_DIRECTORY: {
            return {...state, currentDirectory: action.payload};
        }
        case ADD_FILE: {
            return {...state, files: [...state.files, action.payload]};
        }
        case SET_POP_UP_DISPLAY: {
            return {...state, popUpDisplay: action.payload};
        }
        case PUSH_TO_DIRECTORY_STACK: {
            return {...state, directoryStack: [...state.directoryStack, action.payload]};
        }
        case SET_DIRECTORY_STACK: {
            return {...state, directoryStack: action.payload};
        }
        case DELETE_FILE: {
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]};
        }
        case SHOW_UPLOAD: {
            return {...state, uploadIsVisible: true};
        }
        case HIDE_UPLOAD: {
            return {...state, uploadIsVisible: false};
        }
        case SET_VIEW: {
            return {...state, view: action.payload};
        }

        default: {
            return state;
        }
    }
}


export const setFiles = (files) => ({type: SET_FILES, payload: files});
export const setCurrentDirectory = (directory) => ({type: SET_CURRENT_DIRECTORY, payload: directory});
export const addFile = (file) => ({type: ADD_FILE, payload: file});
export const setPopUpDisplay = (display) => ({type: SET_POP_UP_DISPLAY, payload: display});
export const pushToDirectoryStack = (directory) => ({type: PUSH_TO_DIRECTORY_STACK, payload: directory});
export const setDirectoryStack = (directoryStack) => ({type: SET_DIRECTORY_STACK, payload: directoryStack});
export const deleteFile = (fileId) => ({type: DELETE_FILE, payload: fileId});

export const setView = (type) => ({type: SET_VIEW, payload: type});


export const showUpload = () => ({type: SHOW_UPLOAD});
export const hideUpload = () => ({type: HIDE_UPLOAD});




const SET_FILES = "SET_FILES";
const SET_CURRENT_DIRECTORY = "SET_CURRENT_DIRECTORY";
const ADD_FILE = "ADD_FILE";
const SET_POP_UP_DISPLAY = "SET_POP_UP_DISPLAY";


const defaultState = {
    files: [],
    currentDirectory: null,
    popUpDisplay: "none",
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
        default: {
            return state;
        }
    }
}


export const setFiles = (files) => ({type: SET_FILES, payload: files});
export const setCurrentDirectory = (directory) => ({type: SET_CURRENT_DIRECTORY, payload: directory});
export const addFile = (file) => ({type: ADD_FILE, payload: file});
export const setPopUpDisplay = (display) => ({type: SET_POP_UP_DISPLAY, payload: display})

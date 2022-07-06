const SET_FILES = "SET_FILES";
const SET_CURRENT_DIRECTORY = "SET_CURRENT_DIRECTORY";

const defaultState = {
    files: [],
    currentDirectory: null
};

export const fileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FILES: {
            return {...state, files: action.payload};
        }
        case SET_CURRENT_DIRECTORY: {
            return {...state, currentDirectory: action.payload};
        }
        default: {
            return state;
        }
    }
}


export const setFiles = (files) => ({type: SET_FILES, payload: files});
export const setCurrentDirectory = (directory) => ({type: SET_CURRENT_DIRECTORY, payload: directory});

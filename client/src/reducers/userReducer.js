const SET_USER = "SET_USER";
const SIGNOUT_USER = "SIGNOUT_USER";
const SET_DISK_SPACE = "SET_DISK_SPACE";
const SET_USED_SPACE = "SET_USER_SPACE";

const defaultState = {
    currentUser: {},
    isAuth: false,
};

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        }
        case SIGNOUT_USER: {
            localStorage.removeItem("token");
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        }
        case SET_DISK_SPACE: {
            return {...state, currentUser: {...state, diskSpace: action.payload}};
        }
        case SET_USED_SPACE: {
            return {...state, currentUser: {...state, usedSpace: action.payload}};
        }
        default: {
            return state;
        }
    }
}

export const setUser = (user) => ({type: SET_USER, payload: user});
export const signoutUser = () => ({type: SIGNOUT_USER});
export const setDiskSpace = (diskSpace) => ({type: SET_USER, payload: diskSpace});
export const setUsedSpace = (usedSpace) => ({type: SET_USER, payload: usedSpace});



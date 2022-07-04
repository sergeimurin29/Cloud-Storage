const SET_USER = "SET_USER";
const SIGNOUT_USER = "SIGNOUT_USER";

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
        default: {
            return state;
        }
    }
}

export const setUser = (user) => ({type: SET_USER, payload: user});
export const signoutUser = () => ({type: SIGNOUT_USER});


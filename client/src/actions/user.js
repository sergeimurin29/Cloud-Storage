import axios from "axios";
import {clientConfig} from "../config/default";
import {setDiskSpace, setUsedSpace, setUser} from "../reducers/userReducer";

export const SignUpAction = async (email, password) => {
    try {
        const response = await axios.post(clientConfig.server + clientConfig.post.auth["sign-up"], {}, {
            headers: {
                email,
                password,
            }
        });
        return response;
    } catch (error) {
        alert(error?.response?.data?.message);
    }
}


export const SignInAction = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(clientConfig.server + clientConfig.post.auth["sign-in"], {}, {
                headers: {
                    email,
                    password
                }
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }
}

export const AuthAction = () => {
    return async dispatch => {
        try {
            const response = await axios.get(clientConfig.server + clientConfig.get.auth.auth, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.log(error.response.data.message);
            localStorage.removeItem("token");
        }
    }
}

export const getUserSpace = () => {
    return async dispatch => {
       try{
           const response = await axios.get(clientConfig.server + clientConfig.get.user.space, {
               headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")}`
               }
           });
           await dispatch(setDiskSpace(response.data.diskSpace));
           await dispatch(setUsedSpace(response.data.usedSpace));
       }
       catch (error){
           console.log(error?.response?.data?.message);
       }
    }
}

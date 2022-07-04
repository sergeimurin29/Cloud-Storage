import axios from "axios";
import {clientConfig} from "../config/default";

export const SignUpAction = async (email, password) => {
    debugger;
    try {
        const response = await axios.post(clientConfig.server + clientConfig.post.auth["sign-up"], {}, {
            headers: {
                email,
                password,
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const SignInAction = async (email, password) => {
    debugger;
    try {
        const response = await axios.post(clientConfig.server + clientConfig.post.auth["sign-in"], {}, {
            headers: {
                email,
                password
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

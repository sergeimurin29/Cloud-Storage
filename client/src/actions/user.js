import axios from "axios";
import {clientConfig} from "../config/default";

export const SignUpAction = async (email, password) => {
    try {
        const response = await axios.post(clientConfig.server + clientConfig.post.auth["sign-up"], {
            email,
            password,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

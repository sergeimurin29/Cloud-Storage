import axios from "axios";
import {clientConfig} from "../config/default";
import {setFiles} from "../reducers/fileReducer";

export const getFiles = (directoryId) => {
    return async dispatch => {
        try {
            const response = await axios.get(clientConfig.server + clientConfig.get.files, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: directoryId ? {parent: directoryId} : {}
            });
            dispatch(setFiles(response.data));
        } catch (error) {
            alert(error);
        }
    }
}

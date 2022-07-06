import axios from "axios";
import {clientConfig} from "../config/default";
import {addFile, setFiles} from "../reducers/fileReducer";

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

export const createFolder = (directoryId, directoryName) => {
    return async dispatch => {
        try {
            const response = await axios.post(clientConfig.server + clientConfig.post.files.files,
                {
                    name: directoryName,
                    type: "dir",
                    parent: directoryId
                },
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
                });
            dispatch(addFile(response.data));
        } catch (error) {
            alert(error);
        }
    }
}


export const uploadFile = (file, directoryId) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append("file", file);
        if (directoryId) {
            formData.append("parent", directoryId);
        }

        try {
            const response = await axios.post(clientConfig.server + clientConfig.post.files.upload,
                formData,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log("total", totalLength);
                        if (totalLength) {
                            let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            console.log(progress)
                        }
                    }
                });
            dispatch(addFile(response.data));
        } catch (error) {
            alert(error);
        }
    }
}

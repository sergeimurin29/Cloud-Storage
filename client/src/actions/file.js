import axios from "axios";
import {clientConfig} from "../config/default";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {addFile, deleteFile, setFiles} from "../reducers/fileReducer";
import {addUploadFile, changeUploadFile, showUploader} from "../reducers/uploadReducer";
import {getUserSpace} from "./user";

export const getFiles = (directoryId, sort) => {
    return async dispatch => {
        dispatch(showLoader());
        try {
            const response = await axios.get(clientConfig.server + clientConfig.get.files.files, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: directoryId ? {parent: directoryId, sort: sort} : {sort: sort}
            });
            dispatch(setFiles(response.data));
        } catch (error) {
            alert(error);
        } finally {
            dispatch(hideLoader());

        }
    }
}

export const createFolder = (directoryId, directoryName) => {
    return async dispatch => {
        try {
            const response = await axios.post(clientConfig.server + clientConfig.post.files,
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
        const uploadFile = {name: file.name, progress: 0, id: Date.now()};
        dispatch(showUploader());
        dispatch(addUploadFile(uploadFile));
        try {
            const response = await axios.put(clientConfig.server + clientConfig.put.files,
                formData,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                        if (totalLength) {
                            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
                            uploadFile.progress = progress;
                            dispatch(changeUploadFile(uploadFile));
                        }
                    }
                });
            await dispatch(addFile(response.data));
            await dispatch(getUserSpace());

        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }
}

export const downloadFile = async (file) => {
    const response = await fetch(`${clientConfig.server + clientConfig.get.files.download}?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    })

    if (response.status === 200) {
        const fileBlob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}


export const deleteFileAction = (file) => {
    return async dispatch => {
        try {
            const response = await axios.delete(clientConfig.server + clientConfig.delete.files, {
                params: {id: file._id},
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            dispatch(deleteFile(file._id));
            dispatch(getUserSpace());
        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }
};


export const searchFileAction = (searchTerm) => {
    return async dispatch => {
        try {
            const response = await axios.get(clientConfig.server + clientConfig.get.files.search, {
                params: {search: searchTerm},
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            });
            dispatch(setFiles(response.data));
        } catch (error) {
            alert(error?.response?.data?.message);
        } finally {
            dispatch(hideLoader());
        }
    }
};

export const getFile = async (fileId) => {
    try {
        const response = await axios.get(clientConfig.server + clientConfig.get.files.file, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            params: {id: fileId}
        });
        return response.data;
    } catch (error) {
        console.log(error?.response?.data?.message);
    }
}


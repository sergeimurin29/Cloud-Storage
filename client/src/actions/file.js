import axios from "axios";
import {useSelector} from "react-redux";
import {clientConfig} from "../config/default";
import {addFile, deleteFile, setFiles} from "../reducers/fileReducer";
import {addUploadFile, setUploadFiles, showUploader} from "../reducers/uploadReducer";

export const getFiles = (directoryId, sort) => {
    return async dispatch => {
        try {
            const response = await axios.get(clientConfig.server + clientConfig.get.files.files, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: directoryId ? {parent: directoryId, sort: sort} : {sort: sort}
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


export const uploadFile = (file, directoryId, allFiles) => {
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
            const response = await axios.post(clientConfig.server + clientConfig.post.files.upload,
                formData,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                        if (totalLength) {
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);

                            let tempFiles = Array.from(allFiles);
                            tempFiles = [...tempFiles.map(file => file.id === uploadFile.id
                                ? {...file, progress: uploadFile.progress}
                                : {...file}
                            )];

                            dispatch(setUploadFiles(tempFiles));
                        }
                    }
                });
            dispatch(addFile(response.data));

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
            const response = await axios.delete(clientConfig.server + clientConfig.delete.files.file, {
                params: {id: file._id},
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            dispatch(deleteFile(file._id));
        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }
}

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import uploadFileDragIcon from "../../assets/upload-file-drag-icon.svg";
import {setCurrentDirectory, setDirectoryStack, setPopUpDisplay} from "../../reducers/fileReducer";
import FileList from "./fileList/fileList";
import "./storage.css";
import PopUp from "./popUp";
import StorageUpload from "./storageUpload";

const Storage = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);

    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDirectory));
    }, [currentDirectory]);

    const handleCreateFolder = () => {
        dispatch(setPopUpDisplay(true));
    };

    const handleBackClick = () => {
        const dirStack = Array.from(directoryStack);
        const backDirectoryId = dirStack.pop();
        dispatch(setDirectoryStack(dirStack));
        dispatch(setCurrentDirectory(backDirectoryId));
    }

    const handleDragEnter = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setDragEnter(true);
    }

    const handleDragLeave = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setDragEnter(false);
    }

    const handleDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDirectory)));
        setDragEnter(false);
    }


    return (
        <>
            {dragEnter &&
                <div className={"drag-hover"}
                     onDragEnter={handleDragEnter}
                     onDragLeave={handleDragLeave}
                     onDragOver={handleDragEnter}
                     onDrop={handleDrop}
                >
                    <img src={uploadFileDragIcon} alt={"Upload file"}/>
                    <div>Drop your files here to upload
                        to <p>Cloud Storage</p>
                    </div>
                </div>
            }
            <div className={"storage-page"}
                 onDragEnter={handleDragEnter}
                 onDragLeave={handleDragLeave}
                 onDragOver={handleDragEnter}>
                <StorageUpload/>
                <div className={"storage-btn-container"}>
                    {currentDirectory && <button className={"btn btn-left"} onClick={handleBackClick}>Back</button>}
                    <button className={"btn"} onClick={handleCreateFolder}>Create folder</button>
                </div>
                <FileList/>
                <PopUp/>
            </div>
        </>
    );
};

export default Storage;

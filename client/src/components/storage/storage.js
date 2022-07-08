import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFileAction, uploadFile} from "../../actions/file";
import uploadFileDragIcon from "../../assets/upload-file-drag-icon.svg";
import {showLoader} from "../../reducers/appReducer";
import {setCurrentDirectory, setDirectoryStack, setPopUpDisplay, showUpload} from "../../reducers/fileReducer";
import Loader from "../loader/loader";
import FileList from "./fileList/fileList";
import "./storage.css";
import PopUp from "./popUp";
import StorageUpload from "./storageUpload";
import Uploader from "./uploader/Uploader";

const Storage = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);
    const loader = useSelector(state => state.app.loader);

    const [sort, setSort] = useState("name");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDirectory, sort));
    }, [currentDirectory, sort]);

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        dispatch(showLoader());
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout);
        }
        if (event.target.value !== "") {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFileAction(value));
            }, 300, event.target.value));
        } else {
            dispatch(getFiles(currentDirectory));
        }
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
                 onDragOver={handleDragEnter}
            >

                <div className={"storage-btn-container"}>
                    <input type={"text"}
                           value={searchTerm}
                           placeholder={"Search"}
                           className={"input shadow"}
                           autoComplete={"off"}
                           onChange={(event) => handleSearch(event)}
                    />
                    <div className={"storage-sort-select"}>
                        Sort by:
                        <select value={sort} onChange={(event) => setSort(event.target.value)}>
                            <option value={"name"}>By name</option>
                            <option value={"type"}>By type</option>
                            <option value={"date"}>By date</option>
                        </select>
                    </div>
                    <button className={"btn btn-left"} onClick={() => dispatch(showUpload())}>Upload</button>
                    {currentDirectory && <button className={"btn btn-left"} onClick={handleBackClick}>Back</button>}
                    <button className={"btn"} onClick={handleCreateFolder}>Create folder</button>
                </div>
                {loader ?
                    <div className={"files-loader"}>
                        <Loader/>
                    </div>
                    :
                    <>
                        <FileList/>
                        <PopUp/>
                        <Uploader/>
                        <StorageUpload/>
                    </>
                }
            </div>
        </>
    );
};

export default Storage;

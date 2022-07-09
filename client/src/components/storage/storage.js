import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFileAction, uploadFile} from "../../actions/file";
import uploadFileDragIcon from "../../assets/upload-file-drag-icon.svg";
import {showLoader} from "../../reducers/appReducer";
import {setCurrentDirectory, setDirectoryStack, setPopUpDisplay, setView, showUpload} from "../../reducers/fileReducer";
import Loader from "../loader/loader";
import FileList from "./fileList/fileList";
import "./storage.css";
import PopUp from "./popUp";
import StorageUpload from "./storageUpload";
import Uploader from "./uploader/Uploader";
import listView from "../../assets/list-view.svg";
import plateView from "../../assets/plate-view.svg";
import newFolderIcon from "../../assets/new-folder-icon.svg";
import backIcon from "../../assets/back-icon.svg";
import uploadIcon from "../../assets/upload-icon.svg";


const Storage = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);
    const view = useSelector(state => state.files.view);
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
                     onDragEnter={(event) => handleDragEnter(event)}
                     onDragLeave={(event) => handleDragLeave(event)}
                     onDragOver={(event) => handleDragEnter(event)}
                     onDrop={(event) => handleDrop(event)}
                >
                    <img src={uploadFileDragIcon} alt={"Upload file"}/>
                    <div>Drop your files here to upload
                        to <p>Cloud Storage</p>
                    </div>
                </div>
            }

            <div className={"storage-page"}
                 onDragEnter={(event) => handleDragEnter(event)}
                 onDragLeave={(event) => handleDragLeave(event)}
                 onDragOver={(event) => handleDragEnter(event)}
            >

                <div className={"storage-btn-container"}>
                    <div className={"storage-btn-container-left"}>
                        <input type={"text"}
                               value={searchTerm}
                               placeholder={"Search"}
                               className={"input shadow"}
                               autoComplete={"off"}
                               onChange={(event) => handleSearch(event)}
                        />
                    </div>


                    <div className={"storage-btn-container-right"}>
                        {currentDirectory &&
                            <div className={"btn btn-back"} onClick={handleBackClick}>
                                <img src={backIcon} alt={"Back"}/>
                            </div>
                        }

                        <div className={"btn btn-upload"} onClick={() => dispatch(showUpload())}>
                            <div>Upload</div>
                            <img src={uploadIcon} alt={"Upload"}/>
                        </div>

                        <button className={"btn btn-new-folder"} onClick={handleCreateFolder}>
                            <div>New</div>
                            <img src={newFolderIcon} alt={"New folder"}/>
                        </button>

                        <div className={"view-buttons"}>
                            <div className={`btn btn-list btn-left ${view === "list" ? "active" : ""}`}
                                 onClick={() => dispatch(setView("list"))}>
                                <img src={listView} alt={"List"}/>
                            </div>
                            <div className={`btn btn-list btn-plate ${view === "plate" ? "active" : ""}`}
                                 onClick={() => dispatch(setView("plate"))}>
                                <img src={plateView} alt={"Plate"}/>
                            </div>
                        </div>

                        <div className={"storage-sort-select"}>
                            <div>Sort:</div>
                            <select value={sort} className={"input"} onChange={(event) => setSort(event.target.value)}>
                                <option value={"name"}>by name</option>
                                <option value={"type"}>by type</option>
                                <option value={"date"}>by date</option>
                            </select>
                        </div>
                    </div>
                </div>
                {loader &&
                    <div className={"files-loader"}>
                        <Loader/>
                    </div>
                }
                {!loader &&
                    <div>
                        <FileList/>
                        <PopUp/>
                        <Uploader/>
                        <StorageUpload/>
                    </div>
                }
            </div>
        </>
    );
};

export default Storage;

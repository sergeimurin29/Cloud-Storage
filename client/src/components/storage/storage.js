import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import {setPopUpDisplay} from "../../reducers/fileReducer";
import FileList from "./fileList/fileList";
import "./storage.css";
import PopUp from "./popUp";

const Storage = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);

    useEffect(() => {
        dispatch(getFiles(currentDirectory));
    }, [currentDirectory]);

    const handleCreateFolder = () => {
        dispatch(setPopUpDisplay(true));
    };


    return (
        <div className={"storage-page"}>
            <div className={"storage-btn-container"}>
                <button className={"btn"}>Back</button>
                <button className={"btn"} onClick={handleCreateFolder}>Create folder</button>
            </div>
            <FileList/>
            <PopUp/>
        </div>
    );
};

export default Storage;

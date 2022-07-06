import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import {setCurrentDirectory, setDirectoryStack, setPopUpDisplay} from "../../reducers/fileReducer";
import FileList from "./fileList/fileList";
import "./storage.css";
import PopUp from "./popUp";

const Storage = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);

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


    return (
        <div className={"storage-page"}>
            <div className={"storage-btn-container"}>
                {currentDirectory && <button className={"btn"} onClick={handleBackClick}>Back</button>}
                <button className={"btn"} onClick={handleCreateFolder}>Create folder</button>
            </div>
            <FileList/>
            <PopUp/>
        </div>
    );
};

export default Storage;

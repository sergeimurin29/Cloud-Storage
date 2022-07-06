import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import FileList from "./fileList/fileList";
import "./storage.css";

const Storage = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory)

    useEffect(() => {
        dispatch(getFiles(currentDirectory));
    }, [currentDirectory])

    return (
        <div className={"storage-page"}>
            <div className={"storage-btn-container"}>
                <button className={"btn"}>Back</button>
                <button className={"btn"}>Create folder</button>
            </div>
            <FileList/>
        </div>
    );
};

export default Storage;

import React from 'react';
import "./file.css";
import {useDispatch, useSelector} from "react-redux";
import folderIcon from "../../../../assets/folder-icon.svg";
import fileIcon from "../../../../assets/file-icon.svg";
import {pushToDirectoryStack, setCurrentDirectory} from "../../../../reducers/fileReducer";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);


    const handleOpenDirectory = () => {
        dispatch(pushToDirectoryStack(currentDirectory));
        dispatch(setCurrentDirectory(file._id));
    }
    return (
        <div className={"file shadow scale-up-ver-top"} onClick={file.type === "dir" ? () => handleOpenDirectory() : ()=>{}}>
            <img className={"file-img"} src={file.type === "dir" ? folderIcon : fileIcon} alt="file_img"/>
            <div className={"file-name"}>{file.name}</div>
            <div className={"file-date"}>{file.date.slice(0, 10)}</div>
            <div className={"file-size"}>{file.size}</div>
        </div>
    );
};

export default File;

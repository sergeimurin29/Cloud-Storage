import React from 'react';
import "./file.css";
import folderIcon from "../../../../assets/folder-icon.svg";
import fileIcon from "../../../../assets/file-icon.svg";

const File = ({file}) => {

    return (
        <div className={"file shadow"}>
            <img className={"file-img"} src={file.type === "dir" ? folderIcon : fileIcon} alt="file_img"/>
            <div className={"file-name"}>{file.name}</div>
            <div className={"file-date"}>{file.date.slice(0, 10)}</div>
            <div className={"file-size"}>{file.size}</div>
        </div>
    );
};

export default File;

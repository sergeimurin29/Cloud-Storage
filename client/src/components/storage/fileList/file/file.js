import React from 'react';
import "./file.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteFileAction, downloadFile} from "../../../../actions/file";
import folderIcon from "../../../../assets/folder-icon.svg";
import fileIcon from "../../../../assets/file-icon.svg";
import {pushToDirectoryStack, setCurrentDirectory, setCurrentDirectoryName} from "../../../../reducers/fileReducer";
import {bytesToSize} from "../../../../utils/bytesToSize";
import {cutString} from "../../../../utils/cutString";
import deleteIcon from "../../../../assets/delete-icon.svg";
import downloadIcon from "../../../../assets/download-icon.svg";


const File = ({file}) => {
    const filesView = useSelector(state => state.files.view);
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);


    const handleOpenDirectory = () => {
        dispatch(pushToDirectoryStack(currentDirectory));
        dispatch(setCurrentDirectory(file._id));
        dispatch(setCurrentDirectoryName(file.name));
    }

    const handleDownload = (event) => {
        downloadFile(file).then();
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(deleteFileAction(file));
    }


    return (
        <>
            {filesView === "list" &&
                <div className={"file shadow scale-up-ver-top"}
                     onClick={file.type === "dir" ? () => handleOpenDirectory() : () => {
                     }}>
                    <img className={"file-img"} src={file.type === "dir" ? folderIcon : fileIcon} alt="file_img"/>
                    <div className={"file-name"}>{file.name}</div>
                    <div className={"file-date"}>{file.date.slice(0, 10)}</div>
                    <div className={"file-size"}>{file.type !== "dir" ? bytesToSize(file.size) : ""}</div>
                    <div className={"file-buttons"}>
                        {file.type !== "dir" &&
                            <div className={"download-button shadow"} onClick={handleDownload}>
                                <img src={downloadIcon} alt={"Download icon"}/>
                            </div>
                        }
                        <div className={"delete-button shadow"} onClick={handleDelete}>
                            <img src={deleteIcon} alt={"Delete icon"}/>
                        </div>
                    </div>
                </div>
            }
            {filesView === "plate" &&
                <div className={"file shadow scale-up-ver-top"}
                     onClick={file.type === "dir" ? () => handleOpenDirectory() : () => {
                     }}>
                    <img className={"file-img"} src={file.type === "dir" ? folderIcon : fileIcon} alt="file_img"/>
                    <div className={"file-header"}>
                        <div className={"file-name"}>{cutString(file.name, 15)}</div>
                        <div className={"file-date"}>{file.date.slice(0, 10)}</div>
                    </div>
                    <div className={"file-footer"} style={{justifyContent: file.type === "dir" ? "end" : ""}}>
                        <div className={"file-size"}>{file.type !== "dir" ? bytesToSize(file.size) : ""}</div>
                        <div className={"file-buttons"}>
                            {file.type !== "dir" &&
                                <div className={"download-button shadow"} onClick={handleDownload}>
                                    <img src={downloadIcon} alt={"Download icon"}/>
                                </div>
                            }
                            <div className={"delete-button shadow"} onClick={handleDelete}>
                                <img src={deleteIcon} alt={"Delete icon"}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default File;

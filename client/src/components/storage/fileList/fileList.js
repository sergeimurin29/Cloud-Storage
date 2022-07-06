import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";
import File from "./file/file";



const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>);

    return (
        <div className={"file-list"}>
            <div className={"file-list-header"}>
                <div className="file-list-name">Name</div>
                <div className="file-list-date">Date</div>
                <div className="file-list-size">Size</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;

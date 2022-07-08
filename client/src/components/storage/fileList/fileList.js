import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";
import File from "./File/file";




const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>);

    return (
        <>
            {files.length ?
                <div className={"file-list"}>
                    <div className={"file-list-header"}>
                        <div className="file-list-name">Name</div>
                        <div className="file-list-date">Date</div>
                        <div className="file-list-size">Size</div>
                    </div>
                    {files}
                </div>
                :
                <div className={"empty-file-list"}>
                    Folder is empty. Drag and drop some files there or just upload.
                </div>
            }
        </>
    );
};

export default FileList;

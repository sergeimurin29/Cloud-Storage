import React from 'react';
import {useDispatch} from "react-redux";
import crossIcon from "../../../assets/close-window-icon.svg";
import {removeUploadFile} from "../../../reducers/uploadReducer";
import {cutString} from "../../../utils/cutString";

const UploadFile = ({file}) => {
    const dispatch = useDispatch();
    return (
        <div className={"upload-file shadow"}>
            <div className="upload-file-header">
                <div className="upload-file-title">{cutString(file.name, 20)}</div>
                <div className={"close-icon-container"} onClick={()=>dispatch(removeUploadFile(file.id))}>
                    <img src={crossIcon}
                         className={"close-icon"}
                         alt={"Close window"}/>
                </div>
            </div>
            <div className="upload-file-progress-bar">
                <div className="upload-file-full-loader">
                    <div className="upload-file-current-loader"
                         style={{
                             width: `${file.progress}%`,
                             borderTopRightRadius: file.progress === 100 ? '0.3rem' : '',
                             borderBottomRightRadius: file.progress === 100 ? '0.3rem' : '',
                         }}>
                    </div>
                    <div className="upload-file-loader-title"
                         style={{color: file.progress === 100 ? 'white' : ''}}
                    >{file.progress === 100 ? 'Complete' : 'Uploading...'}</div>
                </div>
                <div className="upload-file-percent"
                     style={{color: file.progress === 100 ? 'var(--color-background-navbar)' : ''}}>
                    {file.progress}%
                </div>
            </div>
        </div>
    );
};

export default UploadFile;

import React from 'react';
import "./Uploader.css";
import {useDispatch, useSelector} from "react-redux";
import crossIcon from "../../../assets/close-window-icon.svg";
import {hideUploader} from "../../../reducers/uploadReducer";
import UploadFile from "./UploadFile";

const Uploader = () => {
    const files = useSelector(state => state.uploader.files);
    const isVisible = useSelector(state => state.uploader.isVisible);
    const dispatch = useDispatch();

    return (
        <>
            {isVisible &&
                <div className={"uploader-out"}>
                    <div className={"uploader shadow scale-up-ver-center"}>
                        <div className="uploader-header">
                            <div className="uploader-title">Uploads</div>
                            <div className={"close-icon-container"} onClick={() => dispatch(hideUploader())}>
                                <img src={crossIcon}
                                     className={"close-icon"}
                                     alt={"Close window"}/>
                            </div>
                        </div>
                        <div className={"uploader-container"}>
                            {files.map(file =>
                                <UploadFile key={file.id} file={file}/>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Uploader;

import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../actions/file";
import crossIcon from "../../assets/close-window-icon.svg";
import {hideUpload, setPopUpDisplay} from "../../reducers/fileReducer";
import {handleInputError, handleInputValid} from "./popUp";

const StorageUpload = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const isVisible = useSelector(state => state.files.uploadIsVisible);


    const {formState: {errors, isValid}, handleSubmit, reset, getValues, register} = useForm({
        mode: 'all'
    });
    const onSubmit = (formData) => {
        const files = [...formData?.fileInput];
        files.forEach((file) => dispatch(uploadFile(file, currentDirectory)));
        reset();
    }
    return (
        <>
            {isVisible &&
                <div className={"pop-up"} onClick={() => {
                    dispatch(hideUpload());
                    reset();
                }}>
                    <div className="pop-up-container scale-up-ver-center" onClick={(e) => e.stopPropagation()}>
                        <div className="storage-upload">

                            <div className="pop-up-header">
                                <div className="pop-up-title">
                                    Create new folder
                                </div>
                                <div onClick={() => {dispatch(hideUpload());reset();}}>
                                    <img src={crossIcon} className={"close-icon"} alt={"Close window"}/>
                                </div>
                            </div>

                            <form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor={"fileInput"}>Upload file</label>
                                <input id={"fileInput"} className={"input shadow"} type={"file"} multiple={true}
                                       {...register("fileInput", {
                                           required: {
                                               value: true,
                                               message: "Select your file to upload",
                                           },
                                       })}
                                />
                                {errors?.fileInput ? handleInputError("fileInput") : handleInputValid("fileInput")}

                                <div className={'input-error-container'}>
                                    {errors?.fileInput &&
                                        <small className="input-error">{errors?.fileInput?.message}</small>
                                    }
                                </div>
                                <button type="submit" className={"btn shadow"} disabled={!isValid}>Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            }</>
    );
};

export default StorageUpload;

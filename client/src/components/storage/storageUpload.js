import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../actions/file";
import {handleInputError, handleInputValid} from "./popUp";

const StorageUpload = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);

    const {formState: {errors, isValid}, handleSubmit, reset, getValues, register} = useForm({
        mode: 'all'
    });
    const onSubmit = (formData) => {
        const files = [...formData?.fileInput];
        files.forEach((file) => dispatch(uploadFile(file, currentDirectory)))
    }
    return (
        <div className="storage-upload">
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
    );
};

export default StorageUpload;

import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createFolder} from "../../actions/file";
import crossIcon from "../../assets/close-window-icon.svg";
import {setPopUpDisplay} from "../../reducers/fileReducer";


export const handleInputError = (nodeId) => {
    const node = document.getElementById(nodeId);
    if (node) {
        node.className = "input input-error";
    }
}

export const handleInputValid = (nodeId) => {
    const node = document.getElementById(nodeId);
    if (node) {
        node.className = "input";
    }
}

const PopUp = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const popUpDisplay = useSelector(state => state.files.popUpDisplay);

    const {formState: {errors, isValid}, handleSubmit, reset, getValues, register} = useForm({
        mode: 'all'
    });
    const onSubmit = (formData) => {
        const response = dispatch(createFolder(currentDirectory, formData.folderName));
        reset();
    };




    return (
        <div className={"pop-up"} onClick={() => {dispatch(setPopUpDisplay("none"));reset();}} style={{display: popUpDisplay}}>
            <div className="pop-up-container scale-up-ver-center" onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <div className="pop-up-title">
                        Create new folder
                    </div>
                    <div onClick={() => {dispatch(setPopUpDisplay("none"));reset();}}>
                        <img src={crossIcon} className={"close-icon"} alt={"Close window"}/>
                    </div>
                </div>
                <form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)}>
                    <input id="folderName" className={"input shadow"} type={"text"}
                           placeholder={"Enter folder name"}
                           {...register("folderName", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty",
                               },
                               pattern: {
                                   value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
                                   message: "Invalid folder name"
                               }
                           })}
                    />
                    {errors?.folderName ? handleInputError("folderName") : handleInputValid("folderName")}

                    <div className={'input-error-container'}>
                        {errors?.folderName &&
                            <small className="input-error">{errors?.folderName?.message}</small>
                        }
                    </div>

                    <button type="submit" className={"btn shadow"} disabled={!isValid}>Create</button>

                </form>
            </div>
        </div>
    );
};

export default PopUp;

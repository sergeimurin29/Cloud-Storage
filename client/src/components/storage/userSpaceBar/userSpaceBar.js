import React from 'react';
import {useSelector} from "react-redux";
import {bytesToSize} from "../../../utils/bytesToSize";
import "./userSpaceBar.css";

const UserSpaceBar = () => {
    const diskSpace = useSelector(state => state.user.currentUser.diskSpace);
    const usedSpace = useSelector(state => state.user.currentUser.usedSpace);


    return (
        <div className="user-space-bar">
            <div className={"user-space-bar-title"}>Your space</div>
            <div className="user-space-bar-full">
                <div className="user-space-bar-used" style={{width: `${usedSpace * 100 / diskSpace}%`}}>

                </div>
            </div>
            <div className={"user-space-bar-size"}>{bytesToSize(usedSpace)} / {bytesToSize(diskSpace)}</div>
        </div>
    );
};

export default UserSpaceBar;

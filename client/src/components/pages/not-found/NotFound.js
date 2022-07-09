import React from 'react';
import "./not-found.css";
import homeImage from "../../../assets/home-image.jpeg";
import sadIcon from "../../../assets/sad-icon.svg";


const NotFound = () => {

    return (
        <div className={"not-found-page"}>
            <img src={homeImage} alt={"Cloud Storage home page"} id={"background-img"}/>
            <div className={"not-found shadow"}>
                <div className={"nf-words"}>
                    <div className={"a"}>NOT FOUND</div>
                    <div className={"b"}>404</div>
                </div>
                <img src={sadIcon} alt={"Sad Face"}/>
                <a href={window.location.origin}>To home</a>
            </div>
        </div>
    );
};

export default NotFound;

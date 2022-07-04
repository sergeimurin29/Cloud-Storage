import React from 'react';
import "./Navbar.css";
import "../../../App.css";
import {Link} from "react-router-dom";
import Logo from "../../../assets/navbar-logo.svg";

const Navbar = () => {
    return (
        <div className={"navbar shadow"}>
            <div className={"logo-container"}>
                <Link to={"/"} replace={true}>
                    <img src={Logo} alt={"Cloud Storage Logo"} className={"navbar-logo"}/>
                </Link>
            </div>
            <div className={"navbar-header"}>
                <Link to={"/"} replace={true}>Cloud Storage</Link>
            </div>
            <div className={"auth-container"}>
                <div className={"navbar-signin"}><Link to={"sign-in"} replace={true}>Sign in</Link></div>
                <div className={"navbar-signup"}><Link to={"sign-up"} replace={true}>Sign up</Link></div>
            </div>
        </div>
    );
};

export default Navbar;

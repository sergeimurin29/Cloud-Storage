import React from 'react';
import "./Navbar.css";
import "../../../App.css";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Logo from "../../../assets/navbar-logo.svg";
import {signoutUser} from "../../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
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
                {!isAuth &&
                    <>
                        <div className={"navbar-signin"}><Link to={"sign-in"} replace={true}>Sign in</Link></div>
                        <div className={"navbar-signup"}><Link to={"sign-up"} replace={true}>Sign up</Link></div>
                    </>
                }
                {isAuth &&
                    <>
                        <div className={"navbar-signup"}><a onClick={()=>dispatch(signoutUser())}>Sign out</a></div>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;

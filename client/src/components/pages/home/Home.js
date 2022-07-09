import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import homeImage from "../../../assets/home-image.jpeg";
import "./home.css";

const Home = () => {
    const user = useSelector(state => state.user.currentUser);
    const isAuth = useSelector(state => state.user.isAuth);
    return (
        <div className={"home-page"}>
            <img src={homeImage} style={{opacity: "0.7"}} alt={"Cloud Storage home page"}/>
            <div className="home-hello-container">
                <div className={"h1-welcome"}>Welcome to</div>
                <div className={"h1-cloud focus-in-expand"}>Cloud Storage</div>
            </div>
            <div className="home-navigate-container shadow">
                <div className={"home-navigate-container-header"}>
                    We are glad to see you {user.email ? user.email.split("@")[0] : ""}!
                </div>
                <div className={"words"}>
                    {!user.email && <>We know that you can't wait to get into our storage <b>but</b> at first you need
                        to login</>}
                    {user.email && <>You are already logged in and can use our storage if of course you have no space
                        left. We're kidding! There is enough space for everyone.</>}

                </div>
                <div className={"footer"}>
                    {!isAuth &&
                        <>
                            <Link to={"sign-in"} className={"btn"}>Sign In</Link>
                            <Link to={"sign-up"} className={"btn"}>Sign Up</Link>
                        </>
                    }
                    {isAuth &&
                        <>
                            <Link to={"storage"} className={"btn"}>To Storage</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;

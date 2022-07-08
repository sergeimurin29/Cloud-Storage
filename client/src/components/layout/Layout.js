import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "../../App.css";

const Layout = () => {
    return (
        <div className={"layout"}>
            <Navbar/>

            <div className={"page"}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;

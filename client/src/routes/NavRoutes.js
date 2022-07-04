import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../components/pages/home/Home";
import NotFound from "../components/pages/not-found/NotFound";
import SignIn from "../components/sign-in/Sign-in";
import SignOut from "../components/sign-out/Sign-out";
import SignUp from "../components/sign-up/Sign-up";


const NavRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                    <Route path={"sign-in"} element={<SignIn/>}/>
                    <Route path={"sign-up"} element={<SignUp/>}/>
                    <Route path={"sign-out"} element={<SignOut/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default NavRoutes;

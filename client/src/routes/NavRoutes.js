import React from 'react';
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../components/pages/home/Home";
import NotFound from "../components/pages/not-found/NotFound";
import Redirect from "../components/redirect/redirect";
import SignIn from "../components/sign-in/Sign-in";
import SignUp from "../components/sign-up/Sign-up";


const NavRoutes = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                    {!isAuth &&
                        <>
                            <Route path={"sign-in"} element={<SignIn/>}/>
                            <Route path={"sign-up"} element={<SignUp/>}/>
                        </>
                    }
                    {isAuth &&
                        <>
                            <Route path={"sign-in"} element={<Redirect to={"../"}/>}/>
                            <Route path={"sign-up"} element={<Redirect to={"../"}/>}/>
                        </>

                    }
                </Route>
            </Routes>
        </div>
    );
};

export default NavRoutes;

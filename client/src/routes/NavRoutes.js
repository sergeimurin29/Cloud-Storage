import React from 'react';
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../components/pages/home/Home";
import NotFound from "../components/pages/not-found/NotFound";
import SignUpSuccess from "../components/pages/sign-up-success/sign-up-success";
import Redirect from "../components/redirect/redirect";
import SignIn from "../components/sign-in/Sign-in";
import SignUp from "../components/sign-up/Sign-up";
import Storage from "../components/storage/storage";


const NavRoutes = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                    {/*<Route path={"sign-up-success"} element={<SignUpSuccess/>}/>*/}
                    {!isAuth &&
                        <>
                            <Route path={"sign-in"} element={<SignIn/>}/>
                            <Route path={"sign-up"} element={<SignUp/>}/>
                        </>
                    }
                    {isAuth &&
                        <>
                            <Route path={"sign-in"} element={<Redirect to={"../"} replace={true}/>}/>
                            <Route path={"sign-up"} element={<Redirect to={"../"} replace={true}/>}/>
                            <Route path={"storage"} element={<Storage/>}/>
                        </>
                    }
                </Route>
            </Routes>
        </div>
    );
};

export default NavRoutes;

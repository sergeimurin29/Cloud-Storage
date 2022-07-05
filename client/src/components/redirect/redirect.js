import React from 'react';
import {Navigate} from "react-router-dom";

const Redirect = ({to, replace}) => {
    return (
        <div>
            <Navigate to={to} replace={replace}/>
        </div>
    );
};

export default Redirect;

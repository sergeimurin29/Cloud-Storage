import React from 'react';
import {Navigate} from "react-router-dom";

const Redirect = ({to}) => {
    return (
        <div>
            <Navigate to={to} replace={true}/>
        </div>
    );
};

export default Redirect;

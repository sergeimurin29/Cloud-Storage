import React from 'react';
import homeImage from "../../../assets/home-image.jpeg";

const Home = () => {
    return (
        <div className={"home-page"}>
            <img src={homeImage} alt={"Cloud Storage home page"}/>
        </div>
    );
};

export default Home;

import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="jumbotron mt-5">
                <h1 className="display-5">Welcome to Auth System</h1>
                <p className="lead">Whis is an incredible authentication system with production level features!</p>
                <hr className="my-4"/>
                <p>Clock the Log In button</p>
                <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
            </div>
        </div>
    )
};

export default Home;
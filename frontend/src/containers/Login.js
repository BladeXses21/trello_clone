import React, { useState, Component } from "react";
import { Link, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { login, load_user } from '../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <h1>Sign In</h1>
                <p>Sign into your account</p>
                <form onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <input
                            className="form-control"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="6"
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                <p className="mt-3">
                    Don`t have an account <Link to='/signup'>Sign Up</Link>
                </p>
                <p className="mt-3">
                    Forgot your password? <Link to='/reset-password'>Reset password</Link>
                </p>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
     isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
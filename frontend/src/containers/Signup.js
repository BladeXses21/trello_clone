import React, { useState, Component } from "react";
import { Link, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { signup } from '../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';


const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="jumbotron mt-5">
                    <h1>Sign Up</h1>
                    <p>Create your account</p>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Name*"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Email*"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Password*"
                                name="password"
                                value={password}
                                onChange={onChange}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Confirm Password*"
                                name="re_password"
                                value={re_password}
                                onChange={onChange}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <button className="btn btn-primary" type="submit">Register</button>

                        </div>
                    </form>
                    <p className="mt-3">
                        Already have an account <Link to='/login'>Sign In</Link>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
     isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);
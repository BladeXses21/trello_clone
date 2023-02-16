import React, { useState, Component } from "react";
import { Link, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { reset_password } from '../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';


const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <h1>Request Password Reset:</h1>
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
                    </div>
                    <button className="btn btn-primary" type="submit">Reset Password</button>
                </form>
            </div>
        </Fragment>
    );
};

export default connect(null, { reset_password })(ResetPassword);
import React, { useState, Component } from "react";
import { Link, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { reset_password_confirm } from '../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';


const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const { uid, token } = useParams();

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="jumbotron mt-5">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="New Password"
                                name="new_password"
                                value={new_password}
                                onChange={onChange}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="form-group">
                        <input
                                className="form-control"
                                type="password"
                                placeholder="Confirm New Password"
                                name="re_new_password"
                                value={re_new_password}
                                onChange={onChange}
                                minLength="6"
                                required
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
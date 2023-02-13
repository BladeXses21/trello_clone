import React, { useEffect } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../actions/auth'

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
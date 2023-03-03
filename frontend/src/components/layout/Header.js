import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import HeaderCss from './Header.module.css';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';


const Header = ({ logout, isAuthenticated }) => {
    const [navigate, setNavigate] = useState(false);

    const logout_user = () => {
        logout();
    };

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className="nav-item">
            <a className="nav-link" href='#!' onClick={logout_user}>Logout</a>
        </li>
    );

    const todoLinks = () => (
        <li className="nav-item">
            <Link className="nav-link" to="/todo">Todo <span className='sr-only'>(current)</span></Link>
        </li>
    );

    const trelloLinks = () => (
        <li className="nav-item">
            <Link className="nav-link" to="/trello">Trello <span className='sr-only'>(current)</span></Link>
        </li>
    );



    return (
        <Fragment>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-black" id='navbar'>
                <Link className="navbar-brand" to="/">Auth System</Link>
                    <ul className="navbar-nav">
                        { isAuthenticated ? todoLinks() : null}
                        { isAuthenticated ? trelloLinks() : null}
                        { isAuthenticated ? authLinks() : guestLinks() }
                    </ul>
              </nav>
            </div>
            {navigate ? <Navigate to='/' /> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Header);
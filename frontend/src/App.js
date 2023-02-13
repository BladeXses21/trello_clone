import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';

import Layout from './components/layout/Layout';
import DashBoard from './components/todo/Dashboard';


if(process.env.NODE_ENV === 'debug'){
    setDebugLevel(1)
}

const App = () => (
    <Provider store={store}>
        <div className='container'>
            <Router>
                <Routes>
                    <Route exact path='/' element={ <Layout/> }>
                        <Route exact path='/' element={ <Home/> } />
                        <Route exact path='/todo' element={ <DashBoard/> } />
                        <Route exact path='/login' element={ <Login/> } />
                        <Route exact path='/signup' element={Signup} />
                        <Route exact path='/reset-password' element={ResetPassword} />
                        <Route exact path='/password/reset/confirm/:uid/:token' element={ResetPasswordConfirm} />
                        <Route exact path='/activate/:uid/:token' element={Activate} />
                    </Route>
                </Routes>
            </Router>
        </div>
    </Provider>
);

export default App;
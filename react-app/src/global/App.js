import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'

import './style/stylesheet.scss';

import Login from '../components/login';
import Home from '../container/home';

class App extends Component {
    render() {
        return (
            <div>
                <p>header</p>
                
                <Router history={browserHistory}>
                    <Route path="/" component={Home} />
                </Router>

                <Login />

                <p>footer</p>
            </div>
        );
    }
}

export default App;

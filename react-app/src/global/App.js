import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'

import './style/stylesheet.scss';

import Home from '../container/home';

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home} />
            </Router>
        );
    }
}

export default App;

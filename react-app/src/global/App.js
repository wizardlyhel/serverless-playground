import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { restoreUserSession } from './actions/'

import './style/stylesheet.scss';

import Home from '../container/home';
import Login from '../container/login';
import Register from '../container/register';
import UserConfrimation from '../container/user-confirmation';

class App extends Component {
    componentDidMount() {
        this.props.restoreSession()
    }

    render() {
        return (
            <div>
                <p>header</p>

                <Router history={browserHistory}>
                    <Route path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/user-confirmation" component={UserConfrimation} />
                </Router>

                <p>footer</p>
            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        restoreSession: () => dispatch(restoreUserSession())
    }
}

export default connect(
    null,
    mapDispatchToProps
)(App)

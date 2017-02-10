import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import './style/stylesheet.scss';

import Login from '../components/login';
import Home from '../container/home';

import {login} from './actions';

class App extends Component {
    componentDidMount() {
        this.props.loginUser('user', 'pass');
    }

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

App.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  Login form submit handler
     */
    loginUser:PropTypes.func
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        loginUser: (user, pass) => dispatch(login(user, pass))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

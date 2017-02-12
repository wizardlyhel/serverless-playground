import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import './style/stylesheet.scss';

import Login from '../components/login';
import Home from '../container/home';

import {login, loginV2, loginV3, loginForm} from './actions';

class App extends Component {
    componentDidMount() {
        this.props.loginUser1('user1', 'pass');
        this.props.loginUser2('user2', 'pass');
        this.props.loginUser3({token: 'ABC'}, {appMeta: true});
        this.props.loginUser4('user4', 'pass');
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
    loginUser1:PropTypes.func,
    loginUser2:PropTypes.func,
    loginUser3:PropTypes.func,
    loginUser4:PropTypes.func
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        loginUser1: (user, pass) => dispatch(login(user, pass)),
        loginUser2: (user, pass) => dispatch(loginV2(user, pass)),
        loginUser3: (user, pass) => dispatch(loginV3(user, pass)),
        loginUser4: (user, pass) => dispatch(loginForm(user, pass))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

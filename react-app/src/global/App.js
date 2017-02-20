import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { restoreUserSession } from './actions/'

import './style/stylesheet.scss'

import Header from './partials/header'
import Footer from './partials/footer'

import Home from '../container/home'
import Login from '../container/login'
import Register from '../container/register'
import UserConfrimation from '../container/user-confirmation'

class App extends Component {
    componentDidMount() {
        this.props.restoreSession()
    }

    requireAuth = (nextState, replace) => {
        if (!this.props.authenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    render() {
        const {
            intl,
            appError
        } = this.props
        
        return (
            <div className="pure-g">
                <Header />
                <div className="page">
                    {appError &&
                        <p className="">{intl.messages[appError]}</p>
                    }

                    <Router history={browserHistory}>
                        <Route path="/" component={Home} onEnter={this.requireAuth} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/user-confirmation" component={UserConfrimation} />
                    </Router>
                </div>
                <Footer />
            </div>
        )
    }
}

export const mapStateToProps = (state, props) => {
    const appError = state.app.getIn(['formErrors'])['app']
    return {
        authenticated: state.app.getIn(['authenticated']),
        intl: state.intl,
        appError: appError ? appError : undefined
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        restoreSession: () => dispatch(restoreUserSession())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

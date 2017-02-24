import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { closeDrawer, restoreUserSession } from './actions/'

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

    // onEnter={this.requireAuth}
    requireAuth(nextState, replace) {
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
            appError,
            authenticated,
            closeDrawer
        } = this.props
        
        return (
            <div className="pure-g">
                <Header />
                <div className="page u-padding-md">
                    {appError &&
                        <p className="">{intl.messages[appError]}</p>
                    }

                    <Router history={browserHistory} onUpdate={closeDrawer}>
                        <Route path="/" component={Home} />
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

App.defaultProps = {
    authenticated: false
}

App.propTypes = {
    appError: PropTypes.string,
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    authenticated: PropTypes.bool,
    closeDrawer: PropTypes.func
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
        restoreSession: () => dispatch(restoreUserSession()),
        closeDrawer: () => dispatch(closeDrawer())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

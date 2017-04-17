import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { setDrawerState, restoreUserSession } from './actions/app/'

import Stylesheet from './style/stylesheet.scss'    // eslint-disable-line no-unused-vars

import Header from './partials/header'
import Footer from './partials/footer'

import Home from '../container/home'
import Login from '../container/login'
import Register from '../container/register'
import Access from '../container/access'
import AccessInfo from '../container/access-info'
import UserConfrimation from '../container/user-confirmation'

const publicRoutes = [
    '/access',
    '/access-info',
    '/login',
    '/register',
    '/user-confirmation'
]

const getRoutes = (store, closeDrawer) => {
    const requireAuth = (nextState, replace) => {
        if (!store.getState().app.getIn(['authenticated']) && publicRoutes.indexOf(nextState.location.pathname) === -1) {
            replace({
                pathname: '/access',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    return (
         <Router history={browserHistory} onUpdate={closeDrawer}>
            <Route path="/" component={Home} onEnter={requireAuth} />
            <Route path="access" component={Access} />
             <Route path="access-info" component={AccessInfo} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
            <Route path="user-confirmation" component={UserConfrimation} />
        </Router>
    )
}

class App extends Component {
    componentDidMount() {
        this.props.restoreSession()
    }

    componentWillReceiveProps(nextProps) {
        // Navigate to root when authenticated
        if (this.props.authenticated !== nextProps.authenticated && nextProps.authenticated) {
            browserHistory.push('/')
        }
    }

    render() {
        const {
            intl,
            appError,
            closeDrawer,
            store
        } = this.props
        
        return (
            <div className="pure-g">
                <Header />
                <div className="page u-padding-md">
                    {appError &&
                        <p className="">{intl.messages[appError]}</p>
                    }
                    { getRoutes(store, closeDrawer) }
                </div>
                <Footer />
            </div>
        )
    }
}

App.propTypes = {
    appError: PropTypes.string,
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    closeDrawer: PropTypes.func,
    store: PropTypes.object
}

export const mapStateToProps = (state, props) => {
    const appError = state.app.getIn(['formErrors', 'app'])
    return {
        intl: state.intl,
        appError: appError ? appError : undefined,
        authenticated: state.app.getIn(['authenticated'])
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        restoreSession: () => dispatch(restoreUserSession()),
        closeDrawer: () => dispatch(setDrawerState(false))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

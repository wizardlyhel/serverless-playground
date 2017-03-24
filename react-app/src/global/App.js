import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { setDrawerState, restoreUserSession } from './actions/'

import './style/stylesheet.scss'

import Header from './partials/header'
import Footer from './partials/footer'

import Home from '../container/home'
import Login from '../container/login'
import Register from '../container/register'
import UserConfrimation from '../container/user-confirmation'

const getRoutes = (store, closeDrawer) => {
    // onEnter={this.requireAuth}
    const requireAuth = (nextState, replace) => {
        if (!store.getState().app.getIn(['authenticated'])) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    return (
         <Router history={browserHistory} onUpdate={closeDrawer}>
            <Route path="/" component={Home} onEnter={requireAuth} />
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
    const appError = state.app.getIn(['formErrors'])['app']
    return {
        intl: state.intl,
        appError: appError ? appError : undefined
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

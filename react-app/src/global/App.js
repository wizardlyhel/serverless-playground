import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import {
    setDrawerState,
    showTerms,
    restoreUserSession,
    signOut
} from './actions/app/'

import Stylesheet from './style/stylesheet.scss'    // eslint-disable-line no-unused-vars

import Header from './partials/header'
import Footer from './partials/footer'

import Home from '../container/home'
import Login from '../container/login'
import Register from '../container/register'
import Access from '../container/access'
import AccessInfo from '../container/access-info'
import UserConfrimation from '../container/user-confirmation'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

const customContentStyle = {
    width: '95%',
    height: '100%'
}

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
            authenticated,
            intl,
            appError,
            closeDrawer,
            store,
            showTerms,
            acceptTerms,
            declineTerms
        } = this.props

        const actions = [
            <div>
                <div className="pure-u-1">
                    <p className="u-padding u-text-align-center u-text-bold u-margin-0">{intl.messages['terms.acceptance']}</p>
                </div>
                <div className="pure-u-1">
                    <div className="pure-u-md-7-24"></div>
                    <div className="pure-u-sm-1 pure-u-md-1-6">
                        <RaisedButton
                            label={intl.messages['button.cancel']}
                            primary={false}
                            fullWidth={true}
                            onTouchTap={declineTerms}
                            className="u-margin-end-md"
                        />
                    </div>
                    <div className="pure-u-md-2-24"></div>
                    <div className="pure-u-sm-1 pure-u-md-1-6">
                        <RaisedButton
                            label={intl.messages['button.agree']}
                            secondary={true}
                            fullWidth={true}
                            onTouchTap={acceptTerms}
                        />
                    </div>
                    <div className="pure-u-md-7-24"></div>
                </div>
            </div>
        ]
        
        return (
            <div className="pure-g">
                <Header />
                <div className="page u-padding-md">
                    {appError &&
                        <p className="">{intl.messages[appError]}</p>
                    }
                    { getRoutes(store, closeDrawer) }
                </div>
                {authenticated &&
                    <Dialog
                        className="c-modal"
                        contentClassName="c-modal__wrapper"
                        bodyClassName="c-modal__content"
                        modal={true}
                        open={showTerms}
                        contentStyle={customContentStyle}
                        actions={actions}
                        actionsContainerClassName="c-modal__footer"
                        title={intl.messages['modal.disclaimer']}
                        titleClassName="c-modal__header u-text-align-center"
                        autoScrollBodyContent={true}
                        repositionOnUpdate={false}
                    >
                        <iframe width="100%" height="300px" className="c-modal__iframe" src="/pages/en/terms.html" />
                    </Dialog>
                }
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
        authenticated: state.app.getIn(['authenticated']),
        showTerms: state.app.getIn(['showTerms'])
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        restoreSession: () => dispatch(restoreUserSession()),
        closeDrawer: () => dispatch(setDrawerState(false)),
        acceptTerms: () => {
            dispatch(showTerms(false))
        },
        declineTerms: () => {
            dispatch(signOut())
            dispatch(showTerms(false))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

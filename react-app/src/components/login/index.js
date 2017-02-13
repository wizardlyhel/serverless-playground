import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { authentication } from '../../global/actions/authentication'

class Login extends Component {
    render() {
        const {
            intl,
            showInDialog,
            submitLogin
        } = this.props

        const containerClasses = classNames({
            'pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-3': !showInDialog,
            'pure-u-1': showInDialog
        })

        return (
            <div className="pure-g u-text-align-center">
                <div className={containerClasses}>
                    <div className="u-padding-lg">
                        <TextField type="email" floatingLabelText={intl.messages['auth.emailLabel']} fullWidth={true} />
                        <TextField type="password" floatingLabelText={intl.messages['auth.passwordLabel']} fullWidth={true} />
                        <div className="u-padding-top-lg">
                            <RaisedButton primary={true} label={intl.messages['auth.signInButton']} fullWidth={true} />
                        </div>
                        <Divider />
                        <div className="u-padding-top-lg">
                            <Link to="/register">
                                <RaisedButton primary={true} label={intl.messages['auth.signUpButton']} fullWidth={true} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.defaultProps = {
    showInDialog: false
}

Login.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  Wrap login form in a dialog
     */
    showInDialog: PropTypes.bool,
    /**
     *  Login form submit handler
     */
    submitLogin:PropTypes.func
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitLogin: (username, password) => dispatch(authentication.login(username, password))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

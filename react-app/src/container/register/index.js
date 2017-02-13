import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

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
                        <TextField type="password" floatingLabelText={intl.messages['auth.confirmPasswordLabel']} fullWidth={true} />
                        <div className="u-padding-top-lg">
                            <RaisedButton primary={true} label={intl.messages['auth.signUpButton']} fullWidth={true} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  Signup form submit handler
     */
    signup:PropTypes.func
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        sigup: (username, password) => dispatch(authentication.signup(username, password))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

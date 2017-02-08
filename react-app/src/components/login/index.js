import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { authentication } from '../../global/actions/authentication'

const customContentStyle = {
    width: '90%',
    maxWidth: '400px'
}

const LoginForm = ({intl, containerClasses}) => (
    <div className="pure-g u-text-align-center">
        <div className={containerClasses}>
            <div className="u-padding-lg">
                <h2>Aventine</h2>
                <TextField type="email" floatingLabelText="Email" fullWidth={true} />
                <TextField type="password" floatingLabelText="Password" fullWidth={true} />
                <div className="u-padding-top-lg">
                    <RaisedButton primary={true} label={intl.messages['login']} fullWidth={true} />
                </div>
            </div>
        </div>
    </div>
)

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
            <div>
            {showInDialog ?
                <Dialog
                    modal={false}
                    open={true}
                    contentStyle={customContentStyle}
                    onRequestClose={this.handleClose}
                >
                    <LoginForm intl={intl} containerClasses={containerClasses} />
                </Dialog>
                :
                    <LoginForm intl={intl} containerClasses={containerClasses} />
            }
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

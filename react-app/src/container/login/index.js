import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton'
import {
    TextField
} from 'redux-form-material-ui'
import * as formValidationRules from '../../utils/form-validation'

import { actionProxy, signIn } from '../../global/actions/'

class Login extends Component {
    render() {
        const {
            intl,
            submitForm,
            showInDialog,
            formError,

            // Redux form props
            handleSubmit,
            pristine,
            submitting,
            invalid
        } = this.props

        const containerClasses = classNames({
            'pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-3': !showInDialog,
            'pure-u-1': showInDialog
        })

        return (
            <div className="pure-g u-text-align-center">
                <div className={containerClasses}>
                    <div className="u-padding-lg">
                        {formError &&
                            <p className="">{intl.messages[formError]}</p>
                        }
                        <form noValidate={true} onSubmit={handleSubmit(submitForm)}>
                            <Field component={TextField}
                                name="email" type="email"
                                floatingLabelText={intl.messages['auth.emailLabel']}
                                fullWidth={true}
                                validate={[formValidationRules.required, formValidationRules.email]}
                            />
                            <Field component={TextField}
                                name="password" type="password"
                                floatingLabelText={intl.messages['auth.passwordLabel']}
                                fullWidth={true}
                                validate={formValidationRules.required}
                            />
                            <div className="u-padding-top-lg">
                                <RaisedButton type="submit" primary={true} label={intl.messages['auth.signInButton']} disabled={pristine || submitting || invalid} fullWidth={true} />
                            </div>
                        </form>
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

const formIdentifier = 'login'

Login.defaultProps = {
    showInDialog: false
}

Login.propTypes = {
    formError: PropTypes.string,
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
    submitForm:PropTypes.func
}

const LoginForm = reduxForm({
    form: formIdentifier
})(Login);

export const mapStateToProps = (state, props) => {
    const loginError = state.app.getIn(['formErrors'])[formIdentifier]

    return {
        intl: state.intl,
        formError: loginError ? loginError : undefined
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitForm: (values) => dispatch(actionProxy({
            action: signIn,
            args: values
        }))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)

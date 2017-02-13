import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton'
import {
    TextField
} from 'redux-form-material-ui'
import * as formValidationRules from '../../utils/form-validation'

import { userSignup } from '../../global/actions/authentication'

class Register extends Component {
    render() {
        const {
            intl,
            showInDialog,
            submitForm,

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
                        <form onSubmit={submitForm}>
                            <Field component={TextField}
                                name="email" type="email"
                                floatingLabelText={intl.messages['auth.emailLabel']}
                                fullWidth={true}
                                validate={[formValidationRules.required, formValidationRules.email]}
                            />
                            <Field component={TextField}
                                name ="password" type="password"
                                floatingLabelText={intl.messages['auth.passwordLabel']}
                                fullWidth={true}
                                validate={[
                                    formValidationRules.required,
                                    formValidationRules.haveUppercase,
                                    formValidationRules.haveLowercase,
                                    formValidationRules.haveNumber,
                                    formValidationRules.haveSpecial,
                                    formValidationRules.minValue8
                                ]}
                            />
                            <Field component={TextField}
                                name="confirmPassword" type="password"
                                floatingLabelText={intl.messages['auth.confirmPasswordLabel']}
                                fullWidth={true}
                                validate={[
                                    formValidationRules.required,
                                    formValidationRules.matchField('password')
                                ]}
                            />
                            <div className="u-padding-top-lg">
                                <RaisedButton type="submit" primary={true} label={intl.messages['auth.signUpButton']} disabled={pristine || submitting || invalid} fullWidth={true} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  form submit handler
     */
    submitForm:PropTypes.func
}

const RegisterForm = reduxForm({
    form: 'register'
})(Register);

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitForm: (values) => dispatch(userSignup(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm)

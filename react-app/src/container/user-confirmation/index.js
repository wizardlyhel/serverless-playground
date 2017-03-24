import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton'
import {
    TextField
} from 'redux-form-material-ui'
import * as formValidationRules from '../../utils/form-validation'

import { signUpConfirm, resendConfirmation } from '../../global/actions/'

class UserConfirmation extends Component {
    constructor(props) {
        super(props)

        // Navigation with url from email - email and confirmation code is in link - dispatch action in mapSatetoProps
        let urlParams = {}
        window.location.search.substr(1).split('&').forEach((str) => {
            const [key, value] = str.split('=')
            urlParams[key] = decodeURIComponent(value)
        })

        if (urlParams.email && urlParams.confirmationCode) {
            this.submitForm(urlParams)
        }
    }

    componentWillMount() {

    }

    render() {
        const {
            intl,
            submitForm,
            resendConfirmationCode,
            formError,
            username,

            // Redux form props
            handleSubmit,
            pristine,
            submitting,
            invalid
        } = this.props

        return (
            <div className="pure-g u-text-align-center">
                <div className="pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-3">
                    <div className="u-padding-lg">
                        {formError &&
                            <p className="">{intl.messages[formError]}</p>
                        }
                        {(formError === 'awsError.codeExpired' || formError === 'awsError.codeMismatch') &&
                            <RaisedButton onClick={resendConfirmationCode}
                                primary={true}
                                label={intl.messages['awsError.requestConfirmationCodeButton']}
                                fullWidth={true}
                            />
                        }
                        <p>{intl.messages['auth.confirmationDescription']}</p>
                        <form noValidate={true} onSubmit={handleSubmit(submitForm)}>
                            {!username &&
                                <Field component={TextField}
                                    name="email" type="email"
                                    floatingLabelText={intl.messages['auth.emailLabel']}
                                    fullWidth={true}
                                    validate={[formValidationRules.required, formValidationRules.email]}
                                />
                            }
                            <Field component={TextField}
                                name="confirmationCode" type="phone"
                                floatingLabelText={intl.messages['auth.confirmationCode']}
                                fullWidth={true}
                                validate={formValidationRules.required}
                            />
                            <div className="u-padding-top-lg">
                                <RaisedButton type="submit" primary={true} label={intl.messages['auth.confirmationButton']} disabled={pristine || submitting || invalid} fullWidth={true} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const formIdentifier = 'userConfirmation'

UserConfirmation.defaultProps = {
    formError: undefined
}

UserConfirmation.propTypes = {
    formError: PropTypes.string,
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  form submit handler
     */
    submitForm: PropTypes.func,
    resendConfirmationCode: PropTypes.func,
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

const UserConfirmationForm = reduxForm({
    form: formIdentifier
})(UserConfirmation);

export const mapStateToProps = (state, props) => {
    const userConfirmationError = state.app.getIn(['formErrors', formIdentifier])
    return {
        intl: state.intl,
        formError: userConfirmationError ? userConfirmationError : undefined,
        username: state.app.getIn(['username'])
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitForm: (values) => dispatch(signUpConfirm(values)),
        resendConfirmationCode: () => dispatch(resendConfirmation())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConfirmationForm)

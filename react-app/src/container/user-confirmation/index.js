import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton'
import {
    TextField
} from 'redux-form-material-ui'
import * as formValidationRules from '../../utils/form-validation'

import { confirmUser } from '../../global/actions/'
import { cognitoUserStatePath } from '../../utils/state-paths';

class UserConfirmation extends Component {
    constructor(props) {
        super(props)

        this.noSavedUser = !props.cognitoUser

        // Deal with the following paths:
        //
        // Navigate from sign up - cognitoUser exists - get confirmation code only
        // Navigation with url from email - email and confirmation code is in link - dispatch action in mapSatetoProps
        // Navigation to url with neither params - display both email and confirmation field

        let urlParams = {}
        window.location.search.substr(1).split('&').forEach((str) => {
            const [key, value] = str.split('=')
            urlParams[key] = decodeURIComponent(value)
        })
        if (urlParams.email && urlParams.confirmationCode) {
            this.submitForm(urlParams)
        }
    }

    render() {
        const {
            intl,
            submitForm,
            formError,

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
                        <p>{intl.messages['auth.confirmationDescription']}</p>
                        <form noValidate={true} onSubmit={handleSubmit(submitForm)}>
                            {this.noSavedUser &&
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
    cognitoUser: PropTypes.object
}

const UserConfirmationForm = reduxForm({
    form: formIdentifier
})(UserConfirmation);

export const mapStateToProps = (state, props) => {
    const userConfirmationError = state.app.getIn(['formErrors', formIdentifier])
    return {
        intl: state.intl,
        formError: userConfirmationError ? userConfirmationError : undefined,
        cognitoUser: state.app.getIn(cognitoUserStatePath)
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitForm: (values) => dispatch(confirmUser(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConfirmationForm)

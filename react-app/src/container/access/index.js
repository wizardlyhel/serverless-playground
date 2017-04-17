import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton'
import {
    TextField
} from 'redux-form-material-ui'
import * as formValidationRules from '../../utils/form-validation'

import { guestSignIn } from '../../global/actions/app/'

class Access extends Component {
    render() {
        const {
            intl,
            submitForm,

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
                        <form noValidate={true} onSubmit={handleSubmit(submitForm)}>
                            <Field component={TextField}
                                name="email" type="email"
                                floatingLabelText={intl.messages['auth.emailLabel']}
                                fullWidth={true}
                                validate={[formValidationRules.required, formValidationRules.email]}
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

const formIdentifier = 'access'

Access.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  form submit handler
     */
    submitForm:PropTypes.func
}

const AccessForm = reduxForm({
    form: formIdentifier
})(Access);

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitForm: (values) => dispatch(guestSignIn(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccessForm)

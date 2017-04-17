import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {
    Field,
    reduxForm,
    change
} from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton'
import {
    TextField
} from 'redux-form-material-ui'
import * as formValidationRules from '../../utils/form-validation'

import { guestSignUp } from '../../global/actions/app/'

const formIdentifier = 'access'

class AccessInfo extends Component {
    constructor(props) {
        super(props)
        this.autocomplete = null
        this.addressInput = null
        this.addressInputReady = false
    }
    componentDidMount() {
        const { 
            types=['geocode'],
            componentRestrictions,
            bounds
        } = this.props;

        const config = {
            types,
            bounds,
        };

        if (componentRestrictions) {
            config.componentRestrictions = componentRestrictions;
        }

        this.addressInput = document.querySelectorAll('#addressField')[0]
        this.autocomplete = new window.google.maps.places.Autocomplete(this.addressInput, config);
        this.addressInput.setAttribute('placeholder', '')

        this.autocomplete.addListener('place_changed', this.onSelected.bind(this));
    }

    onSelected() {
        this.props.changeFieldValue('address', this.autocomplete.getPlace().formatted_address)
        this.addressInputReady = true
    }

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
                        <p>{intl.messages['auth.requestMoreInfo']}</p>
                        <form noValidate={true} onSubmit={handleSubmit(submitForm)}>
                            <Field component={TextField}
                                name="firstname" type="text"
                                floatingLabelText={intl.messages['auth.firstnameLabel']}
                                fullWidth={true}
                                validate={formValidationRules.required}
                            />
                            <Field component={TextField}
                                name="lastname" type="text"
                                floatingLabelText={intl.messages['auth.lastnameLabel']}
                                fullWidth={true}
                                validate={formValidationRules.required}
                            />
                            <Field component={TextField}
                                id="addressField"
                                name="address" type="text"
                                floatingLabelText={intl.messages['auth.addressLabel']}
                                fullWidth={true}
                            />
                            <div className="u-padding-top-lg">
                                <RaisedButton type="submit" primary={true} label={intl.messages['auth.confirmationButton']} disabled={pristine || submitting || invalid || this.addressInputReady} fullWidth={true} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AccessInfo.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    /**
     *  form submit handler
     */
    submitForm:PropTypes.func
}

const AccessInfoForm = reduxForm({
    form: formIdentifier
})(AccessInfo);

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        submitForm: (values) => dispatch(guestSignUp(values)),
        changeFieldValue: function(field, value) {
            dispatch(change(formIdentifier, field, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccessInfoForm)

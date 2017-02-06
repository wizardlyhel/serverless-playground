import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
    width: '90%',
    maxWidth: '400px'
};

class Login extends Component {
    render() {
        const {
            intl
        } = this.props

        return (
            <Dialog
                modal={false}
                open={true}
                contentStyle={customContentStyle}
                onRequestClose={this.handleClose}
            >
                <div className="pure-g u-text-align-center">
                    <div className="pure-u-1">
                        <h2>Aventine</h2>
                        <TextField type="email" floatingLabelText="Email" fullWidth={true} />
                        <TextField type="password" floatingLabelText="Password" fullWidth={true} />
                        <div className="u-padding-top-lg">
                            <RaisedButton primary={true} label={intl.messages['login']} fullWidth={true} />
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

Login.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export default connect(
    mapStateToProps
)(Login)

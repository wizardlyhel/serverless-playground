import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import Dialog from 'material-ui/Dialog'

const customContentStyle = {
    width: '90%',
    maxWidth: '400px'
}

class Login extends Component {
    render() {
        const {
            children,
            isModal,
            isOpen
        } = this.props

        return (
            <Dialog
                modal={false}
                open={true}
                contentStyle={customContentStyle}
                onRequestClose={this.handleClose}
            >
                {children}
            </Dialog>
        )
    }
}

Login.defaultProps = {
    isModal: false,
    isOpen: true
}

Login.propTypes = {
    children: PropTypes.node,
    intl: PropTypes.object,
    isModal: PropTypes.bool,
    isOpen: PropTypes.bool
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export default connect(
    mapStateToProps
)(Login)

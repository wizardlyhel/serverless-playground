import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import Dialog from 'material-ui/Dialog'

const customContentStyle = {
    width: '90%',
    maxWidth: '400px'
}

class Modal extends Component {
    render() {
        const {
            children,
            isModal,
            isOpen,
            handleClose,
            actions
        } = this.props

        return (
            <Dialog
                modal={isModal}
                open={isOpen}
                contentStyle={customContentStyle}
                onRequestClose={handleClose}
                actions={actions}
            >
                {children}
            </Dialog>
        )
    }
}

Modal.defaultProps = {
    isModal: false,
    isOpen: true
}

Modal.propTypes = {
    children: PropTypes.node,
    intl: PropTypes.object,
    isModal: PropTypes.bool,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    actions: PropTypes.object
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export default connect(
    mapStateToProps
)(Modal)

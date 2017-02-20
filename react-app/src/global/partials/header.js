import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { actionProxy, signOut } from '../../global/actions/'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleTitleClick = () => {
        browserHistory.push('/')
    }

    handleToggle = () => this.setState({open: !this.state.open})

    handleSignOut = () => {
        this.setState({open: false})
        this.props.signOut()
    }

    render() {
        const {
            intl,
            authenticated
        } = this.props

        return (
            <div className="header">
                <AppBar
                    title={intl.messages['companyName']}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                    onTitleTouchTap={this.handleTitleClick}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem>About</MenuItem>
                    {authenticated &&
                        <MenuItem onTouchTap={this.handleSignOut}>{intl.messages['menu.signout']}</MenuItem>
                    }
                </Drawer>
            </div>
        )
    }
}

Header.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    authenticated: PropTypes.bool
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl,
        authenticated: state.app.getIn(['authenticated'])
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        signOut: () => dispatch(actionProxy({action: signOut}))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

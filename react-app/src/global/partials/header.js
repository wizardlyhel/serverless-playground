import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { setDrawerState, signOut } from '../../global/actions/'

class Header extends Component {
    handleTitleClick = () => {
        browserHistory.push('/')
    }

    handleToggle = () => {
        this.props.setDrawerState(!this.props.drawerIsOpen)
    }

    handleNavigation = (url) => {
        browserHistory.push(url)
    }

    handleSignOut = () => {
        this.props.signOut()
        this.props.setDrawerState(false)
    }

    render() {
        const {
            intl,
            authenticated,
            drawerIsOpen
        } = this.props

        return (
            <div className="header">
                <AppBar
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                    onTitleTouchTap={this.handleTitleClick}
                    className="logo"
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={drawerIsOpen}
                    onRequestChange={this.handleToggle}
                >
                    <MenuItem>About</MenuItem>
                    {authenticated ?
                        <MenuItem onTouchTap={this.handleSignOut}>{intl.messages['menu.signout']}</MenuItem>
                        :
                        <MenuItem onTouchTap={this.handleNavigation.bind(this, '/login')}>{intl.messages['menu.signin']}</MenuItem>
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
    authenticated: PropTypes.bool,
    drawerIsOpen: PropTypes.bool
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl,
        authenticated: state.app.getIn(['authenticated']),
        drawerIsOpen: state.app.getIn(['drawerIsOpen'])
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        signOut: () => dispatch(signOut()),
        setDrawerState: (isOpen) => dispatch(setDrawerState(isOpen))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

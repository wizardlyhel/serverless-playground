import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import './style/stylesheet.scss';

import Home from '../container/home';
import Login from '../components/login';
import Register from '../container/register';

import {login, loginV2, loginV3, loginForm} from './actions/';

class App extends Component {
    componentDidMount() {

    }

    render() {
        const {
            authenticated
        } = this.props

        return (
            <div>
                <p>header</p>
                
                <Router history={browserHistory}>
                    {authenticated ?
                        <Route path="/" component={Home} />
                    :
                        <Route path="/" component={Login} />
                    }
                        <Route path="/register" component={Register} />
                </Router>

                <p>footer</p>
            </div>
        );
    }
}

App.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    authenticated: PropTypes.bool
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl,
        authenticated: state.app.authenticated
    }
}

// export const mapDispatchToProps = (dispatch, props) => {
//     return {
//     }
// }

export default connect(
    mapStateToProps
)(App)

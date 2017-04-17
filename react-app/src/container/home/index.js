import React, { Component } from 'react';
import {connect} from 'react-redux'

import { fetchResource } from '../../global/actions/resource/'

class Home extends Component {
    componentDidMount() {
        this.props.fetchPage('index.html')
    }

    render() {
        return (
        	<div>
	            <p>Aventine is a financial services business that builds connections across international frontiers and creates exciting opportunities for its investors.</p>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPage: (path) => dispatch(fetchResource(path))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'

import { fetchResource } from '../../global/actions/resource/'

class Home extends Component {
    componentDidMount() {
        if (this.props.authenticated) {
            this.props.fetchPage('index.html')
        }
    }

    componentWillReceiveProps(nextProps) {
        // Navigate to root when authenticated
        if (this.props.authenticated !== nextProps.authenticated && nextProps.authenticated) {
            this.props.fetchPage('index.html')
        }
    }

    createMarkup(content) {
        return {
            __html: content
        }
    }

    render() {
        const {
            pageContent
        } = this.props
        return (
            <div>
            { !pageContent && 
                <p>Aventine is a financial services business that builds connections across international frontiers and creates exciting opportunities for its investors.</p>
            }
            { pageContent &&
                <div dangerouslySetInnerHTML={this.createMarkup(pageContent)} />
            }
            </div>
        );
    }
}

Home.propTypes = {
    /**
     * react-intl
     */
    intl: PropTypes.object.isRequired,
    pageContent: PropTypes.string,
    /**
     *  Resource fetch function
     */
    fetchPage: PropTypes.func
}

export const mapStateToProps = (state, props) => {
    return {
        intl: state.intl,
        pageContent: state.resource.getIn(['index.html']),
        authenticated: state.app.getIn(['authenticated'])
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

import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'

import { fetchResource, updateResource } from '../../global/actions/resource/'


let s3Html = null

const getPath = () => {
    return location.pathname !== '/' ? location.pathname : 'index.html'
}

const disableSrc = (html) => {
    return html.replace(/\ssrc/g, ' x-src')
}

class Home extends Component {
    componentDidMount() {
        if (this.props.authenticated) {
            this.props.fetchPage(getPath())
        }
    }

    componentWillReceiveProps(nextProps) {
        // Navigate to root when authenticated
        if (this.props.authenticated !== nextProps.authenticated && nextProps.authenticated) {
            this.props.fetchPage(getPath())
        }
    }

    componentDidUpdate() {
        this.props.updatePage(getPath(), s3Html)
    }

    createMarkup(content) {
        return {__html: disableSrc(content)}
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
                <div ref={(html) => {s3Html = html}} dangerouslySetInnerHTML={this.createMarkup(pageContent)} />
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
        pageContent: state.resource.getIn([getPath()]),
        authenticated: state.app.getIn(['authenticated'])
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPage: (path) => dispatch(fetchResource(path)),
        updatePage: (url, page) => dispatch(updateResource(url, page))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

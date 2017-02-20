import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

class Footer extends Component {
    render() {
        const {
            intl
        } = this.props

        return (
            <div className="footer pure-g u-text-align-center u-padding-lg">
                <p>{intl.messages['footer.copyrights']}</p>
            </div>
        )
    }
}

Footer.propTypes = {
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
)(Footer)

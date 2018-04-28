import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
    // constructor (props) {
    //     super(props);
    // }
    render () {
        return (
            <div className="Display">
                {this.props.value}
            </div>
        );
    }
}

Display.propTypes = {
    value: PropTypes.string,
};

Display.defaultProps = {
    value: '0',
};

export default Display;

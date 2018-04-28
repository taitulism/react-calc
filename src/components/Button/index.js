import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render () {
        const classes = ["Button", this.props.className].join(' ');
        
        return (
            <button className={classes}>
                {this.props.text}
            </button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (ev) {
        ev.preventDefault();

        this.props.clickHandler(this.props.text);
    }

    render () {
        const classes = ["Button", this.props.className].join(' ');

        return (
            <button className={classes} onClick={this.handleClick}>
                {this.props.text}
            </button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};

export default Button;

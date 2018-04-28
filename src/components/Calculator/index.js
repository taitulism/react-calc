import React, { Component } from 'react';
import Display from '../Display';
import './Calculator.css';

class Calculator extends Component {
    render() {
        return (
            <div className="Calculator">
                <Display />
            </div>
        );
    }
}

export default Calculator;

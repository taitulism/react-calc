import React, { Component } from 'react';
import Display from '../Display';
import Button from '../Button';
import './Calculator.css';

class Calculator extends Component {
    render() {
        return (
            <div className="Calculator">
                <Display />
                <div className="calc-section numbers-container">
                    <div className="numbers-row">
                        <Button className="digit" text="7" />
                        <Button className="digit" text="8" />
                        <Button className="digit" text="9" />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="4" />
                        <Button className="digit" text="5" />
                        <Button className="digit" text="6" />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="1" />
                        <Button className="digit" text="2" />
                        <Button className="digit" text="3" />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="0" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;

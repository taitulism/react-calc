import React, { Component } from 'react';
import Display from '../Display';
import Button from '../Button';
import './Calculator.css';

function noop () {}

class Calculator extends Component {
    render() {
        return (
            <div className="Calculator">
                <Display />
                <div className="calc-section numbers-container">
                    <div className="numbers-row">
                        <Button className="digit" text="7" clickHandler={noop} />
                        <Button className="digit" text="8" clickHandler={noop} />
                        <Button className="digit" text="9" clickHandler={noop} />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="4" clickHandler={noop} />
                        <Button className="digit" text="5" clickHandler={noop} />
                        <Button className="digit" text="6" clickHandler={noop} />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="1" clickHandler={noop} />
                        <Button className="digit" text="2" clickHandler={noop} />
                        <Button className="digit" text="3" clickHandler={noop} />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="0" clickHandler={noop} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;

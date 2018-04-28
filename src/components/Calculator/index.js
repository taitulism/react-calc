import React, { Component } from 'react';
import Display from '../Display';
import Button from '../Button';
import './Calculator.css';

class Calculator extends Component {
    constructor (props) {
        super(props);

        this.state = {
            firstNum: '',
        };

        this.handleNumberInput = this.handleNumberInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleNumberInput (num) {
        const {firstNum} = this.state;

        if (num === '0' && !firstNum) {
            return;
        }
        
        if (firstNum.length >= Calculator.maxDigits) {
            return;
        }

        this.setState({firstNum: firstNum + num});
    }

    handleKeyPress (ev) {
        const key = ev.key;

        if (key < 0 || key > 9) {
            return;
        }

        this.handleNumberInput(key);
    }

    render() {
        const display = this.state.firstNum || '0';

        return (
            <div className="Calculator" onKeyPress={this.handleKeyPress}>
                <Display value={display}/>

                <div className="calc-section numbers-container">
                    <div className="numbers-row">
                        <Button className="digit" text="7" clickHandler={this.handleNumberInput} />
                        <Button className="digit" text="8" clickHandler={this.handleNumberInput} />
                        <Button className="digit" text="9" clickHandler={this.handleNumberInput} />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="4" clickHandler={this.handleNumberInput} />
                        <Button className="digit" text="5" clickHandler={this.handleNumberInput} />
                        <Button className="digit" text="6" clickHandler={this.handleNumberInput} />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="1" clickHandler={this.handleNumberInput} />
                        <Button className="digit" text="2" clickHandler={this.handleNumberInput} />
                        <Button className="digit" text="3" clickHandler={this.handleNumberInput} />
                    </div>
                    <div className="numbers-row">
                        <Button className="digit" text="0" clickHandler={this.handleNumberInput} />
                    </div>
                </div>
            </div>
        );
    }
}

Calculator.maxDigits = 10;

export default Calculator;

import React, { Component } from 'react';
import Display from '../Display';
import Button from '../Button';
import './Calculator.css';

class Calculator extends Component {
    constructor (props) {
        super(props);

        this.state = {
            firstNum: '',
            operation: '',
            secondNum: '',
            result: '',
        };

        this.handleNumberInput = this.handleNumberInput.bind(this);
        this.handleKeyPress    = this.handleKeyPress.bind(this);
        this.handleOperation   = this.handleOperation.bind(this);
        this.calculate         = this.calculate.bind(this);
    }

    handleNumberInput (num) {
        const {firstNum, operation, secondNum} = this.state;

        const currentNumber = (!operation) ? firstNum : secondNum;

        if (num === '0' && !currentNumber) {
            return;
        }
        
        if (currentNumber.length >= Calculator.MAX_DIGITS) {
            return;
        }

        const newNumber = currentNumber + num;

        if (!this.state.operation) {
            this.setState({
                firstNum: newNumber,
                result: '',
            });
        }
        else {
            this.setState({
                secondNum: newNumber,
                result: '',
            });
        }
    }

    handleKeyPress (ev) {
        const key = ev.key;
        
        if (Calculator.BASIC_OPS.includes(key)) {
            this.handleOperation(key);
            return;
        }

        if (isNotANumber(key) || (key < 0 || key > 9)) {
            return;
        }
        this.handleNumberInput(key);
    }

    handleOperation (op) {
        this.setState({
            operation: op,
        });
    }

    calculate () {
        const {firstNum, operation, secondNum} = this.state;
        
        return fetch(`${Calculator.SERVER_URL}/${operation}/${firstNum}/${secondNum}`).then((response) => {
            if (response.ok) {
                return response.text();
            } 
            else {
                this.setState({
                    firstNum: '',
                    operation: '',
                    secondNum: '',
                    result: 'ERR'
                });
                
                console.log(response.statusText);
            }
        })
        .then((res) => {
            this.setState({
                firstNum: '',
                operation: '',
                secondNum: '',
                result: res
            });            
        })
        .catch((err) => {
            throw new Error(err);
        });
    }

    getDisplayValue () {
        const {firstNum, operation, secondNum, result} = this.state;

        if (result) {
            return result;
        }

        const display = firstNum + operation + secondNum;

        if (display === '') {
            return '0';
        }

        return display;
    }

    render() {
        const display = this.getDisplayValue();

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

                <div className="calc-section">
                    <Button className="operation" text="+" clickHandler={this.handleOperation}/>
                    <Button className="operation" text="-" clickHandler={this.handleOperation}/>
                    <Button className="operation" text="*" clickHandler={this.handleOperation}/>
                    <Button className="operation" text="/" clickHandler={this.handleOperation}/>
                </div>

                <div className="calc-section">
                    <Button className="calculate" text="=" clickHandler={this.calculate}/>
                </div>
            </div>
        );
    }
}

Calculator.MAX_DIGITS = 10;
Calculator.BASIC_OPS  = ['+', '-', '*', '/'];
Calculator.SERVER_URL = 'http://localhost:3001';

function isNotANumber (str) {
    const num = parseInt(str, 10);

    return Number.isNaN(num);    
}

export default Calculator;

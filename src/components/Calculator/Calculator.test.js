import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Calculator from './';

it('renders without crashing', () => {
	shallow(<Calculator />);
});

it('has a display', () => {
	const calc = render(<Calculator />);
	const Display = calc.find('.Display');

	expect(Display.length).toEqual(1);
});

it('has a numpad section with 10 buttons (0-9)', () => {
	const calc = render(<Calculator />);
	const Digits = calc.find('.Button.digit');

	expect(Digits.length).toEqual(10);
});

it('displays the digit you click', () => {
	const calc = mount(<Calculator />);

	// first button (top left) is the digit 7
	const sevenBtn = calc.find('.Button.digit').first();

	sevenBtn.simulate('click');

	const display = calc.find('.Display').at(0);

	expect(display.text()).toEqual('7');
});

it('displays a multi-digit number as you click', () => {
	const calc = mount(<Calculator />);

	// first button (top left) is the digit 7
	const sevenBtn = calc.find('.Button.digit').first();

	// last button is the digit 0
	const zeroBtn = calc.find('.Button.digit').last();

	sevenBtn.simulate('click');
	zeroBtn.simulate('click');

	const display = calc.find('.Display').at(0);

	expect(display.text()).toEqual('70');
});

it('ignores zero as first digit', () => {
	const calc = mount(<Calculator />);

	const sevenBtn = calc.find('.Button.digit').first();
	const zeroBtn  = calc.find('.Button.digit').last();

	zeroBtn.simulate('click');  // 0
	sevenBtn.simulate('click'); // 7
	zeroBtn.simulate('click');  // 0

	const display = calc.find('.Display').at(0);

	expect(display.text()).toEqual('70');
});

function runNTimes (times, fn) {
	for (let index = 0; index < times; index++) {
		fn();
	}
}

it('limits the number to 10 digits', () => {
	const calc = mount(<Calculator />);

	const sevenBtn = calc.find('.Button.digit').first();

	runNTimes(12, () => {
		// runs 12 times
		sevenBtn.simulate('click');
	});

	const display = calc.find('.Display').at(0);

	expect(display.text().length).toEqual(10);
});

it('supports keyboard numpad usage', () => {
	const calc = mount(<Calculator />);

	calc.simulate('keyPress', {
		key: '2',
		which: 50,
	});
	calc.simulate('keyPress', {
		key: '8',
		which: 56,
	});

	const display = calc.find('.Display').at(0);

	expect(display.text()).toEqual('28');
});

it('has 4 basic math operations (+, -, *, /)', () => {
	const calc = mount(<Calculator />);
	const ops = calc.find('.Button.operation');

	expect(ops.length).toEqual(4);

	const plusBtn   = calc.find('.Button.operation').at(0);
	const minusBtn  = calc.find('.Button.operation').at(1);
	const multiBtn  = calc.find('.Button.operation').at(2);
	const divideBtn = calc.find('.Button.operation').at(3);

	expect(plusBtn.text()).toEqual('+');
	expect(minusBtn.text()).toEqual('-');
	expect(multiBtn.text()).toEqual('*');
	expect(divideBtn.text()).toEqual('/');
});

it('displays the full calculation', () => {
	const calc = mount(<Calculator />);

	calc.setState({
		firstNum: '24',
		operation: '+',
		secondNum: '35',
	});

	const display = calc.find('.Display').at(0);

	expect(display.text()).toEqual('24+35');
});

it('has an "equal" button (=)', () => {
	const calc = render(<Calculator />);

	const equalBtn = calc.find('.Button.calculate');

	expect(equalBtn.length).toEqual(1);
});

const TEST_STRING = 'testing';

it('sends calculations to the server and displays the result', (done) => {
	// put original "fetch" aside to use a fetch-mock
	const _fetch = global.fetch;
	
	global.fetch = jest.fn().mockImplementation(() => {
		return new Promise((resolve, reject) => {
			resolve({
				ok: true,
				text: function () {
					return TEST_STRING;
				}
			});
		});
	});
	
	const calc = mount(<Calculator />);
	
	// numbers and operation don't matter (using a static mock)
	calc.setState({
		firstNum: '4',
		operation: '+',
		secondNum: '5',
	});
	
	const equalBtn = calc.find('.Button.calculate').at(0);
	equalBtn.simulate('click');
	
	setTimeout(() => {
		// restore original fetch
		global.fetch = _fetch;
		
		expect(calc.state('result')).toEqual(TEST_STRING);
		done();
	}, 1);
});

it('can be extended with more math operations', () => {
	const newMathOperation = {
		name: 'power',
		sign: '^',
	};

	const calc = mount(<Calculator mathOps={[newMathOperation]} />);
	const ops = calc.find('.Button.operation');

	expect(ops.length).toEqual(5); // 4 basic ops + 1
});
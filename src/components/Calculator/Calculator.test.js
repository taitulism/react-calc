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

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

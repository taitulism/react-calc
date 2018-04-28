import React from 'react';
import { shallow, render } from 'enzyme';
import Calculator from './';

it('renders without crashing', () => {
	shallow(<Calculator />);
});

it('has a display', () => {
	const calc = render(<Calculator />);
	const Display = calc.find('.Display');

	expect(Display.length).toEqual(1);
});

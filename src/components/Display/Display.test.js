import React from 'react';
import { shallow } from 'enzyme';
import Display from './';

const TEST_STRING = 'testing';

it('renders without crashing', () => {
	shallow(<Display />);
});

it('displays a string value', () => {
	const display = shallow(<Display value={TEST_STRING} />);

	expect(display.text()).toEqual(TEST_STRING);
});

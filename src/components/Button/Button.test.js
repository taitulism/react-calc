import React from 'react';
import { shallow } from 'enzyme';
import Button from './';

const TEST_STRING = 'testing';

it('renders without crashing', () => {
	shallow(<Button text="-" />);
});

it('uses a "text" prop as its label', () => {
	const button = shallow(<Button text={TEST_STRING} />);

	expect(button.text()).toEqual(TEST_STRING);
});

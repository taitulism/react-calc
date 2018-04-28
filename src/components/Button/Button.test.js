import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './';

function noop () {}

const TEST_STRING = 'testing';

it('renders without crashing', () => {
	shallow(<Button text="-" clickHandler={noop} />);
});

it('uses a "text" prop as its label', () => {
	const button = shallow(<Button text={TEST_STRING} clickHandler={noop} />);

	expect(button.text()).toEqual(TEST_STRING);
});

it('calls its "clickHandler" prop-method when clicked', () => {
	const spy = jest.fn();
	const myButton = mount(<Button text="-" clickHandler={spy} />);
	const button = myButton.find('button');
	  
	button.simulate('click');
	expect(spy).toBeCalled();
});
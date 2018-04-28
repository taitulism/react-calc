import React from 'react';
import { shallow } from 'enzyme';
import Display from './';

it('renders without crashing', () => {
	shallow(<Display />);
});

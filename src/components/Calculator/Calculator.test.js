import React from 'react';
import { shallow } from 'enzyme';
import Calculator from './';

it('renders without crashing', () => {
	shallow(<Calculator />);
});

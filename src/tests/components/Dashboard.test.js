import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/Dashboard';

test('should correctly render Dashboard', () => {
  let wrapper = shallow(<Dashboard />);
  expect(wrapper).toMatchSnapshot();
});
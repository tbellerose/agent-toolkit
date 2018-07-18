import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/Dashboard';
import user from '../fixtures/user';

test('should correctly render Dashboard', () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper).toMatchSnapshot();
  wrapper.setState(() => ({ userinfo: user }));
  expect(wrapper).toMatchSnapshot();
});

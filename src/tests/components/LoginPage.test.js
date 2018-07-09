import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should correctly render LoginPage', () => {
  let wrapper = shallow(<LoginPage />);
  wrapper.setState(() => ({
    authenticated: false
  }));
  expect(wrapper).toMatchSnapshot();
});
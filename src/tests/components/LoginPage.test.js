import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let wrapper, auth;

beforeEach(() => {
  auth = {
    isAuthenticated: jest.fn(),
    login: jest.fn()
  };
  wrapper = shallow(<LoginPage auth={auth} />);
  wrapper.instance().checkAuthentication = jest.fn();
  wrapper.setState(() => ({
    authenticated: false
  }));
});

test('should correctly render LoginPage', () => {
  expect(wrapper).toMatchSnapshot();
  expect(auth.isAuthenticated).toHaveBeenCalled();
  expect(wrapper.instance().checkAuthentication).toHaveBeenCalled();
});

test('should call login', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(auth.login).toHaveBeenCalled();
});
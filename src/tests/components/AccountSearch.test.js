import React from 'react';
import { shallow } from 'enzyme';
import { AccountSearch } from '../../components/AccountSearch';
import { prependOnceListener } from 'cluster';

let wrapper, setToken, clearToken, authToken;

beforeEach(() => {
  setToken = jest.fn();
  clearToken = jest.fn();
  authToken = 'abc123'
  wrapper = shallow(<AccountSearch setToken={setToken} clearToken={clearToken} />)
});

test('should correctly render AccountSearch', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set authToken on input change', () => {
  let value = 'abc123';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('authToken')).toBe(value);
});

test('should not call setToken if input is empty', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('error')).toEqual(expect.any(String));
  expect(setToken).not.toHaveBeenCalled();
});

test('should call setToken if input is valid', () => {
  wrapper.setState({ authToken });
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('error')).toBe('');
  expect(setToken).toHaveBeenCalledWith(authToken);
});

test('should call clearToken', () => {
  wrapper.setState({ authToken });
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('authToken')).toBe('');
  expect(clearToken).toHaveBeenCalled();
});
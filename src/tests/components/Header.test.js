import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import user from '../fixtures/user';

let wrapper, auth, clearUser;

beforeEach(() => {
  auth = {
    logout: jest.fn(),
    isAuthenticated: jest.fn(),
  };
  clearUser = jest.fn();
  wrapper = shallow(<Header auth={auth} user={user} clearUser={clearUser} />);
});

test('should correctly render Header', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should update showMenu', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('showMenu')).toBe(true);
});

test('should call auth.logout and clearUser', async () => {
  await wrapper.instance().logout();
  expect(auth.logout).toHaveBeenCalled();
  expect(clearUser).toHaveBeenCalled();
});
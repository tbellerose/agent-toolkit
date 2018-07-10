import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper, auth, userinfo;

beforeEach(() => {
  auth = {
    logout: jest.fn(),
    isAuthenticated: jest.fn(),
  };
  userinfo = {
    name: 'Test User'
  }
  wrapper = shallow(<Header auth={auth} />);
  wrapper.setState(() => ({ authenticated: true, userinfo }))
});

test('should correctly render Header', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should update showMenu', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('showMenu')).toBe(true);
});

test('should call auth.logout', async () => {
  await wrapper.instance().logout();
  expect(auth.logout).toHaveBeenCalled();
});
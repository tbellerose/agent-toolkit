import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import user from '../fixtures/user';

let wrapper, props;

beforeEach(() => {
  props = {
    auth: {
      logout: jest.fn(),
      isAuthenticated: jest.fn()
    },
    clearUser: jest.fn(),
    clearToken: jest.fn(),
    clearSites: jest.fn(),
    user: user
  }
  wrapper = shallow(<Header {...props} />);
});

test('should correctly render Header', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should update showMenu', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('showMenu')).toBe(true);
});

test('should call auth.logout and clean store', async () => {
  await wrapper.instance().logout();
  expect(props.auth.logout).toHaveBeenCalled();
  expect(props.clearUser).toHaveBeenCalled();
  expect(props.clearToken).toHaveBeenCalled();
  expect(props.clearSites).toHaveBeenCalled();
});
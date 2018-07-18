import React from 'react';
import { shallow } from 'enzyme';
import 'isomorphic-fetch';
import { ManageSite } from '../../components/ManageSite';
import sites from '../fixtures/sites';

let wrapper, match;

beforeEach(() => {
  match = {
    params: {
      siteId: sites[0].id
    }
  };
  wrapper = shallow(<ManageSite match={ match } />);
  wrapper.setState(() => ({
    site: sites[0]
  }));
});

test('should correctly render ManageSite with general card', () => {
  wrapper.setState(() => ({
    activeItem: 'general'
  }));
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ManageSite with database card', () => {
  wrapper.setState(() => ({
    activeItem: 'database'
  }));
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ManageSite with connection card', () => {
  wrapper.setState(() => ({
    activeItem: 'ssh/sftp'
  }));
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ManageSite with error', () => {
  wrapper.setState(() => ({
    error: 'test error'
  }));
  expect(wrapper).toMatchSnapshot();
});

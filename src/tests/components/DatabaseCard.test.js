import React from 'react';
import { shallow } from 'enzyme';
import { DatabaseCard } from '../../components/DatabaseCard';
import sites from '../fixtures/sites';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<DatabaseCard site={sites[0]} />);
  wrapper.setState(() => ({
    name: 'test',
    fqdn: '123.45.678.90',
    port: '1111',
    adminUsername: 'testuser',
    adminPassword: '@test123',
    ready: true
  }));
});

test('should correctly render DatabaseCard', () => {
  expect(wrapper).toMatchSnapshot();
});
import React from 'react';
import { shallow } from 'enzyme'
import { ConnectionCard } from '../../components/ConnectionCard';
import sites from '../fixtures/sites';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ConnectionCard site={sites[0]} />);
  wrapper.setState(() => ({
    connectionInfo: {
      hostname: 'test',
      port: 1234,
      status: 'Active',
      users: [{ username: 'Test User' }],
      error: ''
    },
    ready: true
  }));
});

test('should correctly render ConnectionCard', () => {
  expect(wrapper).toMatchSnapshot();
});
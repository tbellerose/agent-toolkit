import React from 'react';
import { shallow } from 'enzyme'
import { ConnectionCard } from '../../components/ConnectionCard';
import sites from '../fixtures/sites';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ConnectionCard site={sites[0]} />);
  wrapper.setState(() => ({
    hostname: 'test',
    port: 1234,
    status: 'Active'
  }));
});

test('should correctly render ConnectionCard', () => {
  expect(wrapper).toMatchSnapshot();
});
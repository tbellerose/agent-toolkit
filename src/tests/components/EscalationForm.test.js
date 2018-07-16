import React from 'react';
import { shallow } from 'enzyme';
import { EscalationForm } from '../../components/EscalationForm';
import sites, { siteChecks } from '../fixtures/sites';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<EscalationForm site={sites[0]} />);
});

test('should correctly render EscalationForm before submitted', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render EscalationForm after submitted', () => {
  wrapper.setState(() => ({
    details: 'test',
    submitted: true,
    siteChecks: siteChecks
  }));
  expect(wrapper).toMatchSnapshot();
});

test('should set details on input change', () => {
  const value = 'Test 123';
  wrapper.find('textarea').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('details')).toBe(value);
});

test('should set submitted to true with details', () => {
  const value = 'test 123';
  wrapper.setState(() => ({
    details: value
  }));
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  });
  expect(wrapper.state('submitted')).toBe(true);
});

test('should not set sumbitted with no details', () => {
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  });
  expect(wrapper.state('submitted')).toBe(false);
});
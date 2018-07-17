import React from 'react';
import { shallow } from 'enzyme';
import sites, { siteChecks } from '../fixtures/sites'
import { GeneralCard } from '../../components/GeneralCard';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<GeneralCard site={sites[0]} />)
  wrapper.instance.handleSiteChecks = () => {
    wrapper.setState(() => ({
      siteChecks
    }));
  };
});

test('should correctly render GeneralCard', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render site checks', () => {
  wrapper.instance.handleSiteChecks();
  expect(wrapper.state('siteChecks')).toEqual(siteChecks);
  expect(wrapper).toMatchSnapshot();
});

test('should set modalIsOpen to true', () => {
  wrapper.find('button').at(3).simulate('click');
  expect(wrapper.state('modalIsOpen')).toBe(true);
});

test('should set modalIsOpen to false', () => {
  wrapper.instance().handleCloseModal();
  expect(wrapper.state('modalIsOpen')).toBe(false);
})
import React from 'react';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import sites, { siteChecks } from '../fixtures/sites';
import { GeneralCard } from '../../components/GeneralCard';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<GeneralCard site={ sites[0] } />);
  wrapper.instance.handleSiteChecks = () => {
    wrapper.setState(() => ({
      siteChecks
    }));
  };
  wrapper.instance.handleFlushCache = () => {
    wrapper.setState(() => ({
      displayMessageModal: true,
      messageModalText: 'Test'
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

test('should set displayEscalationModal to true', () => {
  wrapper.find('button').at(3).simulate('click');
  expect(wrapper.state('displayEscalationModal')).toBe(true);
});

test('should set displayEscalationModal to false', () => {
  wrapper.instance().handleCloseEscalationModal();
  expect(wrapper.state('displayEscalationModal')).toBe(false);
});

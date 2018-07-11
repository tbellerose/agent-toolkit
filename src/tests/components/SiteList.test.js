import React from 'react';
import { shallow } from 'enzyme';
import { SiteList } from '../../components/SiteList';
import sites from '../fixtures/sites';

test('should correctly render SiteList with no sites', () => {
  const wrapper = shallow(<SiteList sites={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render SiteList with sites', () => {
  const wrapper = shallow(<SiteList sites={sites} />);
  expect(wrapper).toMatchSnapshot();
});
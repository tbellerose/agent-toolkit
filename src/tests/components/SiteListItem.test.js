import React from 'react';
import { shallow } from 'enzyme';
import sites from '../fixtures/sites';
import { SiteListItem } from '../../components/SiteListItem';

test('should correctly render SiteListItem', () => {
  const wrapper = shallow(<SiteListItem {...sites[0]} />);
  expect(wrapper).toMatchSnapshot();
});
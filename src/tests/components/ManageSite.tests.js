import React from 'react';
import { shallow } from 'enzyme';
import { ManageSite } from '../../components/ManageSite';
import sites from '../fixtures/sites'

test('should correctly render ManageSite', () => {
  const match = {
    params: {
      siteId: sites[0].id
    }
  };
  const wrapper = shallow(<ManageSite match={match} />);
  expect(wrapper).toMatchSnapshot();
});
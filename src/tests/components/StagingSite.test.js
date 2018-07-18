import React from 'react';
import { shallow } from 'enzyme';
import { StagingSite } from '../../components/StagingSite';
import sites from '../fixtures/sites';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<StagingSite site={ sites[0] } />);
  wrapper.setState(() => ({
    stagingSite: sites[0],
    error: '',
    ready: true
  }));
});

test('should correctly render StagingSite', () => {
  expect(wrapper).toMatchSnapshot();
});

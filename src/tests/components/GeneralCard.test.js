import React from 'react';
import { shallow } from 'enzyme';
import sites from '../fixtures/sites'
import GeneralCard from '../../components/GeneralCard';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<GeneralCard site={sites[0]} />)
});

test('should correctly render GeneralCard', () => {
  expect(wrapper).toMatchSnapshot();
});
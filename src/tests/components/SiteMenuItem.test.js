import React from 'react';
import { shallow } from 'enzyme';
import { SiteMenuItem } from '../../components/SiteMenuItem';

let wrapper, props;

beforeEach(() => {
  props = {
    active: true,
    children: ['test'],
    onClick: jest.fn()
  };
  wrapper = shallow(<SiteMenuItem { ...props } />);
});

test('should correctly render SiteMenuItem', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handleClick', () => {
  wrapper.find('a').at(0).simulate('click');
  expect(props.onClick).toHaveBeenCalled();
});

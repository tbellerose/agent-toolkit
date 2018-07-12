import React from 'react';
import { shallow } from 'enzyme';
import { SiteMenu } from '../../components/SiteMenu';

let wrapper, handleItemClick;

beforeEach(() => {
  handleItemClick = jest.fn(undefined, { name: 'test' });
  wrapper = shallow(<SiteMenu handleItemClick={handleItemClick} />)
});

test('should correctly render SiteMenu', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set activeItem', async () => {
  const name = "test";
  await wrapper.instance().handleItemClick(undefined, { name });
  expect(wrapper.state('activeItem')).toBe(name);
  expect(handleItemClick).toHaveBeenCalledWith(name);
});
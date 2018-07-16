import React from 'react';
import { shallow } from 'enzyme';
import { EscalationModal } from '../../components/EscalationModal';

test('should correctly render EscalationModal', () => {
  const wrapper = shallow(<EscalationModal modalIsOpen={true} handleCloseModal={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});
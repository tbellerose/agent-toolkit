import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CertificateCard } from '../../components/CertificateCard';
import sites from '../fixtures/sites';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<CertificateCard site={sites[0]} />);
  wrapper.setState(() => ({
    domain: 'test.com',
    status: 'Active',
    expireDate: moment(0),
    error: ''
  }));
});

test('should correctly render CertificateCard', () => {
  expect(wrapper).toMatchSnapshot();
});
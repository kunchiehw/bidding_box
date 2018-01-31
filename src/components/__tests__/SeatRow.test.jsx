import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SeatRow from '../SeatRow';
import { VULNERABILITIES } from '../../utils/constants';

describe('SeatRow render', () => {
  VULNERABILITIES.forEach((vul) => {
    it(`vulnerability: ${vul}`, () => {
      const seatRow = shallow(<SeatRow
        vulnerability={vul}
      />);
      expect(toJson(seatRow)).toMatchSnapshot();
    });
  });
});

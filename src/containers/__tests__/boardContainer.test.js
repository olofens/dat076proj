import React from 'react';
import { shallow } from 'enzyme';
import boardContainer from '../boardContainer.jsx';


describe('boardContainer', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<boardContainer debug />);
  
    expect(component).toMatchSnapshot();
  });
});
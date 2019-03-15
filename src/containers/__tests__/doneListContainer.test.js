import React from 'react';
import { shallow } from 'enzyme';
import doneListContainer from '../doneListContainer.jsx';


describe('doneListContainer', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<doneListContainer debug />);
  
    expect(component).toMatchSnapshot();
  });
});
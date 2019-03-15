import React from 'react';
import { shallow } from 'enzyme';
import taskListContainer from '../taskListContainer.jsx';


describe('taskListContainer', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<taskListContainer debug />);
  
    expect(component).toMatchSnapshot();
  });
});
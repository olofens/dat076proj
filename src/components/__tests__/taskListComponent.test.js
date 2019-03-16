import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'
import TaskListComponent from '../taskListComponent.jsx';



  const props = {
    tasks: [
      {
        "datecreated": "Thu, 14 Mar 2019 18:40:07 GMT", 
        "datefinished": null, 
        "description": "Hi im gonna work", 
        "elapsedtime": 4, 
        "estimatedtime": 100, 
        "id": 30, 
        "title": "My Task!", 
        "userid": "Erik"
      }, 
      {
        "datecreated": "Wed, 13 Mar 2019 12:07:32 GMT", 
        "datefinished": null, 
        "description": "asd", 
        "elapsedtime": 0, 
        "estimatedtime": 1234, 
        "id": 7, 
        "title": "asd", 
        "userid": "Erik"
      }, 
      {
        "datecreated": "Thu, 14 Mar 2019 18:37:52 GMT", 
        "datefinished": "2019-03-15 15:21:17", 
        "description": "netaskerin", 
        "elapsedtime": 0, 
        "estimatedtime": 22, 
        "id": 28, 
        "title": "newtask", 
        "userid": "Erik"
      }
    ]
  };





describe('render()', () => {
  it('renders the component', () => {
      const component = shallow(<TaskListComponent {...props}/>);

      expect(component).toMatchSnapshot();
  });
});

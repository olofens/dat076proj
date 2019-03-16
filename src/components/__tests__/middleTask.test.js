import React from 'react';
import { shallow, mount } from 'enzyme';
import MiddleTask from '../middleTask.jsx';
import jest from 'jest';


const props = {
    task :
      {
        "datecreated": "Thu, 14 Mar 2019 18:40:07 GMT", 
        "datefinished": null, 
        "description": "Hi im gonna work", 
        "elapsedtime": 4, 
        "estimatedtime": 100, 
        "id": 30, 
        "title": "My Task!", 
        "userid": "Erik"
      }
    };

describe('Test Timer button component', () => {
    it('renders Start Timer when timer is off', () => {
        const wrapper = mount(<MiddleTask {...props}/>);
  
        const text = wrapper.find('button.timer').text();
        expect(text).toEqual('Start Timer');


    });
    it('renders Stop Timer when timer is on', () => {
        const wrapper = mount(<MiddleTask {...props}/>);
  
        const timerBtn = wrapper.find('button.timer');
        timerBtn.simulate('click');

        //Give button enough time to update
        setTimeout(()=>{
            const text = wrapper.find('button.timer').text();
            expect(text).toEqual('Stop Timer');
        }, 1000);


    });
  
});
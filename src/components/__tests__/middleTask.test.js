import React from 'react';
import { shallow, mount } from 'enzyme';
import MiddleTask from '../middleTask.jsx';


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
    it('renders Stop Timer when timer is on', ()  => {


        const wrapper = mount(<MiddleTask {...props}/>);
  
        const timerBtn = wrapper.find('button.timer');
        timerBtn.simulate('click');

        //Add small artificial delay, rendering is slightly delayed because of backend calls 
        setTimeout(() => {
            const text = wrapper.find('button.timer').text();
            expect(text).toEqual('Stop Timer')
          }, 1000)
      

    });
});

describe('Test timer data component', () => {
    it('Rendered timer is 0', () => {
        const wrapper = mount(<MiddleTask {...props}/>);
  

        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('Time: 0');


    });

    it('Rendered timer is not 0 after timer start', () => {
        const wrapper = mount(<MiddleTask {...props}/>);
  
        const timerBtn = wrapper.find('button.timer');
        timerBtn.simulate('click');

        setTimeout(() => {
        const text = wrapper.find('td#timerLabel').text();
        expect(text).not.toEqual('Time: 0');
        }, 1000)
    });

});
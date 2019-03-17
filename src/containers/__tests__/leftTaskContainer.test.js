import React from 'react';
import { mount } from 'enzyme';
import LeftTaskContainer from '../leftTaskContainer.jsx';

//Dummy props
const props = {
    task:
    {
        "datecreated": "Thu, 14 Mar 2019 18:40:07 GMT",
        "datefinished": null,
        "description": "Hi im gonna work",
        "elapsedtime": 50,
        "estimatedtime": 100,
        "id": 30,
        "title": "My Task!",
        "userid": "Erik"
    },
    timerOn: true
};

describe('Progress bar testing', () => {
    it('should show correct value when elapsedTime and estTime both > 0', () => {

        const wrapper = mount(<LeftTaskContainer {...props} />);
        const text = wrapper.find('WithStyles(LinearProgress)');
        //Elapsedtime / EstimatedTime * 100 = 50
        expect(text.props()).toHaveProperty("value", 50);


    });

    it('should show correct value when estimatedTime = 0', () => {

        props.task.estimatedtime = 0;

        const wrapper = mount(<LeftTaskContainer {...props} />);
        const text = wrapper.find('WithStyles(LinearProgress)');
        
        expect(text.props()).toHaveProperty("value", 0);


    });

    it('should show correct progress state when elapsedTime = 0', () => {

        props.task.elapsedTime = 0;

        const wrapper = mount(<LeftTaskContainer {...props} />);
        const text = wrapper.find('WithStyles(LinearProgress)');

        expect(text.props()).toHaveProperty("value", 0);

    });


});
describe('Test EstimatedTime data component', () => {
    it('Rendered timer is 00:00 when estimatedTime = 0', () => {
        props.task.estimatedtime = 0;
        const wrapper = mount(<LeftTaskContainer {...props} />);


        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('00:00');


    });

    it('Rendered timer is 00:50 when estimatedTime = 50', () => {
        props.task.estimatedtime = 50;
        const wrapper = mount(<LeftTaskContainer {...props} />);
        console.log(wrapper.debug())

        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('00:50');
    });
    //Tests the second to MM:SS method
    it('Rendered timer is 01:01 when estimatedTime = 61', () => {
        props.task.estimatedtime = 61;
        const wrapper = mount(<LeftTaskContainer {...props} />);


        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('01:01');
    });

});



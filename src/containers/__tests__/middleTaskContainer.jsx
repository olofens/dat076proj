import React from 'react';
import { mount } from 'enzyme';
import MiddleTaskContainer from '../middleTaskContainer.jsx';

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

        //Mount the MiddleTaskContainer
        //Renders the component and its children
        const wrapper = mount(<MiddleTaskContainer {...props} />);

        //Search for the progress bar component 
        const text = wrapper.find('WithStyles(LinearProgress)');

        expect(text.props()).toHaveProperty("value", 50);


    });

    it('should show correct value when estimatedTime = 0', () => {

        props.task.estimatedtime = 0;

        const wrapper = mount(<MiddleTaskContainer {...props} />);
        const text = wrapper.find('WithStyles(LinearProgress)');

        expect(text.props()).toHaveProperty("value", 0);


    });

    it('should show correct progress state when elapsedTime = 0', () => {

        props.task.elapsedTime = 0;

        const wrapper = mount(<MiddleTaskContainer {...props} />);
        const text = wrapper.find('WithStyles(LinearProgress)');

        expect(text.props()).toHaveProperty("value", 0);

    });


});

describe('Test timer data component', () => {
    it('Rendered timer is 00:00 when elapsedTime = 0', () => {
        props.task.elapsedtime = 0;
        const wrapper = mount(<MiddleTaskContainer {...props} />);

        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('00:00');


    });

    it('Rendered timer is 00:50 when elapsedTime = 50', () => {
        props.task.elapsedtime = 50;
        const wrapper = mount(<MiddleTaskContainer {...props} />);


        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('00:50');
    });

    it('Rendered timer is 01:01 when elapsedTime = 61', () => {
        props.task.elapsedtime = 61;
        const wrapper = mount(<MiddleTaskContainer {...props} />);


        const text = wrapper.find('td#timerLabel').text();
        expect(text).toEqual('01:01');
    });

});


describe('Test Timer button component', () => {
    it('renders Start Timer when timer is off', () => {

        const wrapper = mount(<MiddleTaskContainer {...props} />);

        const text = wrapper.find('button.timer').text();
        expect(text).toEqual('Start Timer');


    });
    it('renders Stop Timer when timer is on', () => {

        const wrapper = mount(<MiddleTaskContainer {...props} />);

        //Start timer
        wrapper.setState({ timerOn: true })

        const text = wrapper.find('button.timer').text();
        expect(text).toEqual('Stop Timer')


    });
});

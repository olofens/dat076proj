import React from 'react';
import { shallow } from 'enzyme';
import App from '../app.jsx';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<App />);
    });

});
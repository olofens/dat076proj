import React from 'react';
import { shallow } from 'enzyme';
import App from '../app.jsx';

describe('Render App', () => {
   it('renders without crashing', () => {
      shallow(<App />);
    });

});
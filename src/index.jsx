import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import './test.css';


class App extends React.Component {

    render() {
        const dummyList = [
            {
                'name': 'Charlie',
                'job': 'Janitor'
            },
            {
                'name': 'Mac',
                'job': 'Bouncer'
            },
            {
                'name': 'Dee',
                'job': 'Aspring actress'
            },
            {
                'name': 'Dennis',
                'job': 'Bartender'
            }
        ];

        return (
            <div className="container">
                <Header/>
                <Board tasks={dummyList}/>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

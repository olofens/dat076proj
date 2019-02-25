import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import './test.css';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Board/>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

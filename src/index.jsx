import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import TaskList from "./taskList.jsx"
import './test.css';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="itemHeader"> <Header/> </div>
                <div className="itemSidebar"><TaskList/></div>
                <div className="itemContent"><Board/></div>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

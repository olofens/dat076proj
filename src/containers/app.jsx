import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import TaskList from "./taskList.jsx"
import DoneList from "./doneList.jsx"
import "./test.css"

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="itemHeader"> <Header /> </div>
                <div className="itemSidebar1 column"><TaskList/></div>
                <div className="itemSidebar2 column"><DoneList /></div>
                <div className="itemContent column"><Board/></div>
            </div>
        );
    }
}

export default App;

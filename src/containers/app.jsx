import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import BoardContainer from "./boardContainer.jsx"
import TaskListContainer from "./taskListContainer.jsx"
import DoneListContainer from "./doneListContainer.jsx"
import "./test.css"
import ModalContainer from './modalContainer.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="itemHeader"> <Header /> </div>
                <div className="itemSidebar1"><TaskListContainer /></div>
                <div className="itemSidebar2"><DoneListContainer /></div>
                <div className="itemContent"><BoardContainer /></div>
                <div className="modalContainer"><ModalContainer /></div>
            </div>
        );
    }
}

export default App;

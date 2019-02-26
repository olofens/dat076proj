import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import TaskList from "./taskList.jsx"
import './test.css';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todoTasks: [], 
            doingTasks: []
        }
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(response => this.setState({todoTasks: response}));
    }

    render() {
        return (
            <div className="container">
                <div className="itemHeader"> <Header/> </div>
                <div className="itemSidebar1"><TaskList tasks={this.state.todoTasks}/></div>
                <div className="itemSidebar2">Done tasks</div>
                <div className="itemContent"><Board tasks={this.state.doingTasks}/></div>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

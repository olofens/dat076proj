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

        this.todoTaskSelected = this.todoTaskSelected.bind(this);
        this.doingTaskSelected = this.doingTaskSelected.bind(this);
        this.findIndex = this.findIndex.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(response => this.setState({ todoTasks: response }));
    }

    todoTaskSelected(id) {
        var index = this.findIndex(this.state.todoTasks, id);
        var addition = this.state.todoTasks[index];
        this.setState({
            todoTasks: this.state.todoTasks.filter((_, i) => i !== index),
            doingTasks: this.state.doingTasks.concat(addition)
        });
    }

    doingTaskSelected(id) {
        var index = this.findIndex(this.state.doingTasks, id);
        var addition = this.state.doingTasks[index];
        this.setState({
            doingTasks: this.state.doingTasks.filter((_, i) => i !== index),
            todoTasks: this.state.todoTasks.concat(addition)
        });
    }

    findIndex(array, id) {
        console.log("given array " + JSON.stringify(array))
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return i;
            }
        }
        return null;
    }

    render() {
        return (
            <div className="container">
                <div className="itemHeader"> <Header /> </div>
                <div className="itemSidebar1"><TaskList tasks={this.state.todoTasks} action={this.todoTaskSelected} /></div>
                <div className="itemSidebar2">Done tasks</div>
                <div className="itemContent"><Board tasks={this.state.doingTasks} action={this.doingTaskSelected} /></div>
            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

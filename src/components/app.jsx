import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import TaskList from "./taskList.jsx"
import { append, remove, init } from "./../actions"
import "./test.css"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.todoTaskSelected = this.todoTaskSelected.bind(this);
        this.doingTaskSelected = this.doingTaskSelected.bind(this);
        this.findIndex = this.findIndex.bind(this);
    }

    fetchTasks() {
        fetch('http://127.0.0.1:3000/tasks')
            .then(console.log(this.store.getState()))
            .then(response => response.json())
            .then(response => this.store.dispatch(init(response, [], [])))
            .then(console.log(this.store.getState()));
    }

    todoTaskSelected(id) {
        var index = this.findIndex(this.store.getState().todoTasks, id);
        var task = this.store.getState().todoTasks[index];
        this.store.dispatch(append("todoTasks", task));
        this.store.dispatch(remove("doingTasks", task));
    }

    doingTaskSelected(id) {
        var index = this.findIndex(this.store.getState().doingTasks, id);
        var task = this.store.getState().doingTasks[index];
        this.store.dispatch(append("doingTasks", task));
        this.store.dispatch(remove("todoTasks", task));
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
                <div className="itemSidebar1"><TaskList action={this.todoTaskSelected} /></div>
                <div className="itemSidebar2">Done tasks</div>
                <div className="itemContent"><Board action={this.doingTaskSelected} /></div>
            </div>
        );
    }
}

export default App;

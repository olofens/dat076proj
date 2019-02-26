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
        this.findIndex = this.findIndex.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(response => this.setState({todoTasks: response}));
    }

    todoTaskSelected(id) {
        
        var arrayTodo = [...this.state.todoTasks]; // make seperate copy of state array
        var index = this.findIndex(id);
        var task = arrayTodo[index];
        console.log(task);
        if (index !== null) {
            arrayTodo.splice(index, 1);
            this.setState({todoTasks: arrayTodo});
        }

        this.setState({ doingTasks: this.state.doingTasks.concat([task])}, function() {
            console.log(JSON.stringify(this.state))
        });


        
        
    }

    findIndex(id) {
        for (var i = 0; i < this.state.todoTasks.length; i++) {
            if (this.state.todoTasks[i]["id"] === id) {
                return i;
            }
        }
        return null;
    }    

    render() {
        return (
            <div className="container">
                <div className="itemHeader"> <Header/> </div>
                <div className="itemSidebar1"><TaskList tasks={this.state.todoTasks} action={this.todoTaskSelected}/></div>
                <div className="itemSidebar2">Done tasks</div>
                <div className="itemContent"><Board tasks={this.state.doingTasks}/></div>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

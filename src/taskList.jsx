import React from 'react';
import ReactDOM from 'react-dom';


class TaskList extends React.Component {
    constructor() {
        super();
        this.state = {
            'tasks': []
        }
    }
    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(response => this.setState({'tasks': response}));
        

    }

    render() {
        return (
            <div>
                <p>This is our Task List!</p>
                <ul>
                    {this.state.tasks.map(function(item,index) {
                        return (
                            <div key={index}>
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                            </div>
                        )
                    }
                    )}
                </ul>
            </div>
        );
    }
}

export default TaskList;
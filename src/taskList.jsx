import React from 'react';
import ReactDOM from 'react-dom';


class TaskList extends React.Component {
    constructor() {
        super();
        this.state = {
            'tasks': []
        }
    }

    fetchTasks() {
        fetch('http://localhost3000/tasks')
        .then(response => response.json())
        .then(response => this.setState({'tasks': response}));
        

    }

    render() {
        return (
            <div>
                <p>This is our Task List!</p>
                <ul>
                    {this.state.tasks.map(function(task, index) {
                        return <h1>{task.description}</h1>
                    }
                    )}
                </ul>
            </div>
        );
    }
}

export default TaskList;
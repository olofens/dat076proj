import React from 'react';
import ReactDOM from 'react-dom';
import LeftTask from "../components/leftTask.jsx"
import "./column.css";

class TaskListComponent extends React.Component {
    constructor(props) {
        super(props);
        

    }

    taskList() {
        const items = this.props.tasks.map((task) =>
            <li key={task.id}>
                <LeftTask task={task} action={this.props.click} />
            </li>);
        return (<ul>{items}</ul>);
    }

   

    render() {
        return (
            <div className="column">
                <h3 className="title">To do</h3>
                {this.taskList()}
                <button type="button" onClick={this.props.showModal}>
                    Create New Task
                </button>
            </div>
        );
    }
}

export default TaskListComponent;
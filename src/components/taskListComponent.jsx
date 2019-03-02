import React from 'react';
import ReactDOM from 'react-dom';
import LeftTask from "../components/leftTask.jsx"

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
            <div>
                <h3>To do</h3>
                {this.taskList()}
            </div>
        );
    }
}

export default TaskListComponent;
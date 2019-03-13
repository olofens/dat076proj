import React from 'react';
import ReactDOM from 'react-dom';
import LeftTask from "../components/leftTask.jsx"
import "./column.css";
import Draggable from "../containers/draggable.jsx"
import Droppable from "../containers/droppable.jsx"
import { strict } from 'assert';

class TaskListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        const items = this.props.tasks.map((task) =>
            <Draggable id={task.id} key={task.id}>
                <li>
                    <LeftTask task={task} openEdit={this.props.openEdit} closeEdit={this.props.closeEdit} />
                </li>
            </Draggable>);

        return (<ul>{items}</ul>);
    }

   

    render() {
        return (
            <div className="column">
                <Droppable id="drop1">
                    <h3 className="title">To do</h3>
                    {this.taskList()}
                </Droppable>
                <button type="button" onClick={this.props.showModal}>
                    Create New Task
                </button>
            </div>

        );
    }
}

export default TaskListComponent;
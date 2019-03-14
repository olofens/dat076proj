import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RightTask from "../components/rightTask.jsx";
import { doneClick } from "../actions/index.js";
import Draggable from "../containers/draggable.jsx";
import Droppable from "../containers/droppable.jsx";
import "./column.css";

class DoneListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        var items = this.props.tasks.map((task) =>
            <Draggable id={task.id} key={task.id}>
                <li>
                    <RightTask
                        task={task}
                        action={this.props.click}
                        startEditTask={this.props.startEditTask}
                        deleteTask={this.props.deleteTask}
                    />
                </li>
            </Draggable>);
        return (<ul>{items}</ul>);
    }

    render() {
        return (
            <div className="column">
                <Droppable id="drop3">
                    <h3 className="title">Done</h3>
                    {this.taskList()}
                </Droppable>
            </div>
        );
    }
}

export default DoneListComponent;

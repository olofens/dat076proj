import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { doingClickBack, doingClickForward } from "../actions/index.js";
import MiddleTask from "../components/middleTask.jsx";
import Draggable from "../containers/draggable.jsx";
import Droppable from "../containers/droppable.jsx";

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        var items = this.props.tasks.map((task) =>
            <Draggable id={task.id} key={task.id}>
                <li>
                    <MiddleTask
                        task={task}
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
                <Droppable id="drop2">
                    <h3 className="title">Board</h3>
                    {this.taskList()}
                </Droppable>
            </div>
        );
    }
}

export default BoardComponent;

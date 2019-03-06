import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { todoClick } from "../actions/index.js"
import TaskListComponent from '../components/taskListComponent.jsx';
import Droppable from "./droppable.jsx"

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Droppable id="drop1">
                <TaskListComponent
                tasks={this.props.tasks}
                click={this.props.todoClick}
                />
            </Droppable>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.todoTasks
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ todoClick: todoClick }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskList);
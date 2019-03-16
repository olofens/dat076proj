import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { showModal, hideModal, startEditTask, deleteTask } from "../actions/index.js"

import TaskListComponent from '../components/taskListComponent.jsx';
import Droppable from "./droppable.jsx"

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <TaskListComponent
                tasks={this.props.tasks}
                deleteTask={this.props.deleteTask}
                openEdit={this.props.startEditTask}
                showModal={this.props.showModal}
                hideModal={this.props.hideModal}
                modalIsOpen={this.props.modalIsOpen}

            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.todoTasks,
        modalIsOpen: state.modalIsOpen
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteTask: deleteTask,
        startEditTask: startEditTask,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskList);
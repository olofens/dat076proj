import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { startEditTask, deleteTask, updateTime } from "../actions/index.js"
import BoardComponent from "../components/boardComponent.jsx"
import Droppable from "./droppable.jsx"

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BoardComponent
                tasks={this.props.tasks}
                startEditTask={this.props.startEditTask}
                deleteTask={this.props.deleteTask}
                updateTime={this.props.updateTime}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.doingTasks
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateTime: updateTime,
        startEditTask: startEditTask,
        deleteTask: deleteTask
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { doingClickBack, doingClickForward } from "../actions/index.js"
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
                forwardClick={this.props.doingClickForward}
                backClick={this.props.doingClickBack}
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
        doingClickBack: doingClickBack,
        doingClickForward: doingClickForward
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);

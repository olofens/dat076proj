import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { dragTask } from "../actions/index.js"

class Draggable extends React.Component {
    constructor(props) {
        super(props);
    }

    drag(event) {
        var column = getColumnName(event.target);
        event.dataTransfer.setData("transfer", JSON.stringify({ id: event.target.id, column: column }));
    }

    noAllowDrop(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div id={this.props.id} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

function getColumnName(x) {
    while (x = x.parentNode) {
        if (x.id == "drop1") return "todoTasks";
        else if (x.id == "drop2") return "doingTasks";
        else if (x.id == "drop3") return "doneTasks";
    }
    console.log("Something went wrong in getColumnName, droppable");
    return "NONE";
}

Draggable.propTypes = {
    id: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.node,
    dragTask: PropTypes.func
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ dragTask: dragTask }, dispatch)
}

export default connect(null, matchDispatchToProps)(Draggable);
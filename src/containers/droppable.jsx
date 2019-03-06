import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { dropTask } from "../actions/index.js"

class Droppable extends React.Component {
    constructor(props) {
        super(props);
        self = this;
    }

    drop(event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("transfer"));
        console.log("data: below");
        console.log(data.column);
        var id = data.id;
        var fromColumn = data.column;
        var ontoColumn = getColumnName(event.target);
        console.log("dropping onto: " + ontoColumn);
        self.props.dropTask(id, fromColumn, ontoColumn);

    }

    allowDrop(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

function getColumnName(x) {
    while (x = x.parentNode) {
        if (x.id == "drop1") return "todoTasks";
        else if(x.id == "drop2") return "doingTasks";
        else if(x.id == "drop3") return "doneTasks";
    }
    console.log("Something went wrong in getColumnName, droppable");
    return "NONE";
}

Droppable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object, 
    children: PropTypes.node,
    dropTask: PropTypes.func
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({dropTask: dropTask}, dispatch)
}

export default connect(null, matchDispatchToProps)(Droppable);

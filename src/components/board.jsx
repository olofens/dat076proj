import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {doingClickBack, doingClickForward} from "../actions/index.js"
import MiddleTask from "./middleTask.jsx"


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.childSelected = this.childSelected.bind(this);
    }

    childSelected(task) {
        this.props.doingClickBack(task);
    }

    render() {
        console.log("Board now has these tasks: ");
        console.log(this.props.tasks);
        const rows = this.props.tasks.map((task, index) => {
            return (
                <tr key={index}>
                    <td>
                        <MiddleTask 
                            task={task}
                            action={this.childSelected}
                        />
                    </td>
                </tr>
            )
        });

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);

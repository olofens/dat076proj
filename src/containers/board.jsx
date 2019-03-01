import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {doingClickBack, doingClickForward} from "../actions/index.js"
import MiddleTask from "../components/middleTask.jsx"


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.backClick = this.backClick.bind(this);
        this.forwardClick = this.forwardClick.bind(this);
    }

    backClick(task) {
        this.props.doingClickBack(task);
    }

    forwardClick(task) {
      this.props.doingClickForward(task);
  }

    render() {
        const rows = this.props.tasks.map((task, index) => {
            return (
                <tr key={index}>
                    <td>
                        <MiddleTask 
                            task={task}
                            actionBack={this.backClick}
                            actionForward={this.forwardClick}
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

import React from 'react';
import ReactDOM from 'react-dom';
import LeftTaskComponent from "../components/leftTaskComponent.jsx"

class LeftTaskContainer extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.secondsToMS = this.secondsToMS.bind(this);
        this.calcProg = this.calcProg.bind(this);
    }

    //Calculate progress for progress bar
    calcProg(elap, est) {
        if (elap == 0 || est == 0) {
            return 0;
        }
        else {
            return parseInt(elap / est * 100)
        }
    }

    //Convert seconds to MM:SS format
    secondsToMS(sec) {
        var min = Math.floor(sec / 60);
        var seconds = sec - (min * 60);
        seconds = Math.round(seconds * 100) / 100;

        var result = (min < 10 ? "0" + min : min);
        result += ":" + (seconds < 10 ? "0" + seconds : seconds);

        return result;
    }

    edit() {
        this.props.openEdit(this.props.task, "todoTasks");
    }

    delete() {
        this.props.deleteTask(this.props.task, "todoTasks");
    }

    render() {
        return (
            <LeftTaskComponent
                task={this.props.task}
                estimatedtime={this.secondsToMS(this.props.task.estimatedtime)}
                edit={this.edit}
                delete={this.delete}
                progress={this.calcProg(this.props.task.elapsedtime, this.props.task.estimatedtime)}
            />
        );
    }
}



export default LeftTaskContainer;
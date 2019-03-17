import React from 'react';
import ReactDOM from 'react-dom';
import "./lefttask.css";
import styled from 'styled-components'
import { Edit } from "styled-icons/boxicons-solid/Edit"
import { Delete } from "styled-icons/material/Delete";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

class LeftTaskComponent extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    edit() {
        this.props.openEdit(this.props.task, "todoTasks");
    }

    delete() {
        this.props.deleteTask(this.props.task, "todoTasks");
    }


    render() {

        return (
            <div>

                <table className="lefttask">
                    <tbody>
                        <tr>
                            <td className="titletd">
                                {this.props.task.title}
                            </td>
                            <td>
                                {this.props.estimatedtime}
                            </td>
                            <td className="buttontd">
                                <button onClick={this.props.edit}>
                                    <Edit size={20} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="desctd">
                                {this.props.task.description}
                            </td>
                            <td>

                            </td>
                            <td className="buttontd">
                                <button onClick={this.props.delete}>
                                    <Delete size={20} />
                                </button>
                            </td>
                        </tr>


                    </tbody>
                </table>
                <LinearProgress variant="determinate" value={this.props.progress} />

            </div>

        );
    }
}



export default LeftTaskComponent;
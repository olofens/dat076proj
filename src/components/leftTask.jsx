import React from 'react';
import ReactDOM from 'react-dom';
import "./lefttask.css";
import styled from 'styled-components'
import { Edit } from "styled-icons/boxicons-solid/Edit"
import {Delete} from "styled-icons/material/Delete";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

function calcProg(elap, est) {
   
    if(elap ==0 || est == 0){
        return 0;
    }
    else{
        return parseInt(elap/est*100)
    }
}

class LeftTask extends React.Component {
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
                            {this.props.task.estimatedtime}
                        </td>
                        <td className="buttontd">
                            <button onClick={this.edit}>
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
                            <button onClick={this.delete}>
                                <Delete size={20} />
                            </button>
                        </td>
                    </tr>
                   
  
                </tbody>
            </table>
            <LinearProgress variant="determinate" value={calcProg(this.props.task.elapsedtime,this.props.task.estimatedtime)} />

            </div>

        );
    }
}



export default LeftTask;
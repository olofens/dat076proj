import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";
import "./../components/middletask.css";
import LinearProgress from '@material-ui/core/LinearProgress';



//Convert seconds to MM:SS
function secondsToMS(sec) {
  var min = Math.floor(sec / 60);
  var seconds = sec - (min*60);
  seconds = Math.round(seconds * 100) / 100;

  var result = (min < 10 ? "0" + min : min);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  console.log(result)

  return result;

}
//Calculate progress for progress bar
function calcProg(elap, est) {
   
  if(elap ==0 || est == 0){
      return 0;
  }
  else{
      return parseInt(elap/est*100)
  }
}
class MiddleTaskComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

      <table className="middletask">
        <tbody>
          <tr>
            <td className="titletd">{this.props.task.title}</td>
            <td className="estimatedText">Est.</td>
            <td>{secondsToMS(this.props.task.estimatedtime)}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.props.edit}>
                <Edit size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td className="desctd">{this.props.task.description}</td>
            <td>
              <button className="timer" onClick={this.props.toggleTimer}>
                {this.props.timerOn ? "Stop Timer" : "Start Timer"}
              </button>
            </td>
            <td id="timerLabel">{secondsToMS(this.props.time)}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.props.delete}>
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

export default MiddleTaskComponent;

import React from 'react';
import ReactDOM from 'react-dom';

class LeftTask extends React.Component {
    constructor(props) {
        super(props);

        this.clicked = this.clicked.bind(this);
    }
    
    clicked() {
        this.props.action(this.props.task)
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                { this.props.task.title }
                            </td>
                            <td>
                                { this.props.task.estimatedtime }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                { this.props.task.description }
                            </td>
                            <td>
                                <button onClick={this.clicked}>Select</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}



export default LeftTask;
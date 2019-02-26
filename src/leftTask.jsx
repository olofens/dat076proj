import React from 'react';
import ReactDOM from 'react-dom';


class LeftTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            description: props.description,
            estimatedTime: props.estimatedTime,
            action: props.action
        }

        this.clicked = this.clicked.bind(this);
    }
    
    clicked() {
        console.log("Clicked task select with name " + this.state.name);
        this.state.action(this.state.id)
    }

    render() {

        var tempStyle = {
            "borderStyle": "solid"
        };

        return (
            <div>
                <table style={tempStyle}>
                    <tbody>
                        <tr>
                            <td>
                                { this.state.name }
                            </td>
                            <td>
                                { this.state.estimatedTime }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                { this.state.description }
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
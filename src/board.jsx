import React from 'react';
import ReactDOM from 'react-dom';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        };
    }

    render() {
        const rows = this.state.tasks.map((row, index) => {
            return (
                <tr key={index}>
                    <td>
                        {row.name}
                        {row.job}
                    </td>
                </tr>
            )
        });

        return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
        )
    }
}

export default Board;
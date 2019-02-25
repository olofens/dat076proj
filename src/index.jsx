import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";


class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div>Hello123!</div>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

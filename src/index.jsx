import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import './test.css';


class App extends React.Component {
    render() {
        return (
            <div class="container">
                <Header/>
                <div>Hello123!</div>
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

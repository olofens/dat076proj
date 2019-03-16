import React from 'react';
import ReactDOM from 'react-dom';
import "./header.css";
import { Stopwatch } from "styled-icons/typicons/Stopwatch";



class Header extends React.Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="titleText">
                <Stopwatch size={70} />
                TylerTime
                </div>
            </div>
        );
    }
}

export default Header;
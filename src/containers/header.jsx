import React from 'react';
import ReactDOM from 'react-dom';
import "./header.css";
import { Stopwatch } from "styled-icons/typicons/Stopwatch";
import { StatsDots } from "styled-icons/icomoon/StatsDots"
import { InfoCircle } from "styled-icons/boxicons-regular/InfoCircle"



class Header extends React.Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="titleText">
                    <Stopwatch size={70} />
                    TylerTime
                </div>
                <div>

                </div>
                <div className="extraSpace">
                    <StatsDots size={45} />
                    <InfoCircle size={55} />
                </div>
            </div>
        );
    }
}

export default Header;
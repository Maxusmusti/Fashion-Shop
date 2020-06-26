import React from 'react';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <p><Link to="/">HOME</Link></p>
                <p><Link to="/mens">Mens</Link></p>
                <p><Link to="/womens">Womens</Link></p>
                <p><Link to="/raghav">weg</Link></p>
                <h1>Designer District</h1>
            </div>
        );
    }
}
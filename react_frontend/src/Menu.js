import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";

import './css/Menu.css';

export default function Menu() {
    return (
        <div>
            <div className="menu fixed">
                {bar()}
            </div>
            <div className="menu filler">
                {bar()}
            </div>
        </div>
    );
}

function bar() {
    return (
        <div className="menu-link-wrapper">
            <a href="/" className="logo">Designer District</a>
            <ReactiveLink
                activeOnlyWhenExact={true}
                to="/men"
                label="Men"
            />
            <ReactiveLink
                activeOnlyWhenExact={true}
                to="/women"
                label="Women"
            />
            <ReactiveLink
                activeOnlyWhenExact={true}
                to="/raghav"
                label="weg"
            />
        </div>
    );
}

function ReactiveLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <div className={match ? "menu-link active" : "menu-link"}>
            <a href={to}>{label}</a>
        </div>
    );
}
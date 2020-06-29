import React from 'react';

import './css/PageNotFound.css';

export default class PageNotFound extends React.Component {
    render() {
        return (
            <div className="pageNotFound-container">
                <div className="pageNotFound-text">
                    <h1>404</h1>
                    Oh No! 
                    Page Not Found
                </div>
            </div>
        );
    }
}
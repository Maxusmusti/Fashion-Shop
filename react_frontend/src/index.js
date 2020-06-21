import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListView from './ListView';
import Scroll from './Scroll';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        
        <Scroll />
        <ListView />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
serviceWorker.unregister();
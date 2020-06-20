import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListView from './ListView';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render(){
    return (
      <div>
        <div className="progress-container">
            <div className="progress-bar" id="myBar"></div>
        </div>
        <ListView />
      </div>
    );
  }
}

window.onload = function() {myFunction()};
window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);
serviceWorker.unregister();
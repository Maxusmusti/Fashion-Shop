import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import ListView from './ListView';
import Scroll from './Scroll';

import './index.css';

import data from './dummyData.json';

export default function App() {
  return (
    <Router>
      
      <Scroll />

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/mens">
          <ListView data={data.slice(0,Math.floor(data.length/2))}/>
        </Route>

        <Route path="/womens">
          <ListView data={data.slice(Math.floor(data.length/2))}/>
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>
    </Router>
  );
}

function PageNotFound() {
  return (
    <div>
        404 hehe
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
serviceWorker.unregister();
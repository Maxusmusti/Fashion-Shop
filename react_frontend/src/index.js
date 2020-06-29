import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import ListView from './ListView';
import ItemPage from './ItemPage'
import Scroll from './Scroll';
import Menu from './Menu';
import PageNotFound from './PageNotFound';

import './css/index.css';

import data from './dummyData.json';

export default function App() {
  const itemRoutes = [];
  for (let i = 0; i < data.length; i++) {
    itemRoutes.push(
      <Route exact path={"/" + data[i].item_name + data[i].item_vendor}>
        <ItemPage itemData={data[i]} />
      </Route>
    )
  }

  return (
    <Router>

      <Scroll />
      <Menu />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/men">
          <ListView data={data.slice(0, Math.floor(data.length / 2))} />
        </Route>
        <Route exact path="/women">
          <ListView data={data.slice(Math.floor(data.length / 2))} />
        </Route>
        {itemRoutes}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
serviceWorker.unregister();
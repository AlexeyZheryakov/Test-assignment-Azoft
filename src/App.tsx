import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Details from './pages/details';
import routes from './routes'

function App() {
  return (
    <Router>
      <Switch>
        <Route path={routes.details()}>
          <Details />
        </Route>
        <Route path={routes.main()}>
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Details from './pages/details';
import routes from './routes';

function App() {
  return (
    <Switch>
      <Route path={routes.details()}>
        <Details />
      </Route>
      <Route exact path={routes.main()}>
        <Main />
      </Route>
      <Route path={routes.mainWithCategory()}>
        <Main />
      </Route>
    </Switch>
  );
}

export default App;

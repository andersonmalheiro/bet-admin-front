import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Routes from 'routes';

// styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;

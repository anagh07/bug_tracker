import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// Components
import Home from './Home';
import Login from './components/Login';
import Register from './components/Register';
// Actions
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';

function App() {
  // Load user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

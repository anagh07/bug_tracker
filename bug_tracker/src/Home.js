import React from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Nav from './components/Nav';
import Board from './components/Board';
import Menu from './components/Menu';
import Alert from './components/Alert';
import Spinner from './components/Spinner';

const Home = (props) => {
  // Check if user is logged
  if (!props.auth.isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return props.auth.loading ? (
    <Spinner />
  ) : (
    <div className='home'>
      <div className='nav__display'>
        <Nav />
      </div>
      <div className='alert__display'>
        <Alert />
      </div>
      <div className='home__display'>
        <Menu />
        <Board />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);

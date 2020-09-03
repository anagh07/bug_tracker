import React from 'react';
import './Home.css';

import Nav from './components/Nav';
import Board from './components/Board';
import Menu from './components/Menu';

const Home = () => {
  return (
    <div className='home'>
      <div className='nav__display'>
        <Nav />
      </div>
      <div className='home__display'>
        <Menu />
        <Board />
        {/* To-do */}
        {/* In progress */}
        {/* QA */}
        {/* Done */}
      </div>
    </div>
  );
};

export default Home;

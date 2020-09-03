import React from 'react';
import './Nav.css';
import { Button, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import logo from '../images/appicon2.png';

const Nav = () => {
  return (
    <div className='nav'>
      <div className='nav__group1'>
        <div className='nav__image-container'>
          <img className='nav__icon' src={logo} alt='navicon' />
        </div>

        <div className='nav__buttons'>
          <Button>Dashboard</Button>
          <Button>Projects</Button>
          <Button variant='contained' color='primary'>Create</Button>
        </div>
      </div>

      <div className='nav__group2'>
        <div className='nav__search'>
          <input type='text' />
          <SearchIcon />
        </div>

        <div className='nav__account'>
          <Link href='#' color='inherit'>
            My account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

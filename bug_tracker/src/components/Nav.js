import React from 'react';
import './Nav.css';
import { Button, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../images/appicon2.png';
import { logout } from '../actions/auth';

const Nav = (props) => {
  return (
    <div className='nav'>
      <div className='nav__group1'>
        <div className='nav__image-container'>
          <img className='nav__icon' src={logo} alt='navicon' />
        </div>

        <div className='nav__buttons'>
          <Button disabled>Dashboard</Button>
          <Button>Projects</Button>
          <RouterLink to='/create'>
            <Button variant='contained' color='primary'>
              Create
            </Button>
          </RouterLink>
        </div>
      </div>

      <div className='nav__group2'>
        <div className='nav__search'>
          <input type='text' />
          <SearchIcon />
        </div>

        <div className='nav__account'>
          <Link href='#' color='inherit' onClick={props.logout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Nav);

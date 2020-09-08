import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './Auth.css';

import { login, skipLogin } from '../actions/auth';
import Spinner from './Spinner';
import logo from '../images/appicon2.png';
// import Register from './Register';

const Login = (props) => {
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    // e.preventDefault();
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(email, password);
  };

  // If already auth, redirect to dashboard
  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='auth__container'>
        <div className='auth'>
          <div className='auth__image-container'>
            <img className='app__icon' src={logo} alt='navicon' />
          </div>
          <h1 className='auth__title'>Log in</h1>
          <p className='auth__subtitle'>
            <i className='fas fa-user'></i> Log in to your account
          </p>
          <form
            className='form'
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <Button
              variant='contained'
              type='submit'
              className='auth__button'
              color='primary'
            >
              Login
            </Button>
          </form>

          <p>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
          <div className='auth__separator' />
          <p>To use the app without login:</p>
          <Button variant='contained' className='auth__button' onClick={props.skipLogin}>
            Skip
          </Button>
        </div>
      </section>
    </Fragment>
  );
};

// Register.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login, skipLogin })(Login);

import React, { useState, Fragment } from 'react';
import './Board.css';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

import Card from './Card';
// import CardModal from './CardModal';

const Board = () => {
  return (
    <Fragment>
      <div className='board'>
        <div className='board__intro'>
          <div className='board__intro-breadcrumb'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link color='inherit' href='/'>
                My project
              </Link>
              <Typography color='textPrimary'>Active sprint name</Typography>
            </Breadcrumbs>
          </div>
          <h2 className='board__intro-title'>Active sprint title</h2>
          <p className='board__intro-description'>Description: this is my first sprint</p>
        </div>

        <div className='board__groups'>
          <div className='board__group'>
            <span className='board__group-title'>TO DO</span>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className='board__group'>
            <span className='board__group-title'>IN PROGRESS</span>
            <Card />
          </div>
          <div className='board__group'>
            <span className='board__group-title'>QA</span>
            <Card />
          </div>
          <div className='board__group'>
            <span className='board__group-title'>DONE</span>
            <Card />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Board;

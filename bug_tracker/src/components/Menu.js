import React from 'react';
import './Menu.css';
import { Button } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const Menu = () => {
  return (
    <div className='menu'>
      <div className='menu__item'>
        <HistoryIcon />
        <Button>Backlog</Button>
      </div>
      <div className='menu__item'>
        <DirectionsRunIcon />
        <Button>Active sprint</Button>
      </div>
    </div>
  );
};

export default Menu;

import React, { useLayoutEffect, Fragment } from 'react';
import './Board.css';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from './Card';
import Alert from './Alert';
// import CardModal from './CardModal';
import Spinner from './Spinner';

import { loadTickets } from '../actions/ticket';

const Board = ({ tickets, loadTickets, currentProject, loading, projectLoading }) => {
  useLayoutEffect(() => {
    loadTickets(currentProject);
  }, [currentProject]);

  return loading || projectLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='board'>
        <Alert />
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
            {tickets.map((ticket) => {
              return ticket.status === 'To-do' ? <Card ticket={ticket} /> : null;
            })}
          </div>
          <div className='board__group'>
            <span className='board__group-title'>IN PROGRESS</span>
            {tickets.map((ticket) => {
              return ticket.status === 'In progress' ? <Card ticket={ticket} /> : null;
            })}
          </div>
          <div className='board__group'>
            <span className='board__group-title'>QA</span>
            {tickets.map((ticket) => {
              return ticket.status === 'QA' ? <Card ticket={ticket} /> : null;
            })}
          </div>
          <div className='board__group'>
            <span className='board__group-title'>DONE</span>
            {tickets.map((ticket) => {
              return ticket.status === 'Done' ? <Card ticket={ticket} /> : null;
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Board.propTypes = {
  tickets: PropTypes.array,
  loadTickets: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tickets: state.ticket.tickets,
  currentProject: state.project.currentProject,
  loading: state.ticket.loading,
  projectLoading: state.project.loading,
});

export default connect(mapStateToProps, { loadTickets })(Board);

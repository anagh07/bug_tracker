import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Button } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { loadProjects, setCurrentProject } from '../actions/project';

const Menu = ({ loadProjects, projects, currentProject, setCurrentProject }) => {
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleClick = (id) => {
    setCurrentProject(id);
  };

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
      <div className='menu__separator' />
      <div className='menu__item'>
        <p>Projects:</p>
      </div>
      {projects.map((project) => {
        return (
          <div key={project._id.toString()} className='menu__item menu__item-projects'>
            <Button
              key={project._id.toString()}
              disabled={project._id.toString() === currentProject ? 'disabled' : null}
              onClick={(e) => {
                handleClick(project._id.toString());
              }}
            >
              {project.title}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  currentProject: state.project.currentProject,
});

Menu.propTypes = {
  loadProjects: PropTypes.func.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadProjects, setCurrentProject })(Menu);

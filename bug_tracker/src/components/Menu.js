import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Button, TextField } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';

// Actions
import { loadProjects, setCurrentProject, createProject } from '../actions/project';

const Menu = ({
  loadProjects,
  projects,
  currentProject,
  setCurrentProject,
  createProject,
}) => {
  const [data, setData] = useState({
    title: '',
    editTitle: false,
  });

  const { title, editTitle } = data;

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleClick = (id, title) => {
    setCurrentProject({ id, title });
  };

  const addProject = () => {
    setData({
      ...data,
      editTitle: true,
    });
  };

  const doneAddProject = async () => {
    await createProject(title);
    setData({
      title: '',
      editTitle: false,
    });
  };

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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
        <p>
          <strong>Projects:</strong>
        </p>
      </div>
      {projects.map((project) => {
        return (
          <div key={project._id.toString()} className='menu__item menu__item-projects'>
            <Button
              key={project._id.toString()}
              disabled={project._id.toString() === currentProject.id ? 'disabled' : null}
              onClick={(e) => {
                handleClick(project._id.toString(), project.title);
              }}
            >
              {project.title}
            </Button>
          </div>
        );
      })}

      <div className='menu__create-container'>
        {editTitle && (
          <div className='menu__project-editor'>
            <TextField
              name='title'
              value={title}
              onChange={(e) => changeHandler(e)}
              variant='outlined'
              size='small'
            />
            <DoneIcon
              className='description__btn'
              onClick={() => {
                doneAddProject();
              }}
            />
          </div>
        )}
        <div className='menu__create'>
          <AddCircleOutlineIcon
            fontSize='large'
            cursor='pointer'
            onClick={() => addProject()}
          />
        </div>
      </div>
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

export default connect(mapStateToProps, {
  createProject,
  loadProjects,
  setCurrentProject,
})(Menu);

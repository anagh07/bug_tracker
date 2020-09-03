const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../../middlewares/isAuth');
const checkObjectId = require('../../middlewares/checkObjectId');
const projectController = require('../../controllers/projects');

const router = express.Router();

// @route   POST api/projects
// @desc    Create project
// @access  protected
router.post(
  '/',
  isAuth,
  [body('title', 'title cannot be empty').notEmpty()],
  projectController.postProject
);

// @route   GET api/projects
// @desc    Get all projects
// @access  protected
router.get('/', isAuth, projectController.getProjects);

// @route   GET api/projects/tickets/:id
// @desc    Get all tickets under a project
// @access  protected
router.get('/tickets/:id', isAuth, projectController.getProjectTickets);

module.exports = router;

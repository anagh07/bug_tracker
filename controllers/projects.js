const { validationResult } = require('express-validator');

const Project = require('../models/Project');

exports.postProject = async (req, res, next) => {
  try {
    // Check for auth and validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Project data from req
    const { title } = req.body;
    const createdBy = req.user.id;
    let project = new Project({
      title,
      createdBy,
    });

    // Save ticket to DB
    project = await project.save();

    // Send response
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

exports.getProjectTickets = async (req, res) => {
  try {
    // Find project
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate('tickets.ticketId');
    let newTickets = project.tickets.map((ticket) => {
      return ticket.ticketId;
    });
    res.status(200).json(newTickets);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

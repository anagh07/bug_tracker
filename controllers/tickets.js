const { validationResult } = require('express-validator');

const Ticket = require('../models/Ticket');
const Project = require('../models/Project');

exports.postTicket = async (req, res, next) => {
  try {
    // Check for auth and validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Ticket data from req
    const { title, type, description, status, project } = req.body;
    const createdBy = req.user.id;
    const comments = [];
    let ticket = new Ticket({
      title,
      type,
      description,
      status,
      createdBy,
      comments,
      project,
    });

    // Save ticket to DB
    ticket = await ticket.save();

    // Add to project
    let projectToUpdate = await Project.findById(project);
    projectToUpdate.tickets.push({ ticketId: ticket._id });
    projectToUpdate.save();

    // Send response
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    // Check for auth and validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Check for existing ticket with id
    const ticketId = req.params.id;
    let ticket = await Ticket.findById(ticketId);

    // Ticket data from req
    const { title, type, description, status, comments } = req.body;
    ticket.title = title;
    ticket.type = type;
    ticket.description = description;
    ticket.status = status;
    ticket.comments = comments;

    // Save ticket to DB
    ticket = await ticket.save();

    // Send response
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.deleteTicketById = async (req, res, next) => {
  try {
    // Find existing ticket
    const ticketId = req.params.id;
    let ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // // Check if current user is owner of the ticket
    // if (req.user.id.toString() !== ticket.createdBy.toString()) {
    //   return res.status(401).json({ msg: 'Unauthorized' });
    // }

    // Delete ticket and return all
    await ticket.deleteOne();
    const tickets = await Ticket.find({ project: ticket.project }).sort({
      createdAt: -1,
    });
    res.status(200).json(tickets);

    // Remove ticket from project
    let project = await Project.findById(ticket.project);
    let projectTickets = project.tickets.filter(
      (ticket) => ticket.ticketId.toString() !== ticketId.toString()
    );
    project.tickets = projectTickets;
    await project.save();
  } catch (err) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.getTicketComments = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket.comments);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

exports.postTicketComment = async (req, res, next) => {
  try {
    // Check for auth and validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Check for existing ticket with id
    const ticketId = req.params.id;
    let ticket = await Ticket.findById(ticketId);

    // Ticket data from req
    const newComment = {
      user: req.body.user,
      username: req.body.username,
      text: req.body.text,
    };
    ticket.comments.push(newComment);

    // Save ticket to DB
    ticket = await ticket.save();

    // Send response
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.updateTicketComment = async (req, res, next) => {
  try {
    // Check for auth and validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Check for existing ticket with id
    const ticketId = req.params.id;
    let ticket = await Ticket.findById(ticketId);

    const { commentId } = req.body;
    const commentIndex = ticket.comments.findIndex(
      (comment) => comment._id.toString() === commentId.toString()
    );
    // Check if current user is owner of the comment
    if (req.user.id !== ticket.comments[commentIndex].user.toString()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Ticket data from req
    const newComment = {
      _id: req.body.commentId,
      text: req.body.text,
    };
    ticket.comments.forEach((comment, index) => {
      if (comment._id.toString() === req.body.commentId) {
        ticket.comments[index].text = newComment.text;
      }
    });

    // Save ticket to DB
    ticket = await ticket.save();

    // Send response
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.deleteTicketComment = async (req, res, next) => {
  try {
    // Check for auth and validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Check for existing ticket with id
    const ticketId = req.params.id;
    let ticket = await Ticket.findById(ticketId);

    // Ticket data from req
    const { commentId } = req.body;
    const commentIndex = ticket.comments.findIndex(
      (comment) => comment._id.toString() === commentId.toString()
    );
    // Check if current user is owner of the comment
    if (req.user.id !== ticket.comments[commentIndex].user.toString()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    // Check if comment not found
    if (commentIndex < 0) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Remove comment by index
    ticket.comments.splice(commentIndex, 1);

    // Save ticket to DB
    ticket = await ticket.save();

    // Send response
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

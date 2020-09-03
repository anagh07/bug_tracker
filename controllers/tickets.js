const { validationResult } = require('express-validator');

const Ticket = require('../models/Ticket');

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
    const { title, type, description, status } = req.body;
    const createdBy = req.user.id;
    const comments = [];
    let ticket = new Ticket({
      title,
      type,
      description,
      status,
      createdBy,
      comments,
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
      return res.status(404).json({ msg: 'TIcket not found' });
    }

    // Check if current user is owner of the ticket
    if (req.user.id.toString() !== ticket.createdBy.toString()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Delete ticket
    await ticket.remove();
    res.status(200).json({ msg: 'Ticket deleted' });
  } catch (err) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

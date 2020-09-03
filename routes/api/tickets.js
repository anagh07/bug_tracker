const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../../middlewares/isAuth');
const checkObjectId = require('../../middlewares/checkObjectId');
const ticketController = require('../../controllers/tickets');

const router = express.Router();

// @route   POST api/tickets
// @desc    Create ticket
// @access  protected
router.post(
  '/',
  isAuth,
  [
    body('title', 'title cannot be empty').notEmpty(),
    body('type', 'invalid type').notEmpty(),
    body('createdBy', 'invalid user').notEmpty(),
    body('status', 'invalid status').notEmpty(),
    body('project', 'invalid status').notEmpty(),
  ],
  ticketController.postTicket
);

// @route   GET api/tickets
// @desc    Get all tickets
// @access  protected
router.get('/', isAuth, ticketController.getTickets);

// @route   GET api/tickets/:id
// @desc    Get specific ticket by id
// @access  protected
router.get('/:id', isAuth, checkObjectId('id'), ticketController.getTicketById);

// @route   PUT api/tickets/:id
// @desc    Update a ticket
// @access  protected
router.put(
  '/:id',
  isAuth,
  checkObjectId('id'),
  [
    body('title', 'title cannot be empty').notEmpty(),
    body('type', 'invalid type').notEmpty(),
    body('status', 'invalid status').notEmpty(),
  ],
  ticketController.updateTicket
);

// @route   DELETE api/tickets/:id
// @desc    Get specific ticket by id
// @access  protected
router.delete('/:id', isAuth, checkObjectId('id'), ticketController.deleteTicketById);

module.exports = router;

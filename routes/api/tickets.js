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

// ------------ COMMENTS

// @route   GET api/tickets/comments/:id
// @desc    Get all comments on a ticket by ticketid
// @access  protected
router.get(
  '/comments/:id',
  isAuth,
  checkObjectId('id'),
  ticketController.getTicketComments
);

// @route   POST api/tickets/comments/:id
// @desc    Add comment to ticket by ticket id
// @access  protected
router.post(
  '/comments/:id',
  isAuth,
  [
    body('user', 'Invalid user').notEmpty(),
    body('text', 'Comment cannot be empty').notEmpty(),
  ],
  ticketController.postTicketComment
);

// @route   PUT api/tickets/comments/:id
// @desc    Edit comment on ticket by ticket id and comment id
// @access  protected
router.put(
  '/comments/:id',
  isAuth,
  [body('commentId').notEmpty(), body('text', 'Comment cannot be empty').notEmpty()],
  ticketController.updateTicketComment
);

// @route   DELETE api/tickets/comments/delete/:id
// @desc    Delete comment on ticket by ticket id and comment id
// @access  protected
router.put('/comments/delete/:id', isAuth, ticketController.deleteTicketComment);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const userController = require('../../controllers/users');

const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

// @route   POST api/users
// @desc    Register user
// @access  public
router.post(
  '/',
  [
    body('name', 'Invalid name').trim().not().isEmpty(),
    body('email', 'Invalid email').trim().isEmail(),
    body('password', 'Enter valid password with min length of 6 char')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.postUser
);

// @route   GET api/users/:id
// @desc    Get user by id
// @access  protected
router.get('/:id', isAuth, userController.getUserById);

module.exports = router;

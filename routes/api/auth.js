const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../../middlewares/isAuth');
const authController = require('../../controllers/auth');

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  public
router.get('/', isAuth, authController.getUser);

// @route   POST api/auth
// @desc    Login and send token
// @access  public
router.post(
  '/',
  [
    body('email', 'Invalid credentials').isEmail().trim(),
    body('password', 'Invalid credentials').exists().trim(),
  ],
  authController.postLogin
);

module.exports = router;

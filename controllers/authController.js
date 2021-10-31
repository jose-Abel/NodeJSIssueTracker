const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');


exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});
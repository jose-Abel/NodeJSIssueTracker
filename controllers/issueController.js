const Issue = require('../models/issueModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteIssue = () => catchAsync(async (req, res, next) => {
  const issue = await Issue.findByIdAndDelete(req.params.id);

  if (!issue) {
    return next(new AppError('No issue found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateIssue = () => catchAsync(async (req, res, next) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!issue) {
    return next(new AppError('No issue found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: issue
    }
  });
});

exports.createIssue = () => catchAsync(async (req, res, next) => {
  const issue = await Issue.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: issue
    }
  });
});

exports.getIssue = () => catchAsync(async (req, res, next) => {
  let query = Issue.findById(req.params.id);

  const issue = await query;

  if (!issue) {
    return next(new AppError('No issue found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      issue
    }
  });
});

exports.getAllIssues = () => catchAsync(async (req, res, next) => {
  const issues = await Issue.find();

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: issues.length,
    data: {
      data: issues
    }
  });
});
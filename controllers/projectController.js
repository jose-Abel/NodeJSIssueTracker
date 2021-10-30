const Project = require('../models/projectModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.deleteProject = catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateProject = catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: project
      }
    });
  });

exports.createProject = catchAsync(async (req, res, next) => {
    const timeframe = req.body.timeframe;
    const date = new Date(timeframe);

    const project = await Project.create({
      ...req.body,
      timeframe: date
    });

    res.status(201).json({
      status: 'success',
      data: {
        data: project
      }
    });
  });

exports.getProject = catchAsync(async (req, res, next) => {
    let query = Project.findById(req.params.id);

    const project = await query;

    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  });

exports.getAllProjects = catchAsync(async (req, res, next) => {
    console.log("Get all Projects is running")
    const projects = await Project.find();

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        data: projects
      }
    });
  });
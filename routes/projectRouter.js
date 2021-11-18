const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(
    authController.protect, 
    projectController.getAllProjects)
  .post(authController.protect,
    authController.restrictTo('manager', 'admin'),
    projectController.createProject
  );

router
  .route('/:id')
  .get(authController.protect, 
    projectController.getProject)
  .patch(authController.protect,
    authController.restrictTo('manager', 'admin'),
    projectController.updateProject
  )
  .delete(authController.protect,
    authController.restrictTo('manager', 'admin'),
    projectController.deleteProject
  );

module.exports = router;
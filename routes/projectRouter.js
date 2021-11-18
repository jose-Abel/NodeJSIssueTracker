const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(authController.protect,
    projectController.createProject
  );

router
  .route('/:id')
  .get(authController.protect, projectController.getProject)
  .patch(authController.protect,
    projectController.updateProject
  )
  .delete(authController.protect,
    projectController.deleteProject
  );

module.exports = router;
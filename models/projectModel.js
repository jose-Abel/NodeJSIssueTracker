const mongoose = require('mongoose');

const slugify = require('slugify');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A project must have a title'],
      unique: true,
      trim: true,
      maxlength: [
        50,
        'A project title must have a title less or equal than 50 characters'
      ],
      minlength: [
        5,
        'A project title must have a title more or equal than 5 characters'
      ]
    },
    description: {
      type: String,
      required: [true, 'A project must have a description'],
      trim: true,
      maxlength: [
        300,
        'A project description must have a description less or equal than 300 characters'
      ],
      minlength: [
        10,
        'A project description must have a description more or equal than 30 characters'
      ]
    },
    status: {
      type: String,
      required: [true, 'A project must have an status'],
      enum: {
        values: ['started', 'in progress', 'delivered'],
        message: 'Status is either: started, in progress or delivered'
      }
    },
    slug: String,
    timeframe: {
      type: Date,
      required: [true, 'A project must have a timeframe to be delivered']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  }
);

projectSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

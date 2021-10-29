const mongoose = require('mongoose');

const slugify = require('slugify');

const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An issue must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'An issue name must have a name less or equal than 40 characters'
      ],
      minlength: [
        10,
        'An issue name must have a name more or equal than 10 characters'
      ]
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: [true, 'An issue must have an status'],
      enum: {
        values: ['open', 'closed'],
        message: 'Status is either: open or closed'
      }
    },
    assigned: {
      type: Boolean,
      required: [true, 'An issue must have an status'],
    },
    slug: String,
    timeframe: {
      type: Number,
      required: [true, 'An issue must have a timeframe to resolved']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  }
);

issueSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;

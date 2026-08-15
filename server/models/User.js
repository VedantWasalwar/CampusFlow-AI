const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false // Never return password by default
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student'
    },
    phone: {
      type: String,
      default: ''
    },
    college: {
      type: String,
      default: ''
    },
    degree: {
      type: String,
      default: ''
    },
    branch: {
      type: String,
      default: ''
    },
    graduationYear: {
      type: Number,
      default: null
    },
    skills: {
      type: [String],
      default: []
    },
    github: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    portfolio: {
      type: String,
      default: ''
    },
    resume: {
      fileName: { type: String, default: '' },
      filePath: { type: String, default: '' },
      uploadDate: { type: Date, default: null }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Hash password before save if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

// Users.js

const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: { type: String }, 
    password: { type: String }, 
    fullName: { type: String }, 
    isActive: { type: Boolean }, 
    isAdmin: { type: Boolean }, 
    role: { type: String }, 
    profile_image_url: { type: String }, 

    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    is_deleted: { type: Boolean, default: false },
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  
}, { versionKey: false });

module.exports = mongoose.model('Users', UsersSchema);
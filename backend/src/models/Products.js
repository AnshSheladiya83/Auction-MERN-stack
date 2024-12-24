// Products.js

const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: { type: String }, 

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

module.exports = mongoose.model('Products', ProductsSchema);
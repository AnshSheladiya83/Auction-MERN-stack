
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const User = require('../models/Users');
  const handleErrors = require('../utils/handleErrors');
  const config = require('../config/config.js');
  const ResponseHelper = require('../utils/responseHelper');
  const MSG = require('../utils/MSG');
  false

  exports.verifyPassword = handleErrors(async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    return user;
  });
  
  exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
  };
  
  exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
  };
  
  exports.createUser = async (body) => {
    return await User.create(body);
  };
  
  exports.getAllUsers = async () => {
    try {
      // Retrieve all users from the database
      const users = await User.find();
      return users;
    } catch (error) {
      // Handle errors
      throw new Error('Failed to get users');
    }
  };
  
  exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      // Verify email and password
      const user = await this.verifyPassword(email, password);
      
      // Generate JWT token
      const token = this.generateToken(user);
  
      // Send token in response
      res.json(ResponseHelper.success(200, MSG.LOGIN_SUCCESS, { token, user }));
    } catch (error) {
      // Handle errors
      res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED, error.message));
    }
  };
  
  exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // Check if the user already exists
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json(ResponseHelper.error(400, MSG.SIGNUP_SUCCESS, 'User already exists'));
      }
      req.body.password = await bcrypt.hash(password, 10);
      // Create a new user
      const newUser = await this.createUser(req.body);
      // Respond with success message
      res.status(201).json(ResponseHelper.success(201, MSG.SIGNUP_SUCCESS, newUser));
    } catch (error) {
      // Handle errors
      res.status(500).json(ResponseHelper.error(500, MSG.UNAUTHORIZED, error.message));
    }
  };
  
  exports.getProfile = async (req, res, next) => {
    try {
      // Respond with the user profile data
      return res.json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, req.user));
    } catch (error) {
      // Handle errors
      return next(error);
    }
  };
  
  exports.changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;
  
    try {
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json(ResponseHelper.error(404, 'User not found'));
      }
  
      // Verify old password
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json(ResponseHelper.error(400, 'Invalid old password'));
      }
  
      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      // Respond with success message
      res.status(200).json(ResponseHelper.success(200, 'Password changed successfully'));
    } catch (error) {
      // Handle errors
      res.status(500).json(ResponseHelper.error(500, 'Failed to change password', error.message));
    }
  };  
  
  exports.updateProfile = async (req, res, next) => {
    const userId = req.user._id;
    const updateData = req.body;
  
    try {
      // Find user by ID and update profile
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!user) {
        return res.status(404).json(ResponseHelper.error(404, 'User not found'));
      }
  
      // Respond with the updated user profile data
      res.status(200).json(ResponseHelper.success(200, 'Profile updated successfully', user));
    } catch (error) {
      // Handle errors
      res.status(500).json(ResponseHelper.error(500, 'Failed to update profile', error.message));
    }
  };
  
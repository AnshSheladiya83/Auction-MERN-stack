
        /**
         * File Name: authMiddleware.js
         */
        const MSG = require('../utils/MSG');
        const ResponseHelper = require('../utils/responseHelper');
        const jwt = require('jsonwebtoken');
        const config = require('../config/config');
        const User = require('../models/Users');
        const authMiddleware = async (req, res, next) => {
          try {
            // Extract the JWT token from the request headers
            const token = req.headers.authorization?.split(' ')[1];
            // Check if the token is missing
            if (!token) {
              return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
            }
        
            // Verify the JWT token
            jwt.verify(token, config.jwtSecret, async (err, decoded) => {
              if (err) {
                console.log(err);
                return res
                  .status(401)
                  .json(ResponseHelper.error(401, MSG.INVALID_ACCESS_TOKEN));
              }
              // If token is valid, set user data in request object for further processing
              const user = await User.findOne({ email: decoded.email });
              req.user = user;
              next();
            });
          } catch (error) {
            console.error('Error:', error);
            res
              .status(500)
              .json(
                ResponseHelper.error(500, MSG.INTERNAL_SERVER_ERROR, error.message),
              );
          }
        };
        module.exports = authMiddleware;
        
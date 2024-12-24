// errorHandler.js
  
        const mongoose = require('mongoose');
        
        function errorHandler(err, req, res, next) {
          // Set a default status code and error message
          let statusCode = 500; // Internal server error
          let errorMessage = err.message;
          let errorOrigin;
          // Check for specific error types and set the status code accordingly
          if (err instanceof SyntaxError) {
            statusCode = 400; // Bad request
          } else if (err instanceof TypeError) {
            statusCode = 422; // Unprocessable entity
          } else if (err instanceof mongoose.Error.ValidationError) {
            statusCode = 422; // Unprocessable entity
          } else if (err instanceof mongoose.Error.CastError) {
            statusCode = 400; // Bad request
          }
        
          // // In development, include the filename and line number in the error message
          // if (process.env.NODE_ENV !== 'production') {
          //     const match = err.stack.match(/ats(.+):(d+):(d+)/);
          //     const filename = match ? match[1] : 'unknown';
          //     const lineNumber = match ? match[2] : 'unknown';
          //     errorOrigin = ` error in file: ${filename}, line: ${lineNumber}`;
          // }
          console.log('Error part::', err);
        
          // Send an error response to the client
          res.status(statusCode).json({
            statusCode: statusCode,
            message: errorMessage,
            success: false,
            errorOrigin,
          });
        }
        
        module.exports = errorHandler;
        
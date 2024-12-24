/**
    * File Name: responseHelper.js
    */
    class ResponseHelper {
      static success(statusCode = 200, message = '', data, meta) {
        return {
          statusCode,
          message,
          success: true,
          data,
          meta,
        };
      }
    
      static error(statusCode = 500, message = 'An error occurred', errors) {
        return {
          statusCode,
          message,
          success: false,
          errors,
        };
      }
    }
    
    module.exports = ResponseHelper;
    
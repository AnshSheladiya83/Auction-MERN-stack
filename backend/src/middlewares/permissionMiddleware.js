// permissionMiddleware.js
  
        const checkPermission = require("../utils/rbacHelper");
        const ResponseHelperWithFilters = require("../utils/responseHelper");
        const MSG = require("../utils/MSG");
        
        const permissionMiddleware = (permission) => {
          return (req, res, next) => {
            // Assuming user's role is stored in req.user.role
            const userRole = req.user.role;
        
            // Check if user has the required permission based on their role
            if (!checkPermission(userRole, permission)) {
              return res.status(403).json(ResponseHelperWithFilters.error(403, MSG.NOT_PERMISSION_TO_ACCESS));
            }
        
            // User has permission, proceed to the next middleware or route handler
            next();
          };
        };
        
        module.exports = permissionMiddleware;
        
/**
    * File Name: rbacHelper.js
    */
    
    const roles = {
      admin: {
        permissions: ['get_users']
      },
      editor: {
        permissions: []
      },
      user: {
        permissions: []
      }
    };
    
    const checkPermission = (role, permission) => {
      const rolePermissions = roles[role]?.permissions;
      return rolePermissions ? rolePermissions.includes(permission) : false;
    };
    
    module.exports = checkPermission ;
    
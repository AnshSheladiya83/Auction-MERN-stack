
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');


router.use(authMiddleware);
router.post(
  "/",
  
  UsersController.create
);
router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.put(
  "/:id",
  
  UsersController.updateById
);
router.delete('/:id', UsersController.deleteById);

router.get("/suggestions/get", UsersController.getSuggestions);

module.exports = router;

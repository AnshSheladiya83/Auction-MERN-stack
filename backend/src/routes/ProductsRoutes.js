
const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');


router.use(authMiddleware);
router.post(
  "/",
  
  ProductsController.create
);
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.put(
  "/:id",
  
  ProductsController.updateById
);
router.delete('/:id', ProductsController.deleteById);

router.get("/suggestions/get", ProductsController.getSuggestions);

module.exports = router;

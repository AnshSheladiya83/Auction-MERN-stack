
const Products = require('../models/Products');
const MSG = require('../utils/MSG');
const getPaginationObject = require('../utils/paginationUtils');
const ResponseHelper = require('../utils/responseHelper');
const { aggregate } = require('../utils/aggregateHelpers/aggregationHelper');
const { createPaginationStages } = require('../utils/aggregateHelpers/limitStageHelper');
const { createMatchRegexStage, createMatchStage } = require('../utils/aggregateHelpers/matchStageHelper');
const { createSortStage } = require('../utils/aggregateHelpers/sortStageHelper');
const {
  createLookupStage,
} = require("../utils/aggregateHelpers/lookupStageHelper");
const {
  createUnwindStage,
} = require("../utils/aggregateHelpers/unwindStageHelper");
const { default: mongoose } = require('mongoose');

exports.create = async (req, res) => {
  try {
  

 const products = new Products({
      ...req.body,
      
      
      created_at: new Date(),
      updated_at: null,
      created_by: req.user._id, 
      updated_by: null,
      is_deleted: false,
      deleted_at: null,
      deleted_by: null,
    });
    await products.save();
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.CREATE_SUCCESS,
      products,
    ));
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    let pipeline = [];
    let {
      search,
      pageNumber,
      pageSize,
       sortField, sortDirection
    } = req.query;

    // Search Filter
    if (search) {
      pipeline.push(createMatchRegexStage('', search));
    }
    pipeline.push(createMatchStage('is_deleted', false));
    
    const productsCounts = (await aggregate('products', pipeline)).length;

    // Sort by the specified field and order
    if (sortField) {
      sortDirection = sortDirection && sortDirection.toLowerCase() === "asc" ? 1 : -1; 
      pipeline.push(createSortStage(sortField, sortDirection));
    } else {
      pipeline.push(createSortStage("created_at", -1));
    }

    pageNumber = pageNumber || 1;
    pageSize = pageSize || 8;
    // Add pagination filter
    pipeline.push(
      ...createPaginationStages(Number(pageNumber), Number(pageSize)),
    );

    const products = await aggregate('products', pipeline);
    const paginationObject = await getPaginationObject(
      products,
      pageNumber,
      pageSize,
      productsCounts,
    );

    return res.status(200).send(ResponseHelper.success(
      200,
      MSG.FOUND_SUCCESS,
      products,
      paginationObject,
    ));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  }
};

exports.getById = async (req, res) => {
  try {
    const id =new mongoose.Types.ObjectId(req.params.id); 
    let pipeline = [];
    pipeline.push(createMatchStage('_id', id));
    
    let products = await aggregate('products', pipeline);
    products=products[0];

    if (!products) {
      return res.status(404).json(ResponseHelper.error(404, MSG.NOT_FOUND));
    }
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.FOUND_SUCCESS,
      products,
    ));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateById = async (req, res) => {
  try {
    
    const products = await Products.findByIdAndUpdate(req.params.id, {
      ...req.body,
            
      
      updated_at: new Date(),
      updated_by: req.user._id, 
    }, { new: true, runValidators: true });
    if (!products) {
      return res.status(404).send();
    }
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.UPDATE_SUCCESS,
      products,
    ));
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products || products.is_deleted) {
 return res.status(404).json(ResponseHelper.error(404, MSG.NOT_FOUND));    }
    products.is_deleted = true;
    products.deleted_at = new Date();
    products.deleted_by = req.user._id;

    await products.save();
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.DELETE_SUCCESS,
      products,
    ));
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.getSuggestions = async (req, res) => {
  try {
    let { search } = req.query;

    if (!search || search.trim() === "") {
      return res
        .status(400)
        .send(ResponseHelper.error(400, "Search query is required."));
    }

    let pipeline = [];
    pipeline.push(createMatchRegexStage("name", search.trim()));
    pipeline.push(createMatchStage("is_deleted", false));

    const suggestions = await aggregate("products", pipeline);

    const formattedSuggestions = suggestions.map((item) => ({
      text: item.name, // Assuming 'name' is the field to search in
      id: item._id,
    }));

    return res
      .status(200)
      .send(
        ResponseHelper.success(
          200,
          "Suggestions found successfully",
          formattedSuggestions
        )
      );
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send(ResponseHelper.error(500, "Internal Server Error"));
  }
};
    

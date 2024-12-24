
const Users = require('../models/Users');
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
  

 const users = new Users({
      ...req.body,
      
      
      created_at: new Date(),
      updated_at: null,
      created_by: req.user._id, 
      updated_by: null,
      is_deleted: false,
      deleted_at: null,
      deleted_by: null,
    });
    await users.save();
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.CREATE_SUCCESS,
      users,
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
    
    const usersCounts = (await aggregate('users', pipeline)).length;

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

    const users = await aggregate('users', pipeline);
    const paginationObject = await getPaginationObject(
      users,
      pageNumber,
      pageSize,
      usersCounts,
    );

    return res.status(200).send(ResponseHelper.success(
      200,
      MSG.FOUND_SUCCESS,
      users,
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
    
    let users = await aggregate('users', pipeline);
    users=users[0];

    if (!users) {
      return res.status(404).json(ResponseHelper.error(404, MSG.NOT_FOUND));
    }
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.FOUND_SUCCESS,
      users,
    ));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateById = async (req, res) => {
  try {
    
    const users = await Users.findByIdAndUpdate(req.params.id, {
      ...req.body,
            
      
      updated_at: new Date(),
      updated_by: req.user._id, 
    }, { new: true, runValidators: true });
    if (!users) {
      return res.status(404).send();
    }
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.UPDATE_SUCCESS,
      users,
    ));
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    if (!users || users.is_deleted) {
 return res.status(404).json(ResponseHelper.error(404, MSG.NOT_FOUND));    }
    users.is_deleted = true;
    users.deleted_at = new Date();
    users.deleted_by = req.user._id;

    await users.save();
    return res.status(201).send(ResponseHelper.success(
      200,
      MSG.DELETE_SUCCESS,
      users,
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

    const suggestions = await aggregate("users", pipeline);

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
    

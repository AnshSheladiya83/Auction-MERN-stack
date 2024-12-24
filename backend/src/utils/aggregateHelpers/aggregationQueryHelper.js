/**
     * File Name: aggregationQueryHelper.js
     */
  
    exports.createMatchStage = (field, value) => {
      return { $match: { [field]: value } };
    };
  
    exports.createGroupStage = (_id, fields) => {
      const groupFields = {};
      for (const field in fields) {
        groupFields[field] = { $sum: fields[field] };
      }
      return { $group: { _id: `${_id}`, ...groupFields } };
    };
  
    exports.createSortStage = (field, direction) => {
      return { $sort: { [field]: direction } };
    };
  
    exports.createLimitStage = (limit) => {
      return { $limit: limit };
    };
  
    exports.createProjectStage = (fields) => {
      return { $project: fields };
    };
  
    exports.createUnwindStage = (field) => {
      return { $unwind: `${field}` };
    };
  
    exports.createLookupStage = (from, localField, foreignField, as) => {
      return { $lookup: { from, localField, foreignField, as } };
    };
  
    exports.createReplaceRootStage = (newRoot) => {
      return { $replaceRoot: { newRoot } };
    };
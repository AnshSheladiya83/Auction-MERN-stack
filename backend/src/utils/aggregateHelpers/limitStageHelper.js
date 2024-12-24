/**

    File Name: limitStageHelper.js
    */
    exports.createLimitStage = (limit) => {
      return { $limit: limit };
    };
    
    exports.createSkipStage = (skip) => {
      return { $skip: skip };
    };
    
    exports.createPaginationStages = (pageNumber, pageSize) => {
      const skip = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      return [{ $skip: skip }, { $limit: limit }];
    };
    
    exports.createTopAndSkipStage = (top, skip) => {
      return [{ $limit: top }, { $skip: skip }];
    };
    
    exports.createLimitAndSortStage = (limit, field, order = 1) => {
      return [{ $sort: { [field]: order } }, { $limit: limit }];
    };
    
    exports.createLimitAndMatchStage = (limit, field, value) => {
      return [{ $match: { [field]: value } }, { $limit: limit }];
    };
    
    exports.createLimitAndProjectStage = (limit, projection) => {
      return [{ $project: projection }, { $limit: limit }];
    };
    
    exports.createPaginationWithSortAndMatchStage = (
      pageNumber,
      pageSize,
      sortField,
      sortOrder,
      matchField,
      matchValue
    ) => {
      const skip = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      return [
        { $sort: { [sortField]: sortOrder } },
        { $match: { [matchField]: matchValue } },
        { $skip: skip },
        { $limit: limit },
      ];
    };
    
    exports.createSortAndMatchStage = (sortField, sortOrder, matchField, matchValue) => {
      return [{ $sort: { [sortField]: sortOrder } }, { $match: { [matchField]: matchValue } }];
    };
    
    exports.createMatchAndSortAndLimitStage = (matchField, matchValue, sortField, sortOrder, limit) => {
      return [{ $match: { [matchField]: matchValue } }, { $sort: { [sortField]: sortOrder } }, { $limit: limit }];
    };
    
    exports.createSortAndLimitAndProjectStage = (sortField, sortOrder, limit, projection) => {
      return [{ $sort: { [sortField]: sortOrder } }, { $limit: limit }, { $project: projection }];
    };
    
    exports.createSampleStage = (size) => {
      return { $sample: { size: size } };
    };
    

  /**
   * File Name: unwindStageHelper.js
   */
  
  exports.createUnwindStage = (field, includeArrayIndex = null) => {
    if (includeArrayIndex === null) {
      return {
        $unwind: {
          path: `${field}`,
          preserveNullAndEmptyArrays: true,
        },
      };
    } else {
      return {
        $unwind: { path: `${field}`, includeArrayIndex: includeArrayIndex },
      };
    }
  };
  
  exports.createUnwindPreserveEmptyStage = (field, includeArrayIndex = null) => {
    if (includeArrayIndex === null) {
      return { $unwind: { path: `${field}`, preserveNullAndEmptyArrays: true } };
    } else {
      return {
        $unwind: {
          path: `${field}`,
          includeArrayIndex: includeArrayIndex,
          preserveNullAndEmptyArrays: true,
        },
      };
    }
  };
  
  exports.createUnwindWithLookupStage = (field, lookupCollection, lookupFields) => {
    return [
      { $unwind: { path: `${field}`, preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: lookupCollection,
          localField: field,
          foreignField: lookupFields,
          as: field,
        },
      },
      { $unwind: { path: `${field}`, preserveNullAndEmptyArrays: true } },
    ];
  };
  
  exports.createUnwindWithFilterStage = (field, filter) => {
    return {
      $unwind: {
        path: `${field}`,
        preserveNullAndEmptyArrays: true,
        filter: filter,
      },
    };
  };
  
  exports.createNestedUnwindStage = (fields) => {
    let unwindStages = [];
    for (let i = 0; i < fields.length; i++) {
      unwindStages.push({
        $unwind: {
          path: `${fields[i]}`,
          preserveNullAndEmptyArrays: true,
        },
      });
    }
    return unwindStages;
  };
  
  exports.createUnwindToObjectsStage = (field, fields) => {
    let unwindStage = {
      $unwind: {
        path: `${field}`,
        preserveNullAndEmptyArrays: true,
      },
    };
  
    let projectStage = {
      $project: {},
    };
  
    for (let i = 0; i < fields.length; i++) {
      projectStage.$project[fields[i]] = `${field}.${fields[i]}`;
    }
  
    return [unwindStage, projectStage];
  };
  
  exports.createUnwindBySubfieldStage = (field, subfield, includeArrayIndex = null) => {
    const path = `${field}.${subfield}`;
    if (includeArrayIndex === null) {
      return { $unwind: path };
    } else {
      return { $unwind: { path, includeArrayIndex } };
    }
  };
  
  exports.createUnwindBySizeStage = (field, size, includeArrayIndex = null) => {
    if (includeArrayIndex === null) {
      return {
        $unwind: {
          path: field,
          preserveNullAndEmptyArrays: true,
          includeArrayIndex: 0,
          unwind: { path: '$' + field, filter: { $size: size } },
        },
      };
    } else {
      return {
        $unwind: {
          path: field,
          includeArrayIndex,
          unwind: { path: '$' + field, filter: { $size: size } },
        },
      };
    }
  };
  
  exports.createUnwindWithGroupStage = (field, includeArrayIndex = null) => {
    if (includeArrayIndex === null) {
      return [
        { $unwind: { path: field, preserveNullAndEmptyArrays: true } },
        { $group: { _id: '$' + field, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ];
    } else {
      return [
        {
          $unwind: {
            path: field,
            includeArrayIndex,
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: { [field]: '$' + field, index: '$' + includeArrayIndex },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ];
    }
  };
  
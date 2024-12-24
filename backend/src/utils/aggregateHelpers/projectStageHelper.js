/**
    * File Name: projectStageHelper.js
    */
   
   exports.createProjectStage = (field, value) => {
     return { $project: { [field]: value } };
   };
   
   exports.createProjectExcludeStage = (field) => {
     return { $project: { [field]: 0 } };
   };
   
   exports.createProjectRenameStage = (field, newName) => {
     return { $project: { [newName]: `$${field}` } };
   };
   
   exports.createProjectAddFieldsStage = (newFields) => {
     return { $project: newFields };
   };
   
   exports.createProjectConcatStage = (newField, fields) => {
     const concatFields = fields.map((field) => `$${field}`);
     return { $project: { [newField]: { $concat: concatFields } } };
   };
   
   exports.createProjectDateToStringStage = (field, format) => {
     return { $project: { [field]: { $dateToString: { format: format, date: `$${field}` } } } };
   };
   
   exports.createProjectSubstringStage = (newField, field, start, length) => {
     return { $project: { [newField]: { $substr: [`$${field}`, start, length] } } };
   };
   
   exports.createProjectConvertToIntStage = (field) => {
     return { $project: { [field]: { $toInt: `$${field}` } } };
   };
   
   exports.createProjectConvertToDoubleStage = (field) => {
     return { $project: { [field]: { $toDouble: `$${field}` } } };
   };
   
   exports.createProjectArraySizeStage = (field, newField) => {
     return { $project: { [newField]: { $size: `$${field}` } } };
   };
   
   exports.createProjectAddFieldsWithExpressionStage = (fields) => {
     const newFields = {};
     Object.entries(fields).forEach(([key, value]) => {
       newFields[key] = { $add: value };
     });
     return { $project: newFields };
   };
   
   exports.createProjectConditionalStage = (condition, trueResult, falseResult) => {
     return { $project: { result: { $cond: [condition, trueResult, falseResult] } } };
   };
   
   exports.createProjectDateAddStage = (
     field,
     years,
     months,
     weeks,
     days,
     hours,
     minutes,
     seconds,
     milliseconds,
     newField
   ) => {
     return {
       $project: {
         [newField]: {
           $add: [
             `$${field}`,
             { $multiply: [years, 31536000000] },
             { $multiply: [months, 2592000000] },
             { $multiply: [weeks, 604800000] },
             { $multiply: [days, 86400000] },
             { $multiply: [hours, 3600000] },
             { $multiply: [minutes, 60000] },
             { $multiply: [seconds, 1000] },
             milliseconds,
           ],
         },
       },
     };
   };
   
   exports.createProjectDateDiffStage = (date1, date2, unit, newField) => {
     return { $project: { [newField]: { $divide: [{ $subtract: [`$${date1}`, `$${date2}`] }, unit] } } };
   };
   
   exports.createProjectSetStage = (field, value, newField) => {
     return { $project: { [newField]: { $cond: [{ $eq: [`$${field}`, null] }, value, `$${field}`] } } };
   };
   
   exports.createProjectArrayToObjectStage = (array, newField) => {
     return { $project: { [newField]: { $arrayToObject: array } } };
   };
   
   exports.createProjectSizeStage = (field, newField) => {
     return { $project: { [newField]: { $size: `$${field}` } } };
   };
   
   exports.createProjectYearStage = (field, newField) => {
     return { $project: { [newField]: { $year: `$${field}` } } };
   };
   
   exports.createProjectMonthStage = (field, newField) => {
     return { $project: { [newField]: { $month: `$${field}` } } };
   };
   
   exports.createProjectDayOfMonthStage = (field, newField) => {
     return { $project: { [newField]: { $dayOfMonth: `$${field}` } } };
   };
   
   exports.createProjectDayOfWeekStage = (field, newField) => {
     return { $project: { [newField]: { $dayOfWeek: `$${field}` } } };
   };
   
   exports.createProjectDateFromStringStage = (field, format, newField) => {
     return { $project: { [newField]: { $dateFromString: { dateString: `$${field}`, format: format } } } };
   };
   
   exports.createProjectMultiplyStage = (field, factor, newField) => {
     return { $project: { [newField]: { $multiply: [`$${field}`, factor] } } };
   };
   
   exports.createProjectDivideStage = (field, divisor, newField) => {
     return { $project: { [newField]: { $divide: [`$${field}`, divisor] } } };
   };
   
   exports.createProjectCeilingStage = (field, newField) => {
     return { $project: { [newField]: { $ceil: `$${field}` } } };
   };
   
   exports.createProjectFloorStage = (field, newField) => {
     return { $project: { [newField]: { $floor: `$${field}` } } };
   };
   
   exports.createProjectModuloStage = (field, divisor, newField) => {
     return { $project: { [newField]: { $mod: [`$${field}`, divisor] } } };
   };
   
   exports.createProjectRoundStage = (field, precision, newField) => {
     return { $project: { [newField]: { $round: [`$${field}`, precision] } } };
   };
   
   exports.createProjectToLowerStage = (field, newField) => {
     return { $project: { [newField]: { $toLower: `$${field}` } } };
   };
   
   exports.createProjectToUpperStage = (field, newField) => {
     return { $project: { [newField]: { $toUpper: `$${field}` } } };
   };
   
   exports.createProjectObjectToArrayStage = (field, newField) => {
     return { $project: { [newField]: { $objectToArray: `$${field}` } } };
   };
   
   exports.createProjectSubstringStage = (field, start, length, newField) => {
     return { $project: { [newField]: { $substr: [`$${field}`, start, length] } } };
   };
   
   exports.createProjectConcatStage = (fields, separator, newField) => {
     const concatFields = fields.map((field) => `$${field}`).join(separator);
     return { $project: { [newField]: { $concat: [concatFields] } } };
   };
   
   exports.createProjectIndexOfBytesStage = (field, searchValue, start, newField) => {
     return { $project: { [newField]: { $indexOfBytes: [`$${field}`, searchValue, start] } } };
   };
   
   exports.createProjectTrimStage = (field, newField) => {
     return { $project: { [newField]: { $trim: { input: `$${field}` } } } };
   };
   
   exports.createProjectTypeStage = (field, newField) => {
     return { $project: { [newField]: { $type: `$${field}` } } };
   };
   
   exports.createProjectCondStage = (condition, trueValue, falseValue, newField) => {
     return { $project: { [newField]: { $cond: [condition, trueValue, falseValue] } } };
   };
   
   exports.createProjectArrayElemAtStage = (field, index, newField) => {
     return { $project: { [newField]: { $arrayElemAt: [`$${field}`, index] } } };
   };
   
   exports.createProjectArraySliceStage = (field, start, end, newField) => {
     return { $project: { [newField]: { $slice: [`$${field}`, start, end] } } };
   };
   
   exports.createProjectDateToStringStage = (field, format, newField) => {
     return { $project: { [newField]: { $dateToString: { date: `$${field}`, format: format } } } };
   };
   // Example Usage:
   // const pipeline = [
   //   projectStageHelper.createProjectStage('product_name', 1),
   //   projectStageHelper.createProjectExcludeStage('price'),
   //   projectStageHelper.createProjectRenameStage('rating', 'customer_rating'),
   //   projectStageHelper.createProjectAddFieldsStage({ discounted_price: { $subtract: ['$price', '$discount'] } }),
   // ];
   
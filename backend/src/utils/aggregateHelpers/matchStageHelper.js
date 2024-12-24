/**
    * File Name: matchStageHelper.js
    */
   
   exports.createMatchStage = (field, value) => {
     return { $match: { [field]: value } };
   };
   
   exports.createMatchInStage = (field, values) => {
     return { $match: { [field]: { $in: values } } };
   };
   
   exports.createMatchAndStage = (field1, value1, field2, value2) => {
     return { $match: { $and: [{ [field1]: value1 }, { [field2]: value2 }] } };
   };
   
   exports.createMatchOrStage = (field1, value1, field2, value2) => {
     return { $match: { $or: [{ [field1]: value1 }, { [field2]: value2 }] } };
   };
   
   exports.createMatchNotStage = (field, value) => {
     return { $match: { [field]: { $ne: value } } };
   };
   exports.createMatchGreaterThanStage = (field, value) => {
     return { $match: { [field]: { $gt: value } } };
   };
   
   exports.createMatchGreaterThanOrEqualStage = (field, value) => {
     return { $match: { [field]: { $gte: value } } };
   };
   
   exports.createMatchLessThanStage = (field, value) => {
     return { $match: { [field]: { $lt: value } } };
   };
   
   exports.createMatchLessThanOrEqualStage = (field, value) => {
     return { $match: { [field]: { $lte: value } } };
   };
   
   exports.createMatchRegexStage = (field, value) => {
     return { $match: { [field]: { $regex: value , $options: 'i'} } };
   };
   
   exports.createMatchSizeStage = (field, size) => {
     return { $match: { [field]: { $size: size } } };
   };
   
   // Example Usage:
   // const pipeline = [
   //   matchStageHelper.createMatchStage('category', 'electronics'),
   //   matchStageHelper.createMatchInStage('brand', ['Apple', 'Samsung']),
   //   matchStageHelper.createMatchAndStage('category', 'electronics', 'brand', 'Apple'),
   //   matchStageHelper.createMatchOrStage('category', 'electronics', 'brand', 'Apple'),
   //   matchStageHelper.createMatchNotStage('category', 'electronics'),
   //   matchStageHelper.createMatchGreaterThanStage('price', 100),
   //   matchStageHelper.createMatchGreaterThanOrEqualStage('rating', 4),
   //   matchStageHelper.createMatchLessThanStage('quantity', 10),
   //   matchStageHelper.createMatchLessThanOrEqualStage('discount', 20),
   //   matchStageHelper.createMatchRegexStage('product_name', /^S/),
   // matchStageHelper.createMatchExistsStage('color'),
   // matchStageHelper.createMatchTypeStage('price', 'number'),
   // matchStageHelper.createMatchElemMatchStage('sizes', { size: 'M', stock: { $gte: 5 } }),
   // matchStageHelper.createMatchAllStage('tags', ['electronics', 'mobile']),
   // matchStageHelper.createMatchModStage('quantity', 2, 0),
   // matchStageHelper.createMatchSizeStage('ratings', 10),
   // ];
   
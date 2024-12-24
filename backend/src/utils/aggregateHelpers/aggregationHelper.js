/**
    * File Name: aggregationHelper.js
    */
   
   const mongoose = require('mongoose');
   
   exports.aggregate = (async (collection, pipeline) => {
     try {
       const result = await mongoose.connection.db.collection(collection).aggregate(pipeline).toArray();
       return result;
     } catch (error) {
       throw new Error(error.message);
     }
   });
   
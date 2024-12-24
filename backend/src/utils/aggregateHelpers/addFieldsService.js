/**
    * File Name: addFieldsService.js
    */
   
   exports.createAddFieldsStage = (newField, sourceField) => {
       return { $addFields: { [newField]: `$${sourceField}` } };
     };
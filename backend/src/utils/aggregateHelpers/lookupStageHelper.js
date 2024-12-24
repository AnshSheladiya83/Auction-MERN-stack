
    exports.createLookupStage = (from, localField, foreignField, as) => {
      return { $lookup: { from, localField, foreignField, as } };
    };
    
    exports.createLookupAndProjectStage = (from, localField, foreignField, as, fields) => {
      const projectFields = {};
    
      // Create the projection fields object
      fields.forEach((field) => {
        projectFields[field] = 1;
      });
    
      return {
        $lookup: {
          from,
          localField,
          foreignField,
          as,
          pipeline: [
            {
              $project: projectFields,
            },
          ],
        },
      };
    };
    
    exports.createPopulateStageWithNestedArrayFields = async ( data, fieldForLookup, fieldsForProject) => {
      const userIdsToPopulate = data.map((data) => data._id);
      const products = await Product.find({ _id: { $in: userIdsToPopulate } }).populate(fieldForLookup, fieldsForProject);
      const updatedData = data.map((item) => {
        const matchingResult = products.find((resultItem) => String(resultItem._id) === String(item._id));
        if (matchingResult) {
          return { ...item, [fieldForLookup.split('.')[0]]: matchingResult[fieldForLookup.split('.')[0]]};
        }
        return item;
      });
    
      return updatedData;
    };
    
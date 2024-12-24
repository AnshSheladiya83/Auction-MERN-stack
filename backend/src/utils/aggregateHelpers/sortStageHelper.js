
    /**
     * File Name: sortStageHelper.js
     */
    exports.createSortStage = (field, order = 1) => {
      return { $sort: { [field]: order } };
    };
    
    exports.createMultiSortStage = (sortCriteria) => {
      return { $sort: sortCriteria };
    };
    
    exports.createSortByCountStage = (field, newField) => {
      return { $sort: { [newField]: { $size: `${field}` } } };
    };
    
    exports.createSortByNestedFieldStage = (field1, field2, order = 1) => {
      return { $sort: { [`${field1}.${field2}`]: order } };
    };
    
    exports.createSortByRandomStage = (seed = null) => {
      return {
        $sort: {
          _id:
            seed === null
              ? Math.random()
              : {
                  $function: {
                    body: function () {
                      return Math.random(`${seed}`);
                    },
                  },
                },
        },
      };
    };
    
    exports.createSortByArrayElementStage = (field, elementIndex, order = 1) => {
      return { $sort: { [`${field}.${elementIndex}`]: order } };
    };
    
    exports.createSortBySubstringStage = (field, substring, order = 1) => {
      return {
        $sort: { [field]: { $regex: substring, $options: 'i' }, [`${field}.${order === 1 ? '$first' : '$last'}`]: order },
      };
    };
    
    exports.createSortByMatchScoreStage = (query, newField) => {
      return { $sort: { [newField]: { $meta: 'textScore' } } };
    };
    
    exports.createSortByDistanceStage = (nearField, distanceField, distanceMultiplier = 1) => {
      return {
        $sort: {
          [distanceField]: {
            $multiply: [
              {
                $divide: [
                  1,
                  {
                    $add: [
                      1,
                      { $multiply: [{ $divide: [{ $subtract: [`${nearField}`, [0, 0]] }, 111.12] }, distanceMultiplier] },
                    ],
                  },
                ],
              },
              1000,
            ],
          },
        },
      };
    };
    
    exports.createSortByCollationStage = (field, locale, order = 1, strength = 3) => {
      return { $sort: { [field]: { $collation: { locale, strength }, order } } };
    };
    
    exports.createSortByFieldLengthStage = (field, order = 1) => {
      return { $sort: { [`${field}_length`]: order } };
    };
    
    exports.createSortByDayOfWeekStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_dayOfWeek`]: order } };
    };
    
    exports.createSortByYearStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_year`]: order } };
    };
    
    exports.createSortByMonthStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_month`]: order } };
    };
    
    exports.createSortByDayStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_day`]: order } };
    };
    
    exports.createSortByHourStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_hour`]: order } };
    };
    
    exports.createSortByMinuteStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_minute`]: order } };
    };
    
    exports.createSortBySecondStage = (dateField, order = 1) => {
      return { $sort: { [`${dateField}_second`]: order } };
    };
    
    exports.createSortByWordPresenceStage = (field, word) => {
      return {
        $addFields: {
          relevanceScore: {
            $cond: {
              if: { $regexMatch: { input: `${field}`, regex: new RegExp(word, 'i') } },
              then: 1,
              else: 0
            }
          }
        }
      },
      {
        $sort: { relevanceScore: -1 } // Sort by relevance score descending
      };
    };
    
    // const pipeline = [
    //   matchStageHelper.createMatchStage('status', 'active'),
    //   sortStageHelper.createSortStage('created_at', -1),
    //   sortStageHelper.createMultiSortStage({ priority: -1, created_at: -1 }),
    //   sortStageHelper.createSortByCountStage('comments', 'num_of_comments'),
    //   sortStageHelper.createSortByNestedFieldStage('customer', 'name', 1),
    //   sortStageHelper.createSortByRandomStage(),
    //   sortStageHelper.createSortByRandomStage(123),
    //   sortStageHelper.createSortByArrayElementStage('tags', 2, -1),
    //   sortStageHelper.createSortBySubstringStage('title', 'book', 1),
    //   sortStageHelper.createSortByMatchScoreStage('search', 'score'),
    //   sortStageHelper.createSortByDistanceStage('location', 'distance', 1000),
    //   sortStageHelper.createSortByCollationStage('name', 'en_US', 1, 2)
    // ];
    
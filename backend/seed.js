const fs = require("fs");
const path = require("path");
require("./src/db/mongoose-connection");
const mongoose = require("mongoose");
const { readExcelFile } = require("./generates/utils");

// Read the Excel file (assuming 'ss.xlsx' contains table field names)
const json = readExcelFile("ss.xlsx");

// Create a dictionary with table names as keys and their fields as values
const tableFields = {};
for (let i = 0; i < json[0].length; i += 2) {
  const tableName = json[0][i];
  const fields = [];
  for (let j = 1; j < json.length; j++) {
    if (json[j][i]) {
      const field = {
        name: json[j][i],
        type: json[j][i + 1] || "String", // Default to String if type is not specified
      };
      fields.push(field);
    } else {
      break;
    }
  }
  tableFields[tableName] = fields;
}

const getRelations = (fields) => {
  return fields
    .filter((field) => field.type.startsWith("Relation"))
    .map((field) => field.type.split("-")[1]);
};

const generateSortedCollections = (collections) => {
  const sortedCollections = [];
  const collectionNames = Object.keys(collections);

  while (sortedCollections.length < collectionNames.length) {
    for (const collectionName of collectionNames) {
      if (sortedCollections.includes(collectionName)) continue;

      const fields = collections[collectionName];
      const relations = getRelations(fields);

      if (relations.every((relation) => sortedCollections.includes(relation))) {
        sortedCollections.push(collectionName);
      }
    }
  }

  return sortedCollections.map(
    (name) => name.charAt(0).toUpperCase() + name.slice(1)
  );
};

const sortedCollections = generateSortedCollections(tableFields);
console.log("sortedCollections----", sortedCollections);
// Function to load models dynamically
const loadModel = (modelName) => {
  return require(path.join(__dirname, "src", "models", modelName));
};

// Function to load seed data dynamically
const loadSeedData = (modelName) => {
  const seedFile = path.join(
    __dirname,
    "src",
    "seeds",
    `${modelName}SeedData.json`
  );
  if (fs.existsSync(seedFile)) {
    return JSON.parse(fs.readFileSync(seedFile, "utf-8"));
  }
  return null;
};

// Function to seed data
const seedData = async (modelName) => {
  console.log("modelName----", modelName);
  const Model = loadModel(
    modelName.replace(/(?:^|_)(\w)/g, (_, c) => c.toUpperCase())
  );
  const seedData = loadSeedData(
    modelName.replace(/(?:^|_)(\w)/g, (_, c) => c.toUpperCase())
  );

  if (seedData) {
    try {
      // Fetch relation fields
      const modelFields = tableFields[modelName.toLowerCase()];
      console.log("tableFields-----", tableFields);
      console.log("modelName-----", modelName.toLowerCase());
      const relationFields = modelFields.filter((field) =>
        field.type.startsWith("Relation")
      );

      for (const doc of seedData) {
        for (const field of relationFields) {
          const relatedCollection = field.type.split(" -")[1];
          const randomDocument = await getRandomDocument(
            relatedCollection.replace(/(?:^|_)(\w)/g, (_, c) => c.toUpperCase())
          );
          if (randomDocument) {
            doc[field.name] = randomDocument._id;
          }
        }
      }

      await Model.deleteMany(); // Clear existing data
      await Model.insertMany(seedData); // Insert seed data
      console.log(`Seed data for ${modelName} inserted successfully!`);
    } catch (error) {
      console.error(`Failed to insert seed data for ${modelName}:`, error);
    }
  } else {
    console.log(`No seed data found for ${modelName}`);
  }
};

const getRandomDocument = async (modelName) => {
  console.log("IMMMMM ---1", modelName);
  const Model = loadModel(modelName);
  console.log("IMMMMM ---2");
  const count = await Model.countDocuments();
  console.log("IMMMMM ---3");
  const randomIndex = Math.floor(Math.random() * count);
  const randomDocument = await Model.findOne().skip(randomIndex);
  return randomDocument;
};

// Run the seeder
const runSeeder = async () => {
  for (const modelName of sortedCollections) {
    await seedData(modelName);
  }
  mongoose.connection.close();
};

runSeeder();

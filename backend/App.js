const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sanitizeReqBody = require("./src/middlewares/sanitizeReqBody");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();

// Connect Database
require("./src/db/mongoose-connection.js");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(sanitizeReqBody);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routes
const ProductsRoutes = require("./src/routes/ProductsRoutes");
const UsersRoutes = require("./src/routes/UsersRoutes");
const AuthRoutes = require("./src/routes/AuthRoutes");

// Use routes
app.use("/api/product", ProductsRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/auth", AuthRoutes);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 8382;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

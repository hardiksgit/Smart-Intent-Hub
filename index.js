const express = require("express");
const mongoose = require("mongoose");
const upload_routes = require("./src/routes/upload_routes.js");
const conversation_routes = require("./src/routes/conversation_routes.js");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/v1/api", upload_routes);
app.use("/v1/api", conversation_routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

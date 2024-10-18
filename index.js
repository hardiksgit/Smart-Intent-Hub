const express = require("express");
require("dotenv").config();
const upload_routes = require("./src/routes/upload_routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/v1/api", upload_routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

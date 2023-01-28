const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
// to Implement .env file
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
//use body-parser ??
app.use(bodyParser.json());
//for knex orm migration
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV])
//implement swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
//swagger Css
fs = require("fs");
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), "utf8"); 

/**Test url */
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//url for swaggerUi http://localhost:3000/api-docs/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

/**API Url */
app.use("/v1", routes);


/**Run project with .env port */
app.listen(process.env.PORT, () => {
  console.log("server on port",process.env.PORT);
});
module.exports = app;
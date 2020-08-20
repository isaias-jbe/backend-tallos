const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/employeeController")(app);

app.listen(3333, () => {
  console.log("Servidor executando na porta 3333");
});

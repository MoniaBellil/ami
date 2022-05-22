const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var path = require('path');
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.use(express.static('uploads')); 
app.use('/uploads', express.static('uploads'));
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/decl.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "client"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'client' to roles collection");
      });

      new Role({
        name: "export"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'export' to roles collection");
      });

      new Role({
        name: "responsable"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'responsable' to roles collection");
      });
    }
  });
}

const dotenv = require("dotenv");
dotenv.config();
const { dbConnection } = require("./db/dbConnection");
const { app } = require("./app");

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("Error connecting to the database:", err));

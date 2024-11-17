const mongoose = require("mongoose");

exports.dbConnection = async () => {
  // Connect to MongoDB Atlas
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "assignment",
    });

    console.log(
      `Connected to MongoDB Atlas: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

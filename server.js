const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// setup a middleware to handle JSON request
app.use(express.json());

// trigger the connection with MongoDB
connectToMongoDB();



// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});


// import all the routers
const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

// import all the routers
const showRouter = require("./routes/tvshow");
app.use("/shows", showRouter);


// start the express server
app.listen(9382, () => {
  console.log("server is running at http://localhost:9382");
});

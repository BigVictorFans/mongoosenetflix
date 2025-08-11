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

// trigger the connection with MongoDB
connectToMongoDB();

// declare schema for shows
const showSchema = new mongoose.Schema({
    title: String,
    creator: String,
    premiere_year: Number,
    end_year: Number, 
    seasons: Number, 
    genre: String,
    rating: Number,
});

// create a Modal from the schema
const Show = mongoose.model("Show", showSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

/* 
  Routes for shows
  GET /shows - list all the shows
  GET /shows/68943cf564aa9f8354cef260 - get a specific show
  POST /shows - add new show
  PUT /shows/68943cf564aa9f8354cef260 - update show
  DELETE /shows/68943cf564aa9f8354cef260 - delete show
*/
// GET /shows - list all the shows
/*
  query params is everything after the ? mark
*/
app.get("/shows", async (req, res) => {
  const premiere_year = req.query.premiere_year;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create a empty container for filter
  let filter = {};
  // if director exists, then only add it into the filter container
  if (premiere_year) {
    filter.premiere_year = {$gt: premiere_year};
  }
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the shows data from Mongodb
  const shows = await Show.find(filter);
  res.send(shows);
});

// GET /shows/:id - get a specific show
app.get("/shows/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const show = await Show.findById(id);
  res.send(show);
});

// start the express server
app.listen(9382, () => {
  console.log("server is running at http://localhost:9382");
});

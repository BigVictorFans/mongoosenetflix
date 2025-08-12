const express = require("express");
//create a express router
const router = express.Router();

// import the Show model
const Show = require("../models/tvshow");

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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const show = await Show.findById(id);
  res.send(show);
});

/* 
  POST /Shows - add new Show
  This POST route need to accept the following parameters:
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator  = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons; 
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if ( !title || !creator || !premiere_year || !end_year || !seasons || !genre || !rating ) {
      return res.status(400).send("All fields are required"); // 400 is Bad Request
    }


    //create a new Show
    const newShow = new Show({
      title: title,
      creator : creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons, 
      genre: genre,
      rating: rating
    })
    // save the Show to MongoDB
    await newShow.save(); //clicking on a save button

    res.status(200).send(newShow);
  } 
  catch (error) {
    res.status(400).send("All fields are required");
  }
});


//  PUT /Shows/68943cf564aa9f8354cef260 - update Show
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const creator  = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons; 
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !end_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedShow = await Show.findByIdAndUpdate(
      id,
      {
        title: title,
        creator : creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons, 
        genre: genre,
        rating: rating
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedShow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /Shows/68943cf564aa9f8354cef260 - delete Show
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the Show
    const deletedShow = await Show.findByIdAndDelete(id);
    res.status(200).send({
      message: `Show with the ID of ${id} has been deleted`,
      Show: deletedShow,
    });
  } 
  catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
})

module.exports = router;

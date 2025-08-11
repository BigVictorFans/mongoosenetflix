// create a new database
use("netflix");

// create a new collection (folder)
db.createCollection("shows");

// Create
// insert multiple documents at one shot
db.shows.insertMany([
    {
        "title": "Breaking Bad",
        "creator": "Vince Gilligan",
        "premiere_year": 2008,
        "end_year": 2013,
        "seasons": 5,
        "genre": "Crime",
        "rating": 9.5
    },
    {
        "title": "Stranger Things",
        "creator": "The Duffer Brothers",
        "premiere_year": 2016,
        "seasons": 4,
        "genre": "Sci-Fi",
        "rating": 8.7
    },
    {
        "title": "The Office",
        "creator": "Greg Daniels",
        "premiere_year": 2005,
        "end_year": 2013,
        "seasons": 9,
        "genre": "Comedy",
        "rating": 8.9
    },
    {
        "title": "Game of Thrones",
        "creator": "David Benioff & D.B. Weiss",
        "premiere_year": 2011,
        "end_year": 2019,
        "seasons": 8,
        "genre": "Fantasy",
        "rating": 8.3
    },
    {
        "title": "The Mandalorian",
        "creator": "Jon Favreau",
        "premiere_year": 2019,
        "seasons": 2,
        "genre": "Sci-Fi",
        "rating": 8.8
    },
    {
        "title": "Westworld",
        "creator": "Jonathan Nolan & Lisa Joy",
        "premiere_year": 2016,
        "seasons": 4,
        "genre": "Sci-Fi",
        "rating": 8.6
    },
    {
        "title": "Fargo",
        "creator": "Noah Hawley",
        "premiere_year": 2014,
        "seasons": 4,
        "genre": "Crime",
        "rating": 8.9
    },
    {
        "title": "Better Call Saul",
        "creator": "Vince Gilligan & Peter Gould",
        "premiere_year": 2015,
        "end_year": 2022,
        "seasons": 6,
        "genre": "Crime",
        "rating": 8.8
    },
    {
        "title": "Black Mirror",
        "creator": "Charlie Brooker",
        "premiere_year": 2011,
        "seasons": 5,
        "genre": "Sci-Fi",
        "rating": 8.8
    },
    {
        "title": "The Crown",
        "creator": "Peter Morgan",
        "premiere_year": 2016,
        "seasons": 6,
        "genre": "Drama",
        "rating": 8.7
    }
]);
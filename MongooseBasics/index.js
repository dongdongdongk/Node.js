// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/movieApp'); // 마지막 부분이 DB명
    console.log("ConnectSuccess")
}

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String

});

const Movie = mongoose.model('Movie', movieSchema);

const amadeus = new Movie({
    title: 'Amadeus',
    year: 1986,
    score: 9.2,
    rating: 'R'
});

amadeus.save()
  .then(movie => {
    console.log('Movie saved:', movie);
  })
  .catch(error => {
    console.error('Error saving movie:', error);
  });

  Movie.insertMany([
    {title : 'Amelia', year : 2001, score : 8.3, rating : 'R'},
    {title : 'Alien', year : 1979, score : 8.1, rating : 'R'},
    {title : 'Amelia3', year : 2001, score : 8.3, rating : 'R'},
    {title : 'Amelia5', year : 2031, score : 3.3, rating : 'R'},
    {title : 'Amelia6', year : 2041, score : 6.3, rating : 'R'},
  ]);
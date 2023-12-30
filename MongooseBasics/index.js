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

})

const Movie = mongoose.model('Movie', movieSchema);

const amadeus = new Movie({
    title: 'Amadeus',
    year: 1986,
    score: 9.2,
    rating: 'R'
})

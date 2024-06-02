const { match } = require('minimatch');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Title should be alphanumeric'],
        minLength: [5, 'Title should be at least 5 characters']
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Genre should be alphanumeric'],
        minLength: [5, 'Genre should be at least 5 characters']
    },
    director: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Title should be alphanumeric'],
        minLength: [5, 'Director should be at least 5 characters']
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Description should be alphanumeric'],
        minLength: [20, 'Description should be at least 20 characters']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Movie image should be valid URL']
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

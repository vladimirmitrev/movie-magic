const { match } = require('minimatch');
const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Cast name should be alphanumeric'],
        minLength: [5, 'Cast name should be at least 5 characters']
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Cast born place should be alphanumeric'],
        minLength: [10, 'Cast born place should be at least 10 characters']
    },
    nameInMovie: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+/, 'Name in movie should be alphanumeric'],
        minLength: [5, 'Name in movie should be at least 5 characters']
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /^https?:\/\//.test(value);
            },
            message: (props) => `${props.value} is invalid url for cast image!`
        }
    },
    // movies: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Movie'
    // }]
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;

// •	movie – ObjectId, ref Movie Model 

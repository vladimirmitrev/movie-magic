const { match } = require('minimatch');
const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 14,
        max: 120
    },
    born: {
        type: String,
        required: true,
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
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;

// •	movie – ObjectId, ref Movie Model 

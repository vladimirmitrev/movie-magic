const Movie = require('../models/Movie');

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);

//TODO filter movies in mongodb
exports.search = async (title, genre, year) => {
  let result = await Movie.find().lean();

  if(title) {
    result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
  }

  if(genre) {
    result = result.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
  }

  if(year) {
    result = result.filter(movie => movie.year === year);
  }
  
  return result;
};

exports.create = (movieData) => Movie.create(movieData);
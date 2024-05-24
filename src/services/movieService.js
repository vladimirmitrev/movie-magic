const Movie = require('../models/Movie');
const Cast = require('../models/Cast');

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

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

exports.attach = async (movieId, castId) => {
  // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId} });

  const movie = await this.getOne(movieId);
  
  //This is optional
  // const cast = await Cast.findById(castId);
  // cast.movies.push(movieId);
  // await cast.save();

  //TODO: validate castId if exists
  //TODO: validate id cast is already added
  movie.casts.push(castId);

  await movie.save();

  return movie;
};
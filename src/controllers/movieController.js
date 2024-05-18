const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    // console.log(req.body);
    const newMovie = req.body;

    movieService.create(newMovie);

    res.redirect('/');
});

router.get('/movies/:movieId', (req, res) => {
    res.render('details');
});


module.exports = router;